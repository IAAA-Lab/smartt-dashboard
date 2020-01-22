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
              expect(item[2]).to.equals('mujeres');

          }
        });
    });

  describe('/GET dataset by params', () => {
        it('it should GET dataset with params', (done) => {
          chai.request(server)
              .get('/api/datasets/p_poblacion17/data/total')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
  });


  describe('/GET  total items', () => {
        it('it should GET total items', (done) => {
          chai.request(server)
              .get('/api/datasets/p_poblacion17/total_item/Mujeres')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
  });

  describe('/GET  data territorial entity', () => {
        it('it should GET data territorial entity', (done) => {
          chai.request(server)
              .get('/api/datasets/p_poblacion17/data/total/28')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
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

  describe('/GET data of map', () => {
        it('it should GET data of map', (done) => {
          chai.request(server)
              .get('/api/datasets/p_parque17/map')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
  });

  describe('/GET items of Dataset', () => {
        it('it should GET items of Dataset', (done) => {
          chai.request(server)
              .get('/api/datasets/p_parque17/items/28')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
  });


});
