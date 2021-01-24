const animate = require('../services/animate')

export class InteractiveElemBuilder {
    static getInstance (name, src, x, y) {
        return new Promise((resolve) => {
            const instance = new InteractiveElem(name, src, x, y)
            instance.image.onload = () => {
                resolve(instance)
            }
        })
    }
}

export class PlayerBuilder {
    static getInstance (name, src, x, y) {
        return new Promise((resolve) => {
            const instance = new Player(name, src, x, y)
            instance.image.onload = () => {
                resolve(instance)
            }
        })
    }
}

class InteractiveElem { 
    constructor(name, src, x, y) {
        this.name = name
        this.image = this.loadImage(src)
        this.x = x
        this.y = y
    }

    get width () {
        return this.image.width
    }
    get height () {
        return this.image.height
    }

    loadImage (src) {
        let image = new window.Image()
        image.src = require('@/assets/' + src)
        return image
    }

    centerElementXY (frameHeight, frameWidth) {
        this.x = frameWidth / 2 - this.width
        this.y = frameHeight / 2 - this.height
    }
    centerElementOnlyX (frameWidth) {
        this.x = frameWidth / 2 - this.width
    }
    centerElementOnlyY (frameHeight) {
        this.y = frameHeight / 2 - this.height
    }

}

class Player extends InteractiveElem {
    constructor(name, src, x, y) {
        super(name, src, x, y)
        this.a = {x: 0, y: 0} // vecteur accéleration
        this.v = {x:0, y: 0} // vecteur velocité
        this.maxSpeed = 15
        this.startMvt = null
    }

    initAnimate () {
        console.log("init update from vue")
        animate.initUpdate()
    }

    // update (timestamp) {
    //     console.log(timestamp)
    //     // fpsCounter()
    //     // this.velocityAdd
    //     // this.positionAdd
    //     requestAnimationFrame(update)
    // }

    // // fpsCounter () {

    // // }

    // velocityAdd () {
    //     setInterval(() => {
    //         this.v.x += this.a.x
    //     }, 100)
    // }
    // positionAdd () {

    // }

    // stopMoving (jej) {
    //     clearInterval(jej)
    // }
    
}
