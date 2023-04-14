<template>
    <div class="context">
      <div class="context__body">
        <span class="context__variant" @click="edit">Редактировать</span>
        <span class="context__variant" @click="remove">Удалить</span>
      </div>
    </div>
</template>

<script>
export default {
  name: "ContextMenu",
  props: {
    row: Number,
  },
  methods: {
    edit() {
      const list = this.$store.getters.getNotesList;
      const note = list.find((element) => element.id === this.row);
      const { value, category, id, date } = note;
      this.$router.push({ path: `/add/payment/${category}`, query: { value, id, date } });
    },
    remove() {
      this.$store.commit("removeNoteFromList", this.row);
    }
  },
};
</script>

<style lang="scss" scoped>
.context {
  position: relative;

  &__body {
    width: 150px;
    background-color: antiquewhite;
    border: 1px solid black;
    text-align: center;
    padding: 5px;
    box-sizing: border-box;
    position: absolute;
    top: 20px;
    left: -150px;
  }

  &__variant {
    display: block;
    width: 100%;
    padding: 0 0 5px 0;
    box-sizing: border-box;
    font-size: 16px;
    color: black;
    cursor: pointer;
  }
}

</style>
