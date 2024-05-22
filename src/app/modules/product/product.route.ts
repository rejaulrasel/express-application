import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post("/", ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getSingleProduct);
router.delete("/:productId", ProductControllers.deleleSingleProduct);
router.put("/:productId", ProductControllers.updateSingleProduct);

export const StudentRoutes = router;
