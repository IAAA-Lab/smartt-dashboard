import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import App from './App.vue'

import * as Vue2Leaflet from 'vue2-leaflet'
import {LMap,LTitleLayer,LMarker} from 'vue2-leaflet'
import "leaflet.icon.glyph";
import { Icon } from "leaflet";




Vue.use(HighchartsVue.default)
Vue.component('v-select', VueSelect.VueSelect);



delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.config.productionTip = false;

import Municipios from './components/Municipios'
import Provincias from './components/Provincias'

const routes = [
  {
    name: 'App',
    path: '/',
    component: App,
    props: true
  },
  {
    name: 'Municipios',
    path: '/municipios',
    component: Municipios,
    props: true
  },
  {
    name: 'Provincias',
    path: '/provincias',
    component: Provincias,
    props: true
  },

];

const router = new VueRouter
({
  mode: 'history',
  routes
});

window.app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
