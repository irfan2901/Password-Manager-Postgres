require("dotenv").config();
const express = require("express");
const db = require("./model");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const app = express()

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/password", passwordRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
}).catch((error) => {
    console.error("unable to connect to database", error);
});