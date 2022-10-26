<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink><span><p>   </p></span>
        <RouterLink to="/fruit">Fruit</RouterLink>
      </nav>
      <HomeView />
      <!-- <Fruit /> -->
      <RouterView />
    </div>
  </header>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import HomeView from './views/HomeView.vue';
  import Fruit from "./views/Fruit.vue"
</script>

<style scoped>

</style>
