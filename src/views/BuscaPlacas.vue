<template>
  <v-app>
    <h1 align="center">Grafica De Trafico</h1>
    <v-container>
      <v-layout>
        <v-flex xs3>
          <BuscadorPrincipal></BuscadorPrincipal>
        </v-flex>
        <v-flex>
            <TablaInfo></TablaInfo>
        </v-flex>
      </v-layout>
    </v-container>
  
  </v-app>
</template>

// LaVacaLoca16


<script>
import BuscadorPrincipal from "@/components/BuscadorPrincipal.vue";
import TablaInfo from "@/components/TablaInfo.vue";

import { mapState, mapMutations } from "vuex";
export default {
  name: "Graficas",
  components: {
    BuscadorPrincipal,
    TablaInfo
  },
  computed: {
    ...mapState([])
  }
};
</script>

