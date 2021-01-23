import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { Vector3 } from "@babylonjs/core/Legacy/legacy"
import { HUD } from './HUD'
(global).CANNON = require('cannon')

export class QuatreVingt {
    constructor(canvas, socket, engine, localPlayer, lobbyId, gameLeader) {
        this.canvas = canvas
        this.socket = socket
        this.scene = new BABYLON.Scene(engine)
        var physicsPlugin = new BABYLON.CannonJSPlugin()
        this.scene.enablePhysics(new BABYLON.Vector3(0, -15, 0), physicsPlugin)
        this.gameLeader = gameLeader
        this.gameData = null
        this.players = null
        this.lobbyId = lobbyId
        this.diceMeshes = Array() // 3 dés
        this.localPlayer = localPlayer.pseudo
        this.forceDirection = new BABYLON.Vector3(0, 1, 0);
        this.forceMagnitude = 50;
        this.contactLocalRefPoint = BABYLON.Vector3.Zero();
        this.refreshIntervalId = null
        this.ground = null
        this.highlight = null
        if (this.gameLeader) {
            console.log("envoi du init421")
            this.socket.emit("init421", this.lobbyId)
        }
        this.HUD = new HUD(this.localPlayer, this.scene, this.socket, this.lobbyId)
        this.basicInit()
    }

    async basicInit() {
        // let physicsViewer = new BABYLON.Debug.PhysicsViewer();
        // camera
        let camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this.scene)
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas, true);
        // light
        let light = new BABYLON.HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;
        // ground
        this.ground = BABYLON.Mesh.CreateGround("ground1", 64, 64, 2, this.scene);
        this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(this.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, this.scene)
        // mesh options
        
        // let physicsViewer = new BABYLON.Debug.PhysicsViewer();
        for (let i = 0; i < 3; i++) {
            this.newDice(i)
        }

    }

    newDice (index) {
        
        let diceMass = 8
        let diceImpostorParams = { mass: diceMass, restitution: 0, friction: 1.0 };
        const boxMat = new BABYLON.StandardMaterial("boxMat");
        boxMat.diffuseTexture = new BABYLON.Texture("http://localhost:3000/static/421/longDice.jpg")
        let faceUV = [];
        faceUV[0] = new BABYLON.Vector4(0.0, 0.0, 0.166, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(0.166, 0.0, 0.332, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.332, 0, 0.498, 1.0); //right side
        faceUV[3] = new BABYLON.Vector4(0.498, 0, 0.664, 1.0); //left side
        faceUV[4] = new BABYLON.Vector4(0.664, 0, 0.83, 1.0);
        faceUV[5] = new BABYLON.Vector4(0.83, 0, 1.0, 1.0);
        let options = {
            height: 2,
            width: 2,
            depth: 2,
            faceUV: faceUV,
            wrap: true
        };
        let diceName = "dice:" + (Number(index) + 1)
        this.diceMeshes[index] = BABYLON.MeshBuilder.CreateBox(diceName, options)
        this.diceMeshes[index].position = new BABYLON.Vector3(10 * index, 1, 0);
        this.diceMeshes[index].material = boxMat
        this.diceMeshes[index].physicsImpostor = new BABYLON.PhysicsImpostor(this.diceMeshes[index], BABYLON.PhysicsImpostor.BoxImpostor, diceImpostorParams);
        this.scene.onPointerDown = (evt, pickResult) => {
            // We try to pick an object
            if (pickResult.hit && this.currentPlayer().playPhase === "pick") {
                let diceIndex = 0
                for (let i = 0; i < this.diceMeshes.length; i++) {
                    if (this.diceMeshes[i].name === pickResult.pickedMesh.name) {
                        let chosen = [
                            false,
                            false,
                            false
                        ]
                        diceIndex = i
                        chosen[diceIndex] = true
                        this.highlight = new BABYLON.HighlightLayer("hl1", this.scene)
                        this.highlight.addMesh(this.diceMeshes[diceIndex], BABYLON.Color3.Green())
                        this.socket.emit("glowingMesh", this.lobbyId, chosen)
                        break
                    }
                }
                
                // console.log(pickResult.pickedMesh.name);
            }
        };
    }

    async update() {
        if (this.gameData.throwNotif && this.gameData.chosen === null) {
            this.impulse(this.gameData.vectors)
            if (this.currentPlayer().playPhase === "throw") {
                console.log(await this.sleepcheck())
            }
        } else if (this.gameData.chosen && this.currentPlayer().playPhase === false) {
            this.glowingDice(this.gameData.chosen)
        }
        this.routerHUD()
    }

    glowingDice(chosen) {
        for 
    }

    impulse(vector) {
        let i = 0
        for (let dice of this.diceMeshes) {
            dice.physicsImpostor.applyImpulse((new Vector3(vector[i].x, vector[i].y, vector[i].z)).scale(23), dice.getAbsolutePosition().add(this.contactLocalRefPoint))
            i++
        }
    }

    routerHUD() {
        let currentPlayer = this.currentPlayer()
        if (currentPlayer.playPhase === "throw" && currentPlayer.roll < 3) { // Quand le joueur n'a pas encore tout tiré
            this.HUD.playPhaseHUD()
        } else if (currentPlayer.roll >= 3 || currentPlayer.endTurn) {
            this.socket.emit('passTurn', this.lobbyId, currentPlayer)
        } else {
            this.HUD.waitingHUD(this.playingPlayer().name)
        }
    }

    currentPlayer() {
        return this.players.find(player => player.name == this.localPlayer)
    }
    playingPlayer() {
        return this.players.find(player => player.playPhase)
    }
    async sleepcheck() {
        let flag = true
        let results = []

        this.refreshIntervalId = setInterval(() => {

            for (let dice of this.diceMeshes) {
                if (
                    dice.physicsImpostor.getAngularVelocity().x < 0.01
                    && dice.physicsImpostor.getAngularVelocity().y < 0.01
                    && dice.physicsImpostor.getAngularVelocity().z < 0.01
                    && dice.physicsImpostor.getLinearVelocity().x < 0.01
                    && dice.physicsImpostor.getLinearVelocity().y < 0.01
                    && dice.physicsImpostor.getLinearVelocity().z < 0.01
                    && flag
                ) {
                    // flag = false;
                    results.push(this.getResult(dice))
                    if (results.length === 3) {
                        console.log(results)
                        flag = false
                        clearInterval(this.refreshIntervalId)
                        this.diceMeshes[0].dispose()
                        this.newDice(0)
                    }

                }
            }

        }, 1000)

        return results
    }
    getResult(dice) {

        var matrix = dice.getWorldMatrix();
        matrix = matrix.clone();
        matrix.setTranslation(new BABYLON.Vector3(0, 0, 0));
        var vx = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(1, 0, 0), matrix).normalize();
        var vy = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 1, 0), matrix).normalize();
        var vz = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 1), matrix).normalize();
        // console.log("X: " + vx.x + " " + vx.y + " " + vx.z );
        // console.log("Y: " + vy.x + " " + vy.y + " " + vy.z );
        // console.log("Z: " + vz.x + " " + vz.y + " " + vz.z );
        if (1 - Math.abs(vx.y) < 0.0001) {
            if (vx.y > 0) {
                return 4;
            }
            else {
                return 3;
            }
        }
        else if (1 - Math.abs(vy.y) < 0.0001) {
            if (vy.y > 0) {
                return 1;
            }
            else {
                return 6;
            }
        }
        else if (1 - Math.abs(vz.y) < 0.0001) {
            if (vz.y > 0) {
                return 5;
            }
            else {
                return 2;
            }
        }

        return 0;
    }
}


