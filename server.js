const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// --- SUCCESS PAYLOAD ---
const successPayload = {
  "result": {
    "status": "success",
    "data": {
      "success": {
        "101289873": {
          "price": [
            {
              "sourceUpdatedAt": "2025-08-22T08:15:09.000Z",
              "priceType": "normal",
              "value": 45.5,
              "startDate": "2025-08-22 04:15:09",
              "endDate": null,
              "currencyCode": "CLP",
              "precision": 2,
              "isPublished": true,
              "priceGroup": "default"
            }
          ],
          "stock": {
            "d85518e8-9a32-4806-92ea-91b7d21dcd36": {
              "supply": 102,
              "allocatedDemand": 0,
              "reservedDemand": 0,
              "imsAtp": 102,
              "availableStock": 102,
              "isFby": false,
              "updated_at": "2025-08-22T08:15:10.013293Z"
            }
          }
        }
      },
      "error": null
    }
  },
  "status_code": 200
};

// --- ERROR PAYLOAD: Stock Only ---
const errorStockOnly = {
  "result": {
    "status": "success",
    "data": {
      "success": {
        "101289873": {
          "price": [
            {
              "sourceUpdatedAt": "2025-08-22T08:15:09.000Z",
              "priceType": "normal",
              "value": 45.5,
              "startDate": "2025-08-22 04:15:09",
              "endDate": null,
              "currencyCode": "CLP",
              "precision": 2,
              "isPublished": true,
              "priceGroup": "default"
            }
          ]
        }
      },
      "error": {
        "stock": {
          "error": {
            "message": "NOT_FOUND",
            "data": ["101234295", "101234270"]
          }
        },
        "price": null
      }
    }
  }
};

// --- ERROR PAYLOAD: Price Only ---
const errorPriceOnly = {
  "result": {
    "status": "success",
    "data": {
      "success": {
        "101289873": {
          "stock": {
            "d85518e8-9a32-4806-92ea-91b7d21dcd36": {
              "supply": 102,
              "allocatedDemand": 0,
              "reservedDemand": 0,
              "imsAtp": 102,
              "availableStock": 102,
              "isFby": false,
              "updated_at": "2025-08-22T08:15:10.013293Z"
            }
          }
        }
      },
      "error": {
        "stock": null,
        "price": {
          "error": {
            "message": "INTERNAL_SERVER_ERROR"
          }
        }
      }
    }
  }
};

// --- ERROR PAYLOAD: Both Stock + Price ---
const errorBoth = {
  "result": {
    "status": "success",
    "data": {
      "success": {},
      "error": {
        "stock": {
          "error": {
            "message": "NOT_FOUND",
            "data": ["101234295", "101234270", "101223631", "101135918p"]
          }
        },
        "price": {
          "error": {
            "message": "INTERNAL_SERVER_ERROR"
          }
        }
      }
    }
  }
};

// --- ROUTES ---
// Success
app.get("/stock-success", (req, res) => {
  res.status(200).json(successPayload);
});

// Error: stock only
app.get("/stock-error", (req, res) => {
  res.status(500).json(errorStockOnly);
});

// Error: price only
app.get("/price-error", (req, res) => {
  res.status(500).json(errorPriceOnly);
});

// Error: both stock + price
app.get("/both-error", (req, res) => {
  res.status(500).json(errorBoth);
});

app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});
