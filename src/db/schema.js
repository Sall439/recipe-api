const {pgTable, serial, timestamp, text, integer} =  require("drizzle-orm/pg-core") 

const favoritesTable = pgTable("favorite", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    recipeId: integer("recipe_id").notNull(),
    image: text("image"),
    cookTime: text("cook_time"),
    createdAt: timestamp("created_at").defaultNow()
})

module.exports = favoritesTable