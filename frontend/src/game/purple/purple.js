import * as BABYLON from "@babylonjs/core/Legacy/legacy"
import 'babylonjs-loaders'
import "@babylonjs/loaders/glTF"
import { HUDPurple } from './HUD'
import { Scene, Vector3 } from "@babylonjs/core"


export class Purple {
    camera
    constructor(canvas, engine, socket, localPlayer, lobbyId, gameLeader) {
        this.canvas = canvas
        this.engine = engine
        this.socket = socket
        this.gameLeader = gameLeader
        console.log("purple.js")
        this.scene = new Scene(this.engine)
        this.players = null
        this.lobbyId = lobbyId
        this.localPlayer = localPlayer
        this.tasks = {}
        this.hud = new HUDPurple(this.localPlayer, this.scene,this.socket,this.lobbyId)

        if (this.gameLeader) {
            this.socket.emit("purpleInit", this.lobbyId)
        }

        this.basicInit()
    }

    basicInit() {
        console.log('local player : ', this.localPlayer, "id lobby : ", this.lobbyId, "game leader : ", this.gameLeader)
        let layer = new BABYLON.Layer('','http://localhost:3000/static/background.jpg', this.scene, true); //eslint-disable-line
        this.scene.createDefaultCameraOrLight(true, true, true);
        this.helperCamera = this.scene.activeCamera;
        this.helperCamera.radius = 32;
        this.helperCamera.alpha = Math.PI / -2;
        this.helperCamera.beta = Math.PI / 4;

    }
    userInformations(player) {
        console.log(player)
       // new UserInformations(player, this.scene)
    }
    displayQuestions(questions) {
        this.hud.displayQuestions(questions)
    }
    displayPlayers(players) {
        console.log("display PLAYERS")

        let x = -10
        let y = 0.05
        let z = 0

        let assetsManager = new BABYLON.AssetsManager(this.scene)
        players.forEach(player => {

            let meshTask = assetsManager.addMeshTask(player.pseudo, "", player.skin)

            meshTask.onSuccess = (task) => {
                console.log(task + x)

                task.loadedMeshes[0].position.x = x
                task.loadedMeshes[0].position.y = y
                task.loadedMeshes[0].position.z = z
                task.loadedMeshes[0].rotation = new Vector3(0,0, 0);
                if(x==-10) {
                    x += 10
                    z -= 10
                }
                else if(x == 0)
                {
                    x+=10
                    z+=10
                }
               
            }
            meshTask.onError = (task, message, exception) => {
                console.warn(message, exception)
            }
        })
        assetsManager.onFinish = (tasks) => {
            console.log("taches on finish", tasks)
            this.tasks.players = tasks

            this.engine.runRenderLoop(() => {
                this.scene.render()
            })
        }
        assetsManager.load()
    }
    
    displayCards(cards) {
        console.log("display cards")
        console.log(cards)
        let x = 0
        let y = 2.15
        let z = 0
        let assetsManager = new BABYLON.AssetsManager(this.scene)
        cards.cards.forEach(card => {
            console.log(card)
            let meshTask = assetsManager.addMeshTask(card.name + "_de_" + card.color.color, "", "http://localhost:3000/static/pmu/cards/", card.name + "_de_" + card.color.color + ".gltf")

            meshTask.onSuccess = (task) => {
                console.log(task + x)
                task.loadedMeshes[0].position.x = x
                task.loadedMeshes[0].position.y = y
                task.loadedMeshes[0].position.z = z
                task.loadedMeshes[0].rotation = new Vector3(0, 0, Math.PI);
                y -= 0.05
            }
            meshTask.onError = (task, message, exception) => {
                console.warn(message, exception)
            }

        })
        assetsManager.onFinish = (tasks) => {
            console.log(tasks)
            this.tasks.cards = tasks
            this.engine.runRenderLoop(() => {
                this.scene.render()
            })
        }
        assetsManager.load()
    }
    drawCard(cardName, modifier) {
        console.log("   PIOOOOOCHE     ")
        let card = this.tasks.cards.find(mesh => mesh.name === cardName)
        console.log(card)
        let frameRate = 10


        const xSlide = new BABYLON.Animation("xRot", "position.z", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
        const keyFramesTrans = [];
        keyFramesTrans.push({
            frame: 0,
            value: card.loadedMeshes[0].position.z
        });
        card.loadedMeshes[0].position.x += 5
        keyFramesTrans.push({
            frame: frameRate,
            value: card.loadedMeshes[0].position.x
        });
        xSlide.setKeys(keyFramesTrans);

        card.loadedMeshes[0].animations.push(xSlide);

        const xRot = new BABYLON.Animation("xRot", "rotation.z", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
        const keyFramesRot = [];
        keyFramesRot.push({
            frame: 0,
            value: card.loadedMeshes[0].rotation.z
        });
        card.loadedMeshes[0].rotation.z = 0
        keyFramesRot.push({
            frame: frameRate,
            value: 0//card.loadedMeshes[0].rotation.z
        });
        xRot.setKeys(keyFramesRot);

        card.loadedMeshes[0].animations.push(xRot);

        this.scene.beginAnimation(card.loadedMeshes[0], 0, 2 * frameRate, false);
        this.scene.beginAnimation(card.loadedMeshes[0], 0, 2 * frameRate, false);
        card.loadedMeshes[0].animations = []
        setTimeout(() => {

            const ySlide = new BABYLON.Animation("ySlide", "position.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
            const keyFramesTransY = [];
            keyFramesTransY.push({
                frame: 0,
                value: card.loadedMeshes[0].position.y
            });
            card.loadedMeshes[0].position.y += -2.1 + 0.05 * modifier
            keyFramesTransY.push({
                frame: frameRate,
                value: card.loadedMeshes[0].position.y
            });
            ySlide.setKeys(keyFramesTransY);

            card.loadedMeshes[0].animations.push(ySlide);
            this.scene.beginAnimation(card.loadedMeshes[0], 0, 2 * frameRate, false);
        }, 1000)

    }

    animationManager(turns, advancement) {
        console.log(turns, advancement)
        let i = 0

        let cardName = advancement.drawedCard[i].card.name + "_de_" + advancement.drawedCard[i].card.color
        this.drawCard(cardName, 0)
        let winnerColor = advancement.winner[i].winner.horse.color
        this.playerProgress(winnerColor)

        setInterval(() => {
            if (advancement.drawedCard[i]) {
                setTimeout(() => {

                    let cardName = advancement.drawedCard[i].card.name + "_de_" + advancement.drawedCard[i].card.color
                    console.log("nom de la carte", cardName)
                    this.drawCard(cardName, i)
                }, 200)
            }
            i++
        }, 2000)
    }
}