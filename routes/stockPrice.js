const express = require("express");
const router = express.Router();

// ❌ Stock & Price errors
router.post(["/stockPrice/v1/products/master-data/list", "/stockPrice/v1/products/master-data/list/"], (req, res) => {
  const { offeringIds = [], requestedInfo = [] } = req.body;

  const error = {};
  if (!requestedInfo || requestedInfo.includes("stock")) {
    error.stock = { error: { message: "NOT_FOUND", data: offeringIds } };
  }
  if (!requestedInfo || requestedInfo.includes("price")) {
    error.price = { error: { message: "INTERNAL_SERVER_ERROR" } };
  }

  res.status(200).json({
    result: { status: "success", data: { success: {}, error } },
  });
});

// ❌ Stock & Price "Not Found"
router.post(["/stockPrice2/v1/products/master-data/list", "/stockPrice2/v1/products/master-data/list/"], (req, res) => {
  const { offeringIds = [], requestedInfo = [] } = req.body;

  const error = {};
  if (!requestedInfo || requestedInfo.includes("stock")) {
    error.stock = { error: { message: "NOT_FOUND", data: offeringIds } };
  }
  if (!requestedInfo || requestedInfo.includes("price")) {
    error.price = { error: { message: "Not Found", data: offeringIds } };
  }

  res.status(200).json({
    result: { status: "success", data: { success: {}, error } },
  });
});

module.exports = router;
