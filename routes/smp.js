const express = require("express");
const router = express.Router();

// 401 Unauthorized error
router.post("/smp/unauthorized/*", (req, res) => {
  res.status(401).send("Jwt is expired");
});

// 502 Bad Gateway
router.post("/smp/502/*", (req, res) => {
  res.status(502).send("Bad Gateway");
});

// 503 Service Unavailable
router.post("/smp/503/*", (req, res) => {
  res.status(503).send("Service Unavailable");
});

// 504 Gateway Timeout
router.post("/smp/504/*", (req, res) => {
  res.status(504).send("Gateway Timeout");
});

// 500 Internal Server Error
router.post("/smp/500/*", (req, res) => {
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
