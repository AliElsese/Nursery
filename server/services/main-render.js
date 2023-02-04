module.exports = {
    showHomePage : (req,res) => {
        res.render('index')
    },

    showAboutPage : (req,res) => {
        res.render('about')
    },

    showContactPage : (req,res) => {
        res.render('contact')
    },

    showCoursesPage : (req,res) => {
        res.render('courses')
    },

    showEventsPage : (req,res) => {
        res.render('events')
    },

    showTrainersPage : (req,res) => {
        res.render('trainers')
    },
}