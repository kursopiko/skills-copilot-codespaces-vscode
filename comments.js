// Create web server
const express = require('express');
const app = express();

// Import comments
const comments = require('./comments');

// Parse JSON
app.use(express.json());

// GET /comments
app.get('/comments', (req, res) => {
  res.status(200).json(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  if (username && comment) {
    const id = comments.length + 1;
    const newComment = { id, username, comment };
    comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(400).json({ message: 'Please include username and comment' });
  }
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = comments.findIndex(comment => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

// Start server
app.listen(4001, () => {
  console.log('Server is listening on port 4001');
});