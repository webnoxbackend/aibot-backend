const {dbCheck} = require("../middleware/connection/dbCheck")
const _ = require("lodash")
const knex = require('knex')

module.exports = app => {
                  
    app.use('/api/aibot/v1/dev',(req, res, next) => dbCheck(req, res, next), require('../routes/router'));
    
    app.use('/aibot/v1/dev',(req, res, next) => dbCheck(req, res, next), require('../routes/router'));
    
    app.get('/',(req,res) => {
        return res.send("Server Runnning Successfully!");
    })
}

