<template>
  <div class="wrapper">
    <Header :counter="wishlist.length" />
    <Breadcrumbs />
    <main class="main">
      <section class="wishlist">
        <h1 class="wishlist__heading">Избранное</h1>
        <List
          :list="wishlist"
          :wishlist="wishlist"
          v-if="wishlist.length > 0"
          @sendIDToPage="sendIDToWishlist"
          :cross="true"
        />
        <span class="wishlist__empty-status" v-else
          >Список избранного пуст</span
        >
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/UI/Header';
import Footer from '@/components/UI/Footer';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import List from '@/components/UI/List';

export default {
  components: {
    Header,
    Footer,
    Breadcrumbs,
    List,
  },
  props: {
    wishlist: {
      type: Array,
    },
    list: {
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
.main {
  min-height: calc(100vh - 96px);
}

.wishlist {
  margin: 0 auto;
  max-width: 1400px;
}

.wishlist__heading {
  margin: 0 0 32px;
  font-size: 48px;
  color: #0a1e32;
  font-weight: 700;
}

.wishlist__empty-status {
  display: block;
  margin: 132px auto 0;
  text-align: center;
  font-size: 40px;
  color: #464c58;
  font-weight: 400;
}
</style>
