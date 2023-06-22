<template>
  <div>
    <!-- <v-table>
        <thead>
          <tr>
            <th>開始時間</th>
            <th>タスク名</th>
            <th>アクティビティ</th>
            <th>学習場所</th> -->
            <!-- 追加のフィールドがあればここに追加 -->
          <!-- </tr>
        </thead>
      <tbody>
        <tr v-for="doc in documents" :key="doc.id">
          <td>{{ doc.start_time.toDate() }}</td>
          <td>{{ doc.task_name }}</td>
          <td>{{ doc.learning_activity }}</td>
          <td>{{ doc.learning_space }}</td>
          <td>{{ doc.memo }}</td> -->
          <!-- 追加のフィールドがあればここに追加 -->
        <!-- </tr>
      </tbody>
    </v-table> -->
    <v-data-table
      :headers="headers"
      :items="documents"
      :search="search"
      class="elevation-1"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.uid`]="{ item }">
        {{ item.uid }}
      </template>
      <template v-slot:[`item.task_name`]="{ item }">
        {{ item.task_name }}
      </template>
      <template v-slot:[`item.learning_space`]="{ item }">
        {{ item.learning_space }}
      </template>
      <!-- 追加のフィールドがあればここに追加 -->
      <!-- <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
import firebase from "@/firebase/firebase"

export default {
  data() {
    return {
      documents: [],
      headers: [
        { text: '学習時間', value: 'learning_time' },
        { text: 'タスク名', value: 'task_name' },
        { text: 'アクティビティ', value: 'learning_activity' },
        { text: '学習場所', value: 'learning_space' },
        { text: 'メモ', value: 'memo' },
        { text: '', value: 'actions', sortable: false },
        // 追加のフィールドがあればここに追加
      ],
      search: '',
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.fetchDocuments(user.uid);
    }
  },
  methods: {
    fetchDocuments(uid) {
      const db = firebase.firestore();
      const collectionRef = db.collection('learning_log');

      collectionRef
        .orderBy('start_time', 'desc')
        .where('uid', '==', uid)
        .get()
        .then(querySnapshot => {
          const documents = [];
          querySnapshot.forEach(doc => {
            // console.log(doc.data().learning_space)
            var timestamp_st = doc.data().start_time
            const milliseconds_st = timestamp_st.seconds * 1000 + Math.floor(timestamp_st.nanoseconds / 1e6);
            const date_st = new Date(milliseconds_st);

            const year_st = date_st.getFullYear();
            const month_st = String(date_st.getMonth() + 1).padStart(2, '0');
            const day_st = String(date_st.getDate()).padStart(2, '0');
            const hours_st = String(date_st.getHours()).padStart(2, '0');
            const minutes_st = String(date_st.getMinutes()).padStart(2, '0');

            // const start_time = `${year_st}/${month_st}/${day_st} ${hours_st}:${minutes_st}`;

            var timestamp = doc.data().end_time
            const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);
            const date = new Date(milliseconds);

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            // Timestampの差を計算します
            const millisecondsDiff = (timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6)) -
                                    (timestamp_st.seconds * 1000 + Math.floor(timestamp_st.nanoseconds / 1e6));
            const minutesDiff = Math.floor(millisecondsDiff / (1000 * 60)); // 分単位の差を計算します

            // 時間と分に変換します
            const hours_diff = Math.floor(minutesDiff / 60);
            const minutes_diff = minutesDiff % 60;

            // "hh時間mm分"の形式に変換します
            const formattedTimeDiff = `${hours_diff}時間${minutes_diff}分`;

            const learning_time = `${year_st}/${month_st}/${day_st} ${hours_st}:${minutes_st} - ${year}/${month}/${day} ${hours}:${minutes} (${formattedTimeDiff})`;

            documents.push({ "learning_space": doc.data().learning_space, "learning_activity": doc.data().learning_activity, "memo": doc.data().memo, "task_name": doc.data().task_name, "learning_time": learning_time });
          });
          this.documents = documents;
          console.log(documents)
        })
        .catch(error => {
          console.error('エラー:', error);
        });
    },
  },
};
</script>
