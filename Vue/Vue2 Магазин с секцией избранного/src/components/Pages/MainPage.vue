<template>
  <div class="wrapper">
    <Header :counter="wishlist.length" />
    <main class="main">
      <section class="slider"></section>
      <List 
      :list="productsList" 
      @sendIDToPage="sendIDToWishlist"
      :wishlist="wishlist"/>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/UI/Header';
import Footer from '@/components/UI/Footer';
import List from '@/components/UI/List';

export default {
  components: {
    Header,
    Footer,
    List,
  },
  name: 'MainPage',
  props: {
    wishlist: {
      type: Array,
    },
    productsList: {
      type: Array,
    },
  },
  methods: {
    sendIDToWishlist(id) {
      this.$emit('sendIDToWishlist', id);
    }
  },
  
};
</script>

<style lang="css" scoped>
.wrapper {
  margin: 0 auto;
}
.main {
  min-height: calc(100vh - 96px);
}

.slider {
  height: 505px;
  background-image: url('~@/assets/img/main-slider-bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-color: #000;
}
</style>
