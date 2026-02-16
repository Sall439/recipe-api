CREATE TABLE "favorite" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"recipe_id" integer NOT NULL,
	"image" text,
	"cook_time" text,
	"created_at" timestamp DEFAULT now()
);
