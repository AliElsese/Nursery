const connectDB = require('../database/connection')

module.exports = {
    showCourseStudentsPage : (req,res) => {
        var coursename = req.params.coursename
        connectDB.query('SELECT * FROM students WHERE studentcourse = ?' , [coursename] , (err,students) => {
            if(err) res.send(err)
            res.render('course-students' , {
                students : students
            })
        })
    },

    showWriteReportPage : (req,res) => {
        var id = req.params.id
        connectDB.query('SELECT * FROM students WHERE studentid = ?' , [id] , (err,student) => {
            if(err) res.send(err)
            res.render('write-report' , {
                student : student
            })
        })
    },

    showWriteAttendancePage : (req,res) => {
        var id = req.params.id
        connectDB.query('SELECT * FROM students WHERE studentid = ?' , [id] , (err,student) => {
            if(err) res.send(err)
            res.render('write-attendance' , {
                student : student
            })
        })
    },
}