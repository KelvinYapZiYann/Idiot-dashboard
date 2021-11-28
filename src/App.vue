<template>
  <div id="app">
    <div class="content">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  methods: {
    toggleNavOpen() {
      let root = document.getElementsByTagName("html")[0];
      root.classList.toggle("nav-open");
    },
    screenSizeChangeHandler() {
      this.$store.dispatch('mobileLayout/update', (window.innerWidth <= 991));
    }
  },
  mounted() {
    this.$watch("$sidebar.showSidebar", this.toggleNavOpen);
  },
  created() {
    this.$store.dispatch('mobileLayout/update', (window.innerWidth <= 991));
    window.addEventListener("resize", this.screenSizeChangeHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.screenSizeChangeHandler);
  },
}
</script>

<style lang="scss">
#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
