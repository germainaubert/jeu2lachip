<template>
  <v-stage ref="stage" :config="stageSize">
    <v-layer ref="layer">
      <v-rect
        ref="rect"
        @dragstart="changeSize"
        @dragend="changeSize"
        @click="speedBoost"
        
        :config="{
            width: 50,
            height: 50,
            fill: 'green',
            draggable: true
          }"
      />
      <v-regular-polygon
        ref="hexagon"
        
        :config="{
          x: 200,
          y: 200,
          sides: 6,
          radius: 20,
          fill: 'red',
          stroke: 'black',
          strokeWidth: 4
        }"
      />
    </v-layer>
  </v-stage>
</template>

<script>
import Konva from "konva";
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      speed: 2
    };
  },
  methods: {
    changeSize(e) {
      // to() is a method of `Konva.Node` instances
      e.target.to({
        scaleX: Math.random() + 0.8,
        scaleY: Math.random() + 0.8,
        duration: 0.2
      });
    }
  ,
  speedBoost(){
      this.speed +=20
      setTimeout(() => {this.speed -=20}, 3000)
  },
  },
  mounted() {
    const vm = this;
    const amplitude = 100;
    const period = 5000;
    // in ms
    const centerX = vm.$refs.stage.getNode().getWidth() / 2;

    const hexagon = this.$refs.hexagon.getNode();

    // example of Konva.Animation
    const anim = new Konva.Animation(function(frame) {
      hexagon.setX(
        amplitude * Math.sin((frame.time * vm.speed * Math.PI) / period) + centerX
      );
    }, hexagon.getLayer());

    anim.start();
  }
};
</script>