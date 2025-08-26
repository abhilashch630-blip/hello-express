const express = require("express");
const router = express.Router();

// 401 Unauthorized error
router.post("/smp/unauthorized/v1/products/master-data/list", (req, res) => {
  res.status(401).json({
    result: {
      status: "error",
      data: {
        status: 401,
        statusText: "Unauthorized",
        message: "ClientId is Invalid",
        error: "invalid_client"
      }
    }
  });
});

// 500 Internal Server Error
router.post("/smp/internal-error/v1/products/master-data/list", (req, res) => {
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
