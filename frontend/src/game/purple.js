import * as BABYLON from "@babylonjs/core/Legacy/legacy"

export class Purple {
    constructor(canvas, socket, engine, localPlayer, lobbyId) {
        this.canvas = canvas
        this.socket = socket
        this.scene = new BABYLON.Scene(engine)
        this.localPlayer = localPlayer
        this.lobbyId = lobbyId
        
        // this.testElement()
    }

    testElement() {
        BABYLON.MeshBuilder.CreateCylinder("bébé", {}, this.scene);
        const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
        camera.attachControl(this.canvas, true);
        new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), this.scene);
    }
}