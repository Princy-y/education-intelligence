const express = require("express");

const {
    getIntelligence
} = require("../controllers/studentController");

const router = express.Router();


router.get(
    "/:id/intelligence",
    getIntelligence
);


module.exports = router;