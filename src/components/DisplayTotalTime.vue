<template>
  <div>
    <v-card-title class="display-title"><v-spacer />今週の合計時間<v-spacer /></v-card-title>
    <v-card-title class="display-time"><v-spacer />{{ formattedDuration }}<v-spacer /></v-card-title>
  </div>
</template>

<style>

.display-time {
  font-size: 80px;
}

.display-title {
  font-size: 25px;
}

@media screen and (max-width: 480px) {
  .display-time {
    font-size: 60px;
  }

  .display-title {
    font-size: 20px;
  }
}

</style>

<script>
import firebase from "@/firebase/firebase"

export default {
  data() {
    return {
      formattedDuration: '', // 合計時間のフォーマットされた値を保持するデータプロパティ
    };
  },
  mounted(){
    this.calculateTotalDuration()
  },
  methods: {
    calculateTotalDuration() {
      const db = firebase.firestore();
      const user = JSON.parse(localStorage.getItem('user'));

      // 現在の日付を取得
      const today = new Date();
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 1週間前の日付を計算

      // 特定のコレクションからドキュメントを検索
      db.collection('learning_log')
        .where('uid', '==', user.uid)
        .where('start_time', '>=', oneWeekAgo)
        .get()
        .then((querySnapshot) => {
          
          let totalDuration = 0;

          querySnapshot.forEach((doc) => {
            const startTime = doc.data().start_time.toDate(); // 開始時間を取得
            const endTime = doc.data().end_time.toDate(); // 終了時間を取得

            const duration = endTime.getTime() - startTime.getTime(); // 差分を算出（ミリ秒単位）

            totalDuration += duration; // 合計時間に加算
          });

          // 合計時間を適当なフォーマットに変換（例：HH:mm:ss）
          this.formattedDuration = this.formatDuration(totalDuration);
        })
        .catch((error) => {
          console.error('検索エラー:', error);
        });
    },
    formatDuration(duration) {
      const hours = Math.floor(duration / (1000 * 60 * 60));
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((duration % (1000 * 60)) / 1000);

      return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    },
    padZero(num) {
      return num.toString().padStart(2, '0');
    },
  },
};
</script>
