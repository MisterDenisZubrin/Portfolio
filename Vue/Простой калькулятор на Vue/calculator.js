const App = {
  data() {
    return {
      result: '',
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      operations: ['+', '-', '*', '/'],
    }
  },
  methods: {
    input(char) {
      this.result += char;
    },
    
    reset() {
      this.result = '';
    },
    calc() {
      this.result = eval(this.result);
      // eval - небезопасный метод
      // TODO переписать без eval
    }
  }
}

Vue.createApp(App).mount('#app');