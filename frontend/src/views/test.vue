<template>
  <canvas ref="renderCanvas"></canvas>
</template>

<script>
import * as BABYLON from "@babylonjs/core/Legacy/legacy";

export default {
  data: function () {
    return {};
  },

  mounted: function () {
    this.initBabylon();
  },
  methods: {
    initBabylon: function () {
      console.log("initBabylon");
      var canvas = this.$refs.renderCanvas;

      var engine = new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
      });

      var scene = createScene(engine, canvas);

      engine.runRenderLoop(function () {
        scene.render();
      });
      window.addEventListener("resize", function () {
        engine.resize();
      });
    },
  },
};

function createScene(engine, canvas) {
  var scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new BABYLON.Vector3(0, 0, 0)
  );
  camera.attachControl(canvas, true);

  new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  BABYLON.MeshBuilder.CreateBox("box", {});

  return scene;
}
</script>

<style>
canvas {
  width: 100%;
  height: 100%;
}
</style>