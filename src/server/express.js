const express = require("express");
const serverless = require("serverless-http");

//routers
const { aboutRouter, userRouter } = require("./Router/routers");

console.log(aboutRouter);
console.log(userRouter);

const app = express();

//middleware
app.use("/.netlify/functions/express/about/", aboutRouter);
app.use("/.netlify/functions/express/users/", userRouter);
app.use(express.json());

app.get("/.netlify/functions/express", (req, res) => {
  const { name = "..." } = req.query;
  res.json({ name, id: Math.floor(Math.random() * 9999) });
});

module.exports.handler = serverless(app);
