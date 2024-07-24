const express = require('express')
const { port: APP_PORT, port } = require('./config/config')
const routerApi = require('./routes/index')
const cors = require('cors')
const connect = require("./libs/mongoose");
const app = express()
connect();


app.use(express.json())
app.use(cors())
routerApi(app)



app.listen(port, () => {
    console.log(`APP corriendo por el puerto ${port}`
    )
})