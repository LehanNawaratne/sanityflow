import { Router } from "express";
import { lookupBarcodeController } from "../controllers/barcode.controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/:barcode", auth, lookupBarcodeController);

export default router;