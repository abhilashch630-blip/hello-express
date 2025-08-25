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

// ❌ Error: Stock NOT_FOUND, still return price
app.post(
  ["/stock/v1/products/master-data/list", "/stock/v1/products/master-data/list/"],
  (req, res) => {
    const { offeringIds = [] } = req.body;

    const successData = {};
    offeringIds.forEach((id) => {
      successData[id] = {
        price: [
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
        ],
      };
    });

    res.status(500).json({
      result: {
        status: "success",
        data: {
          success: successData,
          error: {
            stock: {
              error: {
                message: "NOT_FOUND",
                data: offeringIds,
              },
            },
          },
        },
      },
    });
  }
);

// ❌ Error: Price INTERNAL_SERVER_ERROR, still return stock
app.post(["/price/v1/products/master-data/list", "/price/v1/products/master-data/list/"], (req, res) => {
  const { offeringIds = [], nodeIds = [] } = req.body;

  const stockSuccess = {};
  offeringIds.forEach((id) => {
    stockSuccess[id] = {
      stock: {},
    };
    (nodeIds && nodeIds.length ? nodeIds : ["default-node"]).forEach((node) => {
      stockSuccess[id].stock[node] = {
        supply: Math.floor(Math.random() * 200),
        allocatedDemand: 0,
        reservedDemand: 0,
        imsAtp: Math.floor(Math.random() * 200),
        availableStock: Math.floor(Math.random() * 200),
        isFby: false,
        updated_at: new Date().toISOString(),
      };
    });
  });

  res.status(500).json({
    result: {
      status: "success",
      data: {
        success: stockSuccess,
        error: {
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
