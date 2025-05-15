const pool = require('../db');

// Controller methods for achievement routes
const getAchievements = async (req, res) => {
    try {
        const q = 'SELECT * FROM award WHERE isActive = 1';
        const [data, fields] = await pool.query(q);
        res.render('basic/achieve.ejs', { achievements: data });
    } catch (error) {
        console.error('Error getting achievements:', error);
        res.status(500).send('Error getting achievements');
    }
};

const renderAddAchievement = (req, res) => {
    res.render('crud/Achievement/add-achievement.ejs');
};

const addAchievement = async (req, res) => {
    try {
        // Extract data from the form
        const { awardname, yearreceived } = req.body;

        // Create SQL query to insert the new achievement
        const insertQuery = 'INSERT INTO award (awardname, yearreceived) VALUES (?, ?)';

        // Execute the query with data
        const [results, fields] = await pool.execute(insertQuery, [awardname, yearreceived]);

        console.log('Achievement added successfully!');
        res.redirect('/achievements');
    } catch (error) {
        console.error('Error adding achievement:', error);
        res.status(500).send('Error adding achievement');
    }
};

const renderUpdateAchievement = (req, res) => {
    res.render('crud/Achievement/update-achievement.ejs');
};

const updateAchievement = async (req, res) => {
    try {
        // Extract data from the form
        const { awardname, yearreceived } = req.body;

        // Check if the awardname exists and is active
        const checkExistenceQuery = 'SELECT * FROM award WHERE awardname = ? AND isActive = 1';

        const [checkResults, checkFields] = await pool.query(checkExistenceQuery, [awardname]);

        // Check if the awardname exists
        if (checkResults.length === 0) {
            console.log('Award not found or inactive:', awardname);
            return res.send('Award not found or inactive');
        }

        // Award exists and is active, proceed with the update
        const updateQuery = 'UPDATE award SET yearreceived = ? WHERE awardname = ?';

        // Execute the update query with data
        const [updateResults, updateFields] = await pool.query(updateQuery, [yearreceived, awardname]);

        console.log('Achievement updated successfully!');
        res.redirect('/achievements'); // Redirect to the achievements page
    } catch (error) {
        console.error('Error updating achievement:', error);
        res.send('Error updating achievement');
    }
};

const renderDeleteAchievement = (req, res) => {
    res.render('crud/Achievement/delete-achievement.ejs');
};

const deleteAchievement = async (req, res) => {
    try {
        const awardnameToDelete = req.body.awardname;

        // Begin a transaction to ensure atomicity
        const connection = await pool.getConnection();

        // Delete the achievement
        const deleteAchievementQuery = 'UPDATE award SET isActive = 0 WHERE awardname = ?';
        const [deleteResults, deleteFields] = await connection.query(deleteAchievementQuery, [awardnameToDelete]);

        // Commit the transaction
        await connection.commit();

        console.log('Achievement and associated contributions deleted successfully!');
        res.redirect('/achievements');
    } catch (error) {
        console.error('Error deleting achievement:', error);
        res.send('Error deleting achievement');
    }
};

module.exports = {
    getAchievements,
    renderAddAchievement,
    addAchievement,
    renderUpdateAchievement,
    updateAchievement,
    renderDeleteAchievement,
    deleteAchievement,
};
