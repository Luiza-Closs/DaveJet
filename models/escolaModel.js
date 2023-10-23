const connection = require("../database/db");

function listarEscolas(callback) {
  const escolaQuery = "select id_escola, nome from escola;";
  connection.query(escolaQuery, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = {
    listarEscolas
};