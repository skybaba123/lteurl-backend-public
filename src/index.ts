import "dotenv/config";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import requestIp from "request-ip";
import cron from "node-cron";

// import { nanoid } from "nanoid";
import { render } from "@react-email/render";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import linkRoutes from "./routes/link";
import clickRoutes from "./routes/click";
import planRoutes from "./routes/plan";
import companyRoutes from "./routes/company";
import paymentRoutes from "./routes/payment";

import frontenUrl from "./constants/fontendUrl";
import getDataCountHandler from "./controllers/getDataCounts";
import expireLinkByDuration from "./controllers/link/expireLinkByDuration";
import WelcomeEmail from "./email/WelcomeEmail";

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: [frontenUrl],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestIp.mw());

app.use(authRoutes);
app.use(userRoutes);
app.use(linkRoutes);
app.use(clickRoutes);
app.use(planRoutes);
app.use(companyRoutes);
app.use(paymentRoutes);

app.get("/", (req, res) => {
  const htmlEmail = render(
    WelcomeEmail({ userFirstname: "Ugobest", company: {} })
  );
  res.send(htmlEmail);
  console.log("Frontend Url v4:", frontenUrl);
});

app.get("/data-count", getDataCountHandler);

cron.schedule(
  "0 */6 * * *",
  () => {
    expireLinkByDuration();
  },
  { timezone: "Africa/Lagos" }
);

const server = http.createServer(app);

server.listen(port, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log(`Server running on http//localhost:${port}`);
    })
    .catch((error) => console.log(error));
});
