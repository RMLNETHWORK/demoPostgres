const express = require('express');
const router = express.Router();
const pool = require('../db'); // your pg Pool instance

// GET /api/search?q=somequery
router.get('/', async (req, res) => {
    const { q } = req.query;

    if (!q || q.trim() === '') {
        return res.json([]);
    }

    try {
        const searchTerm = `%${q.trim()}%`;

        // ⚠️ PLACEHOLDER — swap table/column names to match your schema later
        const result = await pool.query(
            `SELECT id, title, description, thumbnail_url
             FROM posts
             WHERE title ILIKE $1
                OR description ILIKE $1
             ORDER BY created_at DESC
             LIMIT 10`,
            [searchTerm]
        );

        res.json(result.rows);
    } catch (err) {
        console.error('Search query error:', err);
        res.status(500).json({ error: 'Search failed' });
    }
});

module.exports = router;