require("dotenv").config()

module.exports = {
    MONGO_URL: process.env.MONGO_URL || "",
    FIRESTORE_URL: process.env.FIRESTORE_URL || "",
    PORT: process.env.PORT || 8080
}