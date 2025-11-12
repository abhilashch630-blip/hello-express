const express = require("express");
const router = express.Router();
const { buildWarehouseInfo } = require("../services/payloadBuilder");

// Seller Bad Request error response
router.get("/seller/error*", (req, res) => {
  res.status(400).json({
    errors: [
      {
        code: "Bad Request",
        status: 400,
        title: {
          en: "Invalid sellerId SCD6C08 for tenant 93d861ee-27b3-4ef7-91af-ad8ece7a8be0",
          es: "SellerId SCD6C08 no válido para el inquilino 93d861ee-27b3-4ef7-91af-ad8ece7a8be0",
        },
      },
    ],
  });
});

// Seller empty data response
router.get("/seller/emptyResponse*", (req, res) => {
  res.status(200).json({
    data: [],
  });
});

// Seller warehouse info response
router.get("/seller/nullNodeid*", (req, res) => {
  const warehouseResponse = buildWarehouseInfo();
  res.status(200).json(warehouseResponse);
});

router.get("/seller/emptyNodeid*", (req, res) => {
  const warehouseResponse = buildWarehouseInfo();

  // Overwrite nodeId with empty string
  if (warehouseResponse?.data?.length) {
    warehouseResponse.data.forEach((item) => {
      item.nodeId = "";
    });
  }

  res.status(200).json(warehouseResponse);
});

module.exports = router;
