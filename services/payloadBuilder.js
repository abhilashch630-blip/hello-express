function buildPriceBlock() {
  const priceData = [];

  // Normal price
  priceData.push({
    sourceUpdatedAt: new Date().toISOString(),
    priceType: "normal",
    value: parseFloat((Math.random() * 100).toFixed(2)),
    startDate: new Date().toISOString().replace("T", " ").split(".")[0],
    endDate: null,
    currencyCode: "CLP",
    precision: 2,
    isPublished: true,
    priceGroup: "default",
  });

  // Event price 50% chance
  if (Math.random() < 0.5) {
    const start = new Date();
    start.setDate(start.getDate() - 2);
    const end = new Date();

    priceData.push({
      sourceUpdatedAt: new Date().toISOString(),
      priceType: "event",
      value: parseFloat((Math.random() * 50 + 1).toFixed(2)),
      startDate: start.toISOString().replace("T", " ").split(".")[0],
      endDate: end.toISOString().replace("T", " ").split(".")[0],
      currencyCode: "CLP",
      precision: 2,
      isPublished: true,
      priceGroup: "event",
    });
  }

  return priceData;
}

function buildStockBlock(nodeIds) {
  const nodes = nodeIds && nodeIds.length ? nodeIds : ["default-node"];
  const stockData = {};

  nodes.forEach((node) => {
    stockData[node] = {
      supply: Math.floor(Math.random() * 200),
      allocatedDemand: 0,
      reservedDemand: 0,
      imsAtp: Math.floor(Math.random() * 200),
      availableStock: Math.floor(Math.random() * 200),
      isFby: false,
      updated_at: new Date().toISOString(),
    };
  });

  return stockData;
}

function buildSuccessPayload(offeringIds, requestedInfo, nodeIds) {
  const successData = {};

  offeringIds.forEach((id) => {
    successData[id] = {};

    if (!requestedInfo || requestedInfo.includes("price")) {
      successData[id].price = buildPriceBlock();
    }

    if (!requestedInfo || requestedInfo.includes("stock")) {
      successData[id].stock = buildStockBlock(nodeIds);
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

module.exports = { buildSuccessPayload };
