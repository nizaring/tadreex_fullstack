const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const http = require("http");
const cors = require('cors')
app.use(cors());
const { Server } = require("socket.io");

const server = http.createServer(app);

const fs = require('fs');

// Setup body parser to parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('uploads'));


// Create a connection pool
const pool = require('./database/db');

//Authentification//
const authentification = require('./Routes/authentificationRoutes')
app.use(authentification)

//CRUD company//
const company = require('./Routes/companyRoutes')
app.use(company)

//CRUD Trainingcourse//
const courseRoutes = require('./Routes/courseRoutes')
app.use(courseRoutes)

//CompanyCourcesRoute//
const companycourses = require('./Routes/Company_Courses')
app.use(companycourses)

// Définition de la route pour télécharger un fichier APK
app.get('/downloadApk', function(req, res){
  const file = 'uploads/Facebook Lite_30.69_Apkpur.apk'; // Chemin relatif du fichier APK à télécharger
  fs.readFile(file, function (err, data) {
    if (err) {
      res.status(404).send('Fichier introuvable');
    } else {
      res.setHeader('Content-disposition', 'attachment; filename=Facebook Lite_30.69_Apkpur.apk'); // Nom du fichier téléchargé
      res.setHeader('Content-type', 'application/vnd.android.package-archive'); // Type de fichier APK
      res.send(data);
    }
  });
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


// Connect to Firebase
const admin = require("firebase-admin");

const serviceAccount = {
  "type": "service_account",
  "project_id": "tadreex-39635",
  "private_key_id": "ad3a7a6142e10ef80c43ae6cd6d9dfbc80bcab57",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+qMitNTdkYpsw\noF2w5SCvbdAKIZj3FQQvLr8vBqUJI39Op2IL+8UXXF1jEqyhFd+6UwSVNXdFylyc\nY0nWm7Pa2ng9A3hZyHDT6kTLqmVEf939Uacu5ZSSnwzKxmPojzv4/LqOn78n9yAj\n42aJEAWiyACQzmU6NR03wv7JXHP8ZSjRc00xTTDhya/moN42KLeEDW7OUgM0lt0q\nE9zGnlkou720u7Czj2PHw266tpQdG/4WO1W0eEvC9oX/6bQHTIp98WS6pBPZx923\nrpK+heMzfY/WGi0XxqxRvmgYuGFefM3AYEHA03Ew/IWnx5vSf//wJLYaHu9RyQke\nr/iy1Fi7AgMBAAECggEAWudAnwzjdzJoidu8MA5e8iWqblosg4n6r8BbGUHSyDOr\njEXUQqBtDUFVqVoLAtbaEA1q/vU6BAWC+HGCkBc2vp8xeu2/oRcnbHKjEHQSyoEo\nx5H54ytFFk9NGxVSJ1y7nHBrRns1+gkiwtm2Vp1UApPXaTNvIjyWzLJlJn61Ml34\ndIQDAcy4+EjclV/hCoW9+HMJKod4l+yOdBBRw0iDdeYkHSsCZwq/3TXbeHfCrdiJ\nRhiMNbKsb/bpw9w8+ciYicCaHtd/o8yQg3Y40YvQJusgHHccv5T6V9R8QKuSTfu4\njuBc+D/34jOIFFiQ8nH2lU9NUbdk1bFdCNoZvsu3cQKBgQD8hqPq0g0pLdbHyiUg\noE8QrKOa/fK/lSd1PBuhO2jkFOxMN16EZjn5E5pBOvRhm9IiTZZYTi1EDRWOkOhP\nw5nzi2H7rqpt65237poP2F1teNfVgxmjdBNAMIZZEXhs1ymCuX0Cejj0Quj5ySIf\nnk9PhUwLqKvOl4lAwaS5CMftSQKBgQDBSEIgzobZtWRk7SqOChEQTj3TvE+bUsYo\nAzcle96h3S0Hh6UXxUIoBeLclZ1zkTJ3lsjfKotG3yKAuu2O6nk2geI3Q4aAt1yF\nwWwKbyks1PXYR8jKzJfjFRhV5yCaApodgtZFZApomBbzx6LDRJv5MykyG3wzcGwd\nttHDYWpp4wKBgBry+3dJ52GnpK45onCy6v0qj2MxCsDrWASo34H7ZxxAJ1+S4SFc\nD3/HWcTwV7g6+tfyU8MkxKvogY5vZHtusnVNQK2tXD7S0EgazJI4UvAl31LH5OqO\nrqdBBnVm6eUjqShsRy0GgiF/KoHNtziMmoYwAYeU/pDTlzAz+jJM/5kRAoGAHdxZ\nAxKFOOtSSFlvwqQBgOBloumr7tY58QKWKX9apO0zwL8PHX4HO4G1S9j9i1Y6UsmD\n3R6Ih/l/Lh4zB2poMaidV2ZiSE6Lx8pbM716wgdgt/pXJiW3rYibyuG7Yq/WOYr2\nKaBMD1635Q/JsJtP8Y8a5Tfj11qeCXUuMR5Cv3sCgYEAn7G3OoMaQv6EW+lhyqF+\nFVQuC27xt78WkSqDAMlD/VWKs8TYyyVEcbgu+ChFa4n/A/L6lLb70vFwys0tZcaZ\n0hoaXesjsS15X8fZ/ZdHPSJB8Nxm9w0ymDimrldZq4mtyS2RqyTlioiW2+yY1EnG\nPPxJk/D5nGr0Kl1zOuCR0o0=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-x4i3y@tadreex-39635.iam.gserviceaccount.com",
  "client_id": "111208393977202350762",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x4i3y%40tadreex-39635.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const employeeRef = db.collection("Employee");

app.get("/employees", (req, res) => {
  employeeRef.get()
    .then((querySnapshot) => {
      const employees = [];
      querySnapshot.forEach((document) => {
        employees.push(document.data());
      });
      res.status(200).send(employees);
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
      res.status(500).send(error);
    });
});

//server
const port = 3000;
// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});