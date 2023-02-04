const connectDB = require('../database/connection')
const axios = require('axios')

module.exports = {
    allAccounts : (req,res) => {
        connectDB.query('SELECT * FROM accounts' , (err,accounts) => {
            if(err) res.send(err)
            res.send(accounts)
        })
    },

    addAccount : (req,res) => {
        try {
            if( !req.body.accountcoast || !req.body.accounttype ){
                res.render('add-account' , {
                    message : 'من فضلك ادخل جميع البيانات'
                })
            } else {
                var d = new Date()
                var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
                var sql = 'INSERT INTO accounts SET ?'
                var account = {
                    accountcoast : req.body.accountcoast,
                    accounttype : req.body.accounttype,
                    accountdate : date
                }
                connectDB.query(sql , [account] , (err,results) => {
                    if(err) res.send(err)
                    else {
                        res.render('add-account' , {
                            message : 'تم التسجيل '
                        })
                    }
                })
            }
        }
        catch (err) {
            res.send(err)
        }
    },

    deleteAccount : (req,res) => {
        var sql = 'DELETE FROM accounts WHERE accountid = ?'
        connectDB.query(sql , [req.params.id] , (err,accounts) => {
            if(err) res.send(err)
            axios.get('http://localhost:8100/api-accounts')
                .then(response => {
                    res.render('dashboard-accounts' , { 
                        accounts : response.data,
                        message : 'تم الحذف '
                    })
                })
                .catch(err => {
                    res.send(err)
                })
        })
    }
}