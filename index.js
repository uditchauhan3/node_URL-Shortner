const express = require("express");
const urlRouter = require("./routes/url");
const { connectToMongo } = require("./connection"); // Corrected function name
const app = express();
const PORT = 8001;

// Connect to MongoDB with the correct connection string format
connectToMongo("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.use("/url", urlRouter);

app.get("/:shortID",async (req, res)=>{
    const shortID =req.params.shortID;
   const entry= await URL.findOneAndUpdate({
        shortID,
    },{$push:{
        visitHistory: {timestamp:Date.now()},
    }})
    res.redirect(entry.redirectURL)
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
