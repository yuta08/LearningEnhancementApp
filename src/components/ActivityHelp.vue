<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          style="margin: 16px;"
          text
          v-bind="props"
          @click="dialog = true"
        >
          <v-spacer/><v-card-subtitle>活動内容</v-card-subtitle><v-icon>mdi-help-circle-outline</v-icon>
          
        </v-btn>
      </template>

      <v-card>
        <img src="../assets/activityhelp_w.png" class="activity_help">
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
.activity_help {
  width: 1000px;
  margin: 50px;
}
</style>

<script>
  export default {
    data () {
      return {
        dialog: true,
      }
    },
  }
</script>