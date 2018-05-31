require("./models/articles");
const Hapi = require("hapi");
const Pack = require("./package");
const HapiSwagger = require("hapi-swagger");
const Inert = require("inert");
const Vision = require("vision");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const articlesPlugin = require("./routes/articles");

mongoose.promise = global.Promise;

mongoose.connect("mongodb://localhost/wikiMyLight");
mongoose.set("debug", true);

const server = Hapi.server({
  host: "localhost",
  port: process.env.PORT || 3000
});

const swaggerOptions = {
  info: {
    title: "Wiki myLight",
    version: Pack.version
  }
};

async function start() {
  try {
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ]);
    await server.register(articlesPlugin);
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
}

start();
