const connectDB = require('../database/connection')
const axios = require('axios')

module.exports = {
    showLoginPage : (req,res) => {
        res.render('login')
    },

    showDashboardPage : (req,res) => {
        res.render('dashboard')
    },

    showDashboardCoursesPage : (req,res) => {
        axios.get('http://localhost:8100/api-courses')
            .then(response => {
                res.render('dashboard-courses' , { courses : response.data })
            })
            .catch(err => {
                res.send(err)
            })
    },

    showAddCoursePage : (req,res) => {
        res.render('add-course')
    },

    showDashboardAccountsPage : (req,res) => {
        axios.get('http://localhost:8100/api-accounts')
            .then(response => {
                res.render('dashboard-accounts' , { accounts : response.data })
            })
            .catch(err => {
                res.send(err)
            })
    },

    showAddAccountPage : (req,res) => {
        res.render('add-account')
    },

    showDashboardTrainersPage : (req,res) => {
        axios.get('http://localhost:8100/api-trainers')
            .then(response => {
                res.render('dashboard-trainers' , { trainers : response.data })
            })
            .catch(err => {
                res.send(err)
            })
    },

    showAddTrainerPage : (req,res) => {
        axios.get('http://localhost:8100/api-courses')
            .then(response => {
                res.render('add-trainer' , { courses : response.data })
            })
            .catch(err => {
                res.send(err)
            })
    },

    showDashboardFathersPage : (req,res) => {
        axios.get('http://localhost:8100/api-fathers')
            .then(response => {
                res.render('dashboard-fathers' , { fathers : response.data })
            })
            .catch(err => {
                res.send(err)
            })
    },

    showAddFatherPage : (req,res) => {
        res.render('add-father')
    },

    showDashboardStudentsPage : (req,res) => {
        axios.get('http://localhost:8100/api-students')
            .then(response => {
                res.render('dashboard-students' , { students : response.data })
            })
            .catch(err => {
                res.send(err)
            })
    },

    showAddStudentPage : (req,res) => {
        connectDB.query('SELECT * FROM fathers' , (err,fathers) => {
            if(err) res.send(err)
            connectDB.query('SELECT * FROM courses' , (err,courses) => {
                if(err) res.send(err)
                res.render('add-student' , {
                    fathers : fathers,
                    courses : courses
                })
            })
        })
    },

    // trainer
    
}