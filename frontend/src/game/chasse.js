import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { Vector3 } from "@babylonjs/core/Legacy/legacy"
import { Player } from "../classes/Player"

const interval = 15
const timeRatio = 1000 / interval

export class Chasse {
    camera
    constructor(canvas, socket, engine, localPlayer, lobbyId) {
        this.canvas = canvas
        this.socket = socket
        this.scene = new BABYLON.Scene(engine)
        this.players = null
        this.lobbyId = lobbyId
        this.inputState = {
            up: false,
            rigth: false,
            down: false,
            left: false
        }
        this.localPlayer = localPlayer.pseudo
        // new Player(localPlayer.pseudo)

        this.basicInit()
        console.log("init chasse")

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



    async displayPlayers() {
        console.log("display PLAYERS")
        let mesh = null
        let i = 0
        let container = await BABYLON.SceneLoader.LoadAssetContainerAsync("http://localhost:3000/static/chipgltf/", "chips.gltf", this.scene)
        mesh = container.meshes[0]
        for (let player of this.players) {
            this.players[i].mesh = mesh.clone("mesh" + i)
            this.players[i].mesh.position = new Vector3(player.coords.x, player.coords.y, player.coords.z)
            if (player.name == this.localPlayer) {
                this.players[i].local = new Player(this.localPlayer)
                this.players[i].local.coords = { x: player.coords.x, y: player.coords.y, z: player.coords.z }
                this.players[i].localPlayer = true
            } else {
                this.players[i].localPlayer = false
            }
            // else if (player.name === this.localPlayer.pseudo) {
            //     console.log("joueur local")
            //     this.players[i].mesh = mesh.clone("mesh" + i)
            //     this.players.local = new Player(localPlayer.pseudo)
            //     this.players.local.coords = { x: player.coords.x, y: player.coords.y, z: player.coords.z }
                // this.localPlayer.mesh = new BABYLON.MeshBuilder.CreateBox(player.name, {}, this.scene)
            i++
        }

        window.addEventListener("keydown", (e) => {
            this.downHandler(e)
        })
        window.addEventListener("keyup", (e) => {
            this.upHandler(e)
        })
        
        setTimeout(setInterval(() => { this.currentPlayer().mesh.position = this.currentPlayer().local.updateVelocity(timeRatio, this.inputState) }, interval), 5000)
        setInterval(() => {
            // console.log(JSON.stringify(this.localPlayer, null, 2))
            this.socket.emit("updatePlayer", this.currentPlayer().local.export(), this.lobbyId)
        }, 30)

    }

    inputTriggered() {
        if (this.inputState.up || this.inputState.right || this.inputState.left || this.inputState.down) {
            return true
        }
        return false
    }

    updatePlayers(players) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].name !== this.localPlayer) {
                this.players[i].mesh.position = new Vector3(players[i].coords.x, players[i].coords.y, players[i].coords.z)
            }
        }
        // checkCollision(this.players)
    }

    currentPlayer() {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].localPlayer) {
                return this.players[i]
            }
        }
    }
}

// function checkCollision (localPlayers) {
//     let decalage = 0
//     for (let i = 0; i < localPlayers.length - 1; i++) {
        
//         if (localPlayers[i].mesh.intersectsMesh(localPlayers[i + decalage].mesh, false)) {
//             // localPlayers[i].mesh.material.emissiveColor = new BABYLON.Color4(1, 0, 0, 1);
//             console.log("collision")
//         } else {
//             // localPlayers[i].mesh.material.emissiveColor = new BABYLON.Color4(1, 1, 1, 1);
//             console.log("pas de collision")
//         }
        
//     }
    
// }