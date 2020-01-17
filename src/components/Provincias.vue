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
       <div class="well well-sm" id="mapa-header"> Mapa {{nom_dashboard}} {{prov[1]}}</div>

       <div id="map"></div>

       <div id="eleccion">

         <div class="well well-sm" style="font-weight:bold; font-size: 19px;"> Datos por {{secciones_mapa[0]}}</div>
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

         <div class="well well-sm" style="font-weight:bold;"> {{secciones_mapa[1]}} {{prov[1]}}</div>
         <input type="checkbox" id="checkbox" @change="layerChanged_mun(0)" v-model="checked" style="margin-left:5%;">
         <label for="checkbox" style="margin-left:3%; font-size: 15px; margin-top: -30px">Ver {{secciones_mapa[1]}} </label>

       </div>
    </div>

    <div id="grafica-container">
        <div id="grafica">
          <ul class="nav nav-tabs">

            <li
              v-for="(item,index) in secciones_grafica"
              v-bind:class="{'active' : index === currentSelected}"
              @click="selectTab(index),resetear_datos_grafica(item)">

              <a data-toggle="tab">{{item }} {{prov[1]}} </a>
            </li>
          </ul>
          <div class="tab-content">
            <div
              v-for="(item, index) in secciones_grafica"
              v-bind:class="{'active' : index === 0}"
              v-if="index === currentSelected"
              :key="item.id"
             >
                </br>
                <div v-if="item.indexOf('Comparar')!==-1">
                <h5>Elige una provincia para la comparación</h5>
                <select name=item :id='item' @change="cargar_datos_comparacion(item, prov_select,item_select_anterior)" v-model="prov_select" class="form-control" style="height:40px; width:100%">
                   <option v-for="item in provincias" :value=[item.cod,item.nom]>{{item.nom}}</option>
                </select>
                </div>
                </br>
                <div v-for="chart in chartOp">
                  <highcharts v-if="chart.title.text==item" :options="chart" style="width:100%"></highcharts>
                </div>
                <div class="dropdown" >
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" @click="cargar_datos_tabla(item,provincias_s)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                  style="width:100%; background:#336680; color:white; border-color: #336680; margin-top:-2%">
                    Tablas de datos
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="width:100%">
                    <button type="button" class="btn float-right" @click="descargarCSV(p_parque,tabla_th_v)" style="margin-top:1%; margin-right:1%">Descargar CSV</button>
                    <div class="table-responsive" style="margin-top:5%">
                      <table class="table table-striped" align="center" style="margin-top:2%; width:98%">
                       <thead>
                         <tr style="background:#52A3CC;opacity: 0.7; color:white; border:1% solid #52A3CC">
                            <th v-for="t in tabla_th">{{t}}</th>

                          </tr>
                       </thead>
                       <tbody>
                         <template v-for="item in datos_tabla">
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

    <div id="footer">
     <img src="../assets/logoUZ.png" alt="Smiley face" height="100" width="300" style="float: right">
     <div style="text-align: left">
      Licencia de datos {{prueba}}
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
    props: ['nom_dashboard', 'prov'],
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
               coordenadas: [],

               secciones_mapa: [],
               datos_dashboard: [],
               datos_dashboard_aux: [],
               secciones_grafica: [],
               datos_mapa: [],
               datos_mapa_aux: [],
               patrones: [],
               patrones_aux: [],
               patrones_grafica: [],
               years_patrones:[],
               years_patrones_aux:[],
               series: [],
               chartOp: [],
               prov_select:null,
               item_select_anterior:null,

               currentSelected: 0,
               veces: 0,
               items_comp:[],
               tabla_th: [],
               datos: [],
               patrones_tabla: [],
               datos_tabla:[],
               provincias_s:[],
               veces_tabla: 0,
               seccion_select:null,

              }

        },
      computed: {

          chartOptions(){
              return this.chartOp;
          }


      },
      mounted(){
          this.initMap();
          this.cargar_datos_dashboard();
          this.cargar_datos_grafica(this.prov);

      },
      methods: {
         selectTab(index){
             this.currentSelected = index
         },

         initMap(){

            const map = L.map( 'map', {
                maxZoom: 16,
                attributionControl: false,
                //maxBounds: [[25.25,-22.38],[43.28,7.67]]
            });
            this.map = map;

            L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: ['a','b','c'],

            },).addTo( map );

         },

         cargar_datos_dashboard(){

            axios({
              method: 'get',
              url: 'http://localhost:3000/api/dashboard/name/TFG'}
            ).then(response => {
               var data = response.data.datos.dashboards
               for (var key in data){
                    var seccion = key.charAt(0).toUpperCase() + key.substring(1 , key.length).toLowerCase();
                    this.secciones_mapa.push(seccion);
                    if (key == this.nom_dashboard){
                      this.datos_dashboard.push(data[key]);
                    }
                    else{
                      this.datos_dashboard_aux.push(data[key]);

                    }
               }
               var datos = this.datos_dashboard[0];
               var cont = 0;
               var year_min, year_max;

               for (var i in datos){
                  var dataset = datos[i];
                  var rango_y = dataset["años"];
                  var years = rango_y.split("-");


                  if (cont == 0){
                    year_min = years[0];
                    year_max = years[1];
                  }
                  else{
                      if (years[0] < year_min){
                        year_min = years[0];
                      }
                      if (years[1] > year_max){
                        year_max = years[1];
                      }
                  }

                 var patron = dataset["patron"];
                 var year_patron = dataset["años"];
                 this.patrones.push(patron);
                 this.years_patrones.push(year_patron);
                 cont = cont + 1;

               }

               for (var y = year_min; y <= year_max; y++){
                  this.years.push(y.toString());
               }

               var last_year = this.years[this.years.length-1];
               var year = last_year.substring(last_year.length, last_year.length -2)

               for (var item in this.patrones){
                   var d = this.patrones[item].replace("XX", year);
                   axios({
                      method: 'get',
                      url: 'http://localhost:3000/api/datasets/'+d+'/mapa'}
                   ).then(response => {
                       var data_map = response.data;
                       var datos_mapa =data_map["layers"];
                       //this.prueba.push(this.datos_mapa)
                       for (var data in datos_mapa){
                          this.items.push(datos_mapa[data].name)

                       }

                   }
                   ).catch(function (error) {
                      console.log('Error: ' + error);
                   });
               }

               var datos_aux = this.datos_dashboard_aux[0];
               for (var i in datos_aux){
                   var dataset = datos_aux[i];
                   var patron_aux = dataset["patron"];
                   var year_patron = dataset["años"];
                   this.patrones_aux.push(patron_aux);
                   this.years_patrones_aux.push(year_patron);
               }

               var d = this.patrones[0].replace("XX", year);
               axios({
                 method: 'get',
                 url: 'http://localhost:3000/api/datasets/'+d+'/data/name'}
               ).then(response => {
                  var data = response.data
                  for(var key in data){
                    if (data[key].nom !== this.prov[1]){
                      this.provincias.push({"cod": data[key].cod, "nom": data[key].nom});
                    }
                  }

                 }
               ).catch(function (error) {
                 console.log('Error: ' + error);
               });

               axios({
                  method: 'get',
                  url: 'http://localhost:3000/api/datasets/'+d+'/coordinates/'+this.prov[0]}
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
                          var marker = L.marker([latitud[j], longitud[j]], markerOptions).bindPopup("<i>País de Origen:</i>"+ origen[j]).addTo(this.map);
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

            }
            ).catch(function (error) {
              console.log('Error: ' + error);
            });

         },

         layerChanged(op) {
            var layer_title;
            var year = this.year_select;

            if (op=="0"){
              this.items = [];

               for (var item in this.patrones){
                this.prueba.push(this.patrones[item]);
                   var rango_y = this.years_patrones[item]
                   var years = rango_y.split("-");
                   if (years[0]<= year && year<=years[1]){
                       var n_year = year.substring(year.length, year.length -2)

                       var p = this.patrones[item]
                       var d = p.replace("XX", n_year);


                       axios({
                          method: 'get',
                          url: 'http://localhost:3000/api/datasets/'+d+'/mapa'}
                       ).then(response => {
                           var data_map = response.data;
                           var datos_mapa =data_map["layers"];
                           for (var i in datos_mapa){
                              this.datos_mapa.push(datos_mapa[i]);
                           }
                           for (var data in datos_mapa){
                              this.items.push(datos_mapa[data].name)

                           }
                       }
                       ).catch(function (error) {
                          console.log('Error: ' + error);
                       });
                   }
               }
               for (var item in this.patrones_aux){
                   var rango_y = this.years_patrones_aux[item]
                   var years = rango_y.split("-");
                   if (years[0]<= year && year<=years[1]){
                       var n_year = year.substring(year.length, year.length -2)

                       var p = this.patrones_aux[item]
                       var d = p.replace("XX", n_year);


                       axios({
                          method: 'get',
                          url: 'http://localhost:3000/api/datasets/'+d+'/mapa'}
                       ).then(response => {
                           var data_map = response.data;
                           var datos_mapa_aux =data_map["layers"];
                           for (var i in datos_mapa_aux){
                              this.datos_mapa_aux.push(datos_mapa_aux[i]);
                           }

                       }
                       ).catch(function (error) {
                          console.log('Error: ' + error);
                       });
                   }
               }


            }

            if (this.year_select && this.item_select ){
                for (var data in this.datos_mapa){
                   if (this.datos_mapa[data].name == this.item_select){
                      layer_title = this.datos_mapa[data].title
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
                   container.innerHTML +='<div style="background:white"><img alt="legend" src="http://localhost:8081/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER='+layer_title+'"/>';
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

            var layer_title;
            if (this.year_select && this.item_select ){

             for (var data in this.datos_mapa_aux){
                if (this.datos_mapa_aux[data].name == this.item_select){
                   layer_title = this.datos_mapa_aux[data].title
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
                 container.innerHTML +='<div style="background:white"><img alt="legend" src="http://localhost:8081/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER='+layer_title+'"/>';
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
         async cargar_datos_grafica(prov){

              this.provincias_s.push(this.prov);

              var years=[];
              var patrones
              axios({
                method: 'get',
                url: 'http://localhost:3000/api/dashboard/name/TFG'}
              ).then(response => {
                 var data = response.data.datos.dashboards
                 for (var key in data){
                      if (key == this.nom_dashboard){
                        this.datos_dashboard.push(data[key]);
                      }
                 }
                 var datos = this.datos_dashboard[0];
                 var cont = 0;
                 var year_min, year_max;
                 patrones =[];
                 var results=[];
                 var urls=[];
                 for (var i in datos){

                    years = [];
                    var palabras = [];
                    palabras = i.split("_");
                    var seccion = palabras[1].charAt(0).toUpperCase() + palabras[1].substring(1 , key.length).toLowerCase();
                    this.secciones_grafica.push(seccion);
                    this.secciones_grafica.push("Comparar " + seccion);

                    var dataset = datos[i];
                    var rango_years = dataset["años"]
                    var years_aux = rango_years.split("-");
                    year_min = years_aux[0];
                    year_max = years_aux[1];

                    var patron = dataset["patron"]

                    var n_year;
                    var patron_aux = [];

                    for(var i= year_min; i<=year_max; i++){
                         var n = i.toString()
                         n_year = n.substring(n.length, n.length -2);
                         patron_aux.push(patron.replace("XX", n_year));
                         years.push(n);

                    }
                    var seccion_patron = patron.replace("XX", '')
                    patrones.push({"seccion":seccion_patron, "patron": patron_aux});
                    this.patrones_grafica.push({"seccion":seccion_patron, "patron": patron_aux});
                    this.patrones_tabla.push({"seccion":seccion, "patron": patron_aux});

                    var p  = patron.substring(0, patron.length -2);
                    this.chartOp.push({chart: {  type: this.modo},name: p ,title: {  text: seccion },xAxis: { categories: years},series: []})
                    this.chartOp.push({chart: {  type: this.modo},name: "c_"+p ,title: {  text: "Comparar "+seccion },xAxis: { categories: years},series:[]})


                 }
                 this.cargar_datos_series(patrones,prov);

                  //this.prueba.push(this.chartOp)

              }
              ).catch(function (error) {
                console.log('Error: ' + error);
              });

          },

          async cargar_datos_series(patrones,prov){
              //this.prueba.push(this.chartOp)
              var datos_grafica = [];
              var categorias = [];
              var series= [];
              var patron, seccion, patrones_s;
              var urls= [];
              var results= [];
              var datos = [];


              for (var item in patrones){
                patron = patrones[item];
                seccion = patron["seccion"];
                patrones_s = patron["patron"];

                for (var chart in this.chartOp){
                    var chart_op = this.chartOp[chart];
                    var nom_chart = chart_op.name;
                    urls= [];
                    results= [];

                    if (seccion == nom_chart){

                       for(var p in patrones_s){
                          var patron_p = patrones_s[p];

                          //this.prueba.push(patron_p);
                          urls.push('http://localhost:3000/api/datasets/'+patron_p+'/items/'+prov[0]);

                       }
                       results = await axios.all(urls.map(x => axios.get(x)));
                       //this.prueba.push(results)
                       var datos_result;

                       for (var i=0; i<results.length; i++){
                            datos_result = results[i];
                            datos.push({"seccion": seccion, "datos":datos_result.data[0]});
                            datos.push({"seccion": "c_" + seccion, "datos":datos_result.data[0]});

                        }


                    }
                }


              }


              //this.prueba.push(this.chartOp)

              var items_aux = [];
              var items = [];
              var items_comp = [];
              var valores = []
              var idx;

              for (var data in datos){

                  var datos_i = datos[data].datos;
                  var seccion_i = datos[data].seccion;


                  for (var chart in this.chartOp){
                      var chart_op = this.chartOp[chart];
                      var nom_chart = chart_op.name;

                      if (nom_chart == seccion_i){
                        for (var x in datos_i){
                            var name_s = x;
                            if (name_s.indexOf("_") !==-1){
                              name_s = name_s.replace("_"," ");
                            }

                            if (seccion_i.indexOf("c_") !==-1){
                                if (items_comp.indexOf(x) == -1){
                                  items_comp.push(x);

                                  chart_op.series.push({name: name_s +" "+ prov[1], title:x, data:[]})

                                }
                                var chart_series = chart_op.series

                                for (var series in chart_series){
                                  if (chart_series[series].name == name_s+" "+ prov[1]){
                                    chart_series[series].data.push(parseInt(datos_i[x]))
                                  }
                                }

                            }else{

                                if (items.indexOf(x) == -1){
                                  items.push(x);

                                  chart_op.series.push({name: name_s+" "+ prov[1], title:x, data:[]})

                                }
                                var chart_series = chart_op.series

                                for (var series in chart_series){
                                  if (chart_series[series].name == name_s +" "+ prov[1]){
                                    chart_series[series].data.push(parseInt(datos_i[x]))
                                  }
                                }
                            }
                        }
                      }

                  }


               }
               //this.prueba.push(this.chartOp);



         },
         async cargar_datos_comparacion(item, prov, item_anterior){

              var datos=[];
              var urls=[];
              var results=[];

              this.items_comp = [];


              if (item !== item_anterior){
                this.veces = 0;
              }

              for (var chart in this.chartOp){
                  var chart_op = this.chartOp[chart];
                  var title_chart = chart_op.title.text;
                  var nom_chart = chart_op.name;
                  var array = chart_op.series;
                  var long = array.length;

                  if (item !== item_anterior){
                    this.veces = 0;

                  }

                  if (title_chart == item){
                     this.seccion_select = title_chart;
                     if(this.veces>0){
                         while(array.length > long/2){
                          array.pop();
                         }
                         if (this.provincias_s.length>1){
                           this.provincias_s.pop();

                         }

                     }

                    for(var patron in this.patrones_grafica){
                      var patron_i = this.patrones_grafica[patron]
                      var seccion = patron_i["seccion"];
                      var patrones_s = patron_i["patron"];
                      if ("c_"+seccion == nom_chart){

                            for(var p in patrones_s){
                              var patron_p = patrones_s[p];

                              //this.prueba.push(patron_p);
                              urls.push('http://localhost:3000/api/datasets/'+patron_p+'/items/'+prov[0]);

                            }
                            results = await axios.all(urls.map(x => axios.get(x)));

                            for (var i=0; i<results.length; i++){
                                var datos_result = results[i];
                                var data = datos_result.data[0];
                                var chart_series = chart_op.series

                                for (var d in data){
                                  //this.prueba.push(d+"-"+data[d]);
                                  var name_s = d;
                                  if (name_s.indexOf("_") !==-1){
                                    name_s = name_s.replace("_"," ");
                                  }

                                  if (this.items_comp.indexOf(d) == -1){
                                    this.items_comp.push(d);

                                    chart_op.series.push({name: name_s + " "+ prov[1], title:d, data:[]})

                                  }

                                  for (var series in chart_series){
                                    if (chart_series[series].name == name_s +" " +prov[1]){
                                      var name = d;

                                      chart_series[series].data.push(parseInt(data[d]))
                                    }

                                  }
                               }

                            }

                      }
                    }


                  }
              }

               this.item_select_anterior = item;
               this.veces = this.veces +1;
               this.provincias_s.push(this.prov_select);
               this.prov_select = null;

         },

         async cargar_datos_tabla(item, prov){

            var urls = [];
            var results = [];


            for (var provincias in prov){
                this.prueba.push(prov[provincias]);
                var provincias = prov[provincias]


               for (var patron in this.patrones_tabla){
                   var patrones = this.patrones_tabla[patron];
                   var seccion = patrones["seccion"];
                   var patrones_s = patrones["patron"];

                   if(item.indexOf(" ") !==-1){
                      item = item.split(" ");
                      item = item[1];

                   }

                   if (seccion.indexOf(item) !==-1){
                       this.prueba.push(item);
                       this.tabla_th = [];
                        this.datos_tabla = [];
                       for(var p in patrones_s){
                           var patron_p = patrones_s[p];
                           urls.push('http://localhost:3000/api/datasets/'+patron_p+'/data/id/'+provincias[0]);

                       }
                        results = await axios.all(urls.map(x => axios.get(x)));

                        var datos_result;

                        for (var i=0; i<results.length; i++){
                             var datos_result = results[i].data;
                             for (var d in datos_result){
                               var datos_d = datos_result[d];
                               for (var datos in datos_d){
                                 if (this.tabla_th.indexOf(datos) == -1){
                                   this.tabla_th.push(datos);

                                 }

                               }
                               this.datos_tabla.push(datos_d);


                             }

                         }

                   }


               }
            }




         },

         resetear_datos_grafica(item){

              if (this.seccion_select !==null && this.provincias_s.length>1){
                  for (var chart in this.chartOp){
                      var chart_op = this.chartOp[chart];
                      var title_chart = chart_op.title.text;
                      var nom_chart = chart_op.name;
                      var array = chart_op.series;
                      var long = array.length;


                      if (title_chart == this.seccion_select){

                         while(array.length > long/2){
                          array.pop();
                         }
                         this.veces = 0;


                      }
                  }
                  this.seccion_select= null;
                  this.provincias_s.pop();

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


