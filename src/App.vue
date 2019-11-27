<template>
  <div>
    <header id="main-header">
          <p>SMARTT-DASHBOARD</p>
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
          <p>Población</p>

          <div class="row" style= "margin:5%">
            <div
              class="form-check"
              v-for="layer in layers"
              :key="layer.id"
            >
             <label class="form-check-label">
               <input
                 class="form-check-input"
                 type="checkbox"
                 v-model="layer.active"
                 @change="layerChanged(layer.id, layer.active, layers)"
               />
               {{ layer.name }}
             </label>
            </div>
          </div>

          <p>Municipios</p>

          <div class="row" style= "margin:5%">
            <div
              class="form-check"
              v-for="layer in layers_m"
              :key="layer.id"
            >
             <label class="form-check-label">
               <input
                 class="form-check-input"
                 type="checkbox"
                 v-model="layer.active"
                 @change="layerChanged(layer.id, layer.active, layers_m)"
               />
               {{ layer.name }}
             </label>
            </div>
          </div>


       </div>

    </div>

    <div id="grafica-container">
      <div id= "mapa-header">
          <p> Poblacion </p>
      </div>

      <div id= "grafica">
              <highcharts :options="chartOptions" ></highcharts>
      </div>




    </div>



  </div>
</template>

<script>
import { LMap, LWMSTileLayer, LControlLayers } from "vue2-leaflet";
const axios = require('axios');
export default {
  name: "App",
  components: {
    LMap,
    "l-wms-tile-layer": LWMSTileLayer,
    LControlLayers
  },
   data() {
         return {
           map: [],
           wmsLayer: [],
           layers: [{
              id:0,
              name: 'Hombres_17',
              title: 'Comarcas:p_poblacion17_h',
              active:false
           },
           {
               id:1,
               name: 'Mujeres_17',
               title: 'Comarcas:p_poblacion17_m',
               active:false
            },
            {
               id:2,
               name: 'Hombres_16',
               title: 'Comarcas:p_poblacion16_h',
               active:false
            },
            {
               id:3,
               name: 'Mujeres_16',
               title: 'Comarcas:p_poblacion16_m',
               active:false
            },
            {
               id:4,
               name: 'Hombres_18',
               title: 'Comarcas:p_poblacion18_h',
               active:false
            },
            {
               id:5,
               name: 'Mujeres_18',
               title: 'Comarcas:p_poblacion18_m',
               active:false
            },


              ],
           layers_m: [{
               id:0,
               name: 'Mujeres_15',
               title: 'Comarcas:m_poblacion15_m',
               active:false
            },


               ],

           title: '',
           modo: 'line',
           series: [
                       {
                         name: "hombres",
                         data: []
                       },
                       {
                         name: "mujeres",
                         data: []
                       },
                                   ],
          }
    },
  computed: {
      chartOptions() {
          return {
                  chart: {  type: this.modo},
                  title: {  text: this.title  },
                  xAxis: {
                            categories: [
                              "2016",
                              "2017",
                              "2018",
                            ]
                          },
                  series: this.series,
            }
      },
  },
  mounted(){
      this.initMap();
      this.initGrap();


  },
  methods: {
      initMap(){
        const map = L.map( 'map', {
            maxZoom: 16,
            attributionControl: false,
            //maxBounds: [[25.25,-22.38],[43.28,7.67]]
        });

        this.map = map;
        this.map.fitBounds([[25.25,-22.38],[43.28,7.67]])

        L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: ['a','b','c'],

        },).addTo( map );



      },

      initGrap(){

          for (var i=16; i<19; i++){

          axios({
            method: 'get',
            url: 'http://localhost:3000/poblacion/mujeres'+i}
          ).then(response => {
             this.series[1].data.push(parseInt(response.data[0].sum));
            }
          ).catch(function (error) {
            console.log('Error: ' + error);
           });

           axios({
             method: 'get',
             url: 'http://localhost:3000/poblacion/hombres'+i}
           ).then(response => {
              this.series[0].data.push(parseInt(response.data[0].sum));
             }
           ).catch(function (error) {
             console.log('Error: ' + error);
            });

          }

      },


       layerChanged(layerId, active, layer) {

            const wmsLayer= L.tileLayer.wms("http://localhost:8081/geoserver/Comarcas/wms?", {
                layers: layer[layerId].title,
                format: 'image/png',
                transparent: true,
                //minZoom: 0,
                //maxZoom: 25
            });
            this.wmsLayer = wmsLayer;



            if (active){

              this.map.addLayer(wmsLayer);


            }
            else{

                this.map.removeLayer(wmsLayer);

            }


              //Insertando una leyenda en el mapa
            var ourCustomLegend = L.Control.extend({
              options: {
                position: 'bottomright',
                //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
                },
               onAdd: function (map) {
                var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                container.innerHTML +=
                '<img alt="legend" src=" http://localhost:8081/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Comarcas:p_poblacion17_m" width="140" height="60" />';

                return container;
                }
              });
               this.map.addControl(new ourCustomLegend());


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

  height: 400px;
  width:80%;
  border: 1px solid #AAA;
  position:absolute;
  top:5%;
  left:0;


}

#eleccion{

  width:20%;
  height:400px;
  background: #D8D9DD;
  border: 1px solid #AAA;
  position:absolute;
  top:5%;
  right:0;
}

#grafica-container{

   width: 50%;
   height:700px;
   display: flex;
   margin: -7% auto;
   position:relative;


}

#grafica{
  height: auto;
  width:100%;
  border: 1px solid #AAA;
  position:absolute;
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
