<template>
    <v-app class="home">
      <SideBar />
      <v-main>
				<v-card
          class="form-card"
          elevation="5"
          outlined
          color="rgb(255, 255, 255, 0.5)"
        >
					<br>
					<v-chip
						class="ma-2"
						large
					>
						{{ this.display_task }}
					</v-chip>
					<v-chip
						class="ma-2"
						large
					>
            {{ this.display_activity }}
					</v-chip>
					<v-chip
						class="ma-2"
						large
					>
            {{ this.display_space }}
					</v-chip>
          <br>
					<v-card-title class="text-h1">
            <v-spacer />
              {{this.display_time}}{{ this.display_time_h }}:{{ this.display_time_m }}:{{ this.display_time_s }}
            <v-spacer />
          </v-card-title>
					<v-btn
						tile
						color="success"
					>
						<v-icon left>
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
					</v-btn>
					<br><br>
        </v-card>
        <v-card
          class="form-card"
          elevation="5"
          outlined
          color="rgb(255, 255, 255, 0.5)"
        >
          <v-card-title>
            <v-spacer />
            学習を終了する
            <v-spacer />
          </v-card-title>
          <v-form>
            <v-card-subtitle>
              今回の学習の満足度
            </v-card-subtitle>
            <v-select
              class="form-box"
              hide-details
              :items="satisfactions"
              label="Choose Activity"
              outlined
              v-model="satisfaction"
            ></v-select>
            <v-card-subtitle>
              タスクメモ
            </v-card-subtitle>
            <v-textarea
							class="form-box"
							outlined
							name="input-7-4"
							label="Task Memo"
              v-model="memo"
						></v-textarea>
            <br>
            <v-btn
              class="me-4"
              :disabled="invalid"
              @click="end_learning"
            >
              学習を終了する
            </v-btn>
  
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
    margin: 40px 80px 60px 40px;
    
  }
  
  .card-title {
    text-align: center;
  }
  
  .form-box {
    margin: 0px 80px 0px 80px;
    background-color: white;
  }
  
  </style>
  
  <script>
  import SideBar from "@/components/SideBar.vue";
  import firebase from "@/firebase/firebase"

  export default {
      beforeCreate(){
        // usersからデータを取得
        const db = firebase.firestore();
        const users_collection = "users"; // 抽出元のコレクション名
        const user = JSON.parse(sessionStorage.getItem('user'))
        const users_document = user.uid; // 検索する特定のドキュメントIDを指定
        db.collection(users_collection)
          .doc(users_document)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const users_data = doc.data();
              if (users_data.learning_now){
                this.display_space = users_data.learning_space
                this.display_activity = users_data.learning_activity
                this.display_task = users_data.task_name
              } else {
                this.$router.push('/');
              }
            } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.error("Error getting document:", error);
            });
      },
      updated(){
        // 時間を表示
        const db = firebase.firestore();
        const users_collection = "users"; // 抽出元のコレクション名
        const user = JSON.parse(sessionStorage.getItem('user'))
        const users_document = user.uid; // 検索する特定のドキュメントIDを指定
        db.collection(users_collection)
          .doc(users_document)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const users_data = doc.data();
              if (users_data.learning_now){
                const now_time = new Date();
                console.log(now_time.getTime())
                console.log(users_data.start_time.seconds)
                this.display_time = now_time.getTime()/1000 - users_data.start_time.seconds;
                this.display_time = Math.floor(this.display_time);
                if (this.display_time >= 60){
                  this.display_time_m = Math.floor(this.display_time / 60)
                  this.display_time_s = this.display_time % 60
                  if (this.display_time_m >= 60) {
                    this.display_time_h = Math.floor(this.display_time_m / 60)
                    this.display_time_m = this.display_time_m % 60
                  } else {
                    this.display_time_h = 0
                  }
                } else {
                  this.display_time_s = 0
                  this.display_time_m = 0
                  this.display_time_h = 0
                }
                this.display_time = ""
              } else {
                this.$router.push('/');
              }
            } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.error("Error getting document:", error);
            });
      },
      data: () => ({
        satisfactions: ["1", "2", "3", "4", "5"],
        places: ['教室', '研究室', 'フリースペース', '図書室', '飲食店', '自宅', '友人宅'],
        memo: '',
        satisfaction: null,
        display_space: "",
        display_activity: "",
        display_task: "",
        display_time: "",
        display_time_h: "",
        display_time_m: "",
        display_time_s: "",
        display_form: "",
      }),
      components: { SideBar },
      methods: {
        end_learning(){
          console.log("end-learning")
          // Firestoreのインスタンスを取得
          const db = firebase.firestore();

          // usersからデータを取得
          const users_collection = "users"; // 抽出元のコレクション名
          const user = JSON.parse(sessionStorage.getItem('user'))
          const users_document = user.uid; // 検索する特定のドキュメントIDを指定
          db.collection(users_collection)
            .doc(users_document)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const users_data = doc.data();
                console.log("Document data:", users_data);
                // learning_dataに保存
                const learning_log_collection = "learning_log"; // 保存先のコレクション名
                const learning_data = {
                  end_time: new Date(),
                  learning_activity: users_data.learning_activity,
                  learning_space: users_data.learning_space,
                  memo: this.memo,
                  satisfaction: this.satisfaction,
                  start_time: users_data.start_time,
                  task_name: users_data.task_name,
                  uid: user.uid,
                };

                db.collection(learning_log_collection)
                  .add(learning_data)
                  .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    // usersを初期化
                    const updatedData = {
                      task_name: "", 
                      learning_activity: "", 
                      learning_space: "", 
                      start_time: "",
                      learning_now: false
                    };
                    db.collection("users") // コレクション名を指定
                      .doc(users_document) // ドキュメントIDを指定
                      .update(updatedData)
                      .then(() => {
                        console.log("Firestore document updated successfully.");
                        this.$router.push('/')
                      })
                      .catch((error) => {
                        console.error("Error updating Firestore document:", error);
                      });
                  })
                  .catch((error) => {
                    console.error("Error adding document: ", error);
                  });

          
              } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.error("Error getting document:", error);
            });
          
          
        },
      }
    }
  </script>
  