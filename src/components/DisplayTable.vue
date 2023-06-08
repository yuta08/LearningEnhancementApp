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
      <template v-slot:[`item.actions`]="{ item }">
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
      </template>
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
        // { text: '学習日', value: 'start_time' },
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

      collectionRef.where('uid', '==', uid).get()
        .then(querySnapshot => {
          const documents = [];
          querySnapshot.forEach(doc => {
            documents.push({ id: doc.id, ...doc.data() });
          });
          this.documents = documents;
        })
        .catch(error => {
          console.error('エラー:', error);
        });
    },
  },
};
</script>
