function generateAcademicRecommendations(features, risk) {

    const insights = [];
    const recommendations = [];


    // ============================================
    // 1. Attendance analysis
    // ============================================

    if (features.attendance_percentage < 60) {

        insights.push(
            `Attendance is critically low at ${features.attendance_percentage}%.`
        );

        recommendations.push(
            "Increase attendance immediately and target at least 75%."
        );

    } else if (features.attendance_percentage < 75) {

        insights.push(
            `Attendance needs improvement at ${features.attendance_percentage}%.`
        );

        recommendations.push(
            "Improve attendance and maintain at least 75% participation."
        );

    } else {

        insights.push(
            `Attendance is healthy at ${features.attendance_percentage}%.`
        );
    }


    // ============================================
    // 2. Assignment performance
    // ============================================

    if (features.assignment_average < 50) {

        insights.push(
            `Assignment performance is weak at ${features.assignment_average}%.`
        );

        recommendations.push(
            "Focus on completing assignments and review weak topics."
        );

    } else if (features.assignment_average < 70) {

        insights.push(
            `Assignment performance is moderate at ${features.assignment_average}%.`
        );

        recommendations.push(
            "Improve assignment scores by reviewing mistakes before submission."
        );

    } else {

        insights.push(
            `Assignment performance is strong at ${features.assignment_average}%.`
        );
    }


    // ============================================
    // 3. Pending assignments
    // ============================================

    if (features.pending_assignments >= 2) {

        insights.push(
            `${features.pending_assignments} assignments are currently pending.`
        );

        recommendations.push(
            `Complete all ${features.pending_assignments} pending assignments as soon as possible.`
        );

    } else if (features.pending_assignments === 1) {

        insights.push(
            "One assignment is currently pending."
        );

        recommendations.push(
            "Complete the remaining pending assignment."
        );
    }


    // ============================================
    // 4. Examination performance
    // ============================================

    if (features.exam_average < 50) {

        insights.push(
            `Exam performance is critically low at ${features.exam_average}%.`
        );

        recommendations.push(
            "Prioritize exam preparation and revise fundamental concepts."
        );

    } else if (features.exam_average < 70) {

        insights.push(
            `Exam performance is moderate at ${features.exam_average}%.`
        );

        recommendations.push(
            "Increase exam preparation and practice more questions."
        );

    } else {

        insights.push(
            `Exam performance is strong at ${features.exam_average}%.`
        );
    }


    // ============================================
    // 5. Performance trend
    // ============================================

    if (features.score_trend <= -10) {

        insights.push(
            `Academic performance is declining significantly (${features.score_trend}).`
        );

        recommendations.push(
            "Identify the causes of the recent decline and focus on the weakest subjects."
        );

    } else if (features.score_trend < 0) {

        insights.push(
            `Academic performance is declining (${features.score_trend}).`
        );

        recommendations.push(
            "Monitor recent performance closely and increase study consistency."
        );

    } else if (features.score_trend > 5) {

        insights.push(
            `Academic performance is improving (+${features.score_trend}).`
        );

        recommendations.push(
            "Continue the current study strategy and maintain the positive trend."
        );
    }


    // ============================================
    // 6. Completion rate
    // ============================================

    if (features.completion_rate < 60) {

        insights.push(
            `Assignment completion rate is low at ${features.completion_rate}%.`
        );

        recommendations.push(
            "Create a weekly task schedule to improve assignment completion."
        );

    } else if (features.completion_rate < 80) {

        insights.push(
            `Assignment completion rate is ${features.completion_rate}%.`
        );

        recommendations.push(
            "Work toward completing at least 80% of assigned academic tasks."
        );
    }


    // ============================================
    // 7. Risk-specific recommendation
    // ============================================

    if (risk.risk_level === "HIGH") {

        recommendations.push(
            "Schedule an academic intervention with the teacher or mentor."
        );

    } else if (risk.risk_level === "MEDIUM") {

        recommendations.push(
            "Monitor performance regularly to prevent the risk level from increasing."
        );

    }


    return {
        insights,
        recommendations
    };
}


module.exports = {
    generateAcademicRecommendations
};