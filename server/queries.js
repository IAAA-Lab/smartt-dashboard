const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 25432,
})

const getMujeres16 = (request, response) => {
  pool.query('SELECT SUM(muj2016) FROM p_poblacion16', (error, results) => {
    if (error) {
      return console.error('Error executing query',error.stack)
    }
    response.status(200).json(results.rows)
  })
}

const getHombres16 = (request, response) => {
  pool.query('SELECT SUM(hom2016) FROM p_poblacion16', (error, results) => {
    if (error) {
      return console.error('Error executing query',error.stack)
    }
    response.status(200).json(results.rows)
  })
}

const getMujeres17 = (request, response) => {
  pool.query('SELECT SUM(muj2017) FROM p_poblacion17', (error, results) => {
    if (error) {
      return console.error('Error executing query',error.stack)
    }
    response.status(200).json(results.rows)
  })
}

const getHombres17 = (request, response) => {
  pool.query('SELECT SUM(hom2017) FROM p_poblacion17', (error, results) => {
    if (error) {
      return console.error('Error executing query',error.stack)
    }
    response.status(200).json(results.rows)
  })
}

const getMujeres18 = (request, response) => {
  pool.query('SELECT SUM(muj2018) FROM p_poblacion18', (error, results) => {
    if (error) {
      return console.error('Error executing query',error.stack)
    }
    response.status(200).json(results.rows)
  })
}

const getHombres18 = (request, response) => {
  pool.query('SELECT SUM(hom2018) FROM p_poblacion18', (error, results) => {
    if (error) {
      return console.error('Error executing query',error.stack)
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getMujeres16:getMujeres16,
  getHombres16:getHombres16,
  getMujeres17:getMujeres17,
  getHombres17:getHombres17,
  getMujeres18:getMujeres18,
  getHombres18:getHombres18
}
