<template>
    <v-app class="home">
      <SideBar />
      <v-main>
        
  
      </v-main>
    </v-app>
  </template>
  
  <style scoped>
  
  .home {
    background-image: url("~@/assets/front/background_0907.png");
  }
  
 
  
  </style>
  
  <script>
    import SideBar from "@/components/SideBar.vue";
    // import firebase from "@/firebase/firebase"
  
    export default {
      
      data: () => ({
        
      }),
      components: { SideBar },
      methods: {
        
        
      }
    }
  </script>
  