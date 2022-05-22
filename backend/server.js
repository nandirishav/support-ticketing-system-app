const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

//Connect to db
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Hello, Welcome to the Support desk api" });
});

//Routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
