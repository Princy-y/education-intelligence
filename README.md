# EduIntel

## AI-Powered Academic Risk Intelligence & Early Intervention Platform

> **Predict academic risk early. Explain why. Recommend what to do next.**

EduIntel is an AI-powered academic intelligence platform designed to identify students who may be at risk of academic decline before the problem becomes critical.

The system analyzes multiple academic indicators including attendance, assignment performance, examination performance, completion rate, previous performance, performance trends, and pending assignments.

Instead of only displaying academic data, EduIntel transforms it into:

**Risk Prediction → Explainable Insights → Actionable Recommendations → Early Intervention**

---

## Problem

Academic institutions often identify struggling students only after their academic performance has already declined significantly.

Traditional academic systems primarily display historical information such as:

- Attendance
- Assignment marks
- Examination scores
- Academic records

However, they often do not answer the most important questions:

1. **Who is at risk?**
2. **Why are they at risk?**
3. **What should the institution do next?**

EduIntel addresses this gap through an AI-driven early-warning and intervention system.

---

## Solution

EduIntel combines academic data, machine learning, explainability, and recommendation logic into a single platform.

```text
Academic Data
      |
      v
Feature Engineering
      |
      v
ML Risk Prediction
      |
      v
Risk Score
      |
      v
LOW / MEDIUM / HIGH
      |
      v
Explainable Risk Factors
      |
      v
Personalized Recommendations
      |
      v
Early Academic Intervention
```

The system is designed around three core questions:

### WHO?

Which students are showing signs of academic risk?

### WHY?

Which academic indicators are contributing to that risk?

### WHAT NEXT?

What actions can teachers or mentors take to support the student?

---

## Key Features

### 1. AI-Based Academic Risk Prediction

The system predicts academic risk using multiple academic indicators:

- Attendance percentage
- Assignment average
- Examination average
- Previous academic score
- Assignment completion rate
- Recent score trend
- Pending assignments

The ML system produces:

```text
Risk Score
+
Risk Level
```

Risk levels:

| Risk Level | Meaning                                                |
| ---------- | ------------------------------------------------------ |
| 🟢 LOW     | Student is currently performing within a healthy range |
| 🟡 MEDIUM  | Student requires monitoring and support                |
| 🔴 HIGH    | Student requires timely intervention                   |

---

### 2. Explainable Academic Intelligence

EduIntel does not stop at predicting a risk level.

The system identifies meaningful academic indicators such as:

- Low attendance
- Weak assignment performance
- Poor examination performance
- Low completion rate
- Pending assignments
- Negative performance trends

This allows educators to understand **why a student is considered at risk**.

Example:

```text
Risk Level: HIGH

Attendance:          53.33%
Assignment Average: 45%
Exam Average:       52%
Completion Rate:    60%
Score Trend:        -10
Pending Assignments: 2
```

---

### 3. Personalized Recommendations

The identified risk factors are converted into actionable recommendations.

Examples:

- Improve attendance
- Complete pending assignments
- Schedule mentor intervention
- Review weak academic areas
- Monitor declining performance
- Maintain the current study strategy when performance is healthy

This creates the workflow:

```text
Predict
   |
   v
Explain
   |
   v
Recommend
   |
   v
Intervene
```

---

## System Architecture

```text
                    +----------------------+
                    |      Next.js UI      |
                    |      Frontend        |
                    +----------+-----------+
                               |
                               | HTTP / REST
                               v
                    +----------------------+
                    |   Node.js + Express  |
                    |      Backend API     |
                    +----------+-----------+
                               |
                 +-------------+-------------+
                 |                           |
                 v                           v
       +-------------------+       +-------------------+
       | PostgreSQL /      |       | FastAPI ML        |
       | Supabase          |       | Prediction API    |
       +-------------------+       +---------+---------+
                                             |
                                             v
                                   +-------------------+
                                   | Academic Risk     |
                                   | ML Model          |
                                   +-------------------+
```

---

## End-to-End Data Flow

```text
Teacher selects a student
          |
          v
Next.js Frontend
          |
          v
GET /api/students/:id/intelligence
          |
          v
Node.js / Express
          |
          v
PostgreSQL
          |
          v
Academic Feature Aggregation
          |
          v
FastAPI ML Service
          |
          v
Risk Prediction
          |
          v
Explainable Insights
          |
          v
Recommendation Engine
          |
          v
JSON Response
          |
          v
Interactive Intelligence Dashboard
```

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- Reusable UI components

### Backend

- Node.js
- Express.js
- PostgreSQL
- REST APIs

### Machine Learning

- Python
- FastAPI
- scikit-learn
- pandas
- NumPy
- Joblib

### Development

- Git
- GitHub
- npm
- Python virtual environment

---

## Machine Learning

### Input Features

The model uses the following academic features:

| Feature                 | Description                           |
| ------------------------ | -------------------------------------- |
| `attendance_percentage` | Percentage of attended classes        |
| `assignment_average`    | Average assignment performance        |
| `exam_average`          | Average examination performance       |
| `previous_score`        | Previous academic performance         |
| `completion_rate`       | Percentage of completed assignments   |
| `score_trend`           | Recent academic performance direction |
| `pending_assignments`   | Number of incomplete assignments      |

---

### Risk Modeling

The training pipeline creates an underlying academic risk signal from multiple academic indicators.

Higher values represent greater academic risk.

The resulting distribution is divided into three categories:

```text
LOW
MEDIUM
HIGH
```

The classification thresholds are derived from the distribution of the generated risk scores.

The current prototype uses synthetic academic data to avoid exposing real student information.

The architecture is designed so that anonymized institutional data can later replace the prototype dataset.

---

## Model Evaluation

Multiple machine learning approaches were evaluated.

### Classification Models

- Logistic Regression
- Decision Tree
- Random Forest
- Gradient Boosting

Example evaluation:

| Model               | Accuracy | Precision | Recall |    F1 |
| -------------------- | --------: | ---------: | ------: | -----: |
| Logistic Regression |    0.658 |     0.664 |  0.658 | 0.660 |
| Gradient Boosting   |    0.635 |     0.634 |  0.635 | 0.635 |
| Random Forest       |    0.629 |     0.630 |  0.629 | 0.630 |
| Decision Tree       |    0.548 |     0.559 |  0.548 | 0.552 |

---

### Risk Score Regression

Regression models were also evaluated for continuous risk-score prediction.

| Model                |  MAE | RMSE |    R² |
| --------------------- | ----: | ----: | -----: |
| Linear Regression    | 6.63 | 8.28 | 0.678 |
| Gradient Boosting    | 6.95 | 8.64 | 0.649 |
| HistGradientBoosting | 7.06 | 8.79 | 0.637 |
| Extra Trees          | 7.12 | 8.87 | 0.630 |
| Random Forest        | 7.29 | 9.04 | 0.616 |

The model selection process is based on measured performance rather than assuming a single algorithm is always optimal.

---

## Explainability

EduIntel combines model output with academic indicators to generate understandable explanations.

Example:

```text
HIGH RISK

Why?

- Attendance is critically low
- Assignment performance is weak
- Examination performance requires improvement
- Multiple assignments are pending
- Recent performance is declining

Recommended Actions

1. Improve attendance
2. Complete pending assignments
3. Schedule mentor intervention
4. Review weak academic areas
```

The objective is to make predictions **interpretable and actionable** rather than presenting an unexplained classification.

---

## Backend API

### Student Intelligence

```http
GET /api/students/:id/intelligence
```

Example:

```text
GET /api/students/44444444-4444-4444-4444-444444444441/intelligence
```

Response structure:

```json
{
  "student": {
    "id": "...",
    "name": "...",
    "email": "...",
    "rollNumber": "...",
    "year": 3,
    "className": "...",
    "department": "..."
  },
  "performance": {
    "attendance": 92,
    "assignmentAverage": 89.8,
    "examAverage": 77.33,
    "previousScore": 78,
    "completionRate": 100,
    "scoreTrend": 8,
    "pendingAssignments": 0
  },
  "risk": {
    "score": 23.57,
    "level": "LOW"
  },
  "insights": [],
  "recommendations": []
}
```

---

## Project Structure

```text
education-intelligence/
|
+-- frontend/
|   +-- app/
|   +-- components/
|   +-- lib/
|   +-- public/
|   +-- package.json
|   +-- next.config.mjs
|   +-- tsconfig.json
|
+-- backend/
|   +-- src/
|       +-- controllers/
|       |   +-- studentController.js
|       |
|       +-- routes/
|       |   +-- studentRoutes.js
|       |
|       +-- services/
|       |   +-- studentIntelligenceService.js
|       |   +-- academicRecommendationService.js
|       |
|       +-- db/
|       |   +-- database.js
|       |
|       +-- server.js
|   +-- package.json
|
+-- ml-service/
|   +-- api/
|   |   +-- main.py
|   |
|   +-- model/
|       +-- academic_risk_model.pkl
|       +-- model_metadata.pkl
|
+-- database/
|
+-- .gitignore
+-- README.md
```

---

## Running the Project

The project consists of three services:

```text
Frontend   -> 3000
Backend    -> 5000
ML Service -> 8001
```

---

### 1. Start the ML Service

```bash
cd ml-service
```

Activate the Python environment:

**Windows**

```bash
venv\Scripts\activate
```

Start FastAPI:

```bash
uvicorn api.main:app --reload --port 8001
```

ML service:

```text
http://localhost:8001
```

---

### 2. Start the Backend

Open another terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Backend:

```text
http://localhost:5000
```

---

### 3. Start the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start Next.js:

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

## Privacy & Responsible AI

Academic information is sensitive.

The current prototype uses **synthetic academic data** for model development and demonstration.

No real student academic records are required for the prototype.

For production deployment, the platform should incorporate:

- Data anonymization
- Role-based access control
- Secure authentication
- Encryption
- Audit logging
- Model monitoring
- Bias and fairness evaluation
- Human oversight

EduIntel is intended to **support educators**, not automatically make high-impact decisions about students.

---

## Future Scope

The platform can be extended with:

- Real-time institutional data integration
- Automated student onboarding
- Subject-level risk prediction
- Longitudinal performance forecasting
- Advanced model explainability
- Intervention outcome tracking
- Mentor assignment
- Notification workflows
- Institutional analytics
- Model monitoring and retraining
- Privacy-preserving machine learning

---

## Core Value Proposition

Traditional academic systems answer:

> **"How did the student perform?"**

EduIntel aims to answer:

> **"Who needs help, why do they need help, and what should we do next?"**

```text
                 EDUINTEL

                  PREDICT
                     |
                     v
                  EXPLAIN
                     |
                     v
                RECOMMEND
                     |
                     v
                 INTERVENE
                     |
                     v
                  IMPROVE
```

---

## Project Status

**Hackathon MVP / Prototype**

EduIntel currently demonstrates a complete end-to-end academic intelligence pipeline:

```text
Database
   |
   v
Backend API
   |
   v
Feature Engineering
   |
   v
Machine Learning
   |
   v
Risk Prediction
   |
   v
Explainability
   |
   v
Recommendations
   |
   v
Interactive Frontend
```

---

## License

This project is developed for educational and hackathon purposes.
