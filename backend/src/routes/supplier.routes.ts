import { Router } from "express";
import auth from "../middleware/auth.js";
import * as controller from "../controllers/supplier.controller.js";

const router = Router();

router.post("/", auth, controller.createSupplier);
router.get("/", auth, controller.getAllSuppliers);
router.get("/:id", auth, controller.getSupplierById);
router.put("/:id", auth, controller.updateSupplier);
router.delete("/:id", auth, controller.deleteSupplier);

export default router;