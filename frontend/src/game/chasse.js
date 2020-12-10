import * as BABYLON from "@babylonjs/core/Legacy/legacy"
import { Vector3 } from "@babylonjs/core/Legacy/legacy"
import { Player } from "../classes/Player"

const interval = 10
const timeRatio = 1000 / interval

export class Chasse {
    camera
    constructor(canvas, engine, socket, localPlayer, lobbyId) {
        this.canvas = canvas
        this.engine = engine
        this.socket = socket

        // this.initSocket(socket)
        this.scene = new BABYLON.Scene(this.engine)
        this.players = null

        this.lobbyId = lobbyId

        this.inputState = {
            up: false,
            rigth: false,
            down: false,
            left: false
        }

        this.localPlayer = new Player(localPlayer.pseudo)

        this.socket.emit("initChasse", this.lobbyId)

        this.basicInit()

    }

    basicInit() {
        // Parameters: name, position, scene
        this.camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 0, -10), this.scene);
        // The goal distance of camera from target
        this.camera.radius = 30;
        // The goal height of camera above local origin (centre) of target
        this.camera.heightOffset = 10;
        // The goal rotation of camera around local origin (centre) of target in x y plane
        this.camera.rotationOffset = 0;
        // Acceleration of camera in moving from current to goal position
        this.camera.cameraAcceleration = 0.005
        // The speed at which acceleration is halted
        this.camera.maxCameraSpeed = 10
        // This attaches the camera to the canvas
        this.camera.attachControl(this.canvas, true);
        // NOTE:: SET CAMERA TARGET AFTER THE TARGET'S CREATION AND NOTE CHANGE FROM BABYLONJS V 2.5
        // targetMesh created here.



        new BABYLON.HemisphericLight("HemiLight", new Vector3(0, 1, 0), this.scene);
        this.scene.createDefaultCameraOrLight(true, true, true);
        this.scene.createDefaultEnvironment();

        window.addEventListener("keydown", (e) => {
            this.downHandler(e)
        })
        window.addEventListener("keyup", (e) => {
            this.upHandler(e)
        })

        console.log(interval)
        setInterval(() => { this.movement() }, interval)

    }

    downHandler(e) {
        if (e.key === "z") {
            this.inputState.up = true
        } else if (e.key === "d") {
            this.inputState.right = true
        } else if (e.key === "s") {
            this.inputState.down = true
        } else if (e.key === "q") {
            this.inputState.left = true
        }
    }

    upHandler(e) {
        if (e.key === "z") {
            this.inputState.up = false
        } else if (e.key === "d") {
            this.inputState.right = false
        } else if (e.key === "s") {
            this.inputState.down = false
        } else if (e.key === "q") {
            this.inputState.left = false
        }
    }

    movement() {
        // if (this.inputTriggered()) { // Cas où le joueur est à l'arrêt mais souahite bouger
            
        //     console.log('input')
        // }
        // else if (this.localPlayer.isMoving()) { // 
        //     this.localPlayer.updateVelocity(timeRatio, true, this.inputState)   
        // } 
        // else {
        //     this.localPlayer.updateVelocity(timeRatio, false, this.inputState)
        //     console.log('pas input')
        // }
        this.localPlayer.updateVelocity(timeRatio, this.inputState)
        this.localPlayer.updatePos(timeRatio)
    }

    displayPlayers() {
        for (let player of this.players) {
            let box = BABYLON.MeshBuilder.CreateBox(player.pseudo, {}, this.scene);
            box.position = new Vector3(player.coords.x, player.coords.y, player.coords.z)
            if (player.name === this.localPlayer.pseudo) {
                this.localPlayer.mesh = box
            }
        }

    }

    inputTriggered() {
        if (this.inputState.up || this.inputState.right || this.inputState.left || this.inputState.down) {
            return true
        }
        return false
    }
}