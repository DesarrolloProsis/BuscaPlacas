<template>
  <v-app>
   
    <v-container>
      <v-layout>
        <v-flex xs3>
          <BuscadorPrincipal></BuscadorPrincipal>
        </v-flex>
        <v-flex xs9>
            <ImagenYOYA></ImagenYOYA>
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
import  ImagenYOYA from "@/components/ImagenesYOYA.vue";

import { mapState, mapMutations } from "vuex";
export default {
  name: "Graficas",
  components: {
    BuscadorPrincipal,
    TablaInfo,
    ImagenYOYA
  },
  computed: {
    ...mapState([])
  }
};
</script>

