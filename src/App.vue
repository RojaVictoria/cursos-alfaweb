<template>
  <v-app>
    <v-main>
      <Navbar/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue"
export default {
  components: { Navbar },
  name: "App",
  data: () => ({}),
   mounted() {
    this.$store.dispatch("access/subscribeToAuthStateChange");
  },
};
</script>
