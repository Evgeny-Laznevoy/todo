import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles.scss'
import firebaseConfig from './Config/firebase'
import firebase from 'firebase'
import 'firebase/database'
import { setupBus } from '../bus'

Vue.config.productionTip = false

setupBus()

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()

db.settings({
  timestampsInSnapshots: true
});

Vue.$db = db

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('LOAD_GROUPS')
  },
}).$mount('#app')
