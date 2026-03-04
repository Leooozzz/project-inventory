import express from "express";
import cors from "cors";
import helmet from "helmet";
import { configDotenv } from "dotenv";
import route from "./routes";


configDotenv();

const app = express();

const PORT = process.env.PORT!;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", route);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});