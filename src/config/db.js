const { drizzle } = require("drizzle-orm/neon-http")
const { neon } = require("@neondatabase/serverless")
const ENV = require("./env.js")
const schema = require("../db/schema.js")

// Creation de la connexion sql
const sql = neon(ENV.DATABASE_URL)

// Creation de l'instance drizzle
const db = drizzle(sql, { schema })

module.exports = db
