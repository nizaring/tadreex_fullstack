const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require("../database/db");
//const nodemailer = require('nodemailer')
//const {EMAIL,PASSWORD}= requiret('../env.js')



//authentification CODE //
// Define a secret key to sign and verify JSON Web Tokens (JWTs)
const JWT_SECRET = 'my-secret-key';

// Authenticate user
router.post('/api/login', async(req, res) => {
    const { email, password } = req.body;
    // Use a database query to find the user with the given email in the admin table
    pool.query('SELECT * FROM admin WHERE email = $1', [email], (err, result) => {
      if (err || result.rows.length === 0) {
        // If user not found in the admin table, check the company table
        pool.query('SELECT * FROM company WHERE email = $1', [email], (err, result) => {
          if (err || result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email' });
          }
          // Compare the password with the hashed password in the database
          bcrypt.compare(password, result.rows[0].password, (err, passwordMatch) => {
            if (err || !passwordMatch) {
              return res.status(401).json({ message: 'Invalid password' });
            }
            // Sign a JWT with the user's ID as the payload
            const token = jwt.sign({ companyId: result.rows[0].id }, JWT_SECRET);
  
            // Return the JWT as a response to the client
            res.json({ token });
          });
        });
      } else {
        // Compare the password with the hashed password in the database
        bcrypt.compare(password, result.rows[0].password, (err, passwordMatch) => {
          if (err || !passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
          }
          // Sign a JWT with the user's ID as the payload
          const token = jwt.sign({ adminId: result.rows[0].id }, JWT_SECRET);
  
          // Return the JWT as a response to the client
          res.json({ token });
        });
      }
    });
  });
  


// Verify JWT and return user data
router.get('/api/user', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      // Check if the decoded token contains companyId or adminId
      if (decoded.companyId) {
        // If companyId is present, use a database query to find the company with the given ID
        pool.query('SELECT * FROM company WHERE id = $1', [decoded.companyId], (err, result) => {
          if (err || result.rows.length === 0) {
            return res.status(401).json({ message: 'User not found' });
          }
          // Return the user data as a response to the client
          res.json({ email: result.rows[0].email });
        });
      } else if (decoded.adminId) {
        // If adminId is present, use a database query to find the admin with the given ID
        pool.query('SELECT * FROM admin WHERE id = $1', [decoded.adminId], (err, result) => {
          if (err || result.rows.length === 0) {
            return res.status(401).json({ message: 'User not found' });
          }
          const user = result.rows[0];
          // Return the user data as a response to the client
          res.json({ email: user.email });
        });
      }
    });
  });

/* router.post('/forgetPassword', async (req, res) => {
try {
  // Récupérer l'adresse e-mail de l'utilisateur à partir du corps de la requête
  const { email } = req.body;

  // Créer un compte de test avec nodemailer
  let testAccount = await nodemailer.createTestAccount();

  // Créer un objet transporter réutilisable en utilisant le transport SMTP par défaut
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true pour 465, false pour les autres ports
    auth: {
      user: testAccount.user, // utilisateur éthéréal généré
      pass: testAccount.pass, // mot de passe éthéréal généré
    },
  });

  // Créer un message de réinitialisation de mot de passe
  let message = {
    from: '"Nom de l\'expéditeur" <foo@example.com>', // adresse expéditeur
    to: email, // adresse destinataire
    subject: "Réinitialisation de mot de passe", // objet
    text: "Cliquez sur le lien suivant pour réinitialiser votre mot de passe", // texte brut
    html: "<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe:</p><a href='https://example.com/reset-password'>Réinitialiser le mot de passe</a>", // corps HTML
  };

  // Envoyer le message avec l'objet transporter
  let info = await transporter.sendMail(message);

  // Envoyer une réponse indiquant que l'e-mail a été envoyé avec succès
  return res.status(201).json({msg: "Vous devriez recevoir un e-mail pour réinitialiser votre mot de passe.",info:info.messageId,preview:nodemailer.getTestMessageUrl(info)});
} catch (error) {
  // Si une erreur survient, envoyer une réponse d'erreur
  return res.status(500).json({msg: error});
  }
}); */
  
/* router.post('/forgetPassword', async (req, res) => {
  let config = {
    service : 'gmail',
    auth: {
      user:'',
      pass:''
    },
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true pour 465, false pour les autres ports
    auth: {
      user: testAccount.user, // utilisateur éthéréal généré
      pass: testAccount.pass, // mot de passe éthéréal généré
    },
  }
}); */
  

module.exports = router