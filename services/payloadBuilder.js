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

/**
 * Build warehouse info payload with nodeId = null
 */
function buildWarehouseInfo() {
  return {
    data: [
      {
        name: "testWareHouse19",
        sellerWarehouseId: "sellerTdrLiveFDC5610776",
        facilityId: "GSC-SC70AFDC5610776",
        warehouseType: "only_shipments",
        isFbf: false,
        isDefault: true,
        isPickupStore: false,
        isEnabled: true,
        address: {
          addressLine1: "Calle Mario Valdivia 1801",
          addressLine2: null,
          addressLine3: null,
          municipal: "Vitacura",
          city: "Santiago",
          state: "Metropolitana de Santiago",
          postcode: null,
          countryCode: "CL",
          email: "alartiga@inspiracorp.com.pe",
          name: "Angélica Lártiga",
          contacts: [
            {
              type: "Phone",
              value: "67867868",
              typeDescription: "Default warehouse phone number",
            },
          ],
          latitude: "-12.0755574",
          longitude: "-77.098199",
          cityCode: null,
          stateCode: null,
          country: "Chile",
          contactAddress2Code: "13132",
          phone: "67867868",
        },
        nodeId: null, // <-- as requested
        zoneAvailable: false,
        zoneUpdatedAt: "2022-06-23T06:01:04.639Z",
        workingSchedule: [
          {
            day: "monday",
            shiftHours: [
              { openingHour: "09:00 AM", closingHour: "06:00 PM" },
            ],
          },
          {
            day: "tuesday",
            shiftHours: [
              { openingHour: "09:00 AM", closingHour: "06:00 PM" },
            ],
          },
        ],
      },
    ],
    meta: {
      pagination: {
        recordsReturnedPerPage: 1,
        limit: 20,
        offset: 0,
        pageNumber: 1,
        totalPages: 1,
        totalRecords: 1,
      },
    },
    message: "Success",
  };
}

module.exports = { buildSuccessPayload, buildWarehouseInfo };
