<template>
  <v-app id="inspire">

    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row>
          <v-col
            v-for="card in cards"
            :key="card"
            cols="12"
          >
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="data, index in messages">
                  <v-list-item

                    :key="index"
                  >
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>

                      <v-list-item-subtitle class="message">
                        {{ data.message }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="n !== 6"
                    :key="`divider-${index}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-textarea
        v-model="body"
        append-icon="mdi-comment"
        class="mx-2"
        label="メッセージを送信"
        rows="3"
        auto-grow
      ></v-textarea>
      <v-btn
    class="me-4"
    type="submit"
    :disabled="invalid"
    @click="submit"
  >
    submit
  </v-btn>

  <v-btn @click="clear">
    clear
  </v-btn>
    </v-main>
  </v-app>
</template>

<script>
// import firebase from "@/firebase/firebase"
// import { getHeapSnapshot } from "v8";
  export default {
    
    data: () => ({
      messages: [
        {message: "message 1"},
        {message: "message 2"},
        {message: "message 3"},
        {message: "message 4"},
        {message: "message 5"},
      ],
      body: '',
      user_id: '',
      cards: ['Today'],
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'Inbox'],
        ['mdi-send', 'Send'],
        ['mdi-delete', 'Trash'],
        ['mdi-alert-octagon', 'Spam'],
      ],
      // invalid: false
    }),
    computed: {
      invalid() {
          console.log("invalid call")
          if (!this.body) {
              return true;
          }
          return false
      }
    },
    methods: {
      clear() {
          console.log("clear call.");
          this.body = "";
      },
      submit() {
          console.log("submit call.", this.body);
          this.messages.unshift({message: this.body})
          this.body = "";
      }
    }
  }
</script>
<style scoped>
  .message {
      text-align: left;
  }
</style>