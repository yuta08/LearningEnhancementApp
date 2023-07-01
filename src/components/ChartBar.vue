<script>
import { Bar, mixins } from 'vue-chartjs';
import firebase from "@/firebase/firebase";

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  data() {
    return {
      userCount: 1,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
          yAxes: [{
            ticks: {
              callback: function (value) {
                value = Math.floor(value / 1000);
                let hours = Math.floor(value / 3600);
                let minutes = Math.floor((value % 3600) / 60);
                let seconds = value % 60;
                return `${hours}時間${minutes}分${seconds}秒`;
              }
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              let value = tooltipItem.value/1000;
              let hours = Math.floor(value / 3600);
              let minutes = Math.floor((value % 3600) / 60);
              let seconds = Math.floor(value % 60);
              return `${hours}時間${minutes}分${seconds}秒`;
            }
          }
        },
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const db = firebase.firestore();

      // 過去7日の日付範囲を計算
      const today = new Date();
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const user = JSON.parse(localStorage.getItem('user'));
      const dailyTotals_1 = Array(7).fill(0);
      const dailyTotals_2 = Array(7).fill(0);

      // 1つ目の棒グラフのデータを取得
      const query1 = db.collection('learning_log')
        .where('uid', '==', user.uid)
        .where('start_time', '>=', oneWeekAgo)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const startTime = doc.data().start_time.toDate();
            const endTime = doc.data().end_time.toDate();
            const duration = endTime.getTime() - startTime.getTime();
            const daysAgo = Math.floor((today - startTime) / (24 * 60 * 60 * 1000));
            dailyTotals_1[6 - daysAgo] += duration;
          });
          return dailyTotals_1;
        });

      // 2つ目の棒グラフのデータを取得
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          this.userCount = querySnapshot.size
        });

      const query2 = db.collection('learning_log')
        .where('start_time', '>=', oneWeekAgo)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const startTime = doc.data().start_time.toDate();
            const endTime = doc.data().end_time.toDate();
            const duration = (endTime.getTime() - startTime.getTime())/this.userCount;
            const daysAgo = Math.floor((today - startTime) / (24 * 60 * 60 * 1000));
            dailyTotals_2[6 - daysAgo] += duration;
          });
          return dailyTotals_2;
        });

      // 両方のデータ取得が完了したらグラフを描画
      Promise.all([query1, query2]).then(([data1, data2]) => {
        this.renderChart(
          {
            labels: this.generateLabels(),
            datasets: [
              {
                label: 'ユーザの学習時間',
                data: data1,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderWidth: 1,
              },
              {
                label: 'みんなの平均学習時間',
                data: data2,
                backgroundColor: 'rgba(192, 75, 192, 0.6)',
                borderWidth: 1,
              },
            ],
          },
          this.options
        );
      });
    },
    generateLabels() {
      const labels = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
        labels.push(formattedDate);
      }
      return labels;
    },
  },
};
</script>
