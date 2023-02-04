const connectDB = require('../database/connection')
const axios = require('axios')

module.exports = {
    allCourses : (req,res) => {
        connectDB.query('SELECT * FROM courses' , (err,courses) => {
            if(err) res.send(err)
            res.send(courses)
        })
    },

    addCourse : (req,res) => {
        try {
            if( !req.body.coursename ){
                res.render('add-course' , {
                    message : 'من فضلك ادخل جميع البيانات'
                })
            } else {
                
                var sql = 'INSERT INTO courses SET ?'
                var course = {
                    coursename : req.body.coursename
                }
                connectDB.query(sql , [course] , (err,results) => {
                    if(err) res.send(err)
                    else {
                        res.render('add-course' , {
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

    deleteCourse : (req,res) => {
        var sql = 'DELETE FROM courses WHERE courseid = ?'
        connectDB.query(sql , [req.params.id] , (err,courses) => {
            if(err) res.send(err)
            axios.get('http://localhost:8100/api-courses')
                .then(response => {
                    res.render('dashboard-courses' , { 
                        courses : response.data,
                        message : 'تم الحذف '
                    })
                })
                .catch(err => {
                    res.send(err)
                })
        })
    }
}