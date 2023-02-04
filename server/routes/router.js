const express = require('express');
const route = express.Router();
const connectDB = require('../database/connection')
const {verify} = require('./middleware')

const courseController = require('../controllers/course-controller')
const accountController = require('../controllers/account-controller')
const trainerController = require('../controllers/trainer-controller')
const fatherController = require('../controllers/father-controller')
const studentController = require('../controllers/student-controller')
const loginController = require('../controllers/login-controller')
const eventController = require('../controllers/event-controller')

const dashboardRender = require('../services/dashboard-render')
const mainRender = require('../services/main-render')
const trainerRender = require('../services/trainer-render')

// api login
route.post('/auth/login' , loginController.login)
route.get('/logout' , loginController.logout)
/////////////////////////////////////////////////
route.get('/api-father/:fatheruser' , async (req,res) => {
    connectDB.query('SELECT * from fathers WHERE fatheruser = ?' , [req.params.fatheruser] , (err,father) => {
        if(father == undefined || father.length == 0) {
            return res.send('wrong user');
        }
        // for simplicity, just send the rows
        res.send(father);
    })
})

// api events
route.get('/api-events' , eventController.allEvents)

// api courses
route.get('/api-courses' , courseController.allCourses)
route.post('/addCourse' , courseController.addCourse)
route.get('/delete-course/:id' , courseController.deleteCourse)

// api accounts
route.get('/api-accounts' , accountController.allAccounts)
route.post('/addAccount' , accountController.addAccount)
route.get('/delete-account/:id' , accountController.deleteAccount)

// api trainers
route.get('/api-trainers' , trainerController.allTrainers)
route.post('/addTrainer' , trainerController.addTrainer)
route.get('/delete-trainer/:id' , trainerController.deleteTrainer)

route.post('/addReport/:coursename' , trainerController.addReport)
route.post('/addAttendance/:coursename' , trainerController.addAttendance)

// api fathers
route.get('/api-fathers' , fatherController.allFathers)
route.post('/addFather' , fatherController.addFather)
route.get('/delete-father/:id' , fatherController.deleteFather)

// api students
route.get('/api-students' , studentController.allStudents)
route.post('/addStudent' , studentController.addStudent)
route.get('/delete-student/:id' , studentController.deleteStudent)


// dashboard render
route.get('/login' , verify , dashboardRender.showLoginPage)

route.get('/dashboard' , verify , dashboardRender.showDashboardPage)

route.get('/dashboard-courses' , verify , dashboardRender.showDashboardCoursesPage)
route.get('/add-course' , verify , dashboardRender.showAddCoursePage)

route.get('/dashboard-accounts' , verify , dashboardRender.showDashboardAccountsPage)
route.get('/add-account' , verify , dashboardRender.showAddAccountPage)

route.get('/dashboard-trainers' , verify , dashboardRender.showDashboardTrainersPage)
route.get('/add-trainer' , verify , dashboardRender.showAddTrainerPage)

route.get('/dashboard-fathers' , verify , dashboardRender.showDashboardFathersPage)
route.get('/add-father' , verify , dashboardRender.showAddFatherPage)

route.get('/dashboard-students' , verify , dashboardRender.showDashboardStudentsPage)
route.get('/add-student' , verify , dashboardRender.showAddStudentPage)

route.get('/course-students/:coursename' , verify , trainerRender.showCourseStudentsPage)
route.get('/write-report/:id' , verify , trainerRender.showWriteReportPage)
route.get('/write-attendance/:id' , verify , trainerRender.showWriteAttendancePage)

// main render
route.get('/' , mainRender.showHomePage)
route.get('/about' , mainRender.showAboutPage)
route.get('/contact' , mainRender.showContactPage)
route.get('/courses' , mainRender.showCoursesPage)
route.get('/trainers' , mainRender.showTrainersPage)
// route.get('/events' , mainRender.showEventsPage)

module.exports = route