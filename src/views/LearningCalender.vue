<template>
  <v-app class="calender">
    <SideBar />
    <v-main>
      <v-row>
        <v-col>
          <v-sheet height="500">
            <v-calendar
              :now="today"
              :value="today"
              color="primary"
            >
              <template v-slot:day="{ past, date }">
                <v-row
                  class="fill-height"
                >
                  <template v-if="past && tracked[date]">
                    <v-sheet
                      v-for="(percent, i) in tracked[date]"
                      :key="i"
                      :title="category[i]"
                      :color="colors[i]"
                      :width="`${percent}%`"
                      height="100%"
                      tile
                    ></v-sheet>
                  </template>
                </v-row>
              </template>
            </v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<style scoped>

.calender {
  background-image: url("~@/assets/front/background_0907.png");
}

</style>

<script>
  import SideBar from "@/components/SideBar.vue";

  export default {
    data: () => ({
      today: '2023-03-30',
      tracked: {
        '2023-03-09': [23, 45, 10],
        '2023-03-08': [10],
        '2023-03-07': [0, 78, 5],
        '2023-03-06': [0, 0, 50],
        '2023-03-05': [0, 10, 23],
        '2023-03-04': [2, 90],
        '2023-03-03': [10, 32],
        '2023-03-02': [80, 10, 10],
        '2023-03-01': [20, 25, 10],
      },
      colors: ['#1867c0', '#fb8c00', '#000000'],
      category: ['Development', 'Meetings', 'Slacking'],
    }),
    components: { SideBar },
  }
</script>