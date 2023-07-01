<script>
import { Pie } from 'vue-chartjs';
import firebase from '@/firebase/firebase';

export default {
  extends: Pie,
  data() {
    return {
      chartData1: {},
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
      const user = JSON.parse(localStorage.getItem('user'));
      const colorMap = {
        '教室': '#EA5504',
        '研究室': '#FFF100',
        'フリースペース': '#B8D200',
        '図書館': '#591A86',
        '移動中': '#96BA7E',
        '飲食店': '#6D93E8',
        '自宅': '#689DAD',
        '友人宅': '#E3C97C'
      };

      // 1つ目の円グラフのデータを取得して集計
      learningLogCollection
        .where('uid', '==', user.uid)
        .where('start_time', '>=', oneWeekAgo)
        .get()
        .then((querySnapshot) => {
          const data = {};
          querySnapshot.forEach((doc) => {
            const activity = doc.data().learning_space;
            if (data[activity]) {
              data[activity]++;
            } else {
              data[activity] = 1;
            }
          });
          this.chartData1 = {
            labels: Object.keys(data),
            datasets: [
              {
                data: Object.values(data),
                backgroundColor: Object.keys(data).map((key) => colorMap[key]),
              },
            ],
          };
          
          this.renderChart(this.chartData1, { responsive: true });
        });

      
    },
  },
};
</script>

