const pool = require('../db'); // Import the database connection

// Controller methods for alumini routes
const getAluminis = async (req, res) => {
    let q = 'SELECT * FROM alumini WHERE isActive = 1';
    try {
        const [data, fields] = await pool.query(q);
        res.render('basic/alumini', { aluminis: data });
    } catch (err) {
        console.log(err);
        res.send('Some error in the database');
    }
};

// Function to render the Add Alumini form
const renderAddAlumini = async (req, res) => {
    try {
        const [contributions, fields] = await pool.query('SELECT * FROM contribution');
        res.render('crud/Alumini/add-alumini', { contributions });
    } catch (err) {
        console.log(err);
        res.send('Error fetching contributions');
    }
};

// Function to handle adding Alumini to the database
const addAlumini = async (req, res) => {
    const { name, contributionid } = req.body;
    const q = 'INSERT INTO alumini (name, contributionid) VALUES (?, ?)';
    try {
        await pool.query(q, [name, contributionid]);
        res.redirect('/alumini');
    } catch (err) {
        console.log(err);
        res.send('Error adding Alumini');
    }
};

// Function to render the Update Alumini form
const renderUpdateAlumini = async (req, res) => {
    const id = req.params.id;
    try {
        const [alumini, fields] = await pool.query('SELECT * FROM alumini WHERE aluminiid = ?', [id]);
        const [contributions, contributionFields] = await pool.query('SELECT * FROM contribution');
        res.render('basic/update-alumini', { alumini: alumini[0], contributions });
    } catch (err) {
        console.log(err);
        res.send('Error fetching Alumini for update');
    }
};

// Function to handle updating Alumini in the database
const updateAlumini = async (req, res) => {
    const id = req.params.id;
    const { name, contributionid } = req.body;
    const q = 'UPDATE alumini SET name = ?, contributionid = ? WHERE aluminiid = ?';
    try {
        await pool.query(q, [name, contributionid, id]);
        res.redirect('/alumini');
    } catch (err) {
        console.error('Error updating Alumini:', err.message);
        res.status(500).send('Error updating Alumini');
    }
};

// Function to render the Delete Alumini form
const renderDeleteAlumini = async (req, res) => {
    const id = req.params.id;
    try {
        const [alumini, fields] = await pool.query('SELECT * FROM alumini WHERE aluminiid = ?', [id]);
        res.render('crud/Alumini/delete-alumini', { aluminiid: id, alumini: alumini[0] });
    } catch (err) {
        console.error('Error fetching Alumini for delete:', err.message);
        res.status(500).send('Error fetching Alumini for delete');
    }
};

// Function to handle deleting Alumini from the database
const deleteAlumini = async (req, res) => {
    const aluminiName = req.body.name; // Assuming the input field is named "name"

    // Query to get the Alumini ID based on the Alumini Name
    const selectQuery = 'SELECT aluminiid FROM alumini WHERE name = ? AND isActive = 1';

    try {
        const result = await pool.query(selectQuery, [aluminiName]);

        if (result.length > 0) {
            const aluminiId = result[0].aluminiid;
            const updateQuery = 'UPDATE alumini SET isActive = 0 WHERE aluminiid = ?';

            // Update Alumini based on the retrieved ID
            await pool.query(updateQuery, [aluminiId]);
            res.redirect('/alumini');
        } else {
            // Alumini not found
            res.send('Alumini not found');
        }
    } catch (err) {
        console.error('Error deleting Alumini:', err.message);
        res.status(500).send('Error deleting Alumini');
    }
};

module.exports = {
    getAluminis,
    renderAddAlumini,
    addAlumini,
    renderUpdateAlumini,
    updateAlumini,
    renderDeleteAlumini,
    deleteAlumini,
};
