const pool = require('../db'); // Import the database connection

// Controller methods for champion routes
const getChampions = async (req, res) => {
    try {
        const [data, fields] = await pool.query('SELECT * FROM champion WHERE isActive = 1');
        res.render('basic/champions', { champions: data });
    } catch (err) {
        console.log(err);
        res.send('Some error in the database');
    }
};

const renderAddChampion = (req, res) => {
    res.render('crud/Champions/add-champions');
};

const addChampion = async (req, res) => {
    const { cname, university, nationality } = req.body;
    try {
        await pool.query('INSERT INTO champion (cname, university, nationality) VALUES (?, ?, ?)', [cname, university, nationality]);
        res.redirect('/champions');
    } catch (err) {
        console.log(err);
        res.send('Error adding champion to the database');
    }
};

const renderUpdateChampion = async (req, res) => {
    const championId = req.params.id;
    try {
        const [champion] = await pool.query('SELECT * FROM champion WHERE championid = ? AND isActive = 1', [championId]);
        res.render('crud/Champions/update-champions', { champion: champion[0] });
    } catch (err) {
        console.log(err);
        res.send('Some error in the database');
    }
};

const updateChampion = async (req, res) => {
    const { cname, university, nationality } = req.body;
    try {
        await pool.query('UPDATE champion SET cname = ?, university = ?, nationality = ? WHERE championid = ?', [cname, university, nationality, championId]);
        res.redirect('/champions');
    } catch (err) {
        console.log(err);
        res.send('Error updating champion in the database');
    }
};

const renderDeleteChampion = async (req, res) => {
    const championId = req.params.id;
    try {
        const [champion] = await pool.query('SELECT * FROM champion WHERE championid = ? AND isActive = 1', [championId]);
        res.render('basic/delete-champion', { champion: champion[0] });
    } catch (err) {
        console.log(err);
        res.send('Some error in the database');
    }
};

const deleteChampion = async (req, res) => {
    const championId = req.params.id;
    try {
        await pool.query('UPDATE champion SET isActive = 0 WHERE championid = ?', [championId]);
        res.redirect('/champions');
    } catch (err) {
        console.log(err);
        res.send('Error deleting champion from the database');
    }
};

module.exports = {
    getChampions,
    renderAddChampion,
    addChampion,
    renderUpdateChampion,
    updateChampion,
    renderDeleteChampion,
    deleteChampion
    // Add other exported methods as needed...
};
