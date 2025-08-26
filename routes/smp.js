const express = require("express");
const router = express.Router();

// 401 Unauthorized error
router.post("/smp/unauthorized/*", (req, res) => {
  res.status(401).send("Jwt is expired");
});

// 500 Internal Server Error
router.post("/smp/internal-error/*", (req, res) => {
  res.status(500).json({
    result: {
      status: "error",
      data: {
        traceId: "fd7df1d5-af24-4134-a52b-db1e236697d8", // can be randomized if needed
        message: "Internal Server Error",
        error: "error"
      }
    }
  });
});

module.exports = router;
