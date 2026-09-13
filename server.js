const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const prices = {
  "Headphones": {
    "Binglee": 100,
    "DXC Electronics": 110,
    "Bobay": 105
  },
  "Laptop": {
    "GH Computers": 800,
    "Tech city": 820,
    "Ez PC": 810
  },
  "Mouse": {
    "DXC Electronics": 20,
    "Tech City": 22
  },
  "Printer": {
    "Binglee": 150,
    "DXC Electronics": 160,
    "Bobay": 155,
    "GH Computers": 165
  }
};

app.get("/", (req, res) => {
  res.json({
    message: "Dealer Pricing Microservice is running"
  });
});

app.get("/price/:dealer/:product", (req, res) => {
  const { dealer, product } = req.params;

  if (
    !prices[product] ||
    prices[product][dealer] === undefined
  ) {
    return res.status(404).json({
      error: "Price not found"
    });
  }

  res.json({
    message: prices[product][dealer]
  });
});

app.get("/allprice/:product", (req, res) => {
  const productPrices = prices[req.params.product];

  if (!productPrices) {
    return res.status(404).json({
      error: "Product not found"
    });
  }

  const result = Object.entries(productPrices).map(([key, value]) => ({
    key,
    value
  }));

  res.json({
    prices: result
  });
});

app.listen(8080, "0.0.0.0", () => {
  console.log("Dealer Pricing Microservice running on port 8080");
});
