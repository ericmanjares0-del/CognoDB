import driver from "./config/database.js";

const vehicles = [
    {
        id: "VH-001",
        make: "Toyota",
        model: "Corolla",
        year: 2022,
        vin: "JTDB4RBE0N1234567"
    },
    {
        id: "VH-002",
        make: "Honda",
        model: "Civic",
        year: 2023,
        vin: "2HGFC2F59PH123456"
    }
];

const components = [
    {
        id: "CMP-001",
        name: "Engine",
        category: "Powertrain"
    },
    {
        id: "CMP-002",
        name: "Brake System",
        category: "Safety"
    },
    {
        id: "CMP-003",
        name: "Cooling System",
        category: "Thermal"
    }
];

const sensors = [
    {
        id: "SNS-001",
        name: "Engine Temperature Sensor",
        type: "Temperature"
    },
    {
        id: "SNS-002",
        name: "Oxygen Sensor",
        type: "Oxygen"
    },
    {
        id: "SNS-003",
        name: "Brake Pressure Sensor",
        type: "Pressure"
    }
];

const diagnosticCodes = [
    {
        code: "P0115",
        description: "Engine coolant temperature sensor circuit malfunction",
        severity: "Medium"
    },
    {
        code: "P0130",
        description: "Oxygen sensor circuit malfunction",
        severity: "Medium"
    },
    {
        code: "C1234",
        description: "Brake pressure sensor malfunction",
        severity: "High"
    }
];

async function seedDatabase() {
    const session = driver.session();

    try {
        console.log("Clearing existing graph data...");

        await session.run(`
            MATCH (n)
            DETACH DELETE n
        `);

        console.log("Creating vehicles...");

        await session.run(
            `
            UNWIND $vehicles AS vehicle
            CREATE (v:Vehicle {
                id: vehicle.id,
                make: vehicle.make,
                model: vehicle.model,
                year: vehicle.year,
                vin: vehicle.vin
            })
            `,
            { vehicles }
        );

        console.log("Creating components...");

        await session.run(
            `
            UNWIND $components AS component
            CREATE (c:Component {
                id: component.id,
                name: component.name,
                category: component.category
            })
            `,
            { components }
        );

        console.log("Creating sensors...");

        await session.run(
            `
            UNWIND $sensors AS sensor
            CREATE (s:Sensor {
                id: sensor.id,
                name: sensor.name,
                type: sensor.type
            })
            `,
            { sensors }
        );

        console.log("Creating diagnostic codes...");

        await session.run(
            `
            UNWIND $diagnosticCodes AS diagnostic
            CREATE (d:DiagnosticCode {
                code: diagnostic.code,
                description: diagnostic.description,
                severity: diagnostic.severity
            })
            `,
            { diagnosticCodes }
        );

        console.log("Creating relationships...");

        await session.run(`
            MATCH (v1:Vehicle {id: "VH-001"})
            MATCH (v2:Vehicle {id: "VH-002"})
            MATCH (engine:Component {id: "CMP-001"})
            MATCH (brake:Component {id: "CMP-002"})
            MATCH (cooling:Component {id: "CMP-003"})

            CREATE
                (v1)-[:HAS_COMPONENT]->(engine),
                (v1)-[:HAS_COMPONENT]->(brake),
                (v2)-[:HAS_COMPONENT]->(engine),
                (v2)-[:HAS_COMPONENT]->(cooling)
        `);

        await session.run(`
            MATCH (engine:Component {id: "CMP-001"})
            MATCH (brake:Component {id: "CMP-002"})
            MATCH (temperature:Sensor {id: "SNS-001"})
            MATCH (oxygen:Sensor {id: "SNS-002"})
            MATCH (pressure:Sensor {id: "SNS-003"})

            CREATE
                (engine)-[:HAS_SENSOR]->(temperature),
                (engine)-[:HAS_SENSOR]->(oxygen),
                (brake)-[:HAS_SENSOR]->(pressure)
        `);

        await session.run(`
            MATCH (engine:Component {id: "CMP-001"})
            MATCH (brake:Component {id: "CMP-002"})
            MATCH (p0115:DiagnosticCode {code: "P0115"})
            MATCH (p0130:DiagnosticCode {code: "P0130"})
            MATCH (c1234:DiagnosticCode {code: "C1234"})

            CREATE
                (engine)-[:HAS_DIAGNOSTIC]->(p0115),
                (engine)-[:HAS_DIAGNOSTIC]->(p0130),
                (brake)-[:HAS_DIAGNOSTIC]->(c1234)
        `);

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Seed failed:", error.message);
    } finally {
        await session.close();
        await driver.close();
    }
}

seedDatabase();