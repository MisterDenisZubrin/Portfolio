<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__link" @click="$router.push('/')">Главная</li>
      <li class="nav__link">{{ address ? address : 'Избранное' }}</li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    address: {
      type: String
    },
  },
};
</script>

<style lang="css" scoped>
.nav {
  max-width: 1400px;
  margin: 32px auto;
}

.nav__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style-type: none;
  font-size: 18px;
  font-weight: 400;
  color: #464c58;
}

.nav__link {
  padding: 0 5px 0 0;
  box-sizing: border-box;
}

.nav__link:first-child {
  text-decoration: underline;
}

.nav__link:first-child:hover {
  cursor: pointer;
  text-decoration: none;
}

.nav__link:not(:first-child)::before {
  display: inline-block;
  content: '›';
  margin: 0 5px 0 0;
}
</style>
