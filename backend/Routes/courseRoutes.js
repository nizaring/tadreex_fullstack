const express = require('express')
const multer = require('multer');
const router = express.Router()
const pool = require("../database/db");

// Set storage engine for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname);
    },
});
// Initialize upload middleware
const upload = multer({
    storage: storage,
  });

// Define a route for handling form submission (POST)
router.post('/addCourse', upload.fields([{ name: 'image'}, { name: 'apkFile'}]), async (req, res) => {
    const { title, price, description } = req.body;
    const image = req.files.image[0].filename;
    const apkFile = req.files.apkFile[0].filename;
  
    try {
      const client = await pool.connect();
      const queryText = 'INSERT INTO Trainingcourse ( title, price, description, image, apk_file) VALUES ($1, $2, $3, $4, $5)';
      const values = [title, price, description, image, apkFile];
      await client.query(queryText, values);
      client.release();
      res.status(200).send('Form submitted successfully.');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error submitting form.');
    }
  });
  
//(GET all)
router.get('/training-courses', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM Trainingcourse');
      res.json(result.rows);
      client.release();
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving training courses.');
    }
  });
//(GET BY ID)
router.get('/training-courses/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Trainingcourse WHERE course_id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).send('Course not found');
    } else {
      res.json(result.rows[0]);
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving course.');
  }
});
//(DELETE) 
router.delete('/training-courses/:course_id', async (req, res) => {
    const { course_id } = req.params;
  
    try {
      const client = await pool.connect();
      const queryText = 'DELETE FROM Trainingcourse WHERE course_id = $1';
      const values = [course_id];
      await client.query(queryText, values);
      client.release();
      res.status(200).send('Data deleted successfully.');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting data.');
    }
  });
//(UPDATE)
router.put('/updateCourse/:id', upload.fields([{ name: 'image'}, { name: 'apkFile'}]), async (req, res) => {
    const { title, price, description } = req.body;
    const image = req.files.image ? req.files.image[0].filename : null;
    const apkFile = req.files.apkFile ? req.files.apkFile[0].filename : null;
    const courseId = req.params.id;
  
    try {
      const client = await pool.connect();
      let queryText = 'UPDATE Trainingcourse SET title = $1, price = $2, description = $3';
      let values = [title, price,  description];
  
      if (image) {
        queryText += ', image = $4';
        values.push(image);
      }
  
      if (apkFile) {
        queryText += ', apk_file = $' + (values.length + 1);
        values.push(apkFile);
      }
  
      queryText += ' WHERE course_id = $' + (values.length + 1);
      values.push(courseId);
  
      await client.query(queryText, values);
      client.release();
      res.status(200).send('Course updated successfully.');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating course.');
    }
  });

//(GET BY TITLE) ** à voir aprés la conception
router.get('/trainingC/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Trainingcourse WHERE title = $1', [title]);
    if (result.rowCount === 0) {
      res.status(404).send('Course not found');
    } else {
      res.json(result.rows[0]);
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving course.');
  }
});
//download apk file 
router.get('/download/:filename', async (req, res) => {
  const filename = req.params.filename;
  const query = {
    text: 'SELECT apk_file FROM Trainingcourse WHERE apk_file = $1',
    values: [filename],
  };
  try {
    const result = await pool.query(query);
    if (result.rows.length === 0) {
      return res.status(404).send('File not found');
    }
    const filePath = `uploads/${filename}`;
    return res.download(filePath);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = router