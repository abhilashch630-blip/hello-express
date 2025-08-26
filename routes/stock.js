const express = require("express");
const router = express.Router();
const { buildSuccessPayload } = require("../services/payloadBuilder");

// Stock NOT_FOUND error but allow price if requested
router.post("/stock/*", (req, res) => {
  const { offeringIds = [], requestedInfo = [], nodeIds = [] } = req.body;

  let successData = {};

  // 👉 If "price" was requested, build only the price part
  if (requestedInfo.includes("price")) {
    successData = buildSuccessPayload(offeringIds, ["price"], nodeIds).result.data.success;
  }

  // If "stock" was requested, return NOT_FOUND error for stock
  const error = {};
  if (requestedInfo.includes("stock")) {
    error.stock = {
      error: { message: "NOT_FOUND", data: offeringIds },
    };
  }

  res.status(200).json({
    result: {
      status: "success",
      data: {
        success: successData,
        error: Object.keys(error).length ? error : null,
      },
    },
  });
});

module.exports = router;
