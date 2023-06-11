<template>
  <v-app class="login">
    <div class="login-box">
      <v-card class="login-form">
        <v-card-title class="login-title">Login</v-card-title>
        <v-card-subtitle>ユーザー情報をご入力ください</v-card-subtitle>
        <v-btn text color="light-blue" to="signup">新規登録はこちら</v-btn>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          
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
            LOGIN
          </v-btn>

          <v-btn>
            CLEAR
          </v-btn>
          <v-alert
            dense
            text
            type="success"
            class="success-message"
            v-if="message"
          >
            {{ message }}
          </v-alert>
          <v-alert
              dense
              outlined
              type="error"
              class="error-message"
              v-if="errorMessage"
            >
              {{ errorMessage }}
            </v-alert>
            <v-alert
            dense
            text
            type="info"
            class="success-message"
            v-if="signout_message"
          >
            {{ signout_message }}
          </v-alert>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>

<style scoped>

.login {
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

.success-message {
  margin-top: 20px;
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



  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'メールアドレスを入力してください',
        v => /.+@.+\..+/.test(v) || 'メールアドレスが不正です',
      ],
      password: '',
      message: '',
      errorMessage: '',
      signout_message: '',
    }),
    mounted() {
      if(localStorage.message){
        this.message = localStorage.message
        localStorage.message = ''
      }
      if(localStorage.signout_message){
        this.signout_message = localStorage.signout_message
        localStorage.signout_message = ''
      }
    },
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
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(async (result) => {
          console.log("success", result);
          console.log("user", result.user);

          const auth = {
            displayName: result.user.displayName,
            email: result.user.email,
            uid: result.user.uid,
            refreshToken: result.user.refreshToken
          }

          localStorage.setItem('user', JSON.stringify(auth))

          // TOPにリダイレクト処理
          this.$router.push('/')
        })
        .catch((error) => {
          console.log("error", error);
          this.errorMessage = "ログインに失敗しました"
        })
      }
    },
  }
</script>