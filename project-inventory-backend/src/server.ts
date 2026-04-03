import express from "express";
import cors from "cors";
import helmet from "helmet";
import { configDotenv } from "dotenv";
import route from "./routes/index.routes";
import { globalErrorHandler } from "./middlewares/error.middleware";
import whatsappRoutes from "./routes/whats.routes";
import path from "path";

configDotenv();

const app = express();

const PORT = process.env.PORT! || 3001;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(process.cwd(), "public")));

app.use("/api/whatsapp", whatsappRoutes);
app.use("/api", route);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
