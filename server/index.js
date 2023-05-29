import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";

const port = process.env.PORT || 5000;

databaseConnection();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoute);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is ready");
  });
}


app.listen(port, () => console.log(`Server is running on port ${port}`));
