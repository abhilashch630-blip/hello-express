const express = require("express");
const router = express.Router();

// Stock & Price "Not Found"
router.post("/priceStock/*",
  (req, res) => {
  const { offeringIds = [], requestedInfo = [] } = req.body;

  const error = {};
  if (!requestedInfo || requestedInfo.includes("stock")) {
    error.stock = { error: { message: "NOT_FOUND", data: offeringIds } };
  }
  if (!requestedInfo || requestedInfo.includes("price")) {
    error.price = { status:404 ,statusText: "Not Found",dara: "", offeringIds: offeringIds };
  }

  res.status(200).json({
    result: { status: "success", data: { success: {}, error } },
  });
});

module.exports = router;
