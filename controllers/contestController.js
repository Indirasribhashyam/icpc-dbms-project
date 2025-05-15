const pool = require('../db');

// Get contests
exports.getContests = async (req, res) => {
    try {
        const query = 'SELECT * FROM contest WHERE isActive = 1';
        const [contests, fields] = await pool.query(query);
        res.render('basic/contests', { contests });
    } catch (error) {
        console.error('Error fetching contests:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.renderAddContest = (req, res) => {
    res.render('crud/Contest/add-contest.ejs');
};

// Add contest
exports.addContest = async (req, res) => {
    const { year, hostCity, rankings, championName, hostCountry } = req.body;
    const query = 'INSERT INTO contest (year, host_city, rankings, championid, host_country) VALUES (?, ?, ?, (SELECT championid FROM champion WHERE cname = ?), ?)';

    try {
        await pool.query(query, [year, hostCity, rankings, championName, hostCountry]);
        res.redirect('/contests'); // Update the redirect path if needed
    } catch (error) {
        console.error('Error adding contest:', error);
        res.status(500).send('Error adding contest');
    }
};

// Render update contest form
exports.renderUpdateContest = async (req, res) => {
    const id = req.params.id;

    try {
        const [contest, fields] = await pool.query('SELECT * FROM contest WHERE contestid = ?', [id]);
        res.render('crud/Contest/update-contest', { contest: contest[0] });
    } catch (error) {
        console.error('Error fetching contest for update:', error);
        res.status(500).send('Error fetching contest for update');
    }
};

// Update contest
exports.updateContest = async (req, res) => {
    const { name, date } = req.body;

    const query = 'UPDATE contest SET name = ?, date = ? WHERE contestid = ?';

    try {
        await pool.query(query, [name, date, id]);
        res.redirect('/contests');
    } catch (error) {
        console.error('Error updating contest:', error);
        res.status(500).send('Error updating contest');
    }
};

exports.renderDeleteContest = (req, res) => {
    res.render('crud/Contest/delete-contest.ejs');
};

exports.deleteContest = async (req, res) => {
    const { contestid } = req.body;
    const selectQuery = 'SELECT * FROM contest WHERE contestid = ? AND isActive = 1';

    try {
        // Check if the contest exists before deleting
        const [contest, fields] = await pool.query(selectQuery, [contestid]);

        if (contest.length > 0) {
            const deleteQuery = 'UPDATE contest SET isActive = 0 WHERE contestid = ?';

            // Soft delete the contest by setting isActive to 0
            await pool.query(deleteQuery, [contestid]);
            res.redirect('/contests');
        } else {
            // Contest not found
            res.send('Contest not found');
        }
    } catch (error) {
        console.error('Error deleting contest:', error);
        res.status(500).send('Error deleting contest');
    }
};
