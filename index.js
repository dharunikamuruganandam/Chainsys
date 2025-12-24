process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable TLS certificate validation
require('dotenv').config();
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// DB
const db = require('./couch');

// Health check
app.get('/', (req, res) => {
  res.send('Blog API is running');
});

// ✅ GET all posts
app.get('/getall', async (req, res) => {
  try {
    const result = await db.list({ include_docs: true });
    const posts = result.rows.map(r => r.doc);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET post by id
app.get('/getby/:id', async (req, res) => {
  try {
    const post = await db.get(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ error: 'Post not found' });
  }
});

// ✅ POST create post
app.post('/post', async (req, res) => {
  try {
    const post = {
      ...req.body,
      createdAt: new Date().toISOString(),
      published: false
    };

    const result = await db.insert(post);
    res.status(201).json({ id: result.id, ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ PUT update full post
app.put('/update/:id', async (req, res) => {
  try {
    const existing = await db.get(req.params.id);

    const updated = {
      ...existing,
      ...req.body,
      _id: existing._id,
      _rev: existing._rev,
      updatedAt: new Date().toISOString()
    };

    const result = await db.insert(updated);
    res.json({ ok: true, id: result.id });
  } catch (err) {
    res.status(404).json({ error: 'Post not found' });
  }
});

// ✅ PATCH partial update
app.patch('/patch/:id', async (req, res) => {
  try {
    const existing = await db.get(req.params.id);

    const patched = {
      ...existing,
      ...req.body,
      _id: existing._id,
      _rev: existing._rev,
      updatedAt: new Date().toISOString()
    };

    const result = await db.insert(patched);
    res.json({ ok: true, id: result.id });
  } catch (err) {
    res.status(404).json({ error: 'Post not found' });
  }
});

// ✅ DELETE post
app.delete('/delete/:id', async (req, res) => {
  try {
    const post = await db.get(req.params.id);
    await db.destroy(post._id, post._rev);
    res.json({ ok: true, id: post._id });
  } catch (err) {
    res.status(404).json({ error: 'Post not found' });
  }
});

// ✅ ALL (catch all methods on /api/posts)
app.all('/all', (req, res) => {
  res.status(405).json({ message: 'Method not allowed' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Blog API running at http://localhost:${PORT}`);
});
