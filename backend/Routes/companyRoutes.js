const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../database/db");

//(POST for create an account)
const saltRounds = 10; // Choose a number between 10 and 12 for salt rounds
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Company/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/submit-company", upload.single("image"), (req, res) => {
  const formData = {
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    companyName: req.body.companyName,
    message: req.body.message,
    imageName: req.file.filename,
  };

  bcrypt.hash(formData.password, saltRounds, function (err, hash) {
    if (err) {
      console.error("Erreur de cryptage du mot de passe", err.stack);
      res.status(500).send("Erreur de cryptage du mot de passe");
    } else {
      const query = {
        text: "INSERT INTO company(email, password, phone, companyname, message, image) VALUES($1, $2, $3, $4, $5, $6)",
        values: [
          formData.email,
          hash,
          formData.phone,
          formData.companyName,
          formData.message,
          formData.imageName,
        ],
      };

      pool.query(query, (err, dbRes) => {
        if (err) {
          console.error("Erreur d'insertion", err.stack);
          res.status(500).send("Erreur d'insertion");
        } else {
          console.log("Données insérées avec succès");
          res.status(200).send("Données insérées avec succès");
        }
      });
    }
  });
});
//(GET all from admin table)
router.get("/admin", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT email,password FROM admin");
    res.json(result.rows);
    console.log(result.rows)
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving admin table content.");
  }
});
//(GET all from company table)
router.get("/company", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM company");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving training courses.");
  }
});
router.get(`/api/check-email/:email`, (req, res) => {
  const { email } = req.params;

  // Query the admin table
  const adminQuery = `SELECT email FROM admin WHERE email = '${email}'`;
  pool.query(adminQuery, (adminError, adminResults) => {
    if (adminError) {
      res.status(500).send('Error querying the database');
    } else if (adminResults.rowCount > 0) {
      res.status(200).send(true);
    } else {
      // Query the company table
      const companyQuery = `SELECT email FROM company WHERE email = '${email}'`;
      pool.query(companyQuery, (companyError, companyResults) => {
        if (companyError) {
          res.status(500).send('Error querying the database');
        } else if (companyResults.rowCount > 0) {
          res.status(200).send(true);
        } else {
          res.status(200).send(false);
        }
      });
    }
  });
});


//(DELETE)
router.delete("/company/:id_company", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Suppression des formations liées à l'entreprise
    const deleteFormationQuery =
      "DELETE FROM company_courses WHERE company_id = $1";
    await client.query(deleteFormationQuery, [req.params.id_company]);

    // Suppression de l'entreprise
    const deleteCompanyQuery = "DELETE FROM company WHERE company_id = $1";
    const result = await client.query(deleteCompanyQuery, [
      req.params.id_company,
    ]);

    await client.query("COMMIT");

    res.json(result.rowCount);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).send("Error deleting company.");
  } finally {
    client.release();
  }
});

//(UPDATE code)
router.put("/update-company/:id_company", (req, res) => {
  const companyId = req.params.id_company;
  const formData = {
    code: req.body.code,
  };
  const query = {
    text: "UPDATE company SET code=$1 WHERE company_id=$2",
    values: [formData.code, companyId],
  };
  pool.query(query, (err, dbRes) => {
    if (err) {
      console.error("Erreur de mise à jour", err.stack);
      res.status(500).send("Erreur de mise à jour");
    } else if (dbRes.rowCount === 0) {
      console.log("Aucune entreprise trouvée avec cet ID");
      res.status(404).send("Aucune entreprise trouvée avec cet ID");
    } else {
      console.log("Entreprise mise à jour avec succès");
      res.status(200).send("Entreprise mise à jour avec succès");
    }
  });
});

//(GET all BY email) ** à voir aprés changement de conception
router.get("/company/:email", async (req, res) => {
  try {
    const companyEmail = req.params.email;
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM company WHERE email = $1",
      [companyEmail]
    );
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving company.");
  }
});

//(VERIFIER SI CODE IS NULL OR NOT)
router.get("/companyCode/:email", async (req, res) => {
  try {
    const companyEmail = req.params.email;
    const client = await pool.connect();
    const result = await client.query(
      "SELECT (code IS NOT NULL) AS hasCode FROM company WHERE email = $1",
      [companyEmail]
    );
    res.json(result.rows[0].hascode);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving company.");
  }
});

//(update trainingcourse champs by code) ** à voir aprés changement de conception(je cherche la solution)
router.put("/updateCompany/:code", (req, res) => {
  const code = req.params.code;
  const formData = {
    trainingcourse: req.body.trainingcourse, // ajout du champ trainingcourse
  };
  const query = {
    text: "UPDATE company SET trainingcourse=$1 WHERE code=$2", // ajout de trainingcourse dans la requête
    values: [formData.trainingcourse, code],
  };
  pool.query(query, (err, dbRes) => {
    if (err) {
      console.error("Erreur de mise à jour", err.stack);
      res.status(500).send("Erreur de mise à jour");
    } else if (dbRes.rowCount === 0) {
      console.log("Aucune entreprise trouvée avec cet ID");
      res.status(404).send("Aucune entreprise trouvée avec cet ID");
    } else {
      console.log("Entreprise mise à jour avec succès");
      res.status(200).send("Entreprise mise à jour avec succès");
    }
  });
});
//get by code ** à voir aprés changement de conception
router.get("/check-company-by-code/:code", async (req, res) => {
  const code = req.params.code;
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM company WHERE code = $1", [
      code,
    ]);
    if (result.rowCount === 0) {
      res.json(false);
    } else {
      res.json(true);
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving company.");
  }
});
//get course name By code ** à voir aprés changement de conception
router.get("/checkCourses/:code", async (req, res) => {
  const code = req.params.code;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT trainingcourse FROM company WHERE code = $1",
      [code]
    );
    if (result.rowCount === 0) {
      res.status(404).send("Company not found.");
    } else {
      res.json(result.rows[0].trainingcourse);
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving company.");
  }
});
// Changer le mot de passe client
router.post("/changer-mot-de-passe", (req, res) => {
  const email = req.body.email; // Email de l'utilisateur connecté
  const oldPassword = req.body.ancien_mot_de_passe;
  const newPassword = req.body.nouveau_mot_de_passe;
  const confirmPassword = req.body.confirmation_mot_de_passe;

  // Vérifier si les nouveaux mots de passe sont identiques
  if (newPassword !== confirmPassword) {
    return res.status(400).send("Les nouveaux mots de passe ne sont pas identiques");
  }

  // Vérifier si l'ancien mot de passe est correct
  pool.query("SELECT * FROM company WHERE email = $1", [email], (err, dbRes) => {
    if (err) {
      console.error("Erreur lors de la récupération des données de l'entreprise", err.stack);
      return res.status(500).send("Erreur lors de la récupération des données de l'entreprise");
    } else {
      if (dbRes.rows.length === 0) {
        return res.status(400).send("L'entreprise n'existe pas");
      } else {
        const hash = dbRes.rows[0].password;
        bcrypt.compare(oldPassword, hash, (err, result) => {
          if (err) {
            console.error("Erreur de comparaison des mots de passe", err.stack);
            return res.status(500).send("Erreur de comparaison des mots de passe");
          } else {
            if (result) {
              // Le mot de passe est correct, on peut le changer
              bcrypt.hash(newPassword, saltRounds, (err, hash) => {
                if (err) {
                  console.error("Erreur de cryptage du nouveau mot de passe", err.stack);
                  return res.status(500).send("Erreur de cryptage du nouveau mot de passe");
                } else {
                  const query = {
                    text: "UPDATE company SET password = $1 WHERE email = $2",
                    values: [hash, email],
                  };
                  pool.query(query, (err, dbRes) => {
                    if (err) {
                      console.error("Erreur lors de la mise à jour du mot de passe", err.stack);
                      return res.status(500).send("Erreur lors de la mise à jour du mot de passe");
                    } else {
                      console.log("Mot de passe mis à jour avec succès");
                      return res.status(200).send("Mot de passe mis à jour avec succès");
                    }
                  });
                }
              });
            } else {
              // Le mot de passe est incorrect
              return res.status(400).send("L'ancien mot de passe est incorrect");
            }
          }
        });
      }
    }
  });
});
// Changer le mot de passe admin
router.post("/changer-password", (req, res) => {
  const email = req.body.email; // Email de l'utilisateur connecté
  const oldPassword = req.body.ancien_mot_de_passe;
  const newPassword = req.body.nouveau_mot_de_passe;
  const confirmPassword = req.body.confirmation_mot_de_passe;

  // Vérifier si les nouveaux mots de passe sont identiques
  if (newPassword !== confirmPassword) {
    return res.status(400).send("New passwords are not the same");
  }

  // Vérifier si l'ancien mot de passe est correct
  pool.query("SELECT * FROM admin WHERE email = $1", [email], (err, dbRes) => {
    if (err) {
      console.error("Error retrieving admin data", err.stack);
      return res.status(500).send("Error retrieving admin data");
    } else {
      if (dbRes.rows.length === 0) {
        return res.status(400).send("The admin does not exist");
      } else {
        const hash = dbRes.rows[0].password;
        bcrypt.compare(oldPassword, hash, (err, result) => {
          if (err) {
            console.error("Password comparison error", err.stack);
            return res.status(500).send("Password comparison error");
          } else {
            if (result) {
              // Le mot de passe est correct, on peut le changer
              bcrypt.hash(newPassword, saltRounds, (err, hash) => {
                if (err) {
                  console.error("Error encrypting new password", err.stack);
                  return res.status(500).send("Error encrypting new password");
                } else {
                  const query = {
                    text: "UPDATE admin SET password = $1 WHERE email = $2",
                    values: [hash, email],
                  };
                  pool.query(query, (err, dbRes) => {
                    if (err) {
                      console.error("Error updating password", err.stack);
                      return res.status(500).send("Error updating password");
                    } else {
                      console.log("MPassword successfully updated");
                      return res.status(200).send("Password successfully updated");
                    }
                  });
                }
              });
            } else {
              // Le mot de passe est incorrect
              return res.status(400).send("L'ancien mot de passe est incorrect");
            }
          }
        });
      }
    }
  });
});

module.exports = router;
