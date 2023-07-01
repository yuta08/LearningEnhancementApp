<script>
import { Pie } from 'vue-chartjs';
import firebase from '@/firebase/firebase';

export default {
  extends: Pie,
  data() {
    return {
      chartData2: {},
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const db = firebase.firestore();
      const today = new Date();
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const learningLogCollection = db.collection('learning_log');
      const colorMap = {
        '問う': '#8F509C',
        '考動する': '#34955A',
        'カタチにする': '#DA7D3E',
        '見つめ直す': '#D8639D',
        '整える': '#3DA9CF',
        'その他': '#898989'
      };

      

      // 2つ目の円グラフのデータを取得して集計
      learningLogCollection
        .where('start_time', '>=', oneWeekAgo)
        .get()
        .then((querySnapshot) => {
          const data = {};
          querySnapshot.forEach((doc) => {
            const activity = doc.data().learning_activity;
            if (data[activity]) {
              data[activity]++;
            } else {
              data[activity] = 1;
            }
          });
          this.chartData2 = {
            labels: Object.keys(data),
            datasets: [
              {
                data: Object.values(data),
                backgroundColor: Object.keys(data).map((key) => colorMap[key]),
              },
            ],
          };
          this.renderChart(this.chartData2, { responsive: true });
        });
    },
  },
};
</script>
