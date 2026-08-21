import express from "express";
import graphController from "../controllers/graphController.js";

const router = express.Router();

// Test database
router.get("/test", graphController.testDatabase);

// Get all vehicles
router.get("/vehicles", graphController.getAllVehicles);

// Get vehicle diagnostics
router.get(
    "/vehicles/:id/diagnostics",
    graphController.getVehicleDiagnostics
);

// Get components of a specific vehicle
router.get(
    "/vehicles/:id/components",
    graphController.getVehicleComponents
);

export default router;