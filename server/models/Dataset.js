
const Sequelize = require('sequelize');
const sequelize = require('../config/database')

const Dataset = sequelize.define('datasets',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey:true

  },
  datos: {
      type: Sequelize.JSON

  }

},{
  timestamps:false,

});


findAll_dataset = function(){
   return Dataset.findAll().then (result => {return result})
}


findById_dataset = function(id_prov){
   return Dataset.findOne({ where: { id: id_prov }}).then (result => {return result})
}


findByName_dataset = function(nom){
   return Dataset.findOne({ where: { datos: {nombre:nom}  }}).then (result => {return result})
}


findByYear_dataset = function(year){
   return Dataset.findAll({ where: { datos: {año:year}  }}).then (result => {return result})
}



module.exports = {
  Dataset,
  findAll_dataset,
  findById_dataset,
  findByName_dataset,
  findByYear_dataset,

}
