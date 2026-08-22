import driver from "../config/database.js";

async function getAllVehicles() {
    const session = driver.session();

    try {
        const result = await session.run(`
            MATCH (v:Vehicle)
            RETURN v
            ORDER BY v.id
        `);

        return result.records.map((record) => {
            const vehicle = record.get("v").properties;

            return vehicle;
        });
    } finally {
        await session.close();
    }
}

async function getVehicleComponents(vehicleId) {
    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (v:Vehicle {id: $vehicleId})
                  -[:HAS_COMPONENT]->(c:Component)

            OPTIONAL MATCH (c)-[:HAS_SENSOR]->(s:Sensor)

            RETURN
                v.id AS vehicleId,
                v.make AS make,
                v.model AS model,
                c.id AS componentId,
                c.name AS componentName,
                [sensor IN collect(s)
                    WHERE sensor IS NOT NULL |
                    {
                        id: sensor.id,
                        name: sensor.name
                    }
                ] AS sensors

            ORDER BY componentId
            `,
            {
                vehicleId
            }
        );

        return result.records.map((record) => ({
            vehicleId: record.get("vehicleId"),
            make: record.get("make"),
            model: record.get("model"),
            componentId: record.get("componentId"),
            componentName: record.get("componentName"),
            sensors: record.get("sensors")
        }));
    } finally {
        await session.close();
    }
}

async function getVehicleDiagnostics(vehicleId) {
    const session = driver.session();

    try {
        const result = await session.run(
            `
            MATCH (v:Vehicle {id: $vehicleId})
                  -[:HAS_COMPONENT]->(c:Component)
                  -[:HAS_DIAGNOSTIC]->(d:DiagnosticCode)

            RETURN
                v.id AS vehicleId,
                v.make AS make,
                v.model AS model,
                c.id AS componentId,
                c.name AS componentName,
                d.code AS code,
                d.description AS description,
                d.severity AS severity

            ORDER BY d.code
            `,
            {
                vehicleId
            }
        );

        return result.records.map((record) => ({
            vehicleId: record.get("vehicleId"),
            make: record.get("make"),
            model: record.get("model"),
            componentId: record.get("componentId"),
            componentName: record.get("componentName"),
            code: record.get("code"),
            description: record.get("description"),
            severity: record.get("severity")
        }));
    } finally {
        await session.close();
    }
}

export default {
    getAllVehicles,
    getVehicleComponents,
    getVehicleDiagnostics
};