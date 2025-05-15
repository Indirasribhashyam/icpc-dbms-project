const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const aluminiController = require('../controllers/aluminiController');
const contestController = require('../controllers/contestController');
const championController = require('../controllers/championController');
const videoController = require('../controllers/videoController');
const contributionController = require('../controllers/contributionController');

// Home route
router.get('/', (req, res) => {
    res.send('Hello');
});

// Basic routes
router.get('/home', (req, res) => {
    res.render('basic/index.ejs');
});

router.get('/about', (req, res) => {
    res.render('basic/about.ejs');
});

router.get('/new', (req, res) => {
    res.render('basic/new.ejs');
});

router.get('/learn-more', (req, res) => {
    res.render('basic/learn-more.ejs');
});

// Achievement routes
router.get('/achievements', achievementController.getAchievements);
router.get('/add-achievement', achievementController.renderAddAchievement);
router.post('/add-achievement', achievementController.addAchievement);
router.get('/update-achievement', achievementController.renderUpdateAchievement);
router.post('/update-achievement', achievementController.updateAchievement);
router.get('/delete-achievement', achievementController.renderDeleteAchievement);
router.post('/delete-achievement', achievementController.deleteAchievement);

// Alumini routes
router.get('/alumini', aluminiController.getAluminis);
router.get('/add-alumini', aluminiController.renderAddAlumini);
router.post('/add-alumini', aluminiController.addAlumini);
router.get('/update-alumini', aluminiController.renderUpdateAlumini);
router.post('/update-alumini', aluminiController.updateAlumini);
router.get('/delete-alumini', aluminiController.renderDeleteAlumini);
router.post('/delete-alumini', aluminiController.deleteAlumini);

// Contest routes
router.get('/contests', contestController.getContests);
router.get('/add-contest', contestController.renderAddContest)
router.post('/add-contest', contestController.addContest)
router.get('/delete-contest', contestController.renderDeleteContest)
router.post('/delete-contest', contestController.deleteContest)

// Champion routes
router.get('/champions', championController.getChampions);
router.get('/add-champions', championController.renderAddChampion)
router.post('/add-champion', championController.addChampion)
router.get('/update-champions', championController.renderUpdateChampion)
router.post('/update-champion', championController.updateChampion)

// Contribution routes
router.get('/contributions', contributionController.getContributions);
router.get('/add-contribution', contributionController.renderAddContribution);
router.post('/add-contribution', contributionController.addContribution);
router.get('/delete-contribution', contributionController.renderDeleteContribution);
router.post('/delete-contribution', contributionController.deleteContribution);
router.get('/update-contribution', contributionController.renderUpdateContribution);
router.post('/update-contribution', contributionController.updateContribution);

// Video Controller
router.get('/watch-videos', videoController.getVideos);

module.exports = router;
