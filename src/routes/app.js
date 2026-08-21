import neo4j from "neo4j-driver";

const URI = "bolt+s://db-61bbb4cc.bravo.databases.cognodb.com";
const USERNAME = "cognodb";
const PASSWORD = "beb5ffb420c93db83178120e3c3d6803";

const driver = neo4j.driver(
    URI,
    neo4j.auth.basic(USERNAME, PASSWORD)
);

try {
    await driver.verifyConnectivity();
    console.log("✅ Connected to CognoDB!");
} catch (error) {
    console.error("❌ Connection failed:", error.message);
} finally {
    await driver.close();
}