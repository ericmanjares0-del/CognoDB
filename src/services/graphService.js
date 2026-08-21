import driver from "../config/database.js";

async function testDatabase() {
    const session = driver.session();

    try {
        const result = await session.run(
            "RETURN 'CognoDB service is working!' AS message"
        );

        return result.records[0].get("message");
    } finally {
        await session.close();
    }
}

export default {
    testDatabase
};