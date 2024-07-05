<template>
  <div>
    <Header />
    <main class="main">
      <h1>Такой страницы не существует</h1>
      <button @click="$router.push('/')">На главную</button>
    </main>
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/UI/Header';
import Footer from '@/components/UI/Footer';

export default {
  name: 'NotFound',
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="css" scoped>
.main {
  min-height: calc(100vh - 96px);
  max-width: 1400px;
  margin: 120px auto 0;
}</style>
