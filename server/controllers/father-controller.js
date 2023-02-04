const connectDB = require('../database/connection')
const axios = require('axios')

module.exports = {
    allFathers : (req,res) => {
        connectDB.query('SELECT * FROM fathers' , (err,fathers) => {
            if(err) res.send(err)
            res.send(fathers)
        })
    },

    addFather : (req,res) => {
        try {
            if( !req.body.fathername || !req.body.fatherkids || !req.body.fatheruser || !req.body.fatherpassword){
                res.render('add-father' , {
                    message : 'من فضلك ادخل جميع البيانات'
                })
            } else {
                
                var sql = 'INSERT INTO fathers SET ?'
                var father = {
                    fathername : req.body.fathername,
                    fatherkids : req.body.fatherkids,
                    fatheruser : req.body.fatheruser,
                    fatherpassword : req.body.fatherpassword
                }
                connectDB.query(sql , [father] , (err,results) => {
                    if(err) res.send(err)
                    else {
                        res.render('add-father' , {
                            message : 'تم التسجيل'
                        })
                    }
                })
            }
        }
        catch (err) {
            res.send(err)
        }
    },

    deleteFather : (req,res) => {
        var sql = 'DELETE FROM fathers WHERE fatherid = ?'
        connectDB.query(sql , [req.params.id] , (err,fathers) => {
            if(err) res.send(err)
            axios.get('http://localhost:8100/api-fathers')
                .then(response => {
                    res.render('dashboard-fathers' , { 
                        fathers : response.data,
                        message : 'تم الحذف '
                    })
                })
                .catch(err => {
                    res.send(err)
                })
        })
    }
}