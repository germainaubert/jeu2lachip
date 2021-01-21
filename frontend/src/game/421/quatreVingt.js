import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { Vector3 } from "@babylonjs/core/Legacy/legacy"
import { HUD } from './HUD'
(global).CANNON = require('cannon')

export class QuatreVingt {
    camera
    constructor(canvas, socket, engine, localPlayer, lobbyId, gameLeader) {
        this.canvas = canvas
        this.socket = socket
        this.scene = new BABYLON.Scene(engine)
        // let gravityVector = new BABYLON.Vector3(0, -13, 0)
        var physicsPlugin = new BABYLON.CannonJSPlugin()
        this.scene.enablePhysics(null, physicsPlugin)
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
        if (this.gameLeader) {
            console.log("envoi du init421")
            this.socket.emit("init421", this.lobbyId)
        }
        this.HUD = new HUD(this.localPlayer, this.scene, this.socket, this.lobbyId)
        this.basicInit()
    }

    basicInit() {
        let camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this.scene)
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.canvas, true);
        let light = new BABYLON.HemisphericLight("light1", new Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;
        // let shadowGenerator = new BABYLON.ShadowGenerator(2048, light);

        let ground = BABYLON.Mesh.CreateGround("ground1", 64, 64, 2, this.scene);
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.8 }, this.scene)

        // let physicsViewer = new BABYLON.Debug.PhysicsViewer();
        let myMaterial = new BABYLON.StandardMaterial("myMaterial")
        myMaterial.diffuseTexture = new BABYLON.Texture("http://localhost:3000/static/dice.jpg", this.scene)
        let faceUV = [];
        faceUV[0] = new BABYLON.Vector4(0, 0, 0.333, 0.5); //rear face
        faceUV[1] = new BABYLON.Vector4(0.333, 0, 0.666, 0.5); //front face
        faceUV[2] = new BABYLON.Vector4(0.666, 0, 0.999, 0.5); //right side
        faceUV[3] = new BABYLON.Vector4(0, 0.5, 0.333, 1); //left side
        faceUV[4] = new BABYLON.Vector4(0.333, 0.5, 0.666, 1);
        faceUV[5] = new BABYLON.Vector4(0.666, 0.5, 0.999, 1);
        //wrap set
        let options = {
            height: diceSize,
            width: diceSize,
            depth: diceSize,
            faceUV: faceUV,
            wrap: true
        };
        let diceSize = 2;
        let diceMass = 5
        let diceImpostorParams = { mass: diceMass, restitution: 0.7, friction: 1 };
        // let diceMaterial = new BABYLON.StandardMaterial("boxMaterial");
        // diceMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
        for (let i = 0; i < 3; i++) {
            let diceName = "dice:" + i
            this.diceMeshes[i] = BABYLON.MeshBuilder.CreateBox(diceName, options, this.scene);
            this.diceMeshes[i].position = new BABYLON.Vector3(4 * i, 4, 0);
            // this.diceMeshes[i].material = diceMaterial;
            this.diceMeshes[i].physicsImpostor = new BABYLON.PhysicsImpostor(this.diceMeshes[i], BABYLON.PhysicsImpostor.BoxImpostor, diceImpostorParams, this.scene);
            this.diceMeshes[i].material = myMaterial
            // this.diceMeshes[i].cubeBody = this.diceMeshes[i].setPhysicsState({impostor: BABYLON.PhysicsEngine.BoxImpostor, mass:diceMass, restitution:0.7})
            // shadowGenerator.addShadowCaster(this.diceMeshes[i])
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
        return new Vector3(randomNumber(), 5 + randomNumber(), randomNumber())
    }

    impulse(vector) {
        for (let dice of this.diceMeshes) {
            dice.physicsImpostor.applyImpulse((new Vector3(vector._x, vector._y, vector._z)).scale(10), dice.getAbsolutePosition().add(this.contactLocalRefPoint))
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
    let random = Math.random() * 2
    if (Math.random() < 0.5) {
        random = -random
    }
    return random
}
