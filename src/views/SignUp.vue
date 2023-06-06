<template>
  <v-app class="signup">
    <div class="login-box">
      <v-card class="login-form">
        <v-card-title class="login-title">SignUp</v-card-title>
        <v-card-subtitle>ユーザー情報をご入力ください</v-card-subtitle>
        <v-btn text color="light-blue" to="login">ログイン画面はこちら</v-btn>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="UserName"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            type="password"
            label="Password"
          ></v-text-field>


          <v-btn
            color="success"
            class="login-btn"
            @click="submit"
            :disabled="isValid">
            SIGN UP
          </v-btn>

          <v-btn>
            CLEAR
          </v-btn>
          <v-alert
            dense
            outlined
            type="error"
            class="error-message"
            v-if="errorMessage"
          >
            {{ errorMessage }}
          </v-alert>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>

<style scoped>

.signup {
  background-image: url("~@/assets/front/background_0907.png");
}

.login-form {
  margin: 120px 20px 20px 20px;
  padding: 30px;
}

.login-box {
  width: 50%;
  margin: 0px auto;
  padding: 30px;
}

.login-title {
  display: inline-block;
}

.login-btn {
  margin-right: 20px;
}

.error-message {
  margin-top: 20px;
}

@media screen and (max-width: 480px) {
	/* 959px以下に適用されるCSS（タブレット用） */
  .login-box {
    width: 100%;
    margin: 0px auto;
    padding: 30px;
  }
}

</style>

<script>
  import firebase from "@/firebase/firebase"
  import "firebase/firestore";

  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || '名前を入力してください',
        v => (v && v.length <= 10) || '名前は10文字以内で入力してください',
      ],
      email: '',
      emailRules: [
        v => !!v || 'メールアドレスを入力してください',
        v => /.+@.+\..+/.test(v) || 'メールアドレスが不正です',
      ],
      password: '',
      errorMessage: '',
    }),
    computed: {
      isValid() {
        console.log("isValid", this.valid);
        return !this.valid;
      }
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      submit () {
        console.log("submit call");
        firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async (result) => {
          console.log("success", result)
          await result.user.updateProfile(
            {displayName: this.name}
          );
          console.log("update user", result.user)

          localStorage.message = "新規作成に成功しました"

          const uid = result.user.uid

          // Firestoreにデータを登録
          const db = firebase.firestore()
          db.collection('users').doc(uid).set({
            // データをここに追加
            learning_now: false,
            start_time: "",
            learning_activity: "",
            learning_space: "",
            task_name: ""
          })
          .then(() => {
            // データの登録が成功した場合の処理
            console.log("success")

            // Loginにリダイレクト処理
            this.$router.push('/login')
          })
          .catch(error => {
            console.log(error)
          })
        })
        .catch((error) => {
          console.log("fail", error)
          
          // エラーメッセージを表示
          this.errorMessage = "ユーザーの新規作成に失敗しました。"
        })
      },
      register_user_id () {
        const firebaseConfig = firebase.firebaseConfig;
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        db.collection("users").add({
          user_id: "Ada",
          learning_now: "Lovelace"
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
    },
  }
</script>