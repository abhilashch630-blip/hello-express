const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const responsePayload = {
  "result": {
    "status": "success",
    "data": {
      "success": {},
      "error": {
        "stock": {
          "error": {
            "message": "NOT_FOUND",
            "data": [
              "101234295",
              "101234270",
              "101223631",
              "101135918p"
            ]
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

// ✅ 200 OK response
app.get("/stock", (req, res) => {
  res.status(200).json(responsePayload);
});

// ❌ 500 Error response
app.get("/stock-error", (req, res) => {
  res.status(500).json(responsePayload);
});

app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});
