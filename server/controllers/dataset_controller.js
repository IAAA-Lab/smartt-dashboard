const Dataset = require('../models/Dataset')
const Dataset_queries = require('../models/Dataset_queries')
const bodyParser = require('body-parser')



function getDataset (request, response){
   Dataset.findAll_dataset()
    .then(prov => response.status(200).send(JSON.stringify(prov)));

}

function getDatasetById (request, response){
  Dataset.findById_dataset(request.params.id)
    .then(prov => response.status(200).send(JSON.stringify(prov)));

}

function getDatasetByName (request, response){
  Dataset.findByName_dataset(request.params.name)
    .then(prov => response.status(200).send(JSON.stringify(prov)));

}

function getDatasetByYear (request, response){
  Dataset.findByYear_dataset(request.params.year)
    .then(prov => response.status(200).send(JSON.stringify(prov)));

}



function getAllData (request, response){
  Dataset_queries.findAll_data(request.params.id)
    .then(prov => response.status(200).send(JSON.stringify(prov)));

}


function getDataByItems (request, response){
  Dataset_queries.findByItems(request.params.id, request.params.name_item)
    .then(prov => response.status(200).send(JSON.stringify(prov)));

}

function getDataByParams (request, response){
  Dataset_queries.findByData(request.params.id, request.params.name_data)
    .then(prov => response.status(200).send(JSON.stringify(prov)));

}

function getTotalByItems(request, response){
  Dataset_queries.TotalItems(request.params.id, request.params.name_item)
    .then(prov => response.status(200).send(JSON.stringify(prov)));

}

function getDataById(request, response){
  Dataset_queries.findById(request.params.id, request.params.name_data, request.params.id_data)
    .then(prov => response.status(200).send(JSON.stringify(prov)));

}

function getCoordinates(request, response){
  Dataset_queries.findCoordinates(request.params.id, request.params.id_data)
    .then(prov => response.status(200).send(JSON.stringify(prov)));

}


module.exports = {
  getDataset,
  getDatasetById,
  getDatasetByName,
  getDatasetByYear,
  getAllData,
  getDataByItems,
  getDataByParams,
  getTotalByItems,
  getDataById,
  getCoordinates
}
