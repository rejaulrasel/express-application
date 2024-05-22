import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/product/product.route";
import { OrderRoutes } from "./app/modules/order/order.route";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routers
app.use("/api/products", StudentRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Assalamualaikum!");
});

//not found route
app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
