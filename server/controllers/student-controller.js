const connectDB = require('../database/connection')
const axios = require('axios')

module.exports = {
    allStudents : (req,res) => {
        connectDB.query('SELECT * FROM students' , (err,students) => {
            if(err) res.send(err)
            res.send(students)
        })
    },

    addStudent : (req,res) => {
        try {
            if( !req.body.studentname || !req.body.studentfather || !req.body.studentgender || !req.body.studentage || !req.body.studentaddress || !req.body.studentcourse || !req.body.studentjoindate || !req.body.studentenddate ){
                connectDB.query('SELECT * FROM fathers' , (err,fathers) => {
                    if(err) res.send(err)
                    connectDB.query('SELECT * FROM courses' , (err,courses) => {
                        res.render('add-student' , {
                            fathers : fathers,
                            courses : courses,
                            message : 'من فضلك ادخل جميع البيانات'
                        })
                    })
                })
            } else {
                // var d = req.body.studentjoindate
                // var startDate = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
                var sql = 'INSERT INTO students SET ?'
                var student = {
                    studentname : req.body.studentname,
                    studentfather : req.body.studentfather,
                    studentgender : req.body.studentgender,
                    studentage : req.body.studentage,
                    studentaddress : req.body.studentaddress,
                    studentjoindate : req.body.studentjoindate,
                    studentenddate : req.body.studentenddate,
                    studentcourse : req.body.studentcourse
                }
                connectDB.query(sql , [student] , (err,results) => {
                    if(err) res.send(err)
                    else {
                        connectDB.query('SELECT * FROM fathers' , (err,fathers) => {
                            if(err) res.send(err)
                            connectDB.query('SELECT * FROM courses' , (err,courses) => {
                                res.render('add-student' , {
                                    fathers : fathers,
                                    courses : courses,
                                    message : 'تم التسجيل'
                                })
                            })
                        })
                    }
                })
            }
        }
        catch (err) {
            res.send(err)
        }
    },

    deleteStudent : (req,res) => {
        var sql = 'DELETE FROM students WHERE studentid = ?'
        connectDB.query(sql , [req.params.id] , (err,students) => {
            if(err) res.send(err)
            axios.get('http://localhost:8100/api-students')
                .then(response => {
                    res.render('dashboard-students' , { 
                        students : response.data,
                        message : 'تم الحذف '
                    })
                })
                .catch(err => {
                    res.send(err)
                })
        })
    }
}