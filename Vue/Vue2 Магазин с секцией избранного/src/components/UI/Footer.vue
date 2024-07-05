<template>
  <footer class="footer">
    <div class="footer__content">
      <button class="footer__link" @click="$router.push('/wishlist')">
        Избранное
      </button>
      <a href="#" class="footer__link footer__phone">8 800 888 00 88</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="css" scoped>
.footer {
  background-color: #0a1e32;
}

.footer__content {
  max-width: 1400px;
  width: 100%;
  height: 96px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer__link {
  border: none;
  background-color: inherit;
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 400;
  padding: 0;
  box-sizing: border-box;
}

.footer__phone {
  font-size: 24px;
}

.footer__link:hover {
  cursor: pointer;
}
</style>
