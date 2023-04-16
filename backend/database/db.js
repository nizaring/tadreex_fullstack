const { Pool } = require('pg');

/* const pool = new Pool({
  host: 'postgresql-120210-0.cloudclusters.net',
  port: 18499,
  database : "myDatabase",
  user: "firas",
  password: "fratello123@"
});
 */
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database : "mydatabase",
  user: "postgres",
  password: "fratello123"
});
// Vérification si les tables existent
async function checkIfTablesExist() {
  const query = `
    SELECT EXISTS (
      SELECT 1
      FROM pg_tables
      WHERE schemaname = 'public'
      AND (
        tablename = 'Company'
        OR tablename = 'admin'
        OR tablename = 'Trainingcourse'
        OR tablename = 'Company_Courses'
      )
    );
  `;

  const { rows } = await pool.query(query);
  return rows[0].exists;
}

// Création des tables
async function createTables() {
  try {
    // Création de la table "Company"
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Company (
        company_id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        code VARCHAR(255),
        phone INTEGER NOT NULL,
        companyName VARCHAR(255) NOT NULL,
        trainingCourse VARCHAR(255),
        message TEXT,
        image VARCHAR(255)
      );
    `);

    console.log('Table "Company" créée avec succès');

    // Création de la table "admin"
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id_admin SERIAL PRIMARY KEY,
        email VARCHAR(255),
        password VARCHAR(255)
      );
    `);

    console.log('Table "admin" créée avec succès');

    // Création de la table "Trainingcourse"
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Trainingcourse (
        course_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price NUMERIC,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        apk_file VARCHAR(255) NOT NULL
      );
    `);

    console.log('Table "Trainingcourse" créée avec succès');

    // Création de la table de liaison "Company_Courses"
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Company_Courses (
        company_id INTEGER REFERENCES Company(company_id),
        course_id INTEGER REFERENCES Trainingcourse(course_id),
        date_achat DATE NOT NULL,
        isPurchased BOOLEAN DEFAULT false,
        inProgress BOOLEAN,
        PRIMARY KEY (company_id, course_id)
      );
    `);

    console.log('Table "Company_Courses" créée avec succès');
  } catch (error) {
    console.error('Erreur lors de la création des tables :', error);
  } finally {
    // pool.end();
  }
}

// Vérification et création des tables
checkIfTablesExist()
  .then((tablesExist) => {
    if (tablesExist) {
      console.log('Les tables existent');
    } else {
      console.log('Les tables n\'existent pas');
      createTables();
    }
  })
  .catch((error) => {
    console.error('Erreur lors de la vérification des tables :', error);
  });
  
module.exports = pool;
