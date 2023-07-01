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
        <v-card-title>
          <v-spacer />
          学習を開始する
          <v-spacer />
        </v-card-title>
        <v-form>
          <v-card-subtitle>
            プロジェクト・課題
          </v-card-subtitle>
          <v-combobox
            class="form-box"
            id="task_name"
            :items="items"
            label="Input Task"
            hide-details
            filled
            outlined
            solo
          ></v-combobox>
          <ActivityHelp/>
          <v-select
            class="form-box"
            v-model="selectedActivity"
            hide-details
            :items="activities"
            label="Choose Activity"
            outlined
          ></v-select>
          <v-card-subtitle>
            活動場所
          </v-card-subtitle>
          <v-select
            class="form-box"
            v-model="selectedSpace"
            hide-details
            :items="places"
            label="Choose Place"
            outlined
          ></v-select>
          <br>
          <v-btn
            class="me-4 submit_btn"
            :disabled="invalid"
            @click="StartLearning"
          >
            学習を開始する
          </v-btn>
          <div id="writehere" class="after count-time- text"></div>

          <!-- <v-btn @click="clear">
            clear
          </v-btn> -->
        </v-form>
        <br>
      </v-card>

    </v-main>
  </v-app>
</template>

<style scoped>

.home {
  background-image: url("~@/assets/front/background_0907.png");
}

.form-card {
  margin: 80px 80px 80px 80px;
  
}

.card-title {
  text-align: center;
}

.form-box {
  margin: 0px 80px 0px 80px;
  background-color: white;
}

.submit_btn {
  margin: 0px;
}

@media screen and (max-width: 480px) {
	/* 959px以下に適用されるCSS（タブレット用） */
  .form-card {
    margin: 80px 20px 80px 20px;
  }
  .form-box {
    margin: 0px 40px 0px 40px;
    background-color: white;
  }
}

</style>

<script>
  import SideBar from "@/components/SideBar.vue";
  import firebase from "@/firebase/firebase";
  import ActivityHelp from "@/components/ActivityHelp.vue";

  export default {
    created(){
      const user = JSON.parse(localStorage.getItem('user'))
      console.log("localStrageの内容:", user)
      console.log("user_id:", user.uid)
    },
    mounted(){
      // プロジェクト・課題の選択肢を取得
      const db = firebase.firestore();
      const collectionRef = db.collection('learning_log'); // データを取得するコレクションの参照

      const user = JSON.parse(localStorage.getItem('user'))
      const user_id = user.uid;

      collectionRef.where('uid', '==', user_id).get()
        .then(querySnapshot => {
          const fieldValues = new Set();

          querySnapshot.forEach(doc => {
            const fieldValue = doc.data().task_name;
            fieldValues.add(fieldValue);
          });

          this.items = Array.from(fieldValues);
        })
        .catch(error => {
          console.error('エラー:', error);
        });
    },
    data: () => ({
      activities: ['問う', '考動する', 'カタチにする', '見つめ直す', '整える', 'その他'],
      places: ['教室', '研究室', 'フリースペース', '図書室', '飲食店', '自宅', '友人宅'],
      items: [],
    }),
    components: { SideBar, ActivityHelp },
    methods: {
      StartLearning(){
        const db = firebase.firestore();
        const user = JSON.parse(localStorage.getItem('user'))
        const documentId = user.uid; // 検索する特定のドキュメントIDを指定

        // 更新するデータを取得
        const updatedData = {
          task_name: document.getElementById("task_name").value, 
          learning_activity: this.selectedActivity, 
          learning_space: this.selectedSpace, 
          start_time: new Date(),
          learning_now: true
        };

        // Firestoreのドキュメントを更新
        db.collection("users") // コレクション名を指定
          .doc(documentId) // ドキュメントIDを指定
          .update(updatedData)
          .then(() => {
            // console.log("Firestore document updated successfully.");
            clearInterval(this.CalcTime);
            localStorage.start_message = "学習を開始しました"
            this.$router.push('/learning')
          })
          .catch((error) => {
            console.error("Error updating Firestore document:", error);
          });
        
      },
      setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
      }
    }
  }
</script>
