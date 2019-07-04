<template>
<div>  
  <v-data-table
    :headers="headers"
    :items="desserts"    
  >
    <template v-slot:items="props">      
      <td>{{ props.item.PLAZA }}</td>
      <td>{{ props.item.CARRIL }}</td>
      <td>{{ props.item.FECHA }}</td>
      <td>{{ props.item.HORA }}</td>
      <td>{{ props.item.PLACA }}</td>
      <td>{{ props.item.CLASE }}</td>
      <td>{{ props.item.EVENTO }}</td>
      <td>{{ props.item.PAGO }}</td>
      <td>{{ props.item.TARJETA }}</td>
      <td>{{ props.item.NUMERO_TRANSACTION }}</td>
    </template>
  </v-data-table>  
  </div>
</template>

<script>

import axios from "axios";
import { mapState, mapMutations, mapActions, Store } from "vuex";

  export default {
    data () {
      return {
             
        desserts: [],              
        loading: true,
        pagination: {},
        headers: [
          {text: 'Plaza', value: 'Plaza'},
          { text: 'Carril', value: 'Carril' },
          { text: 'Fecha', value: 'Fecha' },
          { text: 'Hora', value: 'Hora' },
          { text: 'Placa', value: 'Placa' },
          { text: 'Clase', value: 'Clase' },
          { text: 'Evento', value: 'Evento' },
          { text: 'Pago', value: 'Pago' },
          { text: 'Tag', value: 'Tag' },
          { text: 'Transaccion', value: 'Transaccion' },
        ]
      }
    },
    computed:{

      ...mapState(['datosTabla']),
        llenaTabla(){
        this.desserts = this.datosTabla
      }
    

    },
    methods: {

     
      
    }
  }
</script>