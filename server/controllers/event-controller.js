const connectDB = require('../database/connection')
const axios = require('axios')

module.exports = {
    allEvents : (req,res) => {
        connectDB.query('SELECT * FROM events' , (err,events) => {
            if(err) res.send(err)
            res.send(events)
        })
    }
}