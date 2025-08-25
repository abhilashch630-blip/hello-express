const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parse JSON body

// Helper to build dynamic success payload
function buildSuccessPayload(offeringIds, requestedInfo, nodeIds) {
  const successData = {};

  offeringIds.forEach((id) => {
    successData[id] = {};

    if (!requestedInfo || requestedInfo.includes("price")) {
      successData[id].price = [
        {
          sourceUpdatedAt: new Date().toISOString(),
          priceType: "normal",
          value: parseFloat((Math.random() * 100).toFixed(2)),
          startDate: new Date().toISOString().replace("T", " ").split(".")[0],
          endDate: null,
          currencyCode: "CLP",
          precision: 2,
          isPublished: true,
          priceGroup: "default",
        },
      ];
    }

    if (!requestedInfo || requestedInfo.includes("stock")) {
      successData[id].stock = {};
      (nodeIds && nodeIds.length ? nodeIds : ["default-node"]).forEach((node) => {
        successData[id].stock[node] = {
          supply: Math.floor(Math.random() * 200),
          allocatedDemand: 0,
          reservedDemand: 0,
          imsAtp: Math.floor(Math.random() * 200),
          availableStock: Math.floor(Math.random() * 200),
          isFby: false,
          updated_at: new Date().toISOString(),
        };
      });
    }
  });

  return {
    result: {
      status: "success",
      data: {
        success: successData,
        error: null,
      },
    },
    status_code: 200,
  };
}

// --- ROUTES ---

// ✅ Success (dynamic with offeringIds)
app.post("/stock-success", (req, res) => {
  const { offeringIds = [], requestedInfo = [], nodeIds = [] } = req.body;
  res.status(200).json(buildSuccessPayload(offeringIds, requestedInfo, nodeIds));
});

// --- PRICE ENDPOINT ---
app.post("/price/v1/products/master-data/list", (req, res) => {
  const { offeringIds = [], requestedInfo = [] } = req.body;

  const response = {
    result: {
      status: "success",
      data: {
        success: {},
        error: {}
      }
    },
    status_code: 200
  };

  offeringIds.forEach((id) => {
    let successObj = {};
    let errorObj = {};

    if (requestedInfo.includes("price")) {
      // Always return INTERNAL_SERVER_ERROR for price
      errorObj.price = {
        error: {
          message: "INTERNAL_SERVER_ERROR"
        }
      };
    } else {
      // Price not requested → empty array
      successObj.price = [];
    }

    if (requestedInfo.includes("stock")) {
      // Stock requested → empty object (no error)
      successObj.stock = {};
    }

    if (Object.keys(successObj).length > 0) {
      response.result.data.success[id] = successObj;
    }

    if (Object.keys(errorObj).length > 0) {
      response.result.data.error[id] = errorObj;
    }
  });

  // Clean up empty values
  if (Object.keys(response.result.data.success).length === 0) {
    response.result.data.success = null;
  }
  if (Object.keys(response.result.data.error).length === 0) {
    response.result.data.error = null;
  }

  res.json(response);
});

// --- STOCK ENDPOINT ---
app.post("/stock/v1/products/master-data/list", (req, res) => {
  const { offeringIds = [], requestedInfo = [] } = req.body;

  const response = {
    result: {
      status: "success",
      data: {
        success: {},
        error: {}
      }
    },
    status_code: 200
  };

  offeringIds.forEach((id) => {
    let successObj = {};
    let errorObj = {};

    if (requestedInfo.includes("stock")) {
      // Always return NOT_FOUND for stock
      errorObj.stock = {
        error: {
          message: "NOT_FOUND",
          data: [id] // return the requested offeringId in error
        }
      };
    } else {
      // Stock not requested → empty object
      successObj.stock = {};
    }

    if (requestedInfo.includes("price")) {
      // Price requested → empty array (no error)
      successObj.price = [];
    }

    if (Object.keys(successObj).length > 0) {
      response.result.data.success[id] = successObj;
    }

    if (Object.keys(errorObj).length > 0) {
      response.result.data.error[id] = errorObj;
    }
  });

  // Clean up empty values
  if (Object.keys(response.result.data.success).length === 0) {
    response.result.data.success = null;
  }
  if (Object.keys(response.result.data.error).length === 0) {
    response.result.data.error = null;
  }

  res.json(response);
});

// ❌ Error: Both stock & price fail
app.post(["/stockPrice/v1/products/master-data/list", "/stockPrice/v1/products/master-data/list/"], (req, res) => {
  const { offeringIds = [] } = req.body;

  res.status(500).json({
    result: {
      status: "success",
      data: {
        success: {},
        error: {
          stock: {
            error: {
              message: "NOT_FOUND",
              data: offeringIds,
            },
          },
          price: {
            error: {
              message: "INTERNAL_SERVER_ERROR",
            },
          },
        },
      },
    },
  });
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});
