<template>
  <div class="hello" >
    <canvas id="canvas" width="640" height="480" @keydown="keyupHandler"></canvas>
    <div></div>   
  </div>
  
</template>

<script>
export default {
  name: "HelloWorld",
  data: function () {
    return {
      keybord: Object,
      player: Object,
    }
  },
  methods: {
    drawPlayers: function () {
      const {x, y, size} = this.player;
      this.ctx.beginPath();
      this.ctx.rect(x, y, size, size);
      this.ctx.fill();
    },
    update: function () {
      this.ctx.clearRect(0, 0, 600, 800); // 1.
      this.drawPlayers();                                    // 2.
      requestAnimationFrame(this.update);                    // 3.
    },

    keyupHandler (event) {
      console.log(event.name)
    }

    // right () {
    //   console.log('HEEEEELLO')
    //   this.player.x += 10
    // },
    // left () {
    //   this.player.x -= 10
    // }
// first call

  },
  mounted () {
    this.c = document.getElementById("canvas");
    this.ctx = this.c.getContext('2d')
    this.update()
    this.player = {
        x: 0,
        y: 0,
        size: 20,
        speed: 5
    }
  }
};
</script>

<style scoped>

</style>
