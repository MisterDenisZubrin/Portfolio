<template>
  <form action="#" class="form">
    <label for="category" class="form__label">Категория:</label>
    <select
      class="form__select"
      placeholder="Payment category"
      v-model="category"
      id="category"
    >
      <option value="Transport" class="form__option" selected>Transport</option>
      <option value="Food" class="form__option">Food</option>
      <option value="Entertainment" class="form__option">Entertainment</option>
    </select>
    <label for="value" class="form__label">Потрачено:</label>
    <input
      class="form__input"
      type="text"
      placeholder="Payment value"
      v-model="value"
      id="value"
    />
    <label for="date" class="form__label">Дата:</label>
    <input
      class="form__input"
      type="text"
      placeholder="Payment date"
      v-model="date"
      id="date"
    />
    <input
      class="form__button"
      type="submit"
      value="Edit Note"
      v-if="id"
      @click.prevent="editNote"
    />
    <input
      class="form__button"
      type="submit"
      value="Add Note"
      v-else
      @click.prevent="addToStore"
    />
    <!-- coverage лучше отключать, без него не показывает где ошибка -->
  </form>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      date: "",
      value: "",
      category: "",
      id: null,
    };
  },
  methods: {
    addToStore() {
      const list = this.$store.getters.getNotesList;
      list.push({
        id: list.length + 1,
        date: this.date,
        value: this.value,
        category: this.category,
      });
      this.$store.commit("setNotesList", list);
    },
    editNote() {
      if (this.id) {
        const newNote = {
          id: +this.id,
          date: this.date,
          value: this.value,
          category: this.category,
        };
        this.$store.commit("editNote", newNote);
      }
    },
  },
  mounted() {
    this.category = this.$route.params.category;
    this.value = this.$route.query.value;
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.date = this.$route.query.date;
    } else {
      const date = new Date();
      this.date = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
    }
  },
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 400px;
  width: 100%;
  border: 1px solid black;
  padding: 7px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;

  &__select {
    width: 100%;
    margin: 0 auto 10px;
    outline: none;
    border: 0.5px solid grey;
    background-color: white;
    padding: 10px 15px;
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
  }

  &__label {
    margin: 0 0 12px 3px;
  }

  &__input {
    width: 100%;
    margin: 0 auto 10px;
    outline: none;
    border: 0.5px solid grey;
    padding: 10px 15px;
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 16px;
  }

  &__button {
    margin: 0 auto;
    padding: 5px 15px;
    box-sizing: border-box;
    background: orange;
    color: white;
    border: 2px solid orange;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>
