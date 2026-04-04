import express from "express";
import cors from "cors";
import helmet from "helmet";
import { configDotenv } from "dotenv";
import route from "./routes/index.routes";
import { globalErrorHandler } from "./middlewares/error.middleware";
import path from "path";
import { createServer } from "http";

configDotenv();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT! || 3001;


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(process.cwd(), "public")));

app.use("/api", route);

app.use(globalErrorHandler);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
