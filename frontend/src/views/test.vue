<template>
  <div class="div"></div>
</template>

<script>

export default {
  async mounted() {
    this.$socket.open();
    this.$socket.emit("logged");
  },
};
</script>