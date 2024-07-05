<template>
  <div id="app">
    <router-view 
      :wishlist="wishlist" 
      :productsList="productsList"
      @sendIDToWishlist="updateWishlist" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      wishlist: [],
      productsList: [],
    };
  },
  methods: {
    async fetchGoods() {
      const data = await fetch('https://fakestoreapi.com/products')
        .then((result) => result.text())
        .then((result) => JSON.parse(result));
      this.productsList = data;
    },

    updateWishlist(id) {
      if (this.wishlist.findIndex((product) => product.id === id) !== -1) {
        // Удаляем cуществующий в списке продукт
        this.wishlist = this.wishlist.filter((product) => product.id !== id);
      } else {
        this.wishlist.push(this.productsList.find(product => product.id === id));
      }
    },
  },
  mounted() {
    this.fetchGoods();
  },
};
</script>

<style>
@font-face {
  font-family: 'Ubuntu';
  src: local('Ubuntu'), url('~@/assets/fonts/Ubuntu/Ubuntu-Regular.ttf');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Ubuntu';
  src: local('Ubuntu'), url('~@/assets/fonts/Ubuntu/Ubuntu-Bold.ttf');
  font-weight: 700;
  font-style: normal;
}

body {
  margin: 0;
  height: 100%;
  font-family: 'Ubuntu';
}
</style>
