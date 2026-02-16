
const express = require("express")
const ENV = require("./config/env.js")
const db = require("./config/db.js")
const  favoritesTable  = require("./db/schema.js")
const { eq, and } = require("drizzle-orm") 
const job = require("./config/cron.js")



if(ENV.NODE_ENV === "production") job.start()

const PORT = ENV.PORT

const app = express()
app.use(express.json())


app.post("/api/favorites", async(req, res) => {
    try {
        const {userId, title, servings, cookTime, recipeId, image} = req.body

        if(!userId || !title || !servings || !cookTime || !recipeId || !image){
            return res.status(400).json("Veuillez remplir ses champs")
        }

        const newFavorites = await db.insert(favoritesTable).values({
            userId,
             title,
             servings, 
             cookTime, 
             recipeId, 
             image
        }).returning()

        res.status(200).json(newFavorites)
    } catch (error) {
        res.status(500).json("Erreur", error)
    }
})

app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
    try {
        const {userId, recipeId} = req.params

        const result = await db.delete(favoritesTable).where(
            and(
                eq(favoritesTable.userId, userId),
                eq(favoritesTable.recipeId, parseInt(recipeId))
                )
            
        )

        console.log(result);
        

        res.status(200).json(`suppression de l'article ${recipeId} fais avec succes`)

    } catch (error) {
        res.status(500).json({message: "Erreur", error: error.message})
    }
})

app.get("/api/favorites/:userId", async(req, res) => {
    try {
        const {userId} = req.params

        const userFavorites = await db.select().from(favoritesTable).where(
            eq(favoritesTable.userId, userId)
        )

        res.status(200).json(userFavorites)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.listen(PORT, () => {
    console.log(`Serveur demarre sur le port ${PORT}`);
    
})
