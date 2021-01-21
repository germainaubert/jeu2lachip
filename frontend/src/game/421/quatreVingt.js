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
        this.scene.enablePhysics(new BABYLON.Vector3(0, -9.0, 0), physicsPlugin)
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
        this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(this.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1.0 }, this.scene)
        // mesh options
        const boxMat = new BABYLON.StandardMaterial("boxMat");
        boxMat.diffuseTexture = new BABYLON.Texture("http://localhost:3000/static/421/longDice.jpg")
        let faceUV = [];
        faceUV[0] = new BABYLON.Vector4(0.0, 0.0, 0.16, 1.0); //rear face
        faceUV[1] = new BABYLON.Vector4(0.16, 0.0, 0.32, 1.0); //front face
        faceUV[2] = new BABYLON.Vector4(0.32, 0, 0.48, 1.0); //right side
        faceUV[3] = new BABYLON.Vector4(0.48, 0, 0.64, 1.0); //left side
        faceUV[4] = new BABYLON.Vector4(0.64, 0, 80, 1.0); 
        faceUV[5] = new BABYLON.Vector4(0.80, 0, 0.96, 1.0); 
        let options = {
            height: 2,
            width: 2,
            depth: 2,
            faceUV: faceUV,
            wrap: true
        };
        // let diceSize = 2;
        // let physicsViewer = new BABYLON.Debug.PhysicsViewer();
        let diceMass = 5
        let diceNumber = 3
        let diceImpostorParams = { mass: diceMass, restitution: 0.3, friction: 1 };
        // mesh import 
        // let container = await BABYLON.SceneLoader.LoadAssetContainerAsync("http://localhost:3000/static/421/", "dice.gltf", this.scene)
        // let mesh = container.meshes[0]
        for (let i = 0; i < diceNumber; i++) {
            let diceName = "dice:" + i + 1
            this.diceMeshes[i] = BABYLON.MeshBuilder.CreateBox(diceName, options);
            this.diceMeshes[i].position = new BABYLON.Vector3(4 * i, 1, 0);
            this.diceMeshes[i].material = boxMat
            this.diceMeshes[i].physicsImpostor = new BABYLON.PhysicsImpostor(this.diceMeshes[i], BABYLON.PhysicsImpostor.BoxImpostor, diceImpostorParams, this.scene);

            // physicsViewer.showImpostor(this.diceMeshes[i].physicsImpostor);
        }
    }

    update() {
        if (this.gameData.throwNotif) {

            let randomVector = this.randomDice()
            this.socket.emit('diceVector', this.lobbyId, randomVector)

            this.gameData.throwNotif = false
        }
        this.routerHUD()
    }

    randomDice() {
        let vectorTab = []
        for (let i = 0; i < 3; i++) {
            vectorTab.push(new Vector3(randomNumber(), 2 + randomNumber(), randomNumber()))
        }
        return  vectorTab
    }

    impulse(vector) {
        let i = 0
        for (let dice of this.diceMeshes) {
            dice.physicsImpostor.applyImpulse((new Vector3(vector[i]._x, vector[i]._y, vector[i]._z)).scale(10), dice.getAbsolutePosition().add(this.contactLocalRefPoint))
            i++
            // box.physicsImpostor.applyImpulse(impulseDirection.scale(impulseMagnitude), box.getAbsolutePosition().add(contactLocalRefPoint))
        }
    }

    async throwDices(vector) {
        this.impulse(vector)
        await this.sleepcheck()
    }

    routerHUD() {
        let currentPlayer = this.currentPlayer()
        if (currentPlayer.thrower && currentPlayer.roll < 3) { // Quand le joueur n'a pas encore tout tiré
            this.HUD.throwerHUD()
        } else if (currentPlayer.thrower >= 3 || currentPlayer.endTurn) {
            this.socket.emit('passTurn', this.lobbyId, currentPlayer)
        }
    }

    currentPlayer() {
        return this.players.find(player => player.name == this.localPlayer)
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
        //console.log("X: " + vx.x + " " + vx.y + " " + vx.z );
        //console.log("Y: " + vy.x + " " + vy.y + " " + vy.z );
        //console.log("Z: " + vz.x + " " + vz.y + " " + vz.z );
        //console.log("force " + self.physicBody.body.angularVelocity.length() + " " + self.physicBody.body.linearVelocity.length());
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

function randomNumber() {
    let random = Math.random()
    if (Math.random() < 0.5) {
        random = -random
    }
    return random
}
