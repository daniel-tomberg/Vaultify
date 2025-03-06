const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const corsMiddleware = require("./middleware/cors.middleware");

const app = express();
const PORT = config.get("serverPort") || 5003;

app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error("MongoDB Connection Error:", e);
        process.exit(1);
    }
};

start();
