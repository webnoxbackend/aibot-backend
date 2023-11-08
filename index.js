
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const helmet = require('helmet');
const {dbCheck} = require("./middleware/connection/dbCheck")




app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json({ limit: "20mb" }));

app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cookieParser());

app.use(helmet())

app.use(dbCheck);

const PORT = 3068;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

require("./apigateway/gateway")(app);

