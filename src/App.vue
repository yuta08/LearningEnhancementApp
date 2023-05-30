<template>
  <div id="app">
    <!-- <nav> -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <!-- </nav> -->
    

    <div class="main-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.enhanced_logo {
  max-width: 120px;
}

// .main-wrapper {
  /* サイドバーのwidth分だけ範囲を削除 */
  // width: calc(100% - 200px);

  /* サイドバーで隠れるので右に寄せる */
  // margin: 0 0 0 180px;
// }

</style>

<script>
  export default {
    data: () => ({
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'Home', '/'],
        ['mdi-send', 'Learning', '/learning'],
        ['mdi-delete', 'Review', '/about'],
        ['mdi-delete', 'Calender', '/calender'],
        ['mdi-alert-octagon', 'Sign Out', '/about'],
      ],
    }),
  }
</script>
