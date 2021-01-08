// import * as BABYLON from "@babylonjs/core/Legacy/legacy"
import {UserInformations} from './guiInterface'
// import { Vector3 } from "@babylonjs/core/Legacy/legacy"
import {Scene, FollowCamera, HemisphericLight, Vector3} from "@babylonjs/core"
//const interval = 15
//const timeRatio = 1000 / interval

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
        

        if(this.gameLeader) {
            this.socket.emit("pmuInit", this.lobbyId)
        }
        
        this.basicInit()
        //new UserInformations(this.localPlayer)
    }

    basicInit() {
        console.log('local player : ',this.localPlayer, "id lobby : ",this.lobbyId, "game leader : ",this.gameLeader)
        // Parameters: name, position, scene
        this.camera = new FollowCamera("FollowCam", new Vector3(0, 0, -10), this.scene);
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
        
        new HemisphericLight("HemiLight", new Vector3(0, 1, 0), this.scene);
        this.scene.createDefaultCameraOrLight(true, true, true);
        this.scene.createDefaultEnvironment();

    }
    userInformations (player){
        console.log(player)
        new UserInformations(player, this.scene)
    }
}

