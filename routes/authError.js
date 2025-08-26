const express = require("express");
const router = express.Router();

router.post("/auth-error/v1/products/master-data/list", (req, res) => {
  const { requestedInfo = [] } = req.body;

  const hasStock = requestedInfo.includes("stock");
  const hasPrice = requestedInfo.includes("price");

  const error = {};

  if (hasStock) {
    error.stock = {
      status: 401,
      statusText: "Unauthorized",
      data: {
        ErrorCode: "invalid_client",
        Error: "ClientId is Invalid"
      }
    };
  }

  if (hasPrice) {
    error.price = {
      error: "RBAC: access denied"
    };
  }

  return res.status(200).json({
    result: {
      status: "success",
      data: {
        success: {},
        error: Object.keys(error).length ? error : null
      }
    }
  });
});

module.exports = router;
