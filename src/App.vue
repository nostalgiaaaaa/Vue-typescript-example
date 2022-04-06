<template>
  <div id="app">
    <navbar />
    <router-view :key="$route.fullPath" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Navbar from '@/components/navbar/Navbar.vue'
@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {}
</script>
<style lang="scss">
body {
  font-family: 'Raleway', sans-serif;
  box-sizing: border-box;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
#app {
  min-height: 100vh;
  width: 100%;
}
</style>
