<template>
  <nav class="nav">
    <router-link to="/">List</router-link>
    <br>
    <router-link to="/add/payment">Form</router-link>
  </nav>
  <router-view/>
</template>

<script>
import List from "./components/List.vue";
import Form from "./components/Form.vue";
export default {
  name: "App",
  components: { List, Form },
  mounted() {
    this.$store.dispatch("fetchData");
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
}

</style>
