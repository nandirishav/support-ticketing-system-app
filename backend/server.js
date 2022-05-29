const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const { path } = require("express/lib/application");

//Connect to db
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

//Serve frontend
if (process.env.NODE_ENV === "production") {
  //set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.json({ message: "Hello, Welcome to the Support desk api" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
