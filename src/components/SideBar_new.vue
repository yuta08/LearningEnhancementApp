<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
        <v-toolbar-title>
          <a href="/">
            <img alt="App logo" class="enhanced_logo" src="@/assets/front/Enhanced_logo.png">
          </a>
        </v-toolbar-title>
        <div class="username">現在 {{ this.learning_now_count }} 人学習中</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text, to] in links"
          :key="icon"
          :to="to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="signout" link>
          <v-list-item-icon>
            <v-icon>
              mdi-logout
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <b>Logout</b>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "@/firebase/firebase";

export default {
  created() {
    if (!JSON.parse(localStorage.getItem("user"))) {
      this.$router.push("/login");
    }
  },
  mounted() {
    // 現在学習している人の人数を計測する
    const db = firebase.firestore();
    const collectionRef = db.collection("users"); // ドキュメントが含まれるコレクションの参照

    collectionRef
      .where("learning_now", "==", true)
      .get()
      .then((querySnapshot) => {
        this.learning_now_count = querySnapshot.size;
      })
      .catch((error) => {
        console.error("エラー:", error);
      });
  },
  data: () => ({
    learning_now_count: 0,
    drawer: null,
    links: [
      ["mdi-home", "Home", "/"],
      ["mdi-lead-pencil", "Learning", "/learning"],
      ["mdi-chart-bar", "Review", "/review"],
      ["mdi-calendar-month", "Calendar", "/calendar"],
    ],
  }),
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem("user");
          localStorage.signout_message = "サインアウトしました";
          this.$router.push("/login");
        })
        .catch((error) => {
          // ログアウト失敗時の処理
          console.log("ログアウトに失敗しました", error);
        });
    },
  },
};
</script>
