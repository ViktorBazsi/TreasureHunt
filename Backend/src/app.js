import express, { json } from "express";
import cors from "cors";
import { FRONTEND_URL } from "./constants/constants.js";
import errorHandler from "./middleware/error-handler.middleware.js";

// AUTH
import authRoutes from "./routes/auth.routes.js";
// ROUTES
import userRoutes from "./routes/user.routes.js";
import treasureRoutes from "./routes/treasure.route.js";
import companyRoutes from "./routes/company.routes.js";

const app = express();

app.use(cors({ origin: FRONTEND_URL }));

app.use(express.json());

// AUTHENTICATE
app.use("/auth", authRoutes);

// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/treasure", treasureRoutes);
app.use("/api/company", companyRoutes);

app.use(errorHandler);

app.use("/", (req, res) => {
  res.status(404).send("No Endpoint");
});

export default app;
