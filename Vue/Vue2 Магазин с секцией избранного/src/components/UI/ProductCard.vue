<template>
  <article class="card" @click="openProductPage(product)">
    <button
      class="card__btn"
      :class="{ card__btn_filled: filled, card__btn_cross: cross }"
      @click.stop="sendIDToList(product.id)"
    ></button>
    <img class="card__photo" :src="product.image" alt="product-photo" />
    <h3 class="card__name">{{ product.title }}</h3>
    <span class="card__price">{{
      (product.price * 100).toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')
    }}</span>
  </article>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    wishlist: {
      type: Array,
    },
    cross: {
      type: Boolean,
    },
  },
  data() {
    return {
      filled: false,
    };
  },
  methods: {
    changeStatus() {
      this.filled = !this.filled;
    },

    sendIDToList() {
      this.$emit('sendIDToList', this.product.id);
      this.changeStatus();
    },

    openProductPage(product) {
      this.$router.push({
        path: `/product/${product.id}`,
        query: { product },
      });
    },
  },
  mounted() {
    if (this.wishlist.find((product) => product.id === this.product.id)) {
      this.filled = true;
    }
  },
};
</script>

<style lang="css" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  position: relative;
  padding: 40px 16px 16px;
  box-sizing: border-box;
}

.card:hover {
  cursor: pointer;
  box-shadow: 0px 5px 25px rgb(30 31 33 / 24%);
  transition: 0.5s;
}
.card__photo {
  width: 100%;
  height: 336px;
}
.card__name {
  font-size: 18px;
  font-weight: 400;
  color: #0a1e32;
  text-align: center;
}

.card__price {
  font-size: 24px;
  font-weight: 800;
  color: #464c58;
}

.card__price::after {
  display: inline-block;
  content: 'руб.';
  margin: 0 0 0 6px;
}

.card__btn {
  position: absolute;
  content: '';
  border: none;
  background-color: inherit;
  background-image: url('~@/assets/img/heart-icon_emptied.png');
  background-repeat: no-repeat;
  background-position: center;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.card__btn:hover:active {
  background-image: url('~@/assets/img/heart-icon_filled.png');
}

.card__btn_filled {
  background-image: url('~@/assets/img/heart-icon_filled.png');
}

.card__btn_filled:hover:active {
  background-image: url('~@/assets/img/heart-icon_emptied.png');
}

.card__btn_cross {
  background-image: url('~@/assets/img/cross-icon.png');
}
</style>
