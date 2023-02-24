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

// Routes Handlers
function homeHandler(req, res) {
  res.send("Server is running");
}
async function getProductsApiHandler(req, res) {
    let productsapi = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
    res.status(200).send(productsapi.data);
}

async function getProductHandler(req, res) {
  let products = await productModel.find({});
  res.send(products);
}

function seedProductsCollection() {
  const bronzer = new productModel({
    name: "Maybelline Facestudio Master Contour Kit",
    brand: "maybelline",
    price: "15.99",
    imageUrl: "https://d3t32hsnjxo7q6.cloudfront.net/i/4f731de249cbd4cb819ea7f5f4cfb5c3_ra,w158,h184_pa,w158,h184.png",
    description:
      "Maybelline Facestudio Master Contour Kit is the ultimate on the go all-in-one palette, with contouring brush included.  Define and highlight in a New York minute with this effortless 3-step face contouring kit.  This easy-to-use 3-step face contouring kit features a bronzer, blush and highlighter.",
  });
  const blush = new productModel({
    name: "Maybelline Facestudio Master Blush",
    brand: "maybelline",
    price: "9.99",
    imageUrl: "https://d3t32hsnjxo7q6.cloudfront.net/i/4f731de249cbd4cb819ea7f5f4cfb5c3_ra,w158,h184_pa,w158,h184.png",
    description:
      "Maybelline Facestudio Master Blush is the ultimate on the go all-in-one palette, with contouring brush included.  Define and highlight in a New York minute with this effortless 3-step face contouring kit.  This easy-to-use 3-step face contouring kit features a bronzer, blush and highlighter.",
  });
  const highlighter = new productModel({
    name: "Maybelline Facestudio Master Highlight",
    brand: "maybelline",
    price: "9.99",
    imageUrl: "https://d3t32hsnjxo7q6.cloudfront.net/i/4f731de249cbd4cb819ea7f5f4cfb5c3_ra,w158,h184_pa,w158,h184.png",
    description:
      "Maybelline Facestudio Master Highlight is the ultimate on the go all-in-one palette, with contouring brush included.  Define and highlight in a New York minute with this effortless 3-step face contouring kit.  This easy-to-use 3-step face contouring kit features a bronzer, blush and highlighter.",
  });

  bronzer.save();
  blush.save();
  highlighter.save();
}

// seedProductsCollection();

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
