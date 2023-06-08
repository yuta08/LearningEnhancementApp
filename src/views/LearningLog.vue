<template>
    <v-app class="home">
      <SideBar />
      <v-main>
        <DisplayTable/>
      </v-main>
    </v-app>
  </template>
  
  <style scoped>
  
  .home {
    background-image: url("~@/assets/front/background_0907.png");
  }
  
  .form-card {
    margin: 40px 80px 60px 40px;
  }

  
  
  @media screen and (max-width: 480px) {
    /* 959px以下に適用されるCSS（タブレット用） */
    .form-card {
      margin: 40px 20px 60px 20px;
    }

  }

  </style>
  
  <script>
    import SideBar from "@/components/SideBar.vue";
    import DisplayTable from "@/components/DisplayTable.vue";
    // import firebase from "@/firebase/firebase"
  
    export default {
      mounted(){
        
      },
      data: () => ({
        
      }),
      components: { SideBar, DisplayTable},
      methods: {
        
      }
    };
  </script>

