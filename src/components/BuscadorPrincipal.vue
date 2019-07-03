<template> 
<div>
    <v-container>
      <v-layout>
      <v-flex xs12>
        <v-switch
          v-on:click="rangoFecha ? false : true"
            v-model="rangoFecha"
            :label="'Seleccionar Intervalo'"
            color="#33C7FF"
            value="primary"
            hide-details
          ></v-switch>
      </v-flex> 
         <v-flex xs12>
        <v-switch
          v-on:click="soloPlaca ? false : true"
            v-model="soloPlaca"
            :label="'Solo Buscar Por Placa'"
            color="#33C7FF"
            value="primary"
            hide-details
          ></v-switch>
      </v-flex> 
      </v-layout> 
    </v-container>

      <v-container>
        <v-layout>
          <v-flex xs12>        
            <v-menu            
            v-model="menuFechaInicial"
            :close-on-content-click="false"
            :nudge-right="40"            
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field                
                v-model="computedDateFormatted"
                label="Inicio de Busqueda"
                persistent-hint  
               :disabled= soloPlaca                              
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker 
                :value="fechaInicio" 
                @input="updateFechaInicio"
                :max = "fechaMax"
                no-title 
                
                >
            </v-date-picker>
          </v-menu>
        </v-flex>
        </v-layout>
      </v-container>
      

      <v-container>
        <v-layout>
          <v-flex xs12  v-if="rangoFecha"> 
           <v-menu            
            v-model="nemuFechaFinal"          
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }" >
              <v-text-field
                v-model="computedDateFormatted2"
                label="Fin de Busqueda"
                persistent-hint
                :disabled= soloPlaca
                prepend-icon= "event" 
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker 
                :value="fechaFin"                 
                @input="updateFechaFin"
                :max = "fechaMax"
                no-title 
              >
            </v-date-picker>                          
          </v-menu>         
          </v-flex>
        </v-layout>
      </v-container>

                     
<v-form v-model="valid">
    <v-container>
      <v-layout>

        
        <v-flex xs12>
          <v-combobox
    v-model="model"
    :items="items"
    hide-selected
    append-outer    
    prepend-icon="rv_hookup"
    hint="Maximo 5 Plazas"
    label="Agrega las plazas"
    multiple    
  >
    </v-combobox>
        </v-flex>
        </v-layout>
    </v-container>

        <v-container>
      <v-layout>

    

        <v-flex xs12>
          <v-text-field
            v-model="placa"
            :rules="PlacaRules"
            :counter="10"
            prepend-icon="edit"
            label="Numero Placa"
            required
          ></v-text-field>
        </v-flex>
              </v-layout>
    </v-container>

    <v-container>
      <v-layout>
             <v-flex xs12>
          <v-text-field
            v-model="tag"
            :rules="TagRules"
            :counter="10"
            :disabled=soloPlaca
            prepend-icon="edit"
            label="Numero Tag"
            required
          ></v-text-field>
        </v-flex>

      </v-layout>
    </v-container>          

      <v-container>
        <v-layout>
          <v-flex xs12>
      <b-alert show v-model="showDismissibleAlert" variant="danger">La Fecha Fin Debe Ser Mayor :)</b-alert>    
      </v-flex>  
        </v-layout>
      </v-container>

    <v-container>
        <v-layout>
          <v-flex xs12>
            <v-btn  outline  large color=#33BF17 @click="validarAntesdeEnviar()" :disabled="oculto">Buscar</v-btn>
           <!-- <b-button @click="actualizaPlazasInicio(rangoFecha)" variant="outline-dark" size="lg" :disabled="oculto">Buscar</b-button>   -->
           </v-flex>           
        </v-layout>
      </v-container>
  </v-form>
</div> 
</template>
    
    




<script>
import axios from "axios";
import moment from "moment";


import { mapState, mapMutations, mapActions, Store } from "vuex";


export default {

  data(){ 

      return{    
      fechaMax: new Date().toISOString().substr(0, 10).toString(),            
      valid: false,
      oculto: false,      
      menuFechaInicial: false,
      nemuFechaFinal: false,
      rangoFecha: "primary",
      soloPlaca: false,                  
      tag: '',
      placa: '',      
      PlacaRules: [
        v => !!v || 'El numero de placa es necesario',        
        v => v.length <= 10 || 'La placa no puede tener mas de 10 caracteres!'
      ],
      TagRules: [
        v => v.length <= 10 || 'El tag no puede tener mas de 10 caracteres!'
      ],
      items: ['Cerro Gordo', 'Palmilas', 'Libramiento', 'Tepotzotlan','Queretaro','Salamanca','Chichimequillas','Villagrand'],
      model: [],       
      search: null
      }
     
  },
   watch: {
      model (val) {
        if (val.length > 5) {
          this.$nextTick(() => this.model.pop())
        }
      }
    },
  
  computed: {

    ...mapState(['fechaInicio','fechaFin','pruebas']),
   
     computedDateFormatted() {    
      return this.formatDate(this.fechaInicio);
    },
    computedDateFormatted2() {      
      return this.formatDate(this.fechaFin);
    },
    showDismissibleAlert(){

      if(this.rangoFecha == "primary")
      {

        this.$store.commit('rangoFechaMutation', this.rangoFecha)
        if(this.fechaFin >= this.fechaInicio){  
          this.oculto = false
          return false
        }
        else{    
             
          this.oculto = true      
          return true
        } 
      }
      else{
          this.$store.commit('rangoFechaMutation', this.rangoFecha)
          this.oculto = false
          return false
      }   
    }

  },

  methods: { 

    ...mapActions['llenarTablasoloPlaca'],
    
    
    validarAntesdeEnviar(){

      if(this.soloPlaca == false){      

      if(this.tag == ''){

          var Info = {
            'fechaInicio': '',
            'fechaFin': '',
            'placa': '',
            'plazas': [],
            'rangoFecha': false
          }

          Info.fechaInicio = this.fechaInicio,
          Info.fechaFin = this.fechaFin,
          Info.placa = this.placa,
          Info.plazas = this.model,
          Info.rangoFecha = this.rangoFecha

          alert(JSON.stringify(Info))

      }
      else{
        
          var Info = {
            'fechaInicio': '',
            'fechaFin': '',
            'placa': '',
            'tag':'',
            'plazas': [],
            'rangoFecha': false
          }

          Info.fechaInicio = this.fechaInicio,
          Info.fechaFin = this.fechaFin,
          Info.placa = this.placa,
          Info.plazas = this.model,
          Info.rangoFecha = this.rangoFecha
          Info.tag = this.tag
        }
      }
      else{

        if(this.tag == ''){

            var Info = {
            'placa': '',
            'plazas': [],            
          }
          Info.placa = this.placa,
          Info.plazas = this.model,        
          this.$store.dispatch('llenarTablasoloPlaca', Info)
          alert(JSON.stringify(Info))

      }
      else{
        
          var Info = {
            'placa': '',
            'tag':'',
            'plazas': [],
            
          }
          Info.placa = this.placa,
          Info.plazas = this.model,
          Info.tag = this.tag
        }

      }


    },
    

    formatDate(date) {

      if (!date) return null;
      else return moment(date).format("L");

    },
    updateFechaInicio (e) {
      
      this.$store.commit('fechaInicioMutate', e)
    }, 
    updateFechaFin (e) {
      
      this.$store.commit('fechaFinMutate', e)
    }

  
  }
};
</script>

