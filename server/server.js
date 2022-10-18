const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//importing the profile route
const profileRoutes = require("./routers/profile");
const wcRoutes = require("./routers/wc");

app.use(cors());
app.use(express.json());

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;

//using the route
app.use("/profile", profileRoutes);
app.use("/wc", wcRoutes);

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db Connected"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
