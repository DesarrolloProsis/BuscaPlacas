import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Axios from 'axios';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
        
    plazaActual: 'Todas las Plazas',    
    fechaInicio: new Date().toISOString().substr(0, 10),
    fechaFin:  new Date().toISOString().substr(0, 10),
    rangoFecha: null,
    datosTabla: []


    
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
    datosTablaMutation(state,array){         
      state.datosTabla = array

    }


  },
  actions: {

    llenarTablasoloPlaca(context, value){

      Axios
      .get(`https://localhost:44380/api/Transacciones/${value.placa}`)
      .then(Response => (context.commit('datosTablaMutation', Response.data)))   
      
    },
    llenarTablafull(context, value){

    
      if(value.rangoFecha == "primary"){


        Axios
        .get(`https://localhost:44380/api/Transacciones/${value.placa}/${  value.tag == ''? null : value.tag}/${value.fechaInicio}/${value.fechaFin}`)        
        .then(Response1 => (context.commit('datosTablaMutation', Response1.data)))   
     

      }
      else{
        
        
          Axios
          .get(`https://localhost:44380/api/Transacciones/${value.placa}/${  value.tag == ''? null : value.tag}/${value.fechaInicio}/${value.fechaInicio}`)
          .then(Response3 => (context.commit('datosTablaMutation', Response3.data)))         

      }

    }


    
    
  }
})
