import * as BABYLON from "@babylonjs/core/Legacy/legacy"
import 'babylonjs-loaders'
import "@babylonjs/loaders/glTF"
import { UserInformations } from './guiInterface'
import { Scene, Vector3 } from "@babylonjs/core"


export class Pmu {
    camera
    constructor(canvas, engine, socket, localPlayer, lobbyId, gameLeader) {
        this.canvas = canvas
        this.engine = engine
        this.socket = socket
        this.gameLeader = gameLeader
        console.log("pmu.js")
        // this.initSocket(socket)
        this.scene = new Scene(this.engine)
        this.players = null
        this.lobbyId = lobbyId
        this.localPlayer = localPlayer
        this.tasks = {}

        if (this.gameLeader) {
            this.socket.emit("pmuInit", this.lobbyId)
        }

        this.basicInit()
        //new UserInformations(this.localPlayer)
    }

    basicInit() {
        console.log('local player : ', this.localPlayer, "id lobby : ", this.lobbyId, "game leader : ", this.gameLeader)
        
        let layer = new BABYLON.Layer('','http://localhost:3000/static/background.jpg', this.scene, true); //eslint-disable-line
        const mat = new BABYLON.StandardMaterial("");
        mat.diffuseTexture = new BABYLON.Texture("http://localhost:3000/static/layer.jpg");
        this.ground = BABYLON.Mesh.CreateGround("ground1", 64, 150, 2, this.scene);
        this.ground.isVisible = false

        this.scene.createDefaultCameraOrLight(true, true, true);
        this.helperCamera = this.scene.activeCamera;
        this.helperCamera.radius = 32;
        this.helperCamera.alpha = Math.PI / -2;
        this.helperCamera.beta = Math.PI / 4;
        

    }
    userInformations(player) {
        console.log(player)
        new UserInformations(player, this.scene)
    }
    displayPlayers(players) {
        console.log("display PLAYERS")

        let x = 0
        let y = 0.05
        let z = -10

        let assetsManager = new BABYLON.AssetsManager(this.scene)
        players.forEach(player => {

            let meshTask = assetsManager.addMeshTask(player.horse.color, "", "http://localhost:3000/static/pmu/cards/", "As_de_" + player.horse.color + ".gltf")

            meshTask.onSuccess = (task) => {
                console.log(task + x)

                task.loadedMeshes[0].position.x = x
                task.loadedMeshes[0].position.y = y
                task.loadedMeshes[0].position.z = z
                task.loadedMeshes[0].rotation = new Vector3(0,0, 0);

                x += 10
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

    displayMalus(malus) {
        console.log("display MALUS")

        let x = -5
        let y = 0.05
        let z = -5

        let assetsManager = new BABYLON.AssetsManager(this.scene)
        malus.malus.forEach(malus => {

            let meshTask = assetsManager.addMeshTask(malus.name + "_de_" + malus.color, "", "http://localhost:3000/static/pmu/cards/", malus.name + "_de_" + malus.color + ".gltf")

            meshTask.onSuccess = (task) => {
                console.log(task + x)

                task.loadedMeshes[0].position.x = x
                task.loadedMeshes[0].position.y = y
                task.loadedMeshes[0].position.z = z
                task.loadedMeshes[0].rotation = new Vector3(0, 0, Math.PI);

                z += 5
            }
            meshTask.onError = (task, message, exception) => {
                console.warn(message, exception)
            }
        })
        assetsManager.onFinish = (tasks) => {
            console.log("taches on finish", tasks)
            this.tasks.malus = tasks

            this.engine.runRenderLoop(() => {
                this.scene.render()
            })
        }
        assetsManager.load()
    }


    displayCards(cards) {
        console.log("display cards")
        console.log(cards)
        let x = -10
        let y = 2.15
        let z = -10
        let assetsManager = new BABYLON.AssetsManager(this.scene)
        cards.cards.forEach(card => {
            console.log(card)
            let meshTask = assetsManager.addMeshTask(card.name + "_de_" + card.color, "", "http://localhost:3000/static/pmu/cards/", card.name + "_de_" + card.color + ".gltf")
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
    playerProgress(playerColor) {

        let player = this.tasks.players.find(mesh => mesh.name === playerColor)
        console.log(player)

        const frameRate = 10;
        const xSlide = new BABYLON.Animation("xSlide", "position.z", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        const keyFrames = [];

        keyFrames.push({
            frame: 0,
            value: player.loadedMeshes[0].position.z
        });
        player.loadedMeshes[0].position.z += 5
        if (player.loadedMeshes[0].position.z >= 35) {
            player.loadedMeshes[0].position.z = 35
        }
        keyFrames.push({
            frame: frameRate,
            value: player.loadedMeshes[0].position.z
        });
        xSlide.setKeys(keyFrames);

        player.loadedMeshes[0].animations.push(xSlide);

        this.scene.beginAnimation(player.loadedMeshes[0], 0, 2 * frameRate, false);

        return this.scene;
        //mesh.loadedMeshes[0].translate(new BABYLON.Vector3(2, 3, 4), 1)
        //card.loadedMeshes[0].position.y += 1
    }
    playerRegress(playerColor) {
        console.log("   LOOOOSEEERR     ")
        let player = this.tasks.players.find(mesh => mesh.name === playerColor)
        console.log(player)

        const frameRate = 10;
        const xSlide = new BABYLON.Animation("xSlide", "position.z", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        const keyFrames = [];

        keyFrames.push({
            frame: 0,
            value: player.loadedMeshes[0].position.z
        });

        if (player.loadedMeshes[0].position.z >= 35) {
            player.loadedMeshes[0].position.z += 5
        }
        player.loadedMeshes[0].position.z -= 5
        keyFrames.push({
            frame: frameRate,
            value: player.loadedMeshes[0].position.z
        });
        xSlide.setKeys(keyFrames);

        player.loadedMeshes[0].animations.push(xSlide);

        this.scene.beginAnimation(player.loadedMeshes[0], 0, 2 * frameRate, false);

        return this.scene;
        //mesh.loadedMeshes[0].translate(new BABYLON.Vector3(2, 3, 4), 1)
        //card.loadedMeshes[0].position.y += 1
    }
    malusRevealed(malusName) {
        console.log("MAAAAALUUUUUUS")
        let player = this.tasks.malus.find(mesh => mesh.name === malusName)

        let frameRate = 10
        const xRot = new BABYLON.Animation("xRot", "rotation.z", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
        const keyFramesRot = [];
        keyFramesRot.push({
            frame: 0,
            value: player.loadedMeshes[0].rotation.z
        });
        player.loadedMeshes[0].rotation.z = 0
        keyFramesRot.push({
            frame: frameRate,
            value: 0//player.loadedMeshes[0].rotation.z
        });
        xRot.setKeys(keyFramesRot);

        player.loadedMeshes[0].animations.push(xRot);

        this.scene.beginAnimation(player.loadedMeshes[0], 0, 2 * frameRate, false);
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
            card.loadedMeshes[0].position.y += -2.1 + 0.05 * modifier *2
            keyFramesTransY.push({
                frame: frameRate,
                value: card.loadedMeshes[0].position.y
            });
            ySlide.setKeys(keyFramesTransY);

            card.loadedMeshes[0].animations.push(ySlide);
            this.scene.beginAnimation(card.loadedMeshes[0], 0, 2 * frameRate, false);
        }, 1000)

        //return this.scene;
        //mesh.loadedMeshes[0].translate(new BABYLON.Vector3(2, 3, 4), 1)
        //card.loadedMeshes[0].position.y += 1
    }

    animationManager(turns, advancement) {
        console.log(turns, advancement)
        let i = 0
        let j = 0

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
            if (advancement.winner[i]) {
                setTimeout(() => {
                    let winnerColor = advancement.winner[i].winner.horse.color
                    this.playerProgress(winnerColor)
                }, 1400)
            }
            if (advancement.looser[j] && advancement.looser[j].turn == i) {
                setTimeout(() => {
                    let looserColor = advancement.looser[j - 1].looser.horse.color
                    this.playerRegress(looserColor)
                    let malusRevealed = advancement.malusRevealed[j - 1].malusRevealed.name + "_de_" + advancement.malusRevealed[j - 1].malusRevealed.color
                    this.malusRevealed(malusRevealed)
                }, 1000)
                j++
            }
            i++
        }, 2000)
    }
}

