import { Router } from "express";
import auth from "../middleware/auth.js";
import * as controller from "../controllers/inventoryTransaction.controller.js";

const router = Router();

router.post("/", auth, controller.createTransaction);
router.get("/", auth, controller.getAllTransactions);
router.get("/:id", auth, controller.getTransactionById);

export default router;