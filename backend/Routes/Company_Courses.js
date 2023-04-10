const express = require('express')
const router = express.Router()
const pool = require("../database/db");

router.post('/company/:id/cours/:idCourse', (req, res) => {
  const companyId = req.params.id;
  const courseId = req.params.idCourse;
  const dateAchat = new Date();
  const isPurchased = req.body.isPurchased;
  const inProgress = false;

  pool.query(`
    INSERT INTO Company_Courses (company_id, course_id, date_achat, isPurchased, inProgress)
    VALUES ($1, $2, $3, $4, $5);
  `, [companyId, courseId, dateAchat, isPurchased, inProgress])
  .then(() => {
    res.send('Achat effectué avec succès');
  }).catch((error) => {
    console.error('Erreur lors de l\'insertion dans la table "Company_Courses" :', error);
  }).finally(() => {
    //pool.end();
  });
});
router.put('/company/:id/cours/:idCourse', (req, res) => {
  const companyId = req.params.id;
  const courseId = req.params.idCourse;
  const inProgress = true;

  pool.query(`
    UPDATE Company_Courses
    SET inProgress = $1
    WHERE company_id = $2 AND course_id = $3;
  `, [inProgress, companyId, courseId])
  .then(() => {
    res.send('Mise à jour effectuée avec succès');
  }).catch((error) => {
    console.error('Erreur lors de la mise à jour de la table "Company_Courses" :', error);
  }).finally(() => {
    //pool.end();
  });
});

// Récupération des formations achetées par une entreprise donnée
router.get('/company/:id/courses', (req, res) => {
    const companyId = req.params.id;
  
    pool.query(`
      SELECT tc.course_id, tc.title, tc.price, tc.description, tc.image, tc.apk_file, cc.date_achat
      FROM Trainingcourse tc
      INNER JOIN Company_Courses cc ON tc.course_id = cc.course_id
      INNER JOIN Company c ON cc.company_id = c.company_id
      WHERE c.company_id = $1;
    `, [companyId])
    .then((result) => {
      res.json(result.rows);
    }).catch((error) => {
      console.error('Erreur lors de la récupération des formations achetées par une entreprise :', error);
    }).finally(() => {
      // pool.end();
    });
  });
router.get('/companyB/:id', (req, res) => {
  const companyId = req.params.id;

  pool.query(`
    SELECT * FROM Company_Courses WHERE company_id = $1;
  `, [companyId])
  .then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.error('Erreur lors de la récupération des données dans la table "Company_Courses" :', error);
    res.status(500).send('Erreur lors de la récupération des données');
  });
});
//get inProgress value 
router.get('/companyC/:id/course/:idCourse', (req, res) => {
  const companyId = req.params.id;
  const courseId = req.params.idCourse;

  pool.query(`
    SELECT inprogress FROM Company_Courses WHERE company_id = $1 and course_id = $2;
  `, [companyId,courseId])
  .then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.error('Erreur lors de la récupération des données dans la table "Company_Courses" :', error);
    res.status(500).send('Erreur lors de la récupération des données');
  });
});
module.exports = router