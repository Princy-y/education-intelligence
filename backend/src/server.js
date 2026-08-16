require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pool = require("./db/database");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        service: "Education Intelligence Backend",
        status: "running"
    });
});

app.get("/test-db", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT NOW() AS current_time"
        );

        res.json({
            database: "connected",
            time: result.rows[0].current_time
        });

    } catch (error) {

        console.error("Database connection failed:", error);

        res.status(500).json({
            database: "connection_failed",
            error: error.message
        });
    }
});

const studentRoutes = require("./routes/studentRoutes");
app.use(
    "/api/students",
    studentRoutes
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});