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
          <br><br>
          <div class="count-time">
            <v-card-title class="display-time">
              <v-spacer />
                <div id="writehere" class="after count-time- text">00:00:00</div>
              <v-spacer />
            </v-card-title>
          </div> 
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
    margin: 40px 80px 40px 40px;
    
  }
  
  .card-title {
    text-align: center;
  }
  
  .form-box {
    margin: 0px 80px 0px 80px;
    background-color: white;
  }

  .display-time {
    font-size: 80px;
  }

  @media screen and (max-width: 480px) {
    /* 959px以下に適用されるCSS（タブレット用） */
    .form-card {
      margin: 40px 20px 40px 20px;
    }

    .display-time {
      font-size: 60px;
    }

    .form-box {
      margin: 0px 20px 0px 20px;
      background-color: white;
    }
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
        const user = JSON.parse(localStorage.getItem('user'))
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
                console.log("ccccc")
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
        this.learning_time()
      },
      data() {
        return{
          display_time_h: "",
          display_time_m: "",
          display_time_s: "",
          satisfactions: ["1", "2", "3", "4", "5"],
          places: ['教室', '研究室', 'フリースペース', '図書室', '飲食店', '自宅', '友人宅'],
          memo: '',
          satisfaction: null,
          display_space: "",
          display_activity: "",
          display_task: "",
          display_time: "",
          judge_learning: true,
          display_form: "",
          discount_time: 0,
          CalcTime: "",
        }
      },
      components: { SideBar },
      methods: {
        learning_time(){
          // 時間を表示
          // this.CalcTime = setInterval(function(){
            const db = firebase.firestore();
            const users_collection = "users"; // 抽出元のコレクション名
            const user = JSON.parse(localStorage.getItem('user'))
            const users_document = user.uid; // 検索する特定のドキュメントIDを指定
            db.collection(users_collection)
              .doc(users_document)
              .get()
              .then((doc) => {
                if (doc.exists) {
                  const users_data = doc.data();
                  if (users_data.learning_now){
                    // console.log(now_time.getTime())
                    // console.log(users_data.start_time.seconds)
                    // this.display_time = now_time.getTime()/1000 - users_data.start_time.seconds;
                    // this.CalcTime = setInterval(function(){
                    this.CalcTime = setInterval(function(){
                      if(!this.judge_learning){
                        this.display_time_h = "user"
                        // var date_2 = new Date();
                        const now_time = new Date();
                        var diff = now_time.getTime()/1000 - users_data.start_time.seconds;
                        diff = Math.trunc(diff);
                        // diff = diff - this.discount_time;
                        console.log("before_2", diff)
                        var time_h = 0
                        var time_m = 0
                        var time_s = 0
                        if (diff >= 60){
                          console.log("all", diff)
                          time_m = Math.trunc(diff / 60);
                          // console.log("m:", this.display_time_m)
                          time_s = diff % 60;
                          if (time_m>=60){
                            time_h = Math.trunc(time_m/ 60);
                            time_m = time_m % 60;
                          } else {
                            time_h = 0;
                          }
                        }else if (diff < 0){
                          time_s = 0;
                          time_m = 0;
                          time_h = 0;
                        } else {
                          time_s = diff;
                          time_m = 0;
                          time_h = 0;
                        }
                        // this.display_time_h = String(time_h)
                        // this.display_time_m = String(time_m)
                        // this.display_time_s = String(time_s)
                        if (String(time_h).length==1){
                          this.display_time_h = "0" + String(time_h)
                        } else {
                          this.display_time_h = String(time_h)
                        }
                        if (String(time_m).length==1){
                          this.display_time_m = "0" + String(time_m)
                        } else {
                          this.display_time_m = String(time_m)
                        }
                        if (String(time_s).length==1){
                          this.display_time_s = "0" + String(time_s)
                        } else {
                          this.display_time_s = String(time_s)
                        }
                        console.log(this.display_time_h, ":", this.display_time_m, ":", this.display_time_s)
                        
                        // this.learning_time()
                        var writehere = document.getElementById("writehere");
                        writehere.innerHTML=this.display_time_h+ ":"+ this.display_time_m+ ":"+ this.display_time_s;
                      }
                    } ,1000);
                      // var Myelement_1 = document.getElementById("st1");
                      // var Myelement_2 = document.getElementById("st");
                      // Myelement_1.value = hours+","+minutes+","+seconds;
                      // Myelement_2.value = hours+","+minutes+","+seconds;
                      
                      // if(count >= 9){
                      //     clearInterval(countup);
                      // }
                    // } ,1000);
                    // CalcTime
                    
            //         this.display_time = Math.floor(this.display_time);
            //         if (this.display_time >= 60){
            //           this.display_time_m = Math.floor(this.display_time / 60)
            //           this.display_time_s = this.display_time % 60
            //           if (this.display_time_m >= 60) {
            //             this.display_time_h = Math.floor(this.display_time_m / 60)
            //             this.display_time_m = this.display_time_m % 60
            //           } else {
            //             this.display_time_h = 0
            //           }
            //         } else {
            //           this.display_time_s = 0
            //           this.display_time_m = 0
            //           this.display_time_h = 0
            //         }
            //         this.display_time = ""
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
              
          // this.learning_time()
          // var date_1 = new Date('{{ dt_start }}');
          // var hours = 0;
          // var minutes = 0;
          // var seconds = 0;
          // var discount_time = 0;
          // var countup = setInterval(function(){
          //     var date_2 = new Date();
          //     var diff = date_2.getTime() - date_1.getTime();
          //     diff = Math.trunc(diff /1000);
          //     diff = diff - discount_time;
          //     if (diff=>60){
          //         minutes = Math.trunc(diff / 60);
          //         seconds = diff % 60;
          //         if (minutes>=60){
          //             hours = Math.trunc(minutes/ 60);
          //             minutes = minutes % 60;
          //         } else {
          //             hours = 0;
          //         }
          //     }else if (diff < 0){
          //         seconds = 0;
          //         minutes = 0;
          //         hours = 0;
          //     } else {
          //         seconds = diff;
          //         minutes = 0;
          //         hours = 0;
          //     };
          //     writehere.innerHTML=hours+"時間 "+minutes+"分 "+seconds+"秒";
          //     var Myelement_1 = document.getElementById("st1");
          //     var Myelement_2 = document.getElementById("st");
          //     Myelement_1.value = hours+","+minutes+","+seconds;
          //     Myelement_2.value = hours+","+minutes+","+seconds;
              
          //     // if(count >= 9){
          //     //     clearInterval(countup);
          //     // }
          // } ,1000);
        },
        TimeDiscount() {
          this.discount_time = this.discount_time + 600;
        },
        
        end_learning(){
          console.log("end-learning")
          // Firestoreのインスタンスを取得
          const db = firebase.firestore();

          // usersからデータを取得
          const users_collection = "users"; // 抽出元のコレクション名
          const user = JSON.parse(localStorage.getItem('user'))
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
                        this.judge_learning = false
                        clearInterval(this.CalcTime)
                        this.$router.push('/review')
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
  