const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("Backend running");
});

// routes
app.use("/api/resources", require("./routes/resourceRoutes"));
app.use("/api/referrals", require("./routes/referralRoutes"));
app.use("/api/experiences", require("./routes/experienceRoutes"));

// db + server start
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log(err));
