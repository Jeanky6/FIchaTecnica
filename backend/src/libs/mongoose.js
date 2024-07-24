const mongoose = require("mongoose");
const {
  dbHost,
  dbPort,
  dbName,
  dbNameCloud,
  dbUsername,
  dbPassword,
} = require("../config/config")  ;

const DB_URICLOUD = `mongodb+srv://${dbUsername}:${dbPassword}@${dbNameCloud}.pkkyfqz.mongodb.net/`;
const DB_URI = `mongodb://${dbHost}:${dbPort}/${dbName}`;
const DB_URIPRUEBA=`mongodb+srv://jeankyt06:fichat123@fichatecnica.a7pj0jn.mongodb.net/?retryWrites=true&w=majority&appName=FichaTecnica`
const connect = () => {
  try {
    mongoose.connect(DB_URIPRUEBA);
    console.log("DB CONNECT!!!!!");
  } catch (error) {
    console.log(`Error en la conexion: ${error}`);
  }
};

module.exports = connect;
