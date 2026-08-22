import graphService from "../services/graphService.js";
import graphQueryService from "../services/graphQueryService.js";

async function testDatabase(req, res) {
    try {
        const message = await graphService.testDatabase();

        res.json({
            message: message
        });
    } catch (error) {
        console.error("Database error:", error.message);

        res.status(500).json({
            error: "Database connection failed"
        });
    }
}

async function getAllVehicles(req, res) {
    try {
        const vehicles = await graphQueryService.getAllVehicles();

        res.json({
            data: vehicles
        });
    } catch (error) {
        console.error("Vehicle query error:", error.message);

        res.status(500).json({
            error: "Failed to retrieve vehicles",
            details: error.message
        });
    }
}

async function getVehicleComponents(req, res) {
    try {
        const { id } = req.params;

        const components =
            await graphQueryService.getVehicleComponents(id);

        res.json({
            data: components
        });
    } catch (error) {
        console.error("Vehicle component query error:", error.message);

        res.status(500).json({
            error: "Failed to retrieve vehicle components"
        });
    }
}

async function getVehicleDiagnostics(req, res) {
    try {
        const { id } = req.params;

        const diagnostics =
            await graphQueryService.getVehicleDiagnostics(id);

        res.json({
            data: diagnostics
        });
    } catch (error) {
        console.error("Vehicle diagnostic query error:", error.message);

        res.status(500).json({
            error: "Failed to retrieve vehicle diagnostics"
        });
    }
}

export default {
    testDatabase,
    getAllVehicles,
    getVehicleComponents,
    getVehicleDiagnostics
};