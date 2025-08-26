const express = require("express");
const router = express.Router();
const { buildSuccessPayload } = require("../services/payloadBuilder");

// ✅ Success endpoint
router.post("/stock-success", (req, res) => {
  const { offeringIds = [], requestedInfo = [], nodeIds = [] } = req.body;
  res.status(200).json(buildSuccessPayload(offeringIds, requestedInfo, nodeIds));
});

// ❌ Stock NOT_FOUND error
router.post("/stock/v1/products/master-data/list",
  (req, res) => {
    const { offeringIds = [], requestedInfo = [] } = req.body;

    const error = {};
    if (!requestedInfo || requestedInfo.includes("stock")) {
      error.stock = {
        error: { message: "NOT_FOUND", data: offeringIds },
      };
    }

    res.status(200).json({
      result: {
        status: "success",
        data: {
          success: {},
          error: Object.keys(error).length ? error : null,
        },
      },
    });
  }
);

module.exports = router;
