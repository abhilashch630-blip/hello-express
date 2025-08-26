const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount route modules
app.use(require("./routes/stock"));
app.use(require("./routes/price"));
app.use(require("./routes/stockPrice"));
app.use(require("./routes/authError"));
app.use(require("./routes/smp"));

app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});
