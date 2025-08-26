const express = require("express");
const router = express.Router();

router.post("/auth-error/v1/products/master-data/list", (req, res) => {
  const { requestedInfo = [] } = req.body;

  // Only trigger this error when both "stock" and "price" are requested
  const hasStock = requestedInfo.includes("stock");
  const hasPrice = requestedInfo.includes("price");

  if (hasStock && hasPrice) {
    return res.status(200).json({
      result: {
        status: "success",
        data: {
          success: {},
          error: {
            stock: {
              status: 401,
              statusText: "Unauthorized",
              data: {
                ErrorCode: "invalid_client",
                Error: "ClientId is Invalid"
              }
            },
            price: {
              error: "RBAC: access denied"
            }
          }
        }
      }
    });
  }

  // Otherwise, just return an empty success
  return res.status(200).json({
    result: {
      status: "success",
      data: {
        success: {},
        error: null
      }
    }
  });
});

module.exports = router;
