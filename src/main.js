import Vue from 'vue'
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

new Vue({
  render: h => h(App)
}).$mount("#app");
