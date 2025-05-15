const pool = require('../db'); // Import the database connection

exports.getVideos = async (req, res) => {
    try {
        const [videos, fields] = await pool.query('SELECT * FROM video');
        res.render('basic/watch-videos.ejs', { videos });
    } catch (error) {
        console.error('Error getting videos:', error);
        res.status(500).send('Error getting videos');
    }
};