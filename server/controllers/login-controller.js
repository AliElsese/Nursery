const connectDB = require('../database/connection')
const jwt = require('jsonwebtoken')

module.exports = {
    login : (req,res) => {
        try{
            var { username , password } = req.body
    
            if(!username || !password) {
                return res.render('login' , {
                    message : 'من فضلك قم بادخال اسمك وكلمة السر'
                })
            }
    
            connectDB.query('SELECT * FROM admin WHERE username = ?' , [username] , (err,user) => {
                if(err) res.send(err)
                else if(!user || user.length == 0 || password != user[0].password) {
                    connectDB.query('SELECT * FROM trainers WHERE traineruser = ?' , [username] , (err,trainer) => {
                        if(err) res.send(err)
                        else if(!trainer || trainer.length == 0 || password != trainer[0].trainerpassword) {
                            return res.render('login' , {
                                message : 'اسم المستخدم او كلمة السر خطأ'
                            })
                        }
                        else {
                            var id = trainer[0].trainerid
                            
                            var token = jwt.sign({id : id} , process.env.JWT_SECRET , {
                                expiresIn : process.env.JWT_EXPIRES_IN
                            })
                            var cookieOptions = {
                                expires : new Date(
                                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                ),
                                
                                httpOnly : false,
                                secure : false
                            }
                            connectDB.query('SELECT * FROM trainers WHERE trainername = ?' , [trainer[0].trainername] , (err,trainers) => {
                                if(err) res.send(err)
                                res.cookie('jwt' , token , cookieOptions)
                                res.render('trainer-board' , {
                                    trainers : trainers
                                })
                            })
                        }
                    })
                }
                else {
                    var id = user[0].adminid
                            
                    var token = jwt.sign({id : id} , process.env.JWT_SECRET , {
                        expiresIn : process.env.JWT_EXPIRES_IN
                    })
                    var cookieOptions = {
                        expires : new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                                
                        httpOnly : false,
                        secure : false
                    }
                    res.cookie('jwt' , token , cookieOptions)
                    res.render('dashboard')
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    },

    logout : (req,res) => {
        res.clearCookie('jwt').render('login')
    }
}