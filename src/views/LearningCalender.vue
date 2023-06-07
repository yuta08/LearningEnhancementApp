<template>
  <div>
    <p>カレンダー</p>
    <div class="d-flex justify-space-around">
      <v-btn
        v-for="w in week"
        :key="w.value"
        :color="w.color"
        icon
        @click="clickWeek(w.value)"
        >{{ w.label }}</v-btn
      >
    </div>
    <v-calendar hide-header v-model="focus">
      <template #day-label="{ date, day }">
        <v-btn
          icon
          :color="isHoliday(date) ? 'error' : ''"
          :outlined="isHoliday(date)"
          @click="clickDate(date)"
          class="mb-1"
          >{{day}}
        </v-btn>
      </template>
    </v-calendar>
  </div>
</template>

<script>
function formatDate(dt) {
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
}

export default {
  name: "MyCalendar",
  props: {
    year: { type: Number },
    month: { type: Number },
    value: { type: Array },
  },
  data: () => ({
    week: [
      { value: 0, label: "日", color: "error" },
      { value: 1, label: "月", color: "" },
      { value: 2, label: "火", color: "" },
      { value: 3, label: "水", color: "" },
      { value: 4, label: "木", color: "" },
      { value: 5, label: "金", color: "" },
      { value: 6, label: "土", color: "info" },
    ],
    focus: null,
    holidays: [],
  }),
  created() {
    this.setFocus();
  },
  // computed: {
  //   holidays: {
  //     get() {
  //       return this.value;
  //     },
  //     set(newValue) {
  //       this.$emit("input", newValue);
  //     },
  //   },
  // },
  watch: {
    year() {
      this.setFocus();
    },
    month() {
      this.setFocus();
    },
  },
  methods: {
    setFocus() {
      this.focus = new Date(
        this.year ?? new Date().getFullYear(),
        this.month ? this.month - 1 : new Date().getMonth(),
        1
      );
    },
    clickWeek(weekValue) {
      // 表示月で指定曜日の最初の日付を計算
      let diff = weekValue - this.focus.getDay();
      const startDay = new Date(
        this.focus.getFullYear(),
        this.focus.getMonth(),
        this.focus.getDate() + (diff < 0 ? diff + 7 : diff)
      );

      // 7日ずつ加算しながら祝日データとして追加
      // 表示月を超えたら処理終了
      while (startDay.getMonth() === this.focus.getMonth()) {
        if (this.holidays.some((x) => x === formatDate(startDay)) === false) {
          this.holidays.push(formatDate(startDay));
        }

        startDay.setDate(startDay.getDate() + 7);
      }
    },
    clickDate(date) {
      const index = this.holidays.indexOf(date);

      if (index === -1) {
        this.holidays.push(date);
      } else {
        this.holidays.splice(index, 1);
      }
    },
    isHoliday(date) {
      return this.holidays.some((x) => x === date);
    },
  },
};
</script>