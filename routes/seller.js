const express = require("express");
const router = express.Router();

// Seller Bad Request error response
router.get("/seller/error", (req, res) => {
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
router.get("/seller/empty", (req, res) => {
  res.status(200).json({
    data: [],
  });
});

module.exports = router;
