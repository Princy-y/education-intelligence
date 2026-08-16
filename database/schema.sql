CREATE EXTENSION IF NOT EXISTS pgcrypto;

--users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    role VARCHAR(20) NOT NULL
        CHECK (role IN ('STUDENT', 'TEACHER', 'ADMIN')),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--Classes
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL,

    department VARCHAR(100) NOT NULL,

    academic_year VARCHAR(20) NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--students
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID UNIQUE NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    class_id UUID
        REFERENCES classes(id) ON DELETE SET NULL,

    roll_number VARCHAR(50) UNIQUE NOT NULL,

    year INTEGER NOT NULL
        CHECK (year BETWEEN 1 AND 5),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--subjects
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(100) NOT NULL,

    code VARCHAR(30) UNIQUE NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--Teacher ↔ Subject
CREATE TABLE teacher_subjects (
    teacher_id UUID NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,

    subject_id UUID NOT NULL
        REFERENCES subjects(id) ON DELETE CASCADE,

    PRIMARY KEY (teacher_id, subject_id)
);

--attendance
CREATE TABLE attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_id UUID NOT NULL
        REFERENCES students(id) ON DELETE CASCADE,

    subject_id UUID NOT NULL
        REFERENCES subjects(id) ON DELETE CASCADE,

    total_classes INTEGER NOT NULL
        CHECK (total_classes >= 0),

    attended_classes INTEGER NOT NULL
        CHECK (
            attended_classes >= 0
            AND attended_classes <= total_classes
        ),

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(student_id, subject_id)
);

--assignments
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_id UUID NOT NULL
        REFERENCES students(id) ON DELETE CASCADE,

    subject_id UUID NOT NULL
        REFERENCES subjects(id) ON DELETE CASCADE,

    title VARCHAR(200) NOT NULL,

    score DECIMAL(5,2),

    max_score DECIMAL(5,2) NOT NULL,

    status VARCHAR(20) NOT NULL
        CHECK (
            status IN ('PENDING', 'SUBMITTED', 'GRADED')
        ),

    due_date DATE,

    submitted_at TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--examinations
CREATE TABLE examinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    student_id UUID NOT NULL
        REFERENCES students(id) ON DELETE CASCADE,

    subject_id UUID NOT NULL
        REFERENCES subjects(id) ON DELETE CASCADE,

    exam_name VARCHAR(100) NOT NULL,

    score DECIMAL(5,2) NOT NULL,

    max_score DECIMAL(5,2) NOT NULL,

    exam_date DATE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

