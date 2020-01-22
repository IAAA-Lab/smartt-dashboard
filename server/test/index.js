const express = require('express')


let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let expect = chai.expect;
let fetch  = require('node-fetch');


chai.use(chaiHttp);

describe('Dashboard', () => {

  describe('/GET dashboard', () => {
      it('it should GET all dashboards', (done) => {
        chai.request(server)
            .get('/api/dashboard')

            .end((err, res) => {
                  res.should.have.status(200);
                  expect('Content-Type', /json/);
              done();

            });
      });
  });

  describe('/GET dashboard by id', function() {
      it('it should GET dashboard with id is 16', async () => {
        var response = await fetch('http://localhost:3000/api/dashboard/id/16')
        expect(response.status).to.be.equal(200);
        var d = await response.json();
        expect(d.id).to.equals(16);

      });
  });

  describe('/GET dashboard by name', function() {
      it('it should GET dashboard with name is TFG', async () => {
        var response = await fetch('http://localhost:3000/api/dashboard/name/TFG')
        expect(response.status).to.be.equal(200);
        var d = await response.json();
        expect(d.datos.nombre).to.equals("TFG");
      });
  });

  describe('/GET dashboard by data', function() {
      it('it should GET dashboards by data', async () => {
        var response = await fetch('http://localhost:3000/api/dashboard/TFG/data/dashboards')
        expect(response.status).to.be.equal(200);
        var d = await response.json();
        var dashboard = [];
        for (var i in d){
            dashboard.push(i);
        }
        expect(dashboard[0]).to.equals("provincias");
        expect(dashboard[1]).to.equals("municipios");
      });
  });

});

describe('Datasets', () => {

  describe('/GET dataset', () => {
      it('it should GET all dataset', (done) => {
        chai.request(server)
            .get('/api/datasets')
            .end((err, res) => {
                  res.should.have.status(200);
                  expect('Content-Type', /json/);
              done();
            });
      });
  });

  describe('/GET dataset by id', function() {
      it('it should GET dataset with id is 1', async() => {
        var response = await fetch('http://localhost:3000/api/datasets/id/1')
        expect(response.status).to.be.equal(200);
        var d = await response.json();
        expect(d.id).to.equals(1);
      });
  });

  describe('/GET dataset by name', function() {
      it('it should GET dataset with name is m_poblacion16', async() => {
        var response = await fetch('http://localhost:3000/api/datasets/name/m_poblacion16')
        expect(response.status).to.be.equal(200);
        var d = await response.json();
        expect(d.datos.nombre).to.equals("m_poblacion16");
      });
  });

  describe('/GET dataset by year', function() {
      it('it should GET dataset with year is 2017', async() => {
        var response = await fetch('http://localhost:3000/api/datasets/year/2017')
        expect(response.status).to.be.equal(200);
        var d = await response.json();
        for (var i in d){
            expect(d[i].datos.año).to.equals('2017');
        }



      });
  });

  describe('/GET dataset Municipios by items', function() {
      it('it should GET dataset Municipios with item', async() => {
        var response = await fetch('http://localhost:3000/api/datasets/m_poblacion18/item/Hombres')
        expect(response.status).to.be.equal(200);
        var d = await response.json();
        for (var i in d){
            var datos = d[i];
            var item = [];
            for (var j in datos){
                item.push(j);

            }
            expect(item[0]).to.equals('fid');
            expect(item[1]).to.equals('name');
            expect(item[2]).to.equals('hombres');

        }
      });
  });

  describe('/GET dataset Provincias by items', function() {
        it('it should GET dataset Provincias with item', async() => {
          var response = await fetch('http://localhost:3000/api/datasets/p_poblacion18/item/Mujeres')
          expect(response.status).to.be.equal(200);
          var d = await response.json();
          for (var i in d){
              var datos = d[i];
              var item = [];
              for (var j in datos){
                  item.push(j);

              }
              expect(item[0]).to.equals('cod');
              expect(item[1]).to.equals('nom');
              expect(item[2]).to.equals('mujeres');

          }
        });
    });

  describe('/GET dataset by params', function() {
        it('it should GET dataset with params', async() => {
          var response = await fetch('http://localhost:3000/api/datasets/p_poblacion17/data/total')
          expect(response.status).to.be.equal(200);
          var d = await response.json();
          for (var i in d){
              var datos = d[i];
              var item = [];
              for (var j in datos){
                  item.push(j);

              }
              expect(item[0]).to.equals('cod');
              expect(item[1]).to.equals('total');


          }
        });
  });


  describe('/GET  total items', function() {
        it('it should GET total items', async() => {
          var response = await fetch('http://localhost:3000/api/datasets/p_poblacion18/total_item/Mujeres')
          expect(response.status).to.be.equal(200);
          var d = await response.json();
          var total_res = d[0].sum;
          var response = await fetch('http://localhost:3000/api/datasets/p_poblacion18/item/Mujeres')
          expect(response.status).to.be.equal(200);
          var d = await response.json();
          var data_m = 0;
          for (var i in d){
              var datos = d[i];

              for (var j in datos){
                  if (j == 'mujeres'){
                    data_m = data_m + parseInt(datos[j]);
                  }

              }
          }
          expect(parseInt(total_res)).to.equals(data_m);


        });
  });

  describe('/GET  data territorial entity', function() {
        it('it should GET data territorial entity', async() => {
          var response = await fetch('http://localhost:3000/api/datasets/p_poblacion17/data/id/28')
          expect(response.status).to.be.equal(200);
          var d = await response.json();
          expect(d[0].cod).to.equals('28');
          expect(d[0].año).to.equals('2017');
          console.log(d)
        });
  });

  describe('/GET coordinates of territorial entity', () => {
        it('it should GET coordinates of territorial entity', (done) => {
          chai.request(server)
              .get('/api/datasets/m_poblacion18/coordinates/28')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
  });

  describe('/GET data of map', function() {
        it('it should GET data of map', async() => {
          var response = await fetch('http://localhost:3000/api/datasets/m_parque16/mapa')
          expect(response.status).to.be.equal(200);
          var d = await response.json();
          var dashboard = [];
          for (var i in d){
              dashboard.push(i);
          }
          expect(dashboard[0]).to.equals("layers");
          expect(dashboard[1]).to.equals("geom");
        });
  });

  describe('/GET items of Dataset', function() {
        it('it should GET items of Dataset', async() => {
          var response = await fetch('http://localhost:3000/api/datasets/p_poblacion17/items/28')
          expect(response.status).to.be.equal(200);
          var d = await response.json();

          var response = await fetch('http://localhost:3000/api/datasets/p_poblacion17/data/id/28')
          expect(response.status).to.be.equal(200);
          var d_1 = await response.json();
          expect(d_1[0].cod).to.equals('28');
          expect(d_1[0].año).to.equals('2017');

          expect(d_1[0].hombres).to.equals(d[0].hombres);
          expect(d_1[0].mujeres).to.equals(d[0].mujeres);


        });

  });


});
