<template>
  <v-app>
    <BuscadorPrincipal></BuscadorPrincipal>
  </v-app>  
</template>

// LaVacaLoca16


<script>
import BuscadorPrincipal from "@/components/BuscadorPrincipal.vue";

import { mapState, mapMutations } from "vuex";
export default {
  name: "Graficas",
  components: {
    BuscadorPrincipal,

  },
  computed: {
    ...mapState([])
  }
};
</script>

