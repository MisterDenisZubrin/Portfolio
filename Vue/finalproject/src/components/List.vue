<template>
  <div>
    <div class="table">
      <div class="table__row">
        <span class="table__col table__col-name">#</span>
        <span class="table__col table__col-name">Date</span>
        <span class="table__col table__col-name">Category</span>
        <span class="table__col table__col-name">Value</span>
      </div>
      <div class="table__row" v-for="note in paginatedData" :key="note.id">
        <span class="table__col">{{ note.id }}</span>
        <span class="table__col">{{ note.date }}</span>
        <span class="table__col">{{ note.category }}</span>
        <span class="table__col">{{ note.value }}</span>
        <button @click="toggleContextMenu" class="table__context-btn">+</button>
        <transition name="fade">
          <ContextMenu v-if="isVisible" :row="+note.id"></ContextMenu>
        </transition>
      </div>
      <button class="table__button" @click="prevPage" :disabled="pageNumber === 0">
        prevPage
      </button>
      <button
        class="table__button"
        @click="nextPage"
        :disabled="pageNumber >= pageCount - 1"
      >
        nextPage
      </button>
    </div>
    <ul class="presets">
      <li class="presets__preset" @click="openForm('Food', 200)">Еда 200</li>
      <li class="presets__preset" @click="openForm('Transport', 50)">Транспорт 50</li>
      <li class="presets__preset" @click="openForm('Entertainment', 2000)">
        Развлечения 2000
      </li>
    </ul>
  </div>
</template>

<script>
import ContextMenu from "./ContextMenu.vue";
export default {
  name: "List",
  data() {
    return {
      pageNumber: 0,
      pageSize: 4,
      isVisible: true,
    };
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    openForm(category, value) {
      this.$router.push({ path: `/add/payment/${category}`, query: { value } });
    },
    toggleContextMenu() {
      this.isVisible = !this.isVisible
    }
  },
  computed: {
    pageCount() {
      if (this.notes) {
        return Math.ceil(this.notes.length / this.pageSize);
      }
    },
    paginatedData() {
      if (this.notes) {
        const start = this.pageNumber * this.pageSize,
          end = start + this.pageSize;
        return this.notes.slice(start, end);
      }
    },
    notes() {
      return this.$store.getters.getNotesList;
    },
  },
  components: { ContextMenu },
};
</script>

<style lang="scss" scoped>
.table {
  max-width: 600px;
  width: 100%;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 7px;

  &__row {
    font-weight: 500;
    font-size: 16px;
    color: grey;
    border-bottom: 1px solid grey;
    display: flex;
    align-items: center;
    height: 100px;
  }

  &__col {
    margin: 0 20px 0 0;
    width: calc(600px / 4);
    text-align: center;
  }

  &__col-name {
    display: block;
    font-weight: bold;
    font-size: 18px;
    color: black;
  }

  &__button {
    background-color: green;
    color: white;
    border: 0.5px solid green;
    border-radius: 10px;
    margin: 10px 10px 0 0;
    width: 100px;
    height: 40px;
  }
}
.toggle-button {
  width: 200px;
  height: 50px;
  background-color: cadetblue;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 5px 15px;
  cursor: pointer;
  margin: 20px 0 20px 200px;
}

.presets {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;

  &__preset {
    max-width: 200px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
