const pool = require('../db');

// Get contributions
exports.getContributions = async (req, res) => {
    try {
        const query = 'SELECT * FROM contribution where isActive = 1';
        const [contributions, fields] = await pool.query(query);
        res.render('basic/contributions', { contributions });
    } catch (error) {
        console.error('Error fetching contributions:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.renderAddContribution = (req, res) => {
    res.render('crud/Contribution/add-contribution.ejs');
};

// Add contribution
exports.addContribution = async (req, res) => {
    const { type, awardid } = req.body;
    const query = 'INSERT INTO contribution (type, awardid) VALUES (?, ?)';
    try {
        await pool.query(query, [type, awardid]);
        res.redirect('/contributions'); // Update the redirect path if needed
    } catch (error) {
        console.error('Error adding contribution:', error);
        res.status(500).send('Error adding contribution');
    }
};

// Render update contribution form
exports.renderUpdateContribution = async (req, res) => {
    const id = req.params.id;

    try {
        const [contribution, fields] = await pool.query('SELECT * FROM contribution WHERE contributionid = ?', [id]);
        res.render('crud/Contribution/update-contribution', { contribution: contribution[0] });
    } catch (error) {
        console.error('Error fetching contribution for update:', error);
        res.status(500).send('Error fetching contribution for update');
    }
};

// Update contribution
exports.updateContribution = async (req, res) => {
    const id = req.params.id;
    const { type, awardid } = req.body; // Adjust field names based on your form

    const query = 'UPDATE contribution SET type = ?, awardid = ? WHERE contributionid = ?';

    try {
        await pool.query(query, [type, awardid, id]);
        res.redirect('/contributions');
    } catch (error) {
        console.error('Error updating contribution:', error);
        res.status(500).send('Error updating contribution');
    }
};

exports.renderDeleteContribution = (req, res) => {
    res.render('crud/Contribution/delete-contribution.ejs');
};

exports.deleteContribution = async (req, res) => {
    const { type, awardid } = req.body;
    const selectQuery = 'SELECT * FROM contribution WHERE type = ? AND awardid = ? AND isActive = 1';

    try {
        // Check if the contribution exists before deleting
        const [contribution, fields] = await pool.query(selectQuery, [type, awardid]);

        if (contribution.length > 0) {
            const deleteQuery = 'UPDATE contribution SET isActive = 0 WHERE type = ? AND awardid = ?';

            // Soft delete the contribution by setting isActive to 0
            await pool.query(deleteQuery, [type, awardid]);
            res.redirect('/contributions');
        } else {
            // Contribution not found
            res.send('Contribution not found');
        }
    } catch (error) {
        console.error('Error deleting contribution:', error);
        res.status(500).send('Error deleting contribution');
    }
};