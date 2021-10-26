require("dotenv").config();
const express = require("express");
const router = require("./back/router")

const app = express();

const PORT = process.env.PORT || 3000;

app.use(router);

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
});
