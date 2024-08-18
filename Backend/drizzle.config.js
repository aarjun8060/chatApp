import {
    defineConfig
} from "drizzle-kit";

export default defineConfig({
    schema: "./src/drizzle/schema.js",
    out:"./src/drizzle/migrations",
    dialect: 'postgresql',
    driver: "aws-data-api",
    dbCredentials:{
        connectionString: process.env.DATABASE_URL,
    },
    verbose: true,
    strict:true,
})