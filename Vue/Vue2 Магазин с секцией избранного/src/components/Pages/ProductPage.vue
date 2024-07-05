<template>
  <div class="wrapper">
    <Header :counter="wishlist.length" />
    <Breadcrumbs :address="$route.query.product.title" />
    <main class="main">
      <section class="product">
        <img
          :src="$route.query.product.image"
          alt="product__full-image"
          class="product__full-image"
        />
        <div class="product__text">
          <h1 class="product__name">{{ $route.query.product.title }}</h1>
          <p class="product__description">
            {{ $route.query.product.description }}
          </p>
          <span class="product__price">
            {{
              ($route.query.product.price * 100)
                .toString()
                .replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')
            }}
          </span>
          <button 
          class="product__btn" 
          :class="{ product__btn_filled: filled }"
          @click="sendIDToWishlist($route.query.product.id)"
          >
            Избранное
          </button>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/UI/Header';
import Footer from '@/components/UI/Footer';
import Breadcrumbs from '@/components/UI/Breadcrumbs';

export default {
  components: {
    Header,
    Footer,
    Breadcrumbs,
  },
  props: {
    wishlist: {
      type: Array,
    },
  },
  data() {
    return {
      filled: false,
    };
  },
  mounted() {
    if (
      this.wishlist.find(
        (product) => product.id === this.$route.query.product.id,
      )
    ) {
      this.filled = true;
    }
  },
  methods: {
    changeStatus() {
      this.filled = !this.filled;
    },
    sendIDToWishlist(id) {
      this.$emit('sendIDToWishlist', id);
      this.changeStatus();
    }
  }
};
</script>

<style lang="css" scoped>
.main {
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 96px);
}

.product {
  display: flex;
  margin: 0 0 112px;
}

.product__full-image {
  height: 100%;
  width: 100%;
  max-width: 680px;
  max-height: 715px;
  object-fit: contain;
  outline: 0.5px solid #e5e5e5;
  margin: 0 40px 0 0;
}

.product__text {
  max-width: 560px;
  width: 100%;
}

.product__name {
  margin: 0 0 24px;
  font-size: 48px;
  color: #0a1e32;
  font-weight: 500;
}

.product__description {
  margin: 0 0 24px;
  font-size: 16px;
  line-height: 1.5;
  color: #464c58;
}

.product__price {
  display: block;
  margin: 0 0 24px;
  font-size: 48px;
  color: #0a1e32;
  font-weight: 700;
}

.product__price::after {
  display: inline-block;
  content: 'руб.';
  margin: 0 0 0 6px;
}

.product__btn {
  border: 1px solid #0a1e32;
  border-radius: 4px;
  padding: 8px 32px 8px 64px;
  box-sizing: border-box;
  position: relative;
  text-align: right;
  background-color: #fff;
  color: #0a1e32;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1.05px;
  text-transform: uppercase;
  cursor: pointer;
}

.product__btn::before {
  position: absolute;
  content: '';
  display: block;
  left: 37px;
  top: 15px;
  width: 20px;
  height: 18px;
  background-image: url('~@/assets/img/heart-icon_emptied.png');
  background-repeat: no-repeat;
  background-position: center;
}

.product__btn:hover::before {
  position: absolute;
  content: '';
  display: block;
  left: 37px;
  top: 15px;
  width: 20px;
  height: 18px;
  background-image: url('~@/assets/img/heart-icon_filled.png');
  background-repeat: no-repeat;
  background-position: center;
}

.product__btn_filled::before {
  background-image: url('~@/assets/img/heart-icon_filled.png');
}

.product__btn_filled::before:hover .product__btn_filled::before:active {
  background-image: url('~@/assets/img/heart-icon_emptied.png');
}
</style>
