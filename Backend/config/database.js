import mysql from 'mysql';

const dbConfig = {
  host: '147.232.47.244',
  user: 'Poiasnik',
  password: '408382838',
  database: 'Poiasnik',
};

const db = mysql.createConnection(dbConfig);

db.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
  console.log('Successfully connected to the database.');
});

export default db;
