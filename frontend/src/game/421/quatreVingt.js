import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { Vector3 } from "@babylonjs/core/Legacy/legacy"
import { HUD } from './HUD'
(global).CANNON = require('cannon')

export class QuatreVingt {
    constructor(canvas, socket, engine, localPlayer, lobbyId, gameLeader) {
        console.log("LOCAPLAYER", localPlayer)
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
        this.highlight = new BABYLON.HighlightLayer("hl1", this.scene)
        this.pickFlag = false
        this.init = false
        this.decal = 0
        this.chosen = [
            false,
            false,
            false
        ]
        
        this.HUD = null
    }

    basicInit() {
        let camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 70, new BABYLON.Vector3(0, 5, 0), this.scene)
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas, true);
        // light
        let light = new BABYLON.HemisphericLight("light1", new Vector3(0.7, 0.7, 0), this.scene);
        light.intensity = 0.7;
        // ground
        let layer = new BABYLON.Layer('','http://localhost:3000/static/background.jpg', this.scene, true); //eslint-disable-line
        this.ground = BABYLON.Mesh.CreateGround("ground1", 150, 150, 2, this.scene)
        this.ground.isVisible = false
        this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(this.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.2 }, this.scene)
        // mesh options

        this.newDices([true, true, true])
        this.init = true
        this.HUD = new HUD(this.localPlayer, this.scene, this.socket, this.lobbyId)
    }

    newDices(newDiceTab) {
        console.log("newDICETAB", newDiceTab)
        let diceMass = 5
        let diceImpostorParams = { mass: diceMass, restitution: 0.5, friction: 1.0 };
        const boxMat = new BABYLON.StandardMaterial("boxMat");
        boxMat.diffuseTexture = new BABYLON.Texture("http://localhost:3000/static/421/longDice.jpg")
        let faceUV = [];
        faceUV[0] = new BABYLON.Vector4(0.0, 0.0, 0.166, 1.0);
        faceUV[1] = new BABYLON.Vector4(0.166, 0.0, 0.332, 1.0);
        faceUV[2] = new BABYLON.Vector4(0.332, 0, 0.498, 1.0);
        faceUV[3] = new BABYLON.Vector4(0.498, 0, 0.664, 1.0);
        faceUV[4] = new BABYLON.Vector4(0.664, 0, 0.83, 1.0);
        faceUV[5] = new BABYLON.Vector4(0.83, 0, 1.0, 1.0);
        let options = {
            height: 2,
            width: 2,
            depth: 2,
            faceUV: faceUV,
            wrap: true
        };
        for (let i = 0; i < newDiceTab.length; i++) {
            if (newDiceTab[i] && !this.init) {
                let diceName = "dice:" + (Number(i) + 1)
                this.diceMeshes[i] = BABYLON.MeshBuilder.CreateBox(diceName, options)
                this.diceMeshes[i].position = new BABYLON.Vector3((7 * i) - 7, 1, 0);
                this.diceMeshes[i].material = boxMat
                this.diceMeshes[i].physicsImpostor = new BABYLON.PhysicsImpostor(this.diceMeshes[i], BABYLON.PhysicsImpostor.BoxImpostor, diceImpostorParams);
                this.diceMeshes[i].locked = false
                this.scene.onPointerDown = (evt, pickResult) => {
                    // We try to pick an object
                    if (pickResult.hit) {
                        this.clickAndGlow(pickResult)
                    }
                };
            } else if (newDiceTab[i] && this.init) {
                if (!this.diceMeshes[i].locked) {
                    let diceName = "dice:" + (Number(i) + 1)
                    this.diceMeshes[i] = BABYLON.MeshBuilder.CreateBox(diceName, options)
                    this.diceMeshes[i].position = new BABYLON.Vector3((7 * i) - 7, 1, 0);
                    this.diceMeshes[i].material = boxMat
                    this.diceMeshes[i].physicsImpostor = new BABYLON.PhysicsImpostor(this.diceMeshes[i], BABYLON.PhysicsImpostor.BoxImpostor, diceImpostorParams);
                    this.diceMeshes[i].locked = false
                    this.scene.onPointerDown = (evt, pickResult) => {
                        // We try to pick an object
                        if (pickResult.hit) {
                            this.clickAndGlow(pickResult)
                        }
                    }
                }
            }
        }
    }
    clickAndGlow(pickResult) {
        let diceIndex = 0
        for (let i = 0; i < this.diceMeshes.length; i++) {
            if (this.diceMeshes[i].name === pickResult.pickedMesh.name && this.pickFlag && this.diceMeshes[i].locked) {
                
                this.socket.emit("freeDice", this.lobbyId, i)
            } else if (this.diceMeshes[i].name === pickResult.pickedMesh.name && this.pickFlag && !this.diceMeshes[i].locked) {
                console.log("dice pick, sending socket")
                diceIndex = i
                this.chosen[diceIndex] = true
                console.log(this.chosen)
                this.socket.emit("glowingMesh", this.lobbyId, this.chosen)
                break
            }
        }
    }
    init421() {
        if (this.currentPlayer().playPhase) {
            this.HUD.throwPhaseHUD(this.currentPlayer().roll)
        } else {
            this.HUD.waiting(this.playingPlayer().name)
        }
        this.HUD.gameInfo(this.gameData.tokenPile, this.gameData.players)
    }

    throwDices() {
        this.resetDice([!this.diceMeshes[0].locked, !this.diceMeshes[1].locked, !this.diceMeshes[2].locked])
        this.chosen = [
            false,
            false,
            false
        ]
        console.log("throwDices")
        this.impulse(this.gameData.vectors)
        if (this.currentPlayer().playPhase) {
            this.sleepcheck()
        }
        this.HUD.gameInfo(this.gameData.tokenPile, this.gameData.players)
    }

    result() {
        console.log("result happened")
        if (this.currentPlayer().playPhase && this.currentPlayer().roll < 3) {
            this.HUD.pickPhase()
            this.pickFlag = true
        }
        this.HUD.gameInfo(this.gameData.tokenPile, this.gameData.players)
    }
    resetPick() {
        this.chosen = [
            false,
            false,
            false
        ]
        for (let i = 0; i < 3; i++) {
            // if (this.diceMeshes[i].physicsImpostor.mass !== 0) {
            //     this.moveDice
            // } else {
            this.highlight.removeMesh(this.diceMeshes[i])
            // }

        }
        this.HUD.gameInfo(this.gameData.tokenPile, this.gameData.players)
    }

    freeDice(idDice) {
        this.diceMeshes[idDice].locked = false
        let localChosen = [
            false,
            false,
            false
        ]
        for (let i = 0; i < 3; i++) {
            if (i === idDice) {
                localChosen[i] = true
            }
        }
        console.log("local Chosen", localChosen)
        this.resetDice(localChosen)
        this.HUD.gameInfo(this.gameData.tokenPile, this.gameData.players)
    }

    nextTurn() {
        for (let dice of this.diceMeshes) {
            dice.locked = false
        }
        this.resetDice([true, true, true])
        if (this.currentPlayer().playPhase) {
            this.HUD.throwPhaseHUD(this.currentPlayer().roll)
        } else {
            this.HUD.waiting(this.playingPlayer().name)
        }
        this.HUD.gameInfo(this.gameData.tokenPile, this.gameData.players)
    }

    endPick() {
        this.pickFlag = false
        if (this.gameData.chosen !== null) {
            this.moveDice()
            this.resetDice([!this.gameData.chosen[0], !this.gameData.chosen[1], !this.gameData.chosen[2]])
        }

        if (this.currentPlayer().playPhase) {
            this.HUD.throwPhaseHUD(this.currentPlayer().roll)
        } else {
            this.HUD.waiting(this.playingPlayer().name)
        }
        this.HUD.gameInfo(this.gameData.tokenPile, this.gameData.players)
    }

    moveDice() {
        for (let i = 0; i < 3; i++) {
            if (this.gameData.chosen[i] && !this.diceMeshes[i].locked) {
                this.decal += 5
                this.diceMeshes[i].position = new Vector3(40 + this.decal, 1, 0)
                this.diceMeshes[i].physicsImpostor.mass = 0
                this.highlight.removeMesh(this.diceMeshes[i])
                this.diceMeshes[i].locked = true
                this.socket.emit("lockedDice", this.lobbyId, this.cptLocked())
            }
        }
    }

    cptLocked() {
        let cpt = 0
        for (let i = 0; i < this.diceMeshes.length; i++) {
            if (this.diceMeshes[i].locked) {
                cpt++
            }
        }
        return cpt
    }

    resetDice(chosen) {
        this.deleteDice(chosen)
        this.newDices(chosen)
    }
    deleteDice(chosen) {
        for (let i = 0; i < 3; i++) {
            console.log(chosen[i], !this.diceMeshes[i].locked)
            if (chosen[i] && !this.diceMeshes[i].locked) {
                this.diceMeshes[i].dispose()
            }
        }
    }

    glowMesh() {
        let allPicked = this.glowingDice(this.gameData.chosen)
        console.log("glow mesh", allPicked)
    }


    lockedDiceTab() {
        let result = []
        let i = 0
        for (let dice of this.diceMeshes) {
            if (dice.physicsImpostor.mass === 0) {
                result[i] = true
            } else {
                result[i] = false
            }
            i++
        }
        return result
    }
    lockedDiceCpt() {
        let cpt = 0
        for (let dice of this.diceMeshes) {
            if (dice.physicsImpostor.mass === 0) {
                cpt++
            }
        }
        return cpt
    }


    glowingDice(chosen) {
        let cpt = 0
        for (let i = 0; i < chosen.length; i++) {
            if (chosen[i]) {
                cpt++
                this.highlight.addMesh(this.diceMeshes[i], BABYLON.Color3.Green())
            }

        }
        return cpt
    }

    impulse(vector) {
        let i = 0
        for (let dice of this.diceMeshes) { // changer
            dice.physicsImpostor.applyImpulse((new Vector3(vector[i].x, 12, vector[i].z)).scale(4), dice.getAbsolutePosition().add(this.contactLocalRefPoint))
            i++
        }
    }

    currentPlayer() {
        return this.players.find(player => player.name == this.localPlayer)
    }
    playingPlayer() {
        return this.players.find(player => player.playPhase)
    }
  
    sleepcheck() {
        let flag = true
        let results = []
        setTimeout(() => {
            let intervalId = setInterval(() => {
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
                        results.push(this.getResult(dice))
                        if (results.length === 3) {
                            flag = false
                            console.log(results)
                            clearInterval(intervalId)
                            this.socket.emit("result", this.lobbyId, results)
                        }
                    }
                }
            }, 200)


        }, 5000)


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
                return 5;
            }
            else {
                return 2;
            }
        }
        else if (1 - Math.abs(vy.y) < 0.0001) {
            if (vy.y > 0) {
                return 4;
            }
            else {
                return 6;
            }
        }
        else if (1 - Math.abs(vz.y) < 0.0001) {
            if (vz.y > 0) {
                return 1;
            }
            else {
                return 3;
            }
        }

        return 0;
    }
}


