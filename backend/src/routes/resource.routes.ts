import { Router } from "express";
import auth from "../middleware/auth.js";
import * as controller from "../controllers/resource.controller.js";

const router = Router();

router.post("/", auth, controller.createResource);
router.get("/", auth, controller.getAllResources);
router.get("/:id", auth, controller.getResourceById);
router.put("/:id", auth, controller.updateResource);
router.delete("/:id", auth, controller.deleteResource);

export default router;