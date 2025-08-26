const express = require("express");
const router = express.Router();
const { buildSuccessPayload } = require("../services/payloadBuilder");

// Price INTERNAL_SERVER_ERROR
router.post(
  "/price/*",
  (req, res) => {
    const { offeringIds = [], requestedInfo = [], nodeIds = [] } = req.body;

    let successData = {};

    // Only build stock data if "stock" is explicitly requested
    if (requestedInfo.includes("stock")) {
      successData = buildSuccessPayload(offeringIds, ["stock"], nodeIds).result.data.success;
    }

    // Always simulate price error if price is requested
    const error = requestedInfo.includes("price")
      ? { price: { error: { message: "INTERNAL_SERVER_ERROR" } } }
      : null;

    res.status(200).json({
      result: {
        status: "success",
        data: { success: successData, error },
      },
    });
  }
);

// Price Not Found
router.post(
  "/price2/*",
  (req, res) => {
  const { offeringIds = [], requestedInfo = [], nodeIds = [] } = req.body;

  let successData = {};

// Only build stock data if "stock" is explicitly requested
 if (requestedInfo.includes("stock")) {
      successData = buildSuccessPayload(offeringIds, ["stock"], nodeIds).result.data.success;
    }
  const error = (!requestedInfo || requestedInfo.includes("price")) 
    ? { price: {status:404 ,statusText: "Not Found",dara: "", offeringIds: offeringIds  } }
    : null;

  res.status(200).json({
    result: {
      status: "success",
      data: { success: successData, error },
    },
  });
});

module.exports = router;
