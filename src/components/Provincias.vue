<template>
  <div class="wrapper">
    <div class="well" id="main-header">SMARTT-DASHBOARD
      <a href="/" class= "float-right" style="color: white; text-decoration: underline;" @click="redirigir()">Elegir Provincia</a>
    </div>

    <App v-bind:class="{ active: isActive }"></App>

    <div id ="info">
      <div id ="info1"> <!--widget 1 -->
          <div style="text-align: center; opacity: 0.9"><font-awesome-icon icon="users" size="4x"/></div>
        	<div style="margin-top:3%; font-size: 100%; text-align: center"><span> {{total_pob}} Habitantes </span></div>
      </div>

      <div id ="info2"> <!--widget 2 -->

      </div>

      <div id ="info3"> <!--widget 3 -->
         <div style="text-align: center; opacity: 0.9"><font-awesome-icon icon="car" size="4x"/></div>
         <div style="margin-top:3%; font-size: 100%; text-align: center"><span> {{total_turismos}} Turismos </span></div>
      </div>
      <div id ="info4"> <!--widget 3 -->
         <div style="text-align: center; opacity: 0.9"><font-awesome-icon icon="plane" size="4x"/></div>
         <div style="margin-top:3%; font-size: 100%; text-align: center"><span> {{aviones}} Alertas de Aviones </span></div>

      </div>

    </div>

    <div id="container">
       <div class="well well-sm" id="mapa-header"> Mapa Provincias {{prov[1]}}</div>


       <div id="map"></div>

       <div id="eleccion">

         <div class="well well-sm" style="font-weight:bold; font-size: 19px;"> Datos por provincias</div>
         <span style="font-weight:80; margin-left:4%; font-size: 15px">Elige el año </span>
         <div class="form-check" v-for="item in years" :key=item style="width:100%; margin:6%; font-size: 15px">
            <input class="form-check-input" type="radio" @change="layerChanged(0)" v-model="year_select" name="year" id="year" :value=item style="margin:2%">
            <label class="form-check-label" for="year" style="margin-left:5%" >
              {{item}}
            </label>

         </div>
         <span style="font-weight:80; margin-left:4%; font-size: 15px">Elige variable de interés</span>
         <div class="form-check" v-for="variable in items" :key=variable style="width:100%; margin:6%; font-size: 15px">
           <input class="form-check-input" type="radio" @change="layerChanged(1)" v-model="item_select" :value=variable style="margin:2%">
           <label class="form-check-label" for="f" style="margin-left:5%; font-size: 15px" >
             {{variable}}
           </label>

         </div>

         <div class="well well-sm" style="font-weight:bold;"> Municipios {{prov[1]}}</div>
         <input type="checkbox" id="checkbox" @change="layerChanged_mun(0)" v-model="checked" style="margin-left:5%;">
         <label for="checkbox" style="margin-left:3%; font-size: 15px; margin-top: -30px">Ver municipios </label>

       </div>
    </div>

    <div id="grafica-container">
        <div id="grafica">
          <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#p_prov">Población {{ prov[1]}}</a></li>
            <li><a data-toggle="tab" href="#v_prov">Vehiculos {{ prov[1] }}</a></li>
            <li><a data-toggle="tab" href="#comparacion">Comparar Población</a></li>
            <li><a data-toggle="tab" href="#comparacion_v">Comparar Vehículos</a></li>
          </ul>


          <div class="tab-content">
            <div id="p_prov" class="tab-pane fade in active"><br>
              <highcharts :options="chartOptions_prov" style="width:100%"></highcharts>
              <div class="dropdown" >
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                style="width:100%; background:#336680; color:white; border-color: #336680; margin-top:-1%">
                  Tablas de datos
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:100%">
                  <button type="button" class="btn float-right" @click="descargarCSV(p_poblacion,tabla_th)" style="margin-top:1%; margin-right:1%">Descargar CSV</button>
                  <div class="table-responsive" style="margin-top:5%">
                    <table class="table table-striped" align="center" style="margin-top:2%; width:98%">
                      <thead>
                        <tr style="background:#52A3CC;opacity: 0.7; color:white; border:1% solid #52A3CC">
                           <th v-for="t in tabla_th">{{t}}</th>

                         </tr>
                      </thead>
                      <tbody>
                        <template v-for="item in p_poblacion">
                              <tr>
                                  <td v-for="i in item">{{i}}</td>
                              </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div id="v_prov" class="container tab-pane fade"><br>
              <highcharts :options="chartOptions_v_prov" style="width:100%"></highcharts>
              <div class="dropdown" >
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                style="width:100%; background:#336680; color:white; border-color: #336680; margin-top:-1%">
                  Tablas de datos
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:100%">
                  <button type="button" class="btn float-right" @click="descargarCSV(p_parque,tabla_th_v)" style="margin-top:1%; margin-right:1%">Descargar CSV</button>
                  <div class="table-responsive" style="margin-top:5%">
                    <table class="table table-striped" align="center" style="margin-top:2%; width:98%">
                     <thead>
                       <tr style="background:#52A3CC;opacity: 0.7; color:white; border:1% solid #52A3CC">
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
              <h5>Elige una provincia para la comparación</h5>
              <select name="prov" id="comp_p" @change="cargar_datos_pob(prov_select_p,1)" v-model="prov_select_p" class="form-control" style="height:40px; width:100%">
                 <option v-for="item in provincias" :value=[item.cod,item.nom]>{{item.nom}}</option>
              </select>
              <highcharts :options="chartOptions_comp_poblacion" style="width:100%; margin-top:5%"></highcharts>
              <div class="dropdown" >
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                style="width:100%; background:#336680; color:white; border-color: #336680; margin-top:-1%">
                  Tablas de datos
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:100%">
                  <button type="button" class="btn float-right" @click="descargarCSV(p_poblacion_c,tabla_th)" style="margin-top:1%; margin-right:1%">Descargar CSV</button>
                  <div class="table-responsive" style="margin-top:5%">
                    <table class="table table-striped" align="center" style="margin-top:2%; width:98%">
                      <thead>
                         <tr style="background:#52A3CC;opacity: 0.7; color:white; border:1% solid #52A3CC">
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
              <h5>Elige una provincia para la comparación</h5>
              <select name="prov_v" id="comp_v" @change="cargar_datos_v(prov_select_v,1)" v-model="prov_select_v" class="form-control" style="height:40px; width:100%">
                 <option v-for="item in provincias" :value=[item.cod,item.nom]>{{item.nom}}</option>
              </select>
              <highcharts :options="chartOptions_comp_vehiculos" style="width:100%;  margin-top:5%"></highcharts>
              <div class="dropdown" >
                  <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                  style="width:100%; background:#336680; color:white; border-color: #336680; margin-top:-1%">
                    Tablas de datos
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:100%">
                    <button type="button" class="btn float-right" @click="descargarCSV(p_parque_c,tabla_th_v)" style="margin-top:1%; margin-right:1%">Descargar CSV</button>
                    <div class="table-responsive" style="margin-top:5%;">
                      <table class="table table-striped" align="center" style="margin-top:2%; width:98%">
                        <thead>
                           <tr style="background:#52A3CC;opacity: 0.7; color:white; border:1% solid #52A3CC">
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
    {{prueba}}
    <div id="footer">
     <img src="../assets/logoUZ.png" alt="Smiley face" height="100" width="300" style="float: right">
     <div style="text-align: left">
      Licencia de datos
     </div>
    </div>

  </div>
</template>

<script>
import { LMap, LWMSTileLayer, LControlLayers } from "vue2-leaflet";
import { logo } from "../assets/logo.png"
const axios = require('axios');
require('babel-polyfill');
export default {
    name: 'Provincias',
    components: {
        LMap,
        "l-wms-tile-layer": LWMSTileLayer,
        LControlLayers,
    },
    props: ['prov', 'mapa_prov', 'mapa_mun', 'mapa_v_prov', 'mapa_v_mun'],
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

               series_prov: [],
               series_v_prov: [],
               series_comp_poblacion: [],
               series_comp_vehiculos: [],
               p_poblacion: [],
               p_parque:[],
               p_poblacion_c:[],
               p_parque_c:[],
               provincias: [],
               prov_select_p: [],
               prov_select_v: [],
               tabla_th: [],
               tabla_th_v: [],
               entrar: false,
               total_pob: null,
               total_turismos: null,
               isActive: false,
               aviones:null,
               coordenadas: []

              }

        },
      computed: {

          chartOptions_prov() {
              return {
                      chart: {  type: this.modo},
                      title: {  text: this.title  },
                      xAxis: {
                                categories: []
                              },
                      series: this.series_prov,
               }
          },

          chartOptions_v_prov() {
               return {
                       chart: {  type: this.modo},
                       title: {  text: this.title  },
                       xAxis: {
                                 categories: []
                               },
                       series: this.series_v_prov,
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
          this.cargarProvincias();
          this.cargar_datos_dashboard();
          this.initMap();
          this.cargar_datos_pob(this.prov,0);
          this.cargar_datos_v(this.prov,0);

      },
      methods: {

         cargarProvincias(){

            axios({
              method: 'get',
              url: 'http://localhost:3000/api/datasets/p_poblacion18/data/name'}
            ).then(response => {
               var data = response.data
               for(var key in data){
                 this.provincias.push({"cod": data[key].cod, "nom": data[key].nom});
               }

              }
            ).catch(function (error) {
              console.log('Error: ' + error);
            });

         },

         async initMap(){

            const map = L.map( 'map', {
                maxZoom: 16,
                attributionControl: false,
                //maxBounds: [[25.25,-22.38],[43.28,7.67]]
            });
            this.map = map;

            axios({
               method: 'get',
               url: 'http://localhost:3000/api/datasets/p_poblacion18/coordinates/'+this.prov[0]}
            ).then(response => {
                var coord = response.data[0];
                var aux= [];
                for (var item in coord){
                  aux.push(coord[item]);
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

            axios({
               method: 'get',
               url: 'http://localhost:3000/api/datasets/p_poblacion18/coordinates/'+this.prov[0]}
            ).then(response => {
                var coord = response.data[0];
                var aux= [];
                for (var item in coord){
                  aux.push(coord[item]);
                }
                this.map.fitBounds([[aux[0],aux[1]],[aux[2],aux[3]]])
                axios({
                  method: 'get',
                  url: 'https://maria93:e8umh8@opensky-network.org/api/states/all?lamin='+aux[0]+'&lomin='+aux[1]+'&lamax='+aux[2]+'&lomax='+aux[3]}
                ).then(response => {
                   var data = response.data
                   var states = data.states;
                   var latitud=[];
                   var longitud=[];
                   var origen = [];
                   var rotacion = [];
                   for ( var i in states){
                     longitud.push(states[i][5]);
                     latitud.push(states[i][6]);
                     origen.push(states[i][2]);
                     rotacion.push(states[i][10]);

                   }
                   this.aviones = longitud.length;

                  // Icon options
                   var iconOptions = {
                      iconUrl: 'https://image.flaticon.com/icons/svg/723/723955.svg',
                      iconSize: [15, 15]
                   }
                   // Creating a custom icon
                   var customIcon = L.icon(iconOptions);

                   // Creating Marker Options
                   var markerOptions = {
                      clickable: true,
                      draggable: true,
                      icon: customIcon
                   }

                   for ( var j in latitud){
                       //markerOptions["rotationAngle"] = rotacion[j];
                       //this.prueba.push(rotacion[j]);
                       // Creating a Marker
                       var marker = L.marker([latitud[j], longitud[j]], markerOptions).bindPopup("<i>País de Origen:</i>"+ origen[j]).addTo(map);
                       marker.setRotationAngle(rotacion[j]);
                   }
                  }
                ).catch(function (error) {
                  console.log('Error: ' + error);
                });
               }
            ).catch(function (error) {
               console.log('Error: ' + error);
            });

         },

         cargar_datos_dashboard(){
             var data = [];
             var aux;
             var layers;
             var idx;
             var cadenas, concat;

             for (var item in this.mapa_prov){
              this.years.push(this.mapa_prov[item].año);
              layers = this.mapa_prov[item].layers;

              for (var j in layers){
                 idx = this.items_pob.indexOf(layers[j].name);
                 if (idx == -1){
                  this.items_pob.push(layers[j].name);
                  this.items.push(layers[j].name);

                 }
              }
             }
             this.years.sort();
             for (var item in this.mapa_v_prov){
               layers = this.mapa_v_prov[item].layers;

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
                 this.series_prov.push({name: this.items_pob[i]+" "+this.prov[1],title:this.items_pob[i], data: []});
                 this.series_comp_poblacion.push({name: this.items_pob[i]+" "+this.prov[1],title:this.items_pob[i], data: []});
             }
             for (var i=0; i<this.items_pob.length; i++){
                  this.series_comp_poblacion.push({name: this.items_pob[i],title:this.items_pob[i], data: []});
             }

             for (var i=0; i<this.items_v.length; i++){
                 this.series_v_prov.push({name: this.items_v[i]+" "+this.prov[1],title:this.items_v_mod[i], data: []});
                 this.series_comp_vehiculos.push({name: this.items_v[i]+" "+this.prov[1], title:this.items_v_mod[i], data: []});

             }
             for (var i=0; i<this.items_v.length; i++){
                this.series_comp_vehiculos.push({name: this.items_v[i], title:this.items_v_mod[i], data: []});

             }

         },

         layerChanged(op) {

            var layer_legend;
            var layer_nom;
            var layer_title;
            var layer_year;
            var layers;
            var legends;

            if (op=="0"){
              this.items=[];
              for (var item in this.mapa_prov){
                layer_year = this.mapa_prov[item].año;
                if (layer_year == this.year_select){
                  layers = this.mapa_prov[item].layers;
                  for (var j in layers){
                     this.items.push(layers[j].name);
                  }
                }

              }

              for (var item in this.mapa_v_prov){
                layer_year = this.mapa_v_prov[item].año;
                if (layer_year == this.year_select){
                  layers = this.mapa_v_prov[item].layers;
                  for (var j in layers){
                     this.items.push(layers[j].name);
                  }
                }

              }
            }

            if (op==1){
              this.years=[];
              for (var item in this.mapa_prov){
                layers = this.mapa_prov[item].layers;
                for (var j in layers){
                    if (this.item_select == layers[j].name){
                        this.years.push(this.mapa_prov[item].año);
                    }
                }
              }
              for (var item in this.mapa_v_prov){
                layers = this.mapa_v_prov[item].layers;
                for (var j in layers){
                    if (this.item_select == layers[j].name){
                        this.years.push(this.mapa_v_prov[item].año);
                    }
                }
              }

              this.years.sort();
            }

            if (this.year_select && this.item_select ){

                for (var item in this.mapa_prov){
                  layer_year = this.mapa_prov[item].año;
                  if (layer_year == this.year_select){
                    layers = this.mapa_prov[item].layers;
                    legends = this.mapa_prov[item].legend;
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

                for (var item in this.mapa_v_prov){
                  layer_year = this.mapa_v_prov[item].año;
                  if (layer_year == this.year_select){
                    layers = this.mapa_v_prov[item].layers;
                    legends = this.mapa_v_prov[item].legend;
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
                   container.innerHTML +='<div style="background:#D1D1D1"> <span>Datos de las provincias</span>';
                   container.innerHTML +='</div>'
                   container.innerHTML +='<div style="background:white"><img alt="legend" src='+layer_legend+' />';
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

            if(this.checked){
                this.layerChanged_mun(1);
            }

         },

         layerChanged_mun(op){

            var layer_legend;
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
                  cql_filter: "prov='"+this.prov[0]+"'",
                  //minZoom: 0,
                  //maxZoom: 25
              });

              var ourCustomLegend = L.Control.extend({
                options: {
                 position: 'bottomleft',
                 //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
                },
                onAdd: function (map) {
                 var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                 container.innerHTML +='<div style="background:#D1D1D1"> <span>Datos de los municipios</span>';
                 container.innerHTML +='</div>'
                 container.innerHTML +='<div style="background:white"><img alt="legend" src='+layer_legend+' />';
                 container.innerHTML +='</div>'
                 return container;
                },
                onRemove: function(map){}
              });
              var instancia = new ourCustomLegend();

              if (op == 0){
                if (this.checked){
                    this.wmsLayer_m = wmsLayer;
                    this.map.addLayer(this.wmsLayer_m);
                    this.ourCustomLegend_m = instancia;
                    this.map.addControl(instancia);

                }else{
                    this.map.removeLayer(this.wmsLayer_m);
                    this.map.removeControl(this.ourCustomLegend_m);
                }
              }
              else{
                if (this.checked){

                    this.map.removeLayer(this.wmsLayer_m);
                    this.wmsLayer_m = wmsLayer;
                    this.map.addLayer(this.wmsLayer_m);
                    this.map.removeControl(this.ourCustomLegend_m);
                    this.ourCustomLegend_m = instancia;
                    this.map.addControl(instancia);
                }
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
             this.p_poblacion_c = [];

             for (var item in this.p_poblacion){
                this.p_poblacion_c.push(this.p_poblacion[item]);
             }

             for (var serie in this.series_comp_poblacion){
               if (serie>(this.series_comp_poblacion.length/2)-1){
                 this.series_comp_poblacion[serie].data = [];
               }
             }


             for (var item in this.mapa_prov){
                  dataset = this.mapa_prov[item].dataset;
                  var cat = this.chartOptions_prov.xAxis.categories;
                  cat.push(this.mapa_prov[item].año);
                  cat = this.chartOptions_comp_poblacion.xAxis.categories;
                  cat.push(this.mapa_prov[item].año);
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
                         for (var serie in this.series_prov){

                           if (this.items_pob[k] == this.series_prov[serie].title){
                              this.series_prov[serie].data.push(parseInt(data[j]));
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
                   for (var item in this.p_poblacion){
                      if (this.p_poblacion[item].año == this.years[this.years.length-1]){
                          this.total_pob = this.p_poblacion[item].total
                      }
                   }
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

            this.p_parque_c = [];

            for (var item in this.p_parque){
               this.p_parque_c.push(this.p_parque[item]);
            }

            for (var serie in this.series_comp_vehiculos){
              if (serie>(this.series_comp_vehiculos.length/2)-1){
                this.series_comp_vehiculos[serie].data = []
              }
            }

            for (var item in this.mapa_v_prov){
                 dataset = this.mapa_v_prov[item].dataset;
                 var cat = this.chartOptions_v_prov.xAxis.categories;
                 cat.push(this.mapa_v_prov[item].año);
                 cat = this.chartOptions_comp_vehiculos.xAxis.categories;
                 cat.push(this.mapa_v_prov[item].año);
                 urls_1.push('http://localhost:3000/api/datasets/'+dataset+'/data/id/'+p[0]);
            }

            results = await axios.all(urls_1.map(x => axios.get(x)));

            for (var i=0; i<results.length; i++){
             datos = results[i];
             data = datos.data[0];
             for (var k in this.items_v_mod){

                for (var j in data){
                    idx = this.tabla_th_v.indexOf(j.charAt(0).toUpperCase() + j.slice(1));
                     if (idx == -1){
                      this.tabla_th_v.push(j.charAt(0).toUpperCase() + j.slice(1));
                     }

                    if (this.items_v_mod[k].toUpperCase()==j.toUpperCase()){

                      if (aux == 0){
                        for (var serie in this.series_v_prov){

                          if (this.items_v_mod[k] == this.series_v_prov[serie].title){
                             this.series_v_prov[serie].data.push(parseInt(data[j]));
                             this.series_comp_vehiculos[serie].data.push(parseInt(data[j]));
                          }
                        }

                      }else{
                        this.series_comp_vehiculos[serie].name = '';
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
                  for (var item in this.p_parque){
                     if (this.p_parque[item].año == this.years[this.years.length-1]){
                         this.total_turismos = this.p_parque[item].turismos;
                     }
                  }
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
          this.isActive= true;
         },

      }
  }
</script>

<style>

#main-header {
  background: #336680;
  color: white;
  font-family: Montserrat;
  font-size: 17px;
  font-weight: bold;

}
.wrapper {
  min-height: 100%;
  height: auto;
  height: 170%;
  margin: 0 auto -4em;
}
#footer {
  height: 5%;
  position:absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #52A3CC;

}
#container{

  width: 60%;
  height:750px;
  display: flex;
  margin: auto;
  position:relative;
  font-family: Montserrat;
  font-size: 16px;

}

#mapa-header{

  background: #336680;
  width:100%;
  color:white;
  font-weight:bold;
  font-size: 19px;

}


#map{

  height: 100%;
  width:75%;
  border: 1px solid #AAA;
  position:absolute;
  top:6%;
  left:0;


}

#eleccion{

  width:25%;
  height: 100%;
  background: white;
  border: 1px solid #AAA;
  position:absolute;
  top:6%;
  right:0;
}

#grafica-container{

   width: 60%;
   height:700px;
   display: flex;
   margin: -3% auto;
   margin-top: 3%;
   position:relative;
   font-family: Montserrat;
   font-size: 16px;


}

#grafica{
  height: auto;
  width:100%;
  position:absolute;
  margin-top:3%;
  top:5%;
  font-family: Montserrat;
  font-size: 16px;

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

    padding: 1%;
    margin: 1%;
    background: #085780;
    color: white;
    height: 100%;
    width: 15%;
    border-radius: 10px;
    float:left;
    display: inline-block;
    font-family: Montserrat;
    font-size: 16px;
}
#info2{

    padding: 1%;
    margin: 1%;
    background: #66CCFF;
    color: white;
    height: 100%;
    width: 15%;
    border-radius: 10px;
    float:left;
    display: inline-block;
    font-family: Montserrat;
    font-size: 16px;
}
#info3{

    padding: 1%;
    margin: 1%;
    background: #52A3CC;
    color: white;
    height: 100%;
    width: 15%;
    border-radius: 10px;
    float:left;
    display: inline-block;
    font-family: Montserrat;
    font-size: 16px;
}
#info4{

    padding: 1%;
    margin: 1%;
    background: #336680;
    color: white;
    height: 100%;
    width: 15%;
    border-radius: 10px;
    float:left;
    display: inline-block;
    font-family: Montserrat;
    font-size: 16px;
}

</style>


