import express from "express";
import dotenv from "dotenv";
// import registerRouter, loginRouter from "./routes"
import loginRouter from "./routes/loginRouter";
import registerRouter from "./routes/registerRouter";
import authorRoutes from "./routes/authorRoutes";
import bookRoutes from "./routes/bookRoutes";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "api is working",
  });
});

app.use("/auth/register", registerRouter);
app.use("/auth/login", loginRouter);

// author route
app.use("/author", authorRoutes);

// book routes
app.use("/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`sERVER IS RUNNING ${PORT}`);
});
