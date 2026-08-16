from fastapi import FastAPI
from pydantic import BaseModel, Field
import joblib
import numpy as np
from pathlib import Path


app = FastAPI(
    title="Academic Intelligence ML API",
    version="1.0.0"
)


# ============================================
# Load trained model
# ============================================

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "model"

model = joblib.load(
    MODEL_DIR / "academic_risk_model.pkl"
)

metadata = joblib.load(
    MODEL_DIR / "model_metadata.pkl"
)


# ============================================
# Input schema
# ============================================

class AcademicFeatures(BaseModel):

    attendance_percentage: float = Field(
        ge=0,
        le=100
    )

    assignment_average: float = Field(
        ge=0,
        le=100
    )

    exam_average: float = Field(
        ge=0,
        le=100
    )

    previous_score: float = Field(
        ge=0,
        le=100
    )

    completion_rate: float = Field(
        ge=0,
        le=100
    )

    score_trend: float = Field(
        ge=-100,
        le=100
    )

    pending_assignments: int = Field(
        ge=0,
        le=100
    )


# ============================================
# Health check
# ============================================

@app.get("/")
def root():

    return {
        "service": "Academic Intelligence ML API",
        "status": "running"
    }


# ============================================
# Prediction endpoint
# ============================================

@app.post("/predict")
def predict_risk(data: AcademicFeatures):

    features = [
        data.attendance_percentage,
        data.assignment_average,
        data.exam_average,
        data.previous_score,
        data.completion_rate,
        data.score_trend,
        data.pending_assignments
    ]

    input_data = np.array([features])

    predicted_risk = model.predict(input_data)[0]

    # Keep score within 0–100
    predicted_risk = float(
        np.clip(predicted_risk, 0, 100)
    )

    low_threshold = metadata["risk_thresholds"]["low_max"]
    high_threshold = metadata["risk_thresholds"]["medium_max"]

    if predicted_risk <= low_threshold:

        risk_level = "LOW"

    elif predicted_risk <= high_threshold:

        risk_level = "MEDIUM"

    else:

        risk_level = "HIGH"


    return {
        "risk_score": round(predicted_risk, 2),
        "risk_level": risk_level
    }