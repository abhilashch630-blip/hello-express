const express = require("express");
const router = express.Router();

// Simulated Unauthorized + RBAC error response
router.post("/auth-error/v1/products/master-data/list", (req, res) => {
  res.status(200).json({
    result: {
      status: "success",
      data: {
        success: {},
        error: {
          stock: {
            status: 401,
            statusText: "Unauthorized",
            data: {
              ErrorCode: "invalid_client",
              Error: "ClientId is Invalid"
            }
          },
          price: {
            error: "RBAC: access denied"
          }
        }
      }
    }
  });
});

module.exports = router;
