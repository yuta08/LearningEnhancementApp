<template>
    <v-app class="home">
      <SideBar />
      <v-main>
        <v-card
          class="form-card"
          elevation="5"
          outlined
          color="rgb(255, 255, 255, 0.9)"
        >
					<br>
					<!-- <v-chip
						class="ma-2"
						large
					>
						今日の勉強時間
					</v-chip> -->
          <DisplayTotalTime/>
					
          <br>
					<!-- <v-card-title class="text-h1">
            <v-spacer />
              {{ this.display_time_h }}
              :{{ this.display_time_m }}:{{ this.display_time_s }}
            <v-spacer />
          </v-card-title> -->
					<!-- <v-btn
						tile
						color="success"
					> -->
						<!-- <v-icon left>
							mdi-pencil
						</v-icon>
						-10分ボタン
					</v-btn>
					<p>     </p>
					<v-btn
						tile
						color="success"
					>
						<v-icon left>
							mdi-pencil
						</v-icon>
						学習内容を変更する
					</v-btn> -->
					<br>
        </v-card>
        <v-card
          class="form-card"
          elevation="5"
          outlined
          color="rgb(255, 255, 255, 0.9)"
        >
          <div class="graph_area">
            <BarChart />
          </div>
        </v-card>
  
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

  .graph_area {
    margin: 40px;
  }
  
  @media screen and (max-width: 480px) {
    /* 959px以下に適用されるCSS（タブレット用） */
    .form-card {
      margin: 40px 20px 60px 20px;
    }

    .graph_area {
      margin: 10px;
    }
  }

  </style>
  
  <script>
    import SideBar from "@/components/SideBar_new.vue";
    // import firebase from "@/firebase/firebase"
    import BarChart from '@/components/ChartBar.vue';
    import DisplayTotalTime from "@/components/DisplayTotalTime.vue";
  
    export default {
      mounted(){
        
      },
      data: () => ({
        
      }),
      components: { SideBar ,BarChart, DisplayTotalTime, },
      methods: {
        
      }
    };
  </script>

  <!-- <template>
    <div>
      <h1>棒グラフと線グラフ</h1>
      <chart></chart>
    </div>
  </template>
  
  <script>
  import Chart from '@/components/ChartBar.vue';
  
  export default {
    components: {
      Chart,
    },
  }
  </script>
   -->
