import * as BABYLON from "@babylonjs/core/Legacy/legacy"
import { Vector3 } from "@babylonjs/core/Legacy/legacy"
import { Player } from "../classes/Player"

const interval = 15
const timeRatio = 1000 / interval

export class Chasse {
    camera
    constructor(canvas, engine, socket, localPlayer, lobbyId, gameLeader) {
        this.canvas = canvas
        this.engine = engine
        this.socket = socket
        this.gameLeader = gameLeader
        console.log("chasse.js")
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

    

    displayPlayers() {
        let i = 0
        for (let player of this.players) {
            if (player.name !== this.localPlayer.pseudo) {
                this.players[i].mesh = BABYLON.MeshBuilder.CreateBox(player.name, {}, this.scene)
                this.players[i].mesh.position = new Vector3(player.coords.x, player.coords.y, player.coords.z)
            }
            else if (player.name === this.localPlayer.pseudo) {
                this.localPlayer.coords = { x: player.coords.x, y: player.coords.y, z: player.coords.y }
                this.localPlayer.mesh = new BABYLON.MeshBuilder.CreateBox(player.name, {}, this.scene)
                this.localPlayer.mesh.position = this.localPlayer.coords
                this.players[i].mesh = null
            }
            i++
        }

        window.addEventListener("keydown", (e) => {
            this.downHandler(e)
        })
        window.addEventListener("keyup", (e) => {
            this.upHandler(e)
        })

        setInterval(() => { this.localPlayer.updateVelocity(timeRatio, this.inputState) }, interval)
        setInterval(() => { 
            // console.log(JSON.stringify(this.localPlayer, null, 2))
            this.socket.emit("updatePlayer", this.localPlayer.export(), this.lobbyId)       
        }, 30)
        // setTimeout(() => {
        //     this.socket.emit("nextGame", this.lobbyId)
        // })

    }

    inputTriggered() {
        if (this.inputState.up || this.inputState.right || this.inputState.left || this.inputState.down) {
            return true
        }
        return false
    }

    updatePlayers(players) {
        // this.players.mesh.position = players.coords
        
        players = checkCollision(players)

        for (let i = 0; i < this.players.length; i++) {
            if (players[i].name !== this.localPlayer.pseudo) {
                console.log("updateMesh",players[i].coords.x, players[i].coords.y, players[i].coords.z)
                this.players[i].mesh.position = new Vector3 (players[i].coords.x, players[i].coords.y, players[i].coords.z)
            }
            
        }
    }
}

function checkCollision (players) {
    
    return players
}