import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
        
    plazaActual: 'Todas las Plazas',    
    fechaInicio: new Date().toISOString().substr(0, 10),
    fechaFin:  new Date().toISOString().substr(0, 10),
    rangoFecha: null

    
  },
  mutations: {
    plazaActualMutation(state, plaza){

      state.plazaActual = plaza      
                
    },

    fechaInicioMutate(state,e){

      state.fechaInicio = e
      
    },
    fechaFinMutate(state,e){

      state.fechaFin = e      
    },

    rangoFechaMutation(state, rangoNuevo){
      state.rangoFecha = rangoNuevo
    },


  },
  actions: {

    
    
  }
})
