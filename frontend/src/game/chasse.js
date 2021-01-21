import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { Vector3 } from "@babylonjs/core/Legacy/legacy"
import { Player } from "../classes/Player"
// (global).CANNON = require('cannon')

const interval = 30
const timeRatio = 1000 / interval

export class Chasse {
    camera
    constructor(canvas, socket, engine, localPlayer, lobbyId, gameLeader) {
        console.log("chasse.js")
        this.canvas = canvas
        this.socket = socket
        this.scene = new BABYLON.Scene(engine)
        this.gameLeader = gameLeader
        this.players = null
        this.lobbyId = lobbyId
        this.inputState = {
            up: false,
            rigth: false,
            down: false,
            left: false
        }
        this.localPlayer = localPlayer.pseudo
        this.physicsRoot = null
        // new Player(localPlayer.pseudo)
        this.socket.emit("updatePlayer", this.currentPlayer().local.export(), this.lobbyId)
        this.basicInit()
        if (this.gameLeader) {
            this.socket.emit("initChasse", this.lobbyId)
        }
    }

    basicInit() {
        this.scene.collisionsEnabled = true
        // let gravity = new BABYLON.Vector3(0, 0, 0)
        // this.scene.enablePhysics(gravity, new BABYLON.CannonJSPlugin())
        // let ground = BABYLON.Mesh.CreateGround("ground1", 24, this.scene);
        // ground.scaling = new Vector3(1,.02,1);
        // ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, this.scene);
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
            // this.players[i].mesh.material = matPlan
            this.players[i].mesh.PhysicsImpostor = new BABYLON.PhysicsImpostor(this.players[i].mesh, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, this.scene)
            // this.players[i].mesh.checkCollisions = true
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

        setTimeout(this.setListener(), 5000)
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
        for (let i = 0; i < players.length; i++) {
            if (players[i].name !== this.localPlayer) {
                this.players[i].mesh.position = new Vector3(players[i].coords.x, players[i].coords.y, players[i].coords.z)
            }
        }
        checkCollision(this.players)
    }

    currentPlayer() {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].localPlayer) {
                return this.players[i]
            }
        }
    }
    setListener() {
        console.log("hello from setListener")
        setInterval(() => { this.currentPlayer().mesh.position = this.currentPlayer().local.updateVelocity(timeRatio, this.inputState) }, interval)
        setInterval(() => {
            // console.log(JSON.stringify(this.localPlayer, null, 2))     
            this.socket.emit("updatePlayer", this.currentPlayer().local.export(), this.lobbyId)
        }, 30)
    }
}

function checkCollision(localPlayers) {
    if (localPlayers[0].mesh.intersectsMesh(localPlayers[1].mesh, false)) {
        console.log("collision")
    } else {
        console.log("no collision")
    }
}