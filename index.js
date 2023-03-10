const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express());

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.uhbaknf.mongodb.net/?retryWrites=true&w=majority`;

// create client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// connect with database
const dbConnect = () => {
  try {
    client.connect();
  } catch (error) {
    console.error(error);
  }
};
dbConnect();

// create database and collections
const serviceCollection = client.db("eyeCare").collection("services");
const productsCollection = client.db("eyeCare").collection("products");
const doctorsCollection = client.db("eyeCare").collection("doctors");

app.get("/services", async (req, res) => {
  try {
    const query = {};
    const services = await serviceCollection.find(query).toArray();
    res.send(services);
  } catch (error) {
    console.error(error);
  }
});
app.get("/services/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const service = await serviceCollection.findOne(query);
    res.send(service);
  } catch (error) {
    console.log(error);
  }
});

app.get("/allServices", async (req, res) => {
  try {
    const query = {};
    const services = await serviceCollection.find(query).toArray();
    res.send(services);
  } catch (error) {
    console.error(error);
  }
});
app.get("/products", async (req, res) => {
  try {
    const query = {};
    const products = await productsCollection.find(query).toArray();
    res.send(products);
  } catch (error) {
    console.error(error);
  }
});
app.get("/doctors", async (req, res) => {
  try {
    const query = {};
    const doctors = await doctorsCollection.find(query).toArray();
    res.send(doctors);
  } catch (error) {
    console.error(error);
  }
});

app.get("/", (req, res) => {
  res.send("Eye care server is running");
});

// root api
app.listen(port, () => {
  console.log("Server is running on port", port);
});
