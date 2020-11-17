<template>
  <v-stage ref="stage" :config="stageSize">
    <v-layer ref="layer">
      <v-image :config="fullBowl" />
      <v-image :config="emptyBowl" />
      <v-image :config="chip" />
      
    </v-layer>
  </v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  data() {
    return {
      stageSize: {
        width: width,
        height: height,
      },
      chip: {
        image: null,
        x: 0,
        y: 0,
        height: 0,
        widht: 0,
      },
      fullBowl: {
        image: null,
        x: 0,
        y: 0,
        height: 0,
        width: 0,
      },
      emptyBowl: {
        image: null,
        x: 0,
        y: 0,
        height: 0,
        width: 0,
      },
      interactiveElement: [],
      stillUp: false,
      stillDown: false,
      stillRight: false,
      stillLeft: false,
    };
  },
  created() {
    // chip
    this.imageCreator("chips.png", true, 0, 0, this.chip)
    // bol rempli
    this.imageCreator("bol-chip.png", false, 300, 100, this.fullBowl)
    this.interactiveElement.push(this.fullBowl)
    // bol vide
    this.imageCreator("empty.png", false, 1000, 150, this.emptyBowl)
    this.interactiveElement.push(this.emptyBowl)


    window.addEventListener("keydown", this.eventHandler);
    window.addEventListener("keyup", this.triggerUp);
  },

  methods: {
    centerElement: function (targetPoint, elementLength) {
      return targetPoint / 2 - elementLength;
    },
    eventHandler: function (e) {
      // Appelle toutes les fonctions relatives aux events
      this.mvtEvent(e);
    },
    mvtEvent: function (e) {
      // Faire bouger la chip
      if (e.key === "ArrowLeft") {
        this.stillLeft = true;
      } else if (e.key === "ArrowRight") {
        this.stillRight = true;
      } else if (e.key === "ArrowUp") {
        this.stillUp = true;
      } else if (e.key === "ArrowDown") {
        this.stillDown = true;
      }

      if (this.stillLeft && this.stillDown) {
        this.chip.x -= 8;
        this.chip.y += 8;
      } else if (this.stillLeft && this.stillUp) {
        this.chip.x -= 8;
        this.chip.y -= 8;
      } else if (this.stillRight && this.stillDown) {
        this.chip.x += 8;
        this.chip.y += 8;
      } else if (this.stillRight && this.stillUp) {
        this.chip.x += 8;
        this.chip.y -= 8;
      } else if (e.key === "ArrowLeft") {
        this.chip.x -= 13;
      } else if (e.key === "ArrowRight") {
        this.chip.x += 13;
      } else if (e.key === "ArrowUp") {
        this.chip.y -= 13;
      } else if (e.key === "ArrowDown") {
        this.chip.y += 13;
      }
      this.checkInteraction()
    },
    triggerUp: function (e) {
      switch (e.key) {
        case "ArrowLeft":
          this.stillLeft = false;
          break;
        case "ArrowRight":
          this.stillRight = false;
          break;
        case "ArrowUp":
          this.stillUp = false;
          break;
        case "ArrowDown":
          this.stillDown = false;
          break;
        default:
          console.log("key event has no bind");
      }
    },
    imageCreator: function (src, center, x, y, object) {
      let image = new window.Image();
      image.src = require("@/assets/" + src);
      image.onload = () => {
        // set image only when it is loaded
        object.image = image;
        object.height = image.height;
        object.width = image.width;
        if (center) {
          object.x = this.centerElement(width, object.width);
          object.y = this.centerElement(height, object.height);
        } else {
          object.x = x;
          object.y = y;
        }
      };
    },
    checkInteraction: function () {
      for (let element of this.interactiveElement) {
        this.collision(element, this.chip)
      }
    },
    collision: function () {
      // let ele1Coord = [
      //   {
      //   x: ele1.x,
      //   y: ele1.y
      //   },
      //   {
      //   x: ele1.x + ele1.width,
      //   y: ele1.y
      //   },
      //   {
      //   x: ele1.x + ele1.width,
      //   y: ele1.y + ele1.height
      //   },
      //   {
      //   x: ele1.x,
      //   y: ele1.y + ele1.height
      //   },
      // ]
      // let ele2Coord = [
      //   {
      //   x: ele2.x,
      //   y: ele2.y
      //   },
      //   {
      //   x: ele2.x + ele2.width,
      //   y: ele2.y
      //   },
      //   {
      //   x: ele2.x + ele2.width,
      //   y: ele2.y + ele2.height
      //   },
      //   {
      //   x: ele2.x,
      //   y: ele2.y + ele2.height
      //   },
      // ]
      // console.log(ele1Coord)
      // console.log("chip", ele2Coord)
      
      
    }
  },

  destroyed: function () {
    window.removeEventListener("mousemove", this.move);
  },
};
</script>