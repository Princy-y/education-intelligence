const pool = require("../db/database");
const axios = require("axios");

const {
    generateAcademicRecommendations
} = require("./academicRecommendationService");

const ML_SERVICE_URL =
    process.env.ML_SERVICE_URL || "http://127.0.0.1:8001";


async function getStudentIntelligence(studentId) {

    // ============================================
    // 1. Get student information
    // ============================================

    const studentResult = await pool.query(
        `
        SELECT
            s.id,
            s.roll_number,
            s.year,
            s.class_id,
            u.name,
            u.email,
            c.name AS class_name,
            c.department
        FROM students s
        JOIN users u
            ON s.user_id = u.id
        LEFT JOIN classes c
            ON s.class_id = c.id
        WHERE s.id = $1
        `,
        [studentId]
    );


    if (studentResult.rows.length === 0) {

        const error = new Error("Student not found");

        error.statusCode = 404;

        throw error;
    }


    const student = studentResult.rows[0];


    // ============================================
    // 2. Get attendance
    // ============================================

    const attendanceResult = await pool.query(
        `
        SELECT
            COALESCE(SUM(total_classes), 0) AS total_classes,
            COALESCE(SUM(attended_classes), 0) AS attended_classes
        FROM attendance
        WHERE student_id = $1
        `,
        [studentId]
    );


    const attendanceData = attendanceResult.rows[0];

    const totalClasses =
        Number(attendanceData.total_classes);

    const attendedClasses =
        Number(attendanceData.attended_classes);


    const attendancePercentage =
        totalClasses > 0
            ? (attendedClasses / totalClasses) * 100
            : 0;


    // ============================================
    // 3. Get assignment statistics
    // ============================================

    const assignmentResult = await pool.query(
        `
        SELECT
            COUNT(*) AS total_assignments,

            COUNT(*) FILTER (
                WHERE submitted_at IS NOT NULL
            ) AS submitted_assignments,

            COUNT(*) FILTER (
                WHERE submitted_at IS NULL
            ) AS pending_assignments,

            COALESCE(
                AVG(
                    CASE
                        WHEN max_score > 0
                        THEN (score / max_score) * 100
                    END
                ),
                0
            ) AS assignment_average

        FROM assignments
        WHERE student_id = $1
        `,
        [studentId]
    );


    const assignmentData =
        assignmentResult.rows[0];


    const totalAssignments =
        Number(assignmentData.total_assignments);

    const submittedAssignments =
        Number(assignmentData.submitted_assignments);

    const pendingAssignments =
        Number(assignmentData.pending_assignments);

    const assignmentAverage =
        Number(assignmentData.assignment_average);


    const completionRate =
        totalAssignments > 0
            ? (submittedAssignments / totalAssignments) * 100
            : 0;


    // ============================================
    // 4. Get examination history
    // ============================================

    const examResult = await pool.query(
        `
        SELECT
            score,
            max_score,
            exam_date
        FROM examinations
        WHERE student_id = $1
        ORDER BY exam_date ASC, created_at ASC
        `,
        [studentId]
    );


    const exams = examResult.rows;


   let examAverage = 0;
let previousScore = 0;
let scoreTrend = 0;

if (exams.length > 0) {

    // Convert every exam into percentage
    const examPercentages = exams.map(exam => {

        const maxScore = Number(exam.max_score);

        if (maxScore === 0) {
            return 0;
        }

        return (
            Number(exam.score) / maxScore
        ) * 100;
    });


    // ============================================
    // Average of ALL exams
    // ============================================

    examAverage =
        examPercentages.reduce(
            (sum, score) => sum + score,
            0
        ) / examPercentages.length;


    // ============================================
    // Previous exam + recent trend
    // ============================================

    if (examPercentages.length >= 2) {

        const latestScore =
            examPercentages[
                examPercentages.length - 1
            ];

        previousScore =
            examPercentages[
                examPercentages.length - 2
            ];

        scoreTrend =
            latestScore - previousScore;

    } else {

        previousScore = examPercentages[0];

        scoreTrend = 0;
    }
}

    // ============================================
    // 5. Build ML features
    // ============================================

    const features = {

        attendance_percentage:
            Number(attendancePercentage.toFixed(2)),

        assignment_average:
            Number(assignmentAverage.toFixed(2)),

        exam_average:
            Number(examAverage.toFixed(2)),

        previous_score:
            Number(previousScore.toFixed(2)),

        completion_rate:
            Number(completionRate.toFixed(2)),

        score_trend:
            Number(scoreTrend.toFixed(2)),

        pending_assignments:
            pendingAssignments
    };


    // ============================================
    // 6. Send features to FastAPI
    // ============================================

    const mlResponse = await axios.post(
        `${ML_SERVICE_URL}/predict`,
        features,
        {
            timeout: 5000
        }
    );


    const risk = mlResponse.data;
    const recommendations =
    generateAcademicRecommendations(
        features,
        risk
    );

    // ============================================
    // 7. Return complete intelligence
    // ============================================

    return {

        student: {
            id: student.id,
            name: student.name,
            email: student.email,
            rollNumber: student.roll_number,
            year: student.year,
            className: student.class_name,
            department: student.department
        },

        performance: {
            attendance: features.attendance_percentage,
            assignmentAverage: features.assignment_average,
            examAverage: features.exam_average,
            previousScore: features.previous_score,
            completionRate: features.completion_rate,
            scoreTrend: features.score_trend,
            pendingAssignments: features.pending_assignments
        },

        risk: {
            score: risk.risk_score,
            level: risk.risk_level
        },

        insights: recommendations.insights,

        recommendations: recommendations.recommendations

    };
}


module.exports = {
    getStudentIntelligence
};