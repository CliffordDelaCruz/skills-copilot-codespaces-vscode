// Create web server
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));

// Load comments
const comments = require('./comments');

// Get comments
app.get('/comments', (req, res) => res.json(comments));

// Post comments
app.post('/comments', (req, res) => {
    const newComment = {
        name: req.body.name,
        comment: req.body.comment,
        date: new Date()
    };

    comments.push(newComment);

    res.json(newComment);
});

// Delete comments
app.delete('/comments/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: 'Comment deleted',
            comments: comments.filter(comment => comment.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
});
