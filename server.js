"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

// connect express to mongoDB server
mongoose.connect("mongodb://127.0.0.1:27017/makeup", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //deperacation warning

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: String,
  imageUrl: String,
  description: String,
});

const productModel = mongoose.model("product", productSchema);

// Routes
app.get("/", homeHandler);
app.get("/productsapi", getProductsApiHandler);
app.get("/product", getProductHandler);
app.post("/addProduct", addProductHandler);

// Routes Handlers
function homeHandler(req, res) {
  res.send("Server is running");
}
async function getProductsApiHandler(req, res) {
  let productsapi = await axios.get("http://makeup-api.herokuapp.com/api/v1/products.json");
  res.status(200).send(productsapi.data);
}

async function addProductHandler(req, res) {
  console.log(req.body);
  const { name, brand, price, imageUrl, description } = req.body;

  let newProduct = await productModel.create({ name, brand, price, imageUrl, description });
  let allProducts = await productModel.find({});
  res.send(allProducts);
}

async function getProductHandler(req, res) {
  let products = await productModel.find({});
  res.send(products);
}

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
