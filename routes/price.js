const express = require("express");
const router = express.Router();
const { buildSuccessPayload } = require("../services/payloadBuilder");

// Price INTERNAL_SERVER_ERROR
router.post(
  "/price/server/*",
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

// Price Not Found first format
router.post(
  "/price/404/*",
  (req, res) => {
  const { offeringIds = [], requestedInfo = [], nodeIds = [] } = req.body;

  let successData = {};

// Only build stock data if "stock" is explicitly requested
 if (requestedInfo.includes("stock")) {
      successData = buildSuccessPayload(offeringIds, ["stock"], nodeIds).result.data.success;
    }
  const error = (!requestedInfo || requestedInfo.includes("price")) 
    ? { price: {status:404 ,statusText: "Not Found",data: "", offeringIds: offeringIds  } }
    : null;

  res.status(200).json({
    result: {
      status: "success",
      data: { success: successData, error },
    },
  });
});

// Price Not Found 2nd format
router.post(
  "/price/notFound/*",
  (req, res) => {
  const { offeringIds = [], requestedInfo = [], nodeIds = [] } = req.body;

  let successData = {};

// Only build stock data if "stock" is explicitly requested
 if (requestedInfo.includes("stock")) {
      successData = buildSuccessPayload(offeringIds, ["stock"], nodeIds).result.data.success;
    }
  const error = {};
  if (requestedInfo.includes("price")) {
    error.price = {
      error: { message: "NOT_FOUND", data: offeringIds },
    };
  }
  res.status(200).json({
    result: {
      status: "success",
      data: { success: successData, error },
    },
  });
});

// Price authError
router.post(
  "/price/authError/*",
  (req, res) => {
  const { offeringIds = [], requestedInfo = [], nodeIds = [] } = req.body;

  let successData = {};

// Only build stock data if "stock" is explicitly requested
 if (requestedInfo.includes("stock")) {
      successData = buildSuccessPayload(offeringIds, ["stock"], nodeIds).result.data.success;
    };

 const hasPrice = requestedInfo.includes("price");
  const error = hasPrice
    ? { price: { error: "RBAC: access denied" } }
    : null;
    
  res.status(200).json({
    result: {
      status: "success",
      data: { success: successData, error },
    },
  });
});

module.exports = router;
