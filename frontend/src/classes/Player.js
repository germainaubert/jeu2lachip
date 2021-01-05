import { Vector3 } from "@babylonjs/core"

const acceleration = 20
export class Player {
    mesh
    constructor (pseudo) {
        this.pseudo = pseudo
        this.coords = {
            x: 0,
            y: 0,
            z: 0
        }
        this.velocity = {
            x: 0,
            y: 0,
            z: 0
        }
    }

    updatePos(timeRatio) {
        this.coords.x += this.velocity.x / timeRatio
        this.coords.z += this.velocity.y / timeRatio
        this.mesh.position = new Vector3 (this.coords.x, this.coords.y, this.coords.z)
    }

    updateVelocity(timeRatio, inputState) {
        
        if (inputState.up) {
            this.velocity.x += acceleration / timeRatio
        } else if (this.velocity.x > 0 && this.velocity.x > 0.1) {
            this.velocity.x -= acceleration / timeRatio
        } else if (this.velocity.x > 0 && this.velocity.x < 0.1) {
            this.velocity.x = 0
        }
        
        if (inputState.down) {
            this.velocity.x -= acceleration / timeRatio
        } else if (this.velocity.x < 0 && this.velocity.x < -0.1) {
            this.velocity.x += acceleration / timeRatio
        }  else if (this.velocity.x < 0 && this.velocity.x > -0.1) {
            this.velocity.x = 0
        }
        
        if (inputState.right) {
            this.velocity.y -= acceleration / timeRatio
        } else if (this.velocity.y < 0 && this.velocity.y < -0.1) {
            this.velocity.y += acceleration / timeRatio
        } else if (this.velocity.y < 0 && this.velocity.y > -0.1){
            this.velocity.y = 0
        }
        
        if (inputState.left) {
            this.velocity.y += acceleration / timeRatio
        } else if (this.velocity.y > 0 && this.velocity.y > 0.1) {
            this.velocity.y -= acceleration / timeRatio
        } else if (this.velocity.y > 0 && this.velocity.x < 0.1){
            this.velocity.y = 0
        }
        this.updatePos(timeRatio)
       
    }

    isMoving () {
        if (this.velocity.x === 0 && this.velocity.y === 0 && this.velocity.z === 0) {
            return false
        } else {
            return true
        }  
    }

    export () {
        return {
            pseudo: this.pseudo,
            coords: this.coords,
        }
    }   
}