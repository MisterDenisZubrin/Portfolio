import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/components/Pages/MainPage';
import WishlistPage from '@/components/Pages/WishlistPage';
import ProductPage from '@/components/Pages/ProductPage';
import NotFoundPage from '@/components/Pages/NotFoundPage';

// Исправляет повторное открытие того же маршрута
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
    },
    {
      path: '/wishlist',
      name: 'WishlistPage',
      component: WishlistPage,
    },
    {
      path: '/product/:id',
      name: 'ProductPage',
      component: ProductPage,
      props: true,
    },
    {
      path: '*',
      name: '404',
      component: NotFoundPage,
    },
  ],
  // Промотка в начало страницы при переходе
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
