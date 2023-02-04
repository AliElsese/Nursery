const connectDB = require('../database/connection')
const axios = require('axios')

module.exports = {
    allTrainers : (req,res) => {
        connectDB.query('SELECT * FROM trainers' , (err,trainers) => {
            if(err) res.send(err)
            res.send(trainers)
        })
    },

    addTrainer : (req,res) => {
        try {
            if( !req.body.trainername || !req.body.trainerspecialty || !req.body.trainercourse || !req.body.traineruser || !req.body.trainerpassword){
                connectDB.query('SELECT * FROM courses' , (err,courses) => {
                    if(err) res.send(err)
                    res.render('add-trainer' , {
                        courses : courses,
                        message : 'من فضلك ادخل جميع البيانات'
                    })
                })
            } else {
                
                var sql = 'INSERT INTO trainers SET ?'
                var trainer = {
                    trainername : req.body.trainername,
                    trainerspecialty : req.body.trainerspecialty,
                    trainercourse : req.body.trainercourse,
                    traineruser : req.body.traineruser,
                    trainerpassword : req.body.trainerpassword
                }
                connectDB.query(sql , [trainer] , (err,results) => {
                    if(err) res.send(err)
                    else {
                        connectDB.query('SELECT * FROM courses' , (err,courses) => {
                            if(err) res.send(err)
                            res.render('add-trainer' , {
                                courses : courses,
                                message : 'تم التسجيل'
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

    deleteTrainer : (req,res) => {
        var sql = 'DELETE FROM trainers WHERE trainerid = ?'
        connectDB.query(sql , [req.params.id] , (err,trainers) => {
            if(err) res.send(err)
            axios.get('http://localhost:8100/api-trainers')
                .then(response => {
                    res.render('dashboard-trainers' , { 
                        trainers : response.data,
                        message : 'تم الحذف '
                    })
                })
                .catch(err => {
                    res.send(err)
                })
        })
    },

    addReport : (req,res) => {
        try {
            var coursename = req.params.coursename
            if( !req.body.reportdate || !req.body.report ){
                connectDB.query('SELECT * FROM students WHERE studentcourse = ?' , [coursename] , (err,students) => {
                    if(err) res.send(err)
                    res.render('course-students' , {
                        students : students,
                        message : 'من فضلك ادخل جميع البيانات'
                    })
                })
            } else {
                
                var sql = 'INSERT INTO reports SET ?'
                var report1 = {
                    reportdate : req.body.reportdate,
                    report : req.body.report,
                    studentid : req.body.studentid,
                    reportcourse : coursename
                }
                connectDB.query(sql , [report1] , (err,results) => {
                    if(err) res.send(err)
                    else {
                        connectDB.query('SELECT * FROM students WHERE studentcourse = ?' , [coursename] , (err,students) => {
                            if(err) res.send(err)
                            res.render('course-students' , {
                                students : students,
                                message : 'تم كتابة التقرير'
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

    addAttendance : (req,res) => {
        try {
            var coursename = req.params.coursename
            if( !req.body.attendancedate || !req.body.attendance ){
                connectDB.query('SELECT * FROM students WHERE studentcourse = ?' , [coursename] , (err,students) => {
                    if(err) res.send(err)
                    res.render('course-students' , {
                        students : students,
                        message : 'من فضلك ادخل جميع البيانات'
                    })
                })
            } else {
                
                var sql = 'INSERT INTO attendances SET ?'
                var attendance1 = {
                    attendancedate : req.body.attendancedate,
                    attendance : req.body.attendance,
                    studentid : req.body.studentid,
                    attendancecourse : coursename
                }
                connectDB.query(sql , [attendance1] , (err,results) => {
                    if(err) res.send(err)
                    else {
                        connectDB.query('SELECT * FROM students WHERE studentcourse = ?' , [coursename] , (err,students) => {
                            if(err) res.send(err)
                            res.render('course-students' , {
                                students : students,
                                message : 'تم تسجيل الحضور'
                            })
                        })
                    }
                })
            }
        }
        catch (err) {
            res.send(err)
        }
    }
}