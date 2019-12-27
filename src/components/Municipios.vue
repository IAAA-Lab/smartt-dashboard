<template>
  <div>
    <header id="main-header">
          <p>SMARTT-DASHBOARD</p>
          <button type="button" class="btn btn-primary float-right" @click="redirigir()" style="margin-top:1%; margin-right:1%">Elegir Provincia</button>

    </header>

    <div id ="info">
      <div id ="info1"> <!--widget 1 -->

      </div>

      <div id ="info2"> <!--widget 2 -->

      </div>

      <div id ="info3"> <!--widget 3 -->

      </div>
      <div id ="info4"> <!--widget 3 -->

      </div>

    </div>
    <div id="container">
       <div id="mapa-header">
            <p>Mapa Comunidades</p>
       </div>

       <div id="map"></div>

       <div id="eleccion">

         <div class="well well-sm" style="font-weight:bold; font-size: 19px;"> Datos por municipos</div>
         <span style="font-weight:80; margin-left:4%">Elige el año </span>
         <div class="form-check" v-for="item in years" :key=item style="width:100%; margin:6%">
            <input class="form-check-input" type="radio" @change="layerChanged()" v-model="year_select" name="year" id="year" :value=item style="margin:2%">
            <label class="form-check-label" for="year" style="margin-left:5%" >
              {{item}}
            </label>

         </div>
         <span style="font-weight:80; margin-left:4%">Elige variable de interés</span>
         <div class="form-check" v-for="variable in items" :key=variable style="width:100%; margin:6%">
           <input class="form-check-input" type="radio" @change="layerChanged()" v-model="item_select" :value=variable style="margin:2%">
           <label class="form-check-label" for="f" style="margin-left:5%" >
             {{variable}}
           </label>

         </div>

        {{prueba}}
       </div>

    </div>

    <div id="grafica-container">
        <div id="grafica">
          <ul class="nav nav-tabs">
            <li class="nav-item active">
              <a class="nav-link" data-toggle="tab" href="#p_mun">Población {{ mun[1]}}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#v_mun">Vehiculos {{ mun[1] }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#comparacion">Comparar Población</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab" href="#comparacion_v">Comparar Vehículos</a>
            </li>

          </ul>



          <div class="tab-content">
            <div id="p_mun" class="container tab-pane fade"><br>
              <highcharts :options="chartOptions_mun" style="width:80%"></highcharts>
              <div class="dropdown" >
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:80%">
                  Tablas de datos
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:80%">
                  <button type="button" class="btn float-right" @click="descargarCSV(p_poblacion,tabla_th)" style="margin-top:1%; margin-right:1%">Descargar CSV</button>
                  <div class="table-responsive" style="margin-top:5%">
                    <table class="table" style="margin-top:2%">
                      <thead class="thead-dark">
                        <tr>
                           <th v-for="t in tabla_th">{{t}}</th>

                         </tr>
                      </thead>
                      <tbody>
                        <template v-for="item in p_poblacion">
                              <tr>
                                  <td v-for="i in item">{{i}}</td>
                              </tr>
                        </template>

                          </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div id="v_mun" class="container tab-pane fade"><br>
              <highcharts :options="chartOptions_v_mun" style="width:80%"></highcharts>
              <div class="dropdown" >
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:80%">
                  Tablas de datos
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:80%">
                  <button type="button" class="btn float-right" @click="descargarCSV(p_parque,tabla_th_v)" style="margin-top:1%; margin-right:1%">Descargar CSV</button>
                  <div class="table-responsive" style="margin-top:5%">
                    <table class="table" style="margin-top:2%">
                     <thead class="thead-dark">
                       <tr>
                          <th v-for="t in tabla_th_v">{{t}}</th>

                        </tr>
                     </thead>
                     <tbody>
                       <template v-for="item in p_parque">
                             <tr>
                                 <td v-for="i in item">{{i}}</td>
                             </tr>
                       </template>

                         </tr>
                     </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div id="comparacion" class="container tab-pane fade"><br>
              <h5>Elige un municipio para la comparación</h5>
              <select name="mun" id="comp_p" @change="cargar_datos_pob(mun_select_p,1)" v-model="mun_select_p" class="form-control" style="height:40px; width:80%">
                 <option v-for="item in municipios" :value=[item.fid,item.nom]>{{item.nom}}</option>
              </select>
              <highcharts :options="chartOptions_comp_poblacion" style="width:80%; margin-top:5%"></highcharts>
              <div class="dropdown" >
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:80%">
                  Tablas de datos
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:80%">
                  <button type="button" class="btn float-right" @click="descargarCSV(p_poblacion_c,tabla_th)" style="margin-top:1%; margin-right:1%">Descargar CSV</button>
                  <div class="table-responsive" style="margin-top:5%">
                    <table class="table" style="margin-top:2%">
                      <thead class="thead-dark">
                         <tr>
                            <th v-for="t in tabla_th">{{t}}</th>
                         </tr>
                      </thead>
                      <tbody>
                        <template v-for="item in p_poblacion_c">
                              <tr>
                                  <td v-for="i in item">{{i}}</td>
                              </tr>
                        </template>

                          </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>

            <div id="comparacion_v" class="container tab-pane fade"><br>
              <h5>Elige un municipio para la comparación</h5>
              <select name="mun_v" id="comp_v" @change="cargar_datos_v(mun_select_v,1)" v-model="mun_select_v" class="form-control" style="height:40px; width:80%">
                 <option v-for="item in municipios" :value=[item.fid,item.nom]>{{item.nom}}</option>
              </select>
              <highcharts :options="chartOptions_comp_vehiculos" style="width:80%;  margin-top:5%"></highcharts>
              <div class="dropdown" >
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width:80%">
                    Tablas de datos
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:80%">
                    <button type="button" class="btn float-right" @click="descargarCSV(p_parque_c,tabla_th_v)" style="margin-top:1%; margin-right:1%">Descargar CSV</button>
                    <div class="table-responsive" style="margin-top:5%;">
                      <table class="table" style="margin-top:2%">
                        <thead class="thead-dark">
                           <tr>
                              <th v-for="t in tabla_th_v">{{t}}</th>
                           </tr>
                        </thead>
                        <tbody>
                          <template v-for="item in p_parque_c">
                                <tr>
                                    <td v-for="i in item">{{i}}</td>
                                </tr>
                          </template>

                            </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
               </div>




            </div>




          </div>
        </div>

    </div>

  </div>
</template>

<script>
import { LMap, LWMSTileLayer, LControlLayers } from "vue2-leaflet";
const axios = require('axios');
require('babel-polyfill');
export default {
    name: 'Provincias',
    components: {
        LMap,
        "l-wms-tile-layer": LWMSTileLayer,
        LControlLayers,
    },
    props: ['mun', 'mapa_mun', 'mapa_v_mun'],
    data() {
             return {
               map: [],
               wmsLayer_p: [],
               wmsLayer_m: [],
               layers: [],
               layers_m: [],
               years:[],
               legends: [],
               items_pob: [],
               items_v: [],
               items_v_mod: [],
               items:[],

               year_select: null,
               item_select: null,
               ourCustomLegend: null,
               ourCustomLegend_m: null,
               checked: false,
               cont_series: null,


               prueba: [],


               title: '',
               modo: 'line',

               series_mun: [],
               series_v_mun: [],
               series_comp_poblacion: [],
               series_comp_vehiculos: [],
               p_poblacion: [],
               p_parque:[],
               p_poblacion_c:[],
               p_parque_c:[],
               municipios: [],
               mun_select_p: [],
               mun_select_v: [],
               tabla_th: [],
               tabla_th_v: [],
               entrar: false,

              }

        },
      computed: {

          chartOptions_mun() {
              return {
                      chart: {  type: this.modo},
                      title: {  text: this.title  },
                      xAxis: {
                                categories: []
                              },
                      series: this.series_mun,
               }
          },

          chartOptions_v_mun() {
               return {
                       chart: {  type: this.modo},
                       title: {  text: this.title  },
                       xAxis: {
                                 categories: []
                               },
                       series: this.series_v_mun,
                }
          },
          chartOptions_comp_poblacion() {
               return {
                       chart: {  type: this.modo},
                       title: {  text: this.title  },
                       xAxis: {
                                 categories: []
                               },
                       series: this.series_comp_poblacion
                }
          },
          chartOptions_comp_vehiculos() {
               return {
                       chart: {  type: this.modo},
                       title: {  text: this.title  },
                       xAxis: {
                                 categories: []
                               },
                       series: this.series_comp_vehiculos
                }
          },
      },
      mounted(){
          this.cargarMunicipios();
          this.cargar_datos_dashboard();
          this.initMap();
          this.cargar_datos_pob(this.mun,0);
          this.cargar_datos_v(this.mun,0);



      },
      methods: {

         cargarMunicipios(){

            axios({
              method: 'get',
              url: 'http://localhost:3000/api/datasets/m_poblacion18/data/name'}
            ).then(response => {
               var data = response.data
               for(var key in data){
                 this.municipios.push({"fid": data[key].fid, "nom": data[key].name});
               }

              }
            ).catch(function (error) {
              console.log('Error: ' + error);
            });
         },

         initMap(){
            const map = L.map( 'map', {
                maxZoom: 16,
                attributionControl: false,
                //maxBounds: [[25.25,-22.38],[43.28,7.67]]
            });

            this.map = map;
            axios({
               method: 'get',
               url: 'http://localhost:3000/api/datasets/m_poblacion18/coordinates/'+this.mun[0]}
            ).then(response => {
                var coord = response.data[0];
                var aux= [];
                for (var item in coord){
                  aux.push(coord[item])
                }
                this.map.fitBounds([[aux[0],aux[1]],[aux[2],aux[3]]])
               }
            ).catch(function (error) {
               console.log('Error: ' + error);
            });

            L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: ['a','b','c'],

            },).addTo( map );
         },

         cargar_datos_dashboard(){
             var data = [];
             var aux;
             var layers;
             var idx;
             var cadenas, concat;

             for (var item in this.mapa_mun){
              this.years.push(this.mapa_mun[item].año);
              layers = this.mapa_mun[item].layers;

              for (var j in layers){
                 idx = this.items_pob.indexOf(layers[j].name);
                 if (idx == -1){
                  this.items_pob.push(layers[j].name);
                  this.items.push(layers[j].name);

                 }
              }
             }
             this.years.sort();
             for (var item in this.mapa_v_mun){
               layers = this.mapa_v_mun[item].layers;

               for (var j in layers){
                  idx = this.items_v.indexOf(layers[j].name);
                  if (idx == -1){
                   this.items_v.push(layers[j].name);
                   this.items.push(layers[j].name);
                  }
               }
             }

             for (var i=0; i<this.items_v.length; i++){
                idx = this.items_v[i].indexOf(" ");
                if (idx !== -1){
                 cadenas = this.items_v[i].split(" ");
                 concat = cadenas[0];
                 for (var j=1; j<cadenas.length; j++){

                     if (cadenas[j] !== "y"){
                        concat += "_" + cadenas[j];
                     }

                 }
                 this.items_v_mod.push(concat);
                }
                else{
                  this.items_v_mod.push(this.items_v[i]);
                }

             }

             for (var i=0; i<this.items_pob.length; i++){
                 this.series_mun.push({name: this.items_pob[i]+" "+this.mun[1],title:this.items_pob[i], data: []});
                 this.series_comp_poblacion.push({name: this.items_pob[i]+" "+this.mun[1],title:this.items_pob[i], data: []});
             }
             for (var i=0; i<this.items_pob.length; i++){
                  this.series_comp_poblacion.push({name: this.items_pob[i],title:this.items_pob[i], data: []});
             }

             for (var i=0; i<this.items_v.length; i++){
                 this.series_v_mun.push({name: this.items_v[i]+" "+this.mun[1],title:this.items_v_mod[i], data: []});
                 this.series_comp_vehiculos.push({name: this.items_v[i]+" "+this.mun[1], title:this.items_v_mod[i], data: []});
             }
             for (var j=0; j<this.items_v.length; j++){
                 this.series_comp_vehiculos.push({name: this.items_v[j],title:this.items_v_mod[j], data: []});

             }


         },

         layerChanged() {

            var layer_legend;
            var layer_nom;
            var layer_title;
            var layer_year;
            var layers;
            var legends;

            if (this.year_select && this.item_select ){

                for (var item in this.mapa_mun){
                  layer_year = this.mapa_mun[item].año;
                  if (layer_year == this.year_select){
                    layers = this.mapa_mun[item].layers;
                    legends = this.mapa_mun[item].legend;
                    for (var j in layers){
                       if (layers[j].name == this.item_select){
                            layer_title = layers[j].title;
                       }
                    }
                    for (var j in legends){
                       if (legends[j].name == this.item_select){
                            layer_legend = legends[j].title;
                       }
                    }
                  }

                }

                for (var item in this.mapa_v_mun){
                  layer_year = this.mapa_v_mun[item].año;
                  if (layer_year == this.year_select){
                    layers = this.mapa_v_mun[item].layers;
                    legends = this.mapa_v_mun[item].legend;
                    for (var j in layers){
                       if (layers[j].name == this.item_select){
                            layer_title = layers[j].title;
                       }
                    }
                    for (var j in legends){
                       if (legends[j].name == this.item_select){
                            layer_legend = legends[j].title;
                       }
                    }
                  }

                }

                const wmsLayer= L.tileLayer.wms("http://localhost:8081/geoserver/Comarcas/wms?", {
                    layers: layer_title,
                    format: 'image/png',
                    transparent: true,
                    //minZoom: 0,
                    //maxZoom: 25
                });

                if (this.wmsLayer_p !== null){
                    this.map.removeLayer(this.wmsLayer_p);
                    this.wmsLayer_p = wmsLayer;
                    this.map.addLayer(this.wmsLayer_p);
                }else{
                    this.wmsLayer_p = wmsLayer;
                    this.map.addLayer(this.wmsLayer_p);
                }


                var ourCustomLegend = L.Control.extend({
                 options: {
                   position: 'bottomleft',
                   //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
                   },
                  onAdd: function (map) {
                   var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                   container.innerHTML +='<div style="background:#D1D1D1"> <span>Datos Municipios</span>';
                   container.innerHTML +='<img alt="legend" src='+layer_legend+' />';
                   container.innerHTML +='</div>'

                   return container;
                  },
                  onRemove: function(map){}

                 });
                  var instancia = new ourCustomLegend();

                  if (this.ourCustomLegend == null){
                      this.ourCustomLegend = instancia;
                      this.map.addControl(instancia);

                  }else{
                      this.map.removeControl(this.ourCustomLegend);
                      this.ourCustomLegend = instancia;
                      this.map.addControl(instancia)

                  }

            }

         },


         async cargar_datos_pob(p,aux){
             var urls = [];
             var results=[];
             var datos=[];
             var dataset;
             var data;
             var idx;
             var item_aux;

             for (serie in this.series_comp_poblacion){
               if (serie>(this.series_comp_poblacion.length/2)-1){
                 this.series_comp_poblacion[serie].data = [];
               }
             }


             for (var item in this.mapa_mun){
                  dataset = this.mapa_mun[item].dataset;
                  var cat = this.chartOptions_mun.xAxis.categories;
                  cat.push(this.mapa_mun[item].año);
                  cat = this.chartOptions_comp_poblacion.xAxis.categories;
                  cat.push(this.mapa_mun[item].año);
                  urls.push('http://localhost:3000/api/datasets/'+dataset+'/data/id/'+p[0]);
             }

             results = await axios.all(urls.map(x => axios.get(x)));

             for (var i=0; i<results.length; i++){
              datos = results[i];
              data = datos.data[0];
              for (var k in this.items_pob){
                 for (var j in data){
                     idx = this.tabla_th.indexOf(j.charAt(0).toUpperCase() + j.slice(1));
                      if (idx == -1){
                       this.tabla_th.push(j.charAt(0).toUpperCase() + j.slice(1));
                      }

                     if (this.items_pob[k].toUpperCase()==j.toUpperCase()){
                       if (aux == 0){
                         for (var serie in this.series_mun){

                           if (this.items_pob[k] == this.series_mun[serie].title){
                              this.series_mun[serie].data.push(parseInt(data[j]));
                              this.series_comp_poblacion[serie].data.push(parseInt(data[j]));
                           }
                         }

                       }
                       else{
                         for (var serie in this.series_comp_poblacion){
                            if (this.items_pob[k] == this.series_comp_poblacion[serie].title && serie>(this.series_comp_poblacion.length/2)-1){
                               this.series_comp_poblacion[serie].data.push(parseInt(data[j]));
                               this.series_comp_poblacion[serie].name=this.items_pob[k] +" "+ p[1];
                            }
                         }
                       }

                       }
                     }
                 }
                 if (aux == 0){
                   this.p_poblacion.push(data);
                   this.p_poblacion_c.push(data);
                 }
                 else{
                    this.p_poblacion_c.push(data);
                 }

             }

         },

         async cargar_datos_v(p,aux){
            var urls_1 = [];
            var results=[];
            var datos=[];
            var dataset;
            var data;
            var idx;


            for (serie in this.series_comp_vehiculos){
              if (serie>(this.series_comp_vehiculos.length/2)-1){
                this.series_comp_vehiculos[serie].data = []
              }
            }

            for (var item in this.mapa_v_mun){
                 dataset = this.mapa_v_mun[item].dataset;
                 var cat = this.chartOptions_v_mun.xAxis.categories;
                 cat.push(this.mapa_v_mun[item].año);
                 cat = this.chartOptions_comp_vehiculos.xAxis.categories;
                 cat.push(this.mapa_v_mun[item].año);
                 urls_1.push('http://localhost:3000/api/datasets/'+dataset+'/data/id/'+p[0]);
            }

            results = await axios.all(urls_1.map(x => axios.get(x)));

            for (var i=0; i<results.length; i++){
             datos = results[i];
             data = datos.data[0];
             for (var k in this.items_v){

                for (var j in data){
                    idx = this.tabla_th_v.indexOf(j.charAt(0).toUpperCase() + j.slice(1));
                     if (idx == -1){
                      this.tabla_th_v.push(j.charAt(0).toUpperCase() + j.slice(1));
                     }

                    if (this.items_v_mod[k].toUpperCase()==j.toUpperCase()){

                      if (aux == 0){
                        for (var serie in this.series_v_mun){

                          if (this.items_v_mod[k] == this.series_v_mun[serie].title){
                             this.series_v_mun[serie].data.push(parseInt(data[j]));
                             this.series_comp_vehiculos[serie].data.push(parseInt(data[j]));
                          }
                        }

                      }
                      else{
                        for (var serie in this.series_comp_vehiculos){
                            if (this.items_v_mod[k] == this.series_comp_vehiculos[serie].title && serie>(this.series_comp_vehiculos.length/2)-1){
                               this.series_comp_vehiculos[serie].data.push(parseInt(data[j]));
                               this.series_comp_vehiculos[serie].name = this.items_v[k] + " " + p[1];
                            }
                        }

                      }

                      }
                    }
                }
                if (aux == 0){
                  this.p_parque.push(data);
                  this.p_parque_c.push(data);
                }
                else{
                   this.p_parque_c.push(data);
                }

            }


         },

         descargarCSV(data,enc){
          const rows = [];
          var cabecera= [];
          var datos= [];

          for (var i in enc){
            cabecera.push(enc[i]);
          }
          rows.push(cabecera);
          for (var j in data){
            for (var x in data[j]){
              datos.push(data[j][x]);
            }
            rows.push(datos);
            datos = [];
          }

          let csvContent = "data:text/csv;charset=utf-8,"
              + rows.map(e => e.join(",")).join("\n");

          var encodedUri = encodeURI(csvContent);
          var link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          link.setAttribute("download", "data.csv");
          document.body.appendChild(link);
          link.click()
         },
         redirigir(){
          this.$router.push({
             name: 'App',
          });

         }

      }
  }
</script>

<style>

#main-header {
  background: #333;
  color: white;
  height: 40px;
  vertical-align: middle;
  font-weight: 700;
  font-size: 1.2em;
  font-margin: 10px;

}

#container{

  width: 50%;
  height:700px;
  display: flex;
  margin: auto;
  position:relative;


}

#mapa-header{

  background: #333;
  width:100%;
  height:5%;
  color:white;
  padding:0.5%;
  float:top;

}


#map{

  height: 95%;
  width:80%;
  border: 1px solid #AAA;
  position:absolute;
  top:5%;
  left:0;


}

#eleccion{

  width:20%;
  height:95%;
  background: white;
  border: 1px solid #AAA;
  position:absolute;
  top:5%;
  right:0;
}

#grafica-container{

   width: 50%;
   height:700px;
   display: flex;
   margin: -3% auto;
   margin-top: 3%;
   position:relative;


}

#grafica{
  height: auto;
  width:100%;
  position:absolute;
  margin-top:3%;
  top:5%;

}

#info{
  margin: 5% auto;
  height: 130px;
  width: 70%;
  float:top;
  display: flex;
  justify-content: center;



}

#info1{

    padding: 15px;
    margin: 15px;
    background: #333;
    color: white;
    height: 100%;
    width: 15%;
    border-radius: 10px;
    float:left;
    display: inline-block;
}
#info2{

    padding: 15px;
    margin: 15px;
    background: #288EEA;
    color: white;
    height: 100%;
    width: 15%;
    border-radius: 10px;
    float:left;
    display: inline-block;
}
#info3{

    padding: 15px;
    margin: 15px;
    background: #5B5B5F;
    color: white;
    height: 100%;
    width: 15%;
    border-radius: 10px;
    float:left;
    display: inline-block;
}
#info4{

    padding: 15px;
    margin: 15px;
    background: #A01127;
    color: white;
    height: 100%;
    width: 15%;
    border-radius: 10px;
    float:left;
    display: inline-block;
}

</style>
