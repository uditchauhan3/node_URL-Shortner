const express = require("express");
const {handleNewUrlGenerator,handleGetAnalytics}= require("../controllers/url")

const router = express.Router();

router.post("/",handleNewUrlGenerator);

router.get("/analytics/:shortId",handleGetAnalytics)

module.exports= router;
