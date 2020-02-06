<template>
  <div class="cuerpo">

    <div class="modal fade" id="mostrarmodal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header" style="background:#336680; color:white">
                  <h3>Elige Provincias y Municipios</h3>
               </div>
               <div class="modal-body">
                   <p>Provincias</p>
                   <select name="prov" id="prov" @change="onChange($event)" v-model="prov_select" class="form-control" style="height:40px; width:80%">
                       <option v-for="item in provincias" :value=[item.cod,item.nom]>{{item.nom}}</option>
                    </select>
                    <br>
                   <p>Municipios</p>
                    <select name="mun" @change="onChange($event)" v-model="mun_select" class="form-control" style="height:40px; width:80%">
                       <option v-for="item in municipios" :value=[item.mun,item.name]>{{item.name}}</option>
                    </select>
                    <a href="#" class= "float-left" style="color:#336680; text-decoration: underline;" @click="borrar()">Resetear Municipio</a>
                    <br>
                    <br>
                    <span class='label label-warning'>*Para que aparezcan los municipios selecciones primero la provincia</span>
           </div>
               <div class="modal-footer">
                <a href="#" data-dismiss="modal" class="btn" style="background:#336680; color: white" @click="redirigir(mun_select)">Aceptar</a>
               </div>
          </div>

       </div>
    </div>


    <router-view></router-view>

  </div>
</template>

<script>
import Municipios from './components/Municipios'
import Provincias from './components/Provincias'
import Vue from 'vue';
const axios = require('axios');
export default {
   data() {
         return {
           provincias: [],
           municipios: [],
           prov_select: [],
           mun_select: [],
          }

    },

  mounted(){
      this.cargarProvincias();
      $(document).ready(function()
            {
               $("#mostrarmodal").modal("show");

      });

  },
  methods: {

      cargarProvincias(){


        axios({
          method: 'get',
          url: 'http://localhost:3000/api/dashboard/name/TFG'}
        ).then(response => {
            var data = response.data.datos.dashboards.provincias;
            var datasets = [];
            for ( var key in data){
              datasets.push(data[key]);
            }
            var d = datasets[0];
            var rango_years = d.años;
            var patron =d.patron;
            var years = rango_years.split("-");
            var last_year = years[1];
            var year = last_year.substring(last_year.length, last_year.length -2)

            var dataset = patron.replace("XX", year);

            axios({
              method: 'get',
              url: 'http://localhost:3000/api/datasets/'+dataset+'/data/name'}
            ).then(response => {
               var data = response.data
               for(var key in data){
                 this.provincias.push({"cod": data[key].cod, "nom": data[key].nom});
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

      onChange($event){


        axios({
          method: 'get',
          url: 'http://localhost:3000/api/dashboard/name/TFG'}
        ).then(response => {
            var data = response.data.datos.dashboards.municipios;
            var datasets = [];
            for ( var key in data){
              datasets.push(data[key]);
            }
            var d = datasets[0];
            var rango_years = d.años;
            var patron =d.patron;
            var years = rango_years.split("-");
            var last_year = years[1];
            var year = last_year.substring(last_year.length, last_year.length -2)

            var dataset = patron.replace("XX", year);

            axios({
               method: 'get',
               url: 'http://localhost:3000/api/datasets/'+dataset+'/data/prov/'+this.prov_select[0]}
            ).then(response => {
                var data = response.data
                this.municipios=[];
                for(var key in data){

                  this.municipios.push({"mun": data[key].fid, "name": data[key].name})
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

      redirigir(m){
        var prov = this.prov_select;
        this.prov_select = [];
        var mun = this.mun_select;
        this.mun_select = [];

        if (m.length==0){

              this.$router.push({
                 name: 'Provincias',
                 params: { "nom_dashboard": "provincias", "prov": prov}
              });

        }
        else {

              this.$router.push({
                 name: 'Municipios',
                 params: { "nom_dashboard": "municipios", "mun": mun}
              });

        }
      },
      borrar(){
        this.mun_select = [];
      }
  },
  name: 'App',
    components: {
      Municipios,
      Provincias
    }
}
</script>

<style>

#cuerpo {
  font-family: Montserrat;
  font-size: 17px;
  font-weight: bold;

}

