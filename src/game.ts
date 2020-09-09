import { createChannel } from '../node_modules/decentraland-builder-scripts/channel'
import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import Script1 from "../6ff6b3aa-083a-4e8c-bdd8-b4d64e1f2db1/src/item"
import Script2 from "../d6dea640-b953-48b9-bfb0-d750c5f43ba1/src/item"
import Script3 from "../43166e90-5f00-4d06-ab07-8cefae85cbd1/src/item"
import Script4 from "../f8a9d193-46ca-49d5-9c4a-9de3d48eea61/src/item"
import Script5 from "../e7a6c753-ea84-4c8e-bb94-4523407a5d55/src/item"
import Script6 from "../56985185-7512-4359-9d0e-1142dc6b65a6/src/item"

const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

function spawnGrass(x: number, y: number, z: number) : Entity{
  log("Spawning grass...")
  // create the grass
  const grass = new Entity()

  //add a random model to the entity
  const random = Math.floor(Math.random() * 5);
  if(random == 0)
    grass.addComponent(new GLTFShape("models/grass_01.glb"))
  else if(random == 1)
    grass.addComponent(new GLTFShape("models/grass_02.glb"))
  else if(random == 2)
    grass.addComponent(new GLTFShape("models/grass_03.glb"))
  else
    grass.addComponent(new GLTFShape("models/grass_04.glb"))

  // add a transform to the entity
  let transform = new Transform({
    position: new Vector3(x,y,z),
    scale: new Vector3(1,0.5,1),
    rotation: Quaternion.Euler(0, 0, 0)
  })
  grass.addComponent(transform)

  // add the entity to the engine
  engine.addEntity(grass)

  const random2 = Math.floor(Math.random() * 5); 
  if(random2 == 1 && z < 35.0)
  {
    mines.push(grass)
    transformMines.push(transform)

    // Create AudioClip object, holding audio file
    const clip = new AudioClip('sounds/beep.mp3')
    // Create AudioSource component, referencing `clip`
    const source = new AudioSource(clip)
    grass.addComponent(source)

    soundsMines.push(source)
  }
  return grass
}

var grassFloor = []
var mines = []
var transformMines = []
var soundsMines = []

function generateWorld(x: number, y: number, z: number, size:number)
{
  //log("Generating new world...")
  //center
  let grass = spawnGrass(x,y,z)
  grassFloor.push(grass)

  for(let i = 0; i < size*1.4; i++)
  {
    for(let j = 0; j < size; j++)
    {
      grassFloor.push(spawnGrass(x+((j-(size/2))*2),y,z+((i-(size/2))*2)))
    }
  }
}

generateWorld(17, -0.12, 19, 13)

const canvas = new UICanvas()
// create container inside canvas
const rect = new UIContainerRect(canvas)
rect.adaptHeight = true
rect.adaptWidth = true
rect.hAlign = 'left'
rect.vAlign = 'top'
rect.opacity = 0.8

let sunUITexture = new Texture("models/CEL.png")
const sunImgScreen = new UIImage(rect, sunUITexture)
sunImgScreen.hAlign = 'left'
sunImgScreen.vAlign = 'top'
sunImgScreen.sourceLeft = 0
sunImgScreen.sourceTop = 0
sunImgScreen.sourceWidth = 321
sunImgScreen.sourceHeight = 685
sunImgScreen.width = 321
sunImgScreen.height = 685

let sunUITexture2 = new Texture("models/Red.png")
var sunImgScreen2 = new UIImage(rect, sunUITexture2)
sunImgScreen2.hAlign = 'left'
sunImgScreen2.vAlign = 'top'
sunImgScreen2.sourceLeft = 0
sunImgScreen2.sourceTop = 0
sunImgScreen2.sourceWidth = 321
sunImgScreen2.sourceHeight = 685
sunImgScreen2.width = 321
sunImgScreen2.height = 685
sunImgScreen2.positionX = 60
sunImgScreen2.positionY = -140

import { getUserData } from "@decentraland/Identity"

const factTxt0 = new UIText(rect)
factTxt0.outlineColor = new Color4(0.7, 1, 0.8, 1)
factTxt0.fontSize = 12
factTxt0.width = 500
factTxt0.height = 205
factTxt0.positionX = 93
factTxt0.positionY = -20
factTxt0.color = new Color4(0.7, 1, 0.8, 1)
factTxt0.textWrapping = true

const userData = executeTask(async () => {
  const data = await getUserData()
  log(data.displayName)
  factTxt0.value = data.displayName + " phone's"
  return data.displayName
}) 

const looseText = new UIText(rect)
looseText.outlineColor = new Color4(1, 0, 0, 1)
looseText.value = 'You died! - Game Over'
looseText.fontSize = 40
looseText.width = 500
looseText.height = 205
looseText.positionX = 500
looseText.positionY = -50
looseText.color = new Color4(1, 0, 0, 1)
looseText.textWrapping = true
looseText.visible = false

const winText = new UIText(rect)
winText.outlineColor = new Color4(0, 1, 0, 1)
winText.value = 'You WIN! Congrats - Time: 00:01'
winText.fontSize = 40
winText.width = 800
winText.height = 205
winText.positionX = 360
winText.positionY = -50
winText.color = new Color4(0, 1, 0, 1)
winText.textWrapping = true
winText.visible = false

const goldText = new UIText(rect)
goldText.outlineColor = new Color4(0, 1, 0, 1)
goldText.value = 'You found the gold! Now exit carefully'
goldText.fontSize = 40
goldText.width = 800
goldText.height = 205
goldText.positionX = 460
goldText.positionY = -50
goldText.color = new Color4(0, 1, 0, 1)
goldText.textWrapping = true
goldText.visible = false

const bugText = new UIText(rect)
bugText.outlineColor = new Color4(1, 0, 0, 1)
bugText.value = 'You need to start the game to play. Please exit.'
bugText.fontSize = 40
bugText.width = 800
bugText.height = 205
bugText.positionX = 300
bugText.positionY = -50
bugText.color = new Color4(1, 0, 0, 1)
bugText.textWrapping = true
bugText.visible = false

const noGoldText = new UIText(rect)
noGoldText.outlineColor = new Color4(1, 0, 0, 1)
noGoldText.value = 'Game Over - Please exit and start the game to play again.'
noGoldText.fontSize = 40
noGoldText.width = 800
noGoldText.height = 205
noGoldText.positionX = 300
noGoldText.positionY = -50
noGoldText.color = new Color4(1, 0, 0, 1)
noGoldText.textWrapping = true
noGoldText.visible = false

const startText = new UIText(rect)
startText.outlineColor = new Color4(1, 1, 1, 1)
startText.value = "Game starting, don't move..."
startText.fontSize = 40
startText.width = 800
startText.height = 205
startText.positionX = 500
startText.positionY = -50
startText.color = new Color4(1, 1, 1, 1)
startText.textWrapping = true
startText.visible = false

const goText = new UIText(rect)
goText.outlineColor = new Color4(1, 1, 1, 1)
goText.value = 'Be Careful, reaches the other side avoiding the mines.'
goText.fontSize = 40
goText.width = 800
goText.height = 205
goText.positionX = 380
goText.positionY = -50
goText.color = new Color4(1, 1, 1, 1)
goText.textWrapping = true
goText.visible = false

const factTxt = new UIText(rect)
factTxt.outlineColor = new Color4(0.7, 1, 0.8, 1)
factTxt.value = 'Scanning for mines...'
factTxt.fontSize = 18
factTxt.width = 500
factTxt.height = 205
factTxt.positionX = 93
factTxt.positionY = -50
factTxt.color = new Color4(0.7, 1, 0.8, 1)
factTxt.textWrapping = true

const factTxt2 = new UIText(rect)
factTxt2.outlineColor = new Color4(0.7, 1, 0.8, 1)
factTxt2.value = 'The emergency light will flash faster and faster if you approach a buried mine.'
factTxt2.fontSize = 15
factTxt2.width = 230
factTxt2.height = 205
factTxt2.positionX = 80
factTxt2.positionY = -310
factTxt2.color = new Color4(0.7, 1, 0.8, 1)
factTxt2.textWrapping = true

const factTxt3 = new UIText(rect)
factTxt3.outlineColor = new Color4(0.7, 1, 0.8, 1)
factTxt3.value = 'Your time:'
factTxt3.fontSize = 20
factTxt3.width = 230
factTxt3.height = 205
factTxt3.positionX = 130
factTxt3.positionY = -380
factTxt3.color = new Color4(0.7, 1, 0.8, 1)
factTxt3.textWrapping = true

const factTxt4 = new UIText(rect)
factTxt4.outlineColor = new Color4(0.7, 1, 0.8, 1)
factTxt4.value = '00:00'
factTxt4.fontSize = 40
factTxt4.width = 230
factTxt4.height = 205
factTxt4.positionX = 120
factTxt4.positionY = -450
factTxt4.color = new Color4(0.7, 1, 0.8, 1)
factTxt4.textWrapping = true

var flagLed = 0
var flagMine = 0
var startTime = 0
var finalTime = 0
var haveGold = 0
//Oculta todos los textos
factTxt.visible = false
factTxt2.visible = false
factTxt3.visible = false
factTxt4.visible = false
sunImgScreen.visible = false
sunImgScreen2.visible = false
factTxt0.visible = false

var moveDoor = 0
var moveDoor2 = 0

function startGame()
{
  smallLog.getComponent(LerpSizeData).targetScale = new Vector3(0.388832926750183, 1.0000123977661133, 1)
  smallLog.getComponent(LerpSizeData).targetPosition = new Vector3(16.98699951171875, 4.131305456161499, 43.4439582824707)
  smallLog.getComponent(LerpSizeData).fraction = 0

  smallLog2.getComponent(LerpSizeData2).targetScale = new Vector3(0.3888341188430786, 1.0000135898590088, 1)
  smallLog2.getComponent(LerpSizeData2).targetPosition = new Vector3(16.417932510375977, 4.131305456161499, 43.4439582824707)
  smallLog2.getComponent(LerpSizeData2).fraction = 0

  smallLog3.getComponent(LerpSizeData3).targetScale = new Vector3(0.3888365030288696, 1.0000159740447998, 1)
  smallLog3.getComponent(LerpSizeData3).targetPosition = new Vector3(15.801841735839844, 4.131305456161499, 43.4439582824707)  
  smallLog3.getComponent(LerpSizeData3).fraction = 0 
  //Oculta todos los textos
  factTxt.visible = false
  factTxt2.visible = false
  factTxt3.visible = false
  factTxt4.visible = false
  sunImgScreen.visible = false
  sunImgScreen2.visible = false
  factTxt0.visible = false
  looseText.visible = false
  winText.visible = false
  //Apaga los sistemas de reconocimiento
  flagLed = 0
  flagMine = 0
  haveGold = 0
  //Muestra la instrucción de evitar bombas
  goText.visible = true
  flagMine = 1
  setTimeout(function(){
    goText.visible = false
    //Enciende los sistemas de reconocimiento
    flagLed = 1
    //Habilita sonidos e interfaces
    factTxt.visible = true
    factTxt2.visible = true
    factTxt3.visible = true
    factTxt4.visible = true
    sunImgScreen.visible = true
    sunImgScreen2.visible = true
    factTxt0.visible = true

    //Mide el tiempo
    startTime = + new Date()
   }, 3000);
}

function convertTimeToText(minutes: number) : string
{
  let textString = ""
  if(Math.floor(minutes) >= 10 && Math.floor((minutes*60 % 60)) >= 10)
    textString = Math.floor(minutes) + ':' + Math.floor((minutes*60 % 60))
  else if(Math.floor(minutes) >= 10 && Math.floor((minutes*60 % 60)) < 10)
    textString = Math.floor(minutes) + ':0' + Math.floor((minutes*60 % 60))
  else if(Math.floor(minutes) < 10 && Math.floor((minutes*60 % 60)) >= 10)
    textString = '0' + Math.floor(minutes) + ':' + Math.floor((minutes*60 % 60))
  else
    textString = '0' + Math.floor(minutes) + ':0' + Math.floor((minutes*60 % 60))
  return textString
}

class LedTrackSystem {
  update() {
    flashLed(flagLed)
    flasMine()
    if(flagMine == 1)
    { 
      //Actualiza el tiempo del celular
      let actualTime = + new Date()
      let minutes = (actualTime - startTime)/60/1000
      factTxt4.value = convertTimeToText(minutes)
    }
  }
}

engine.addSystem(new LedTrackSystem())

function flashLed(flag:number)
{
  if(flag == 0 || flagMine == 0) return 1
  var proxMine : number = 0
  let distanceProxMine :number = 9999999
  const camera = Camera.instance
  for(let i = 0; i < transformMines.length; i++)
  {
    var grassTransform = transformMines[i]
    var distanceMine = Math.sqrt( Math.pow(camera.position.x - grassTransform.position.x, 2) +  Math.pow(camera.position.z - grassTransform.position.z, 2) )
    if(distanceProxMine > distanceMine)
    {
      proxMine = i
      distanceProxMine = distanceMine
    }
  }
  //let grassTransform = transformMines[proxMine]
  //let distanceMine = Math.sqrt( Math.pow(camera.position.x - grassTransform.position.x, 2) +  Math.pow(camera.position.z - grassTransform.position.z, 2))
  //log("flashled")
  //log(distanceProxMine)
  if( distanceProxMine < 0.5)
  {
    //log("<0.8")
  }
  else if( distanceProxMine < 4.3 && distanceProxMine >= 0.8)
  {
    //Parpadea cada 0.2 segundos
    //Prende
    sunImgScreen2.visible = true
    flagLed = 0
    setTimeout(function(){ 
      //Apaga
      sunImgScreen2.visible = false
      setTimeout(function(){ 
        flagLed = 1
       }, 150);
     }, 150);
     //log("<4.3 && >=0.8")
     soundsMines[proxMine].playOnce()
  }
  else if( distanceProxMine < 7 && distanceProxMine >= 4.3)  
  {
    //Parpadea cada 0.5 segundos
    //Prende
    sunImgScreen2.visible = true
    flagLed = 0
    setTimeout(function(){ 
      //Apaga
      sunImgScreen2.visible = false
      setTimeout(function(){ 
        flagLed = 1
       }, 250);
     }, 250);
     //log("<7 && >=4.3")
     soundsMines[proxMine].playOnce()
  }
  else if( distanceProxMine < 8 && distanceProxMine >= 7)
  {
    //Parpadea cada 0.5 segundos
    //Prende
    sunImgScreen2.visible = true
    flagLed = 0
    setTimeout(function(){ 
      //Apaga
      sunImgScreen2.visible = false
      setTimeout(function(){ 
        flagLed = 1
       }, 400);
     }, 400);
     //log("<8 && >=7")
     soundsMines[proxMine].playOnce()
  }
  else
  {
    //Parpadea cada 1 segundos
    //Prende
    sunImgScreen2.visible = true
    flagLed = 0
    setTimeout(function(){ 
      //Apaga
      sunImgScreen2.visible = false
      setTimeout(function(){ 
        flagLed = 1
       }, 600);
     }, 600);
     //log("else")
  }
}

function flasMine()
{
  if(flagMine == 0) return 1
  var proxMine : number = 0
  let distanceProxMine :number = 9999999
  const camera = Camera.instance
  for(let i = 0; i < transformMines.length; i++)
  {
    var grassTransform = transformMines[i]
    var distanceMine = Math.sqrt( Math.pow(camera.position.x - grassTransform.position.x, 2) +  Math.pow(camera.position.z - grassTransform.position.z, 2) )
    if(distanceProxMine > distanceMine)
    {
      proxMine = i
      distanceProxMine = distanceMine
    }
  }
  //let grassTransform = transformMines[proxMine]
  //let distanceMine = Math.sqrt( Math.pow(camera.position.x - grassTransform.position.x, 2) +  Math.pow(camera.position.z - grassTransform.position.z, 2))
  //log("mineled")
  if( distanceProxMine < 0.5)
  {
    //Explota  
    looseText.visible = true
    flagMine = 0//Se apaga el parpadeo  
    sunImgScreen2.visible = true//se queda encendido el led
    stopGame(1, proxMine)
  }
  else if(distanceProxMine <0.9 && distanceProxMine >= 0.8)
  {
    soundsMines[proxMine].playOnce()
  }
}

function stopGame(cause:number = 0, proxMine:number = null)
{
  if(cause == 1)
  {
    for(let i=0;i<mines.length;i++)
    {
      if(proxMine == i || i % 5 == 0)
      {
        // Create AudioClip object, holding audio file
        let clip2 = new AudioClip('sounds/explosion.mp3')
        // Create AudioSource component, referencing `clip`
        let source2 = new AudioSource(clip2) 
        mines[i].addComponentOrReplace(source2)
        source2.playOnce()
      }
    }
  }
  //Detiene el tiempo
  finalTime = + new Date()
  flagLed = 0
  flagMine = 0
  haveGold = 0

  moveDoor = 0
  //Cierra la puerta
  smallLog.getComponent(Transform).scale = smallLog.getComponent(LerpSizeData).originScale
  smallLog.getComponent(Transform).position = smallLog.getComponent(LerpSizeData).originPosition

  smallLog2.getComponent(Transform).scale = smallLog2.getComponent(LerpSizeData2).originScale
  smallLog2.getComponent(Transform).position = smallLog2.getComponent(LerpSizeData2).originPosition

  smallLog3.getComponent(Transform).scale = smallLog3.getComponent(LerpSizeData3).originScale
  smallLog3.getComponent(Transform).position = smallLog3.getComponent(LerpSizeData3).originPosition
}

//////////////////////////////////////////////////////////////////////////////////////////


const archwayOfNightmares = new Entity('archwayOfNightmares')
engine.addEntity(archwayOfNightmares)
archwayOfNightmares.setParent(_scene)
const transform2 = new Transform({
  position: new Vector3(16.249998092651367, 0.000001996755599975586, 43.3402099609375),
  rotation: new Quaternion(7.263926703790068e-15, -1, 1.1920926823449918e-7, 0),
  scale: new Vector3(1.0000112056732178, 1, 1.0000112056732178)
})
archwayOfNightmares.addComponentOrReplace(transform2)
const gltfShape = new GLTFShape("models/ArchWay_01/ArchWay_01.glb")
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
archwayOfNightmares.addComponentOrReplace(gltfShape)


const invisibleWall3 = new Entity('invisibleWall3')
engine.addEntity(invisibleWall3)
invisibleWall3.setParent(_scene)
const transform9 = new Transform({
  position: new Vector3(23.988922119140625, 2.078564405441284, 4.700443267822266),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(12.571993827819824, 9, 1.25428307056427)
})
invisibleWall3.addComponentOrReplace(transform9)

const archwayOfNightmares2 = new Entity('archwayOfNightmares2')
engine.addEntity(archwayOfNightmares2)
archwayOfNightmares2.setParent(_scene)
archwayOfNightmares2.addComponentOrReplace(gltfShape)
const transform10 = new Transform({
  position: new Vector3(16.249998092651367, 0.0000019073486328125, 4.641134738922119),
  rotation: new Quaternion(7.263926703790068e-15, -1, 1.1920926823449918e-7, 0),
  scale: new Vector3(1.0000112056732178, 1, 1.0000112056732178)
})
archwayOfNightmares2.addComponentOrReplace(transform10)

const beachRock = new Entity('beachRock')
engine.addEntity(beachRock)
beachRock.setParent(_scene)
const transform11 = new Transform({
  position: new Vector3(30.70613670349121, 0, 22.997455596923828),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.3665660321712494, 1, 1.4999998807907104)
})
beachRock.addComponentOrReplace(transform11)
const gltfShape3 = new GLTFShape("models/RockBig_07/RockBig_07.glb")
gltfShape3.withCollisions = true
gltfShape3.isPointerBlocker = true
gltfShape3.visible = true
beachRock.addComponentOrReplace(gltfShape3)

const beachRock2 = new Entity('beachRock2')
engine.addEntity(beachRock2)
beachRock2.setParent(_scene)
const transform12 = new Transform({
  position: new Vector3(30.838651657104492, 0, 29),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.33458301424980164, 1.2262892723083496, 1.7909952402114868)
})
beachRock2.addComponentOrReplace(transform12)
const gltfShape4 = new GLTFShape("models/RockBig_06/RockBig_06.glb")
gltfShape4.withCollisions = true
gltfShape4.isPointerBlocker = true
gltfShape4.visible = true
beachRock2.addComponentOrReplace(gltfShape4)

const beachRock3 = new Entity('beachRock3')
engine.addEntity(beachRock3)
beachRock3.setParent(_scene)
const transform13 = new Transform({
  position: new Vector3(30.887081146240234, 0, 17.190624237060547),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.40079623460769653, 1, 0.9999998807907104)
})
beachRock3.addComponentOrReplace(transform13)
const gltfShape5 = new GLTFShape("models/RockBig_04/RockBig_04.glb")
gltfShape5.withCollisions = true
gltfShape5.isPointerBlocker = true
gltfShape5.visible = true
beachRock3.addComponentOrReplace(gltfShape5)

const beachRock4 = new Entity('beachRock4')
engine.addEntity(beachRock4)
beachRock4.setParent(_scene)
const transform14 = new Transform({
  position: new Vector3(30.809659957885742, 0, 31.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.31464406847953796, 1, 0.9999999403953552)
})
beachRock4.addComponentOrReplace(transform14)
const gltfShape6 = new GLTFShape("models/RockBig_01/RockBig_01.glb")
gltfShape6.withCollisions = true
gltfShape6.isPointerBlocker = true
gltfShape6.visible = true
beachRock4.addComponentOrReplace(gltfShape6)

const beachRock5 = new Entity('beachRock5')
engine.addEntity(beachRock5)
beachRock5.setParent(_scene)
const transform15 = new Transform({
  position: new Vector3(30.5, 3.5, 14),
  rotation: new Quaternion(-0.8314695954322815, 3.2861924326063304e-15, 9.911889264913043e-8, 0.5555702447891235),
  scale: new Vector3(0.2991991937160492, 1.5312546491622925, 1.5312546491622925)
})
beachRock5.addComponentOrReplace(transform15)
const gltfShape7 = new GLTFShape("models/RockBig_02/RockBig_02.glb")
gltfShape7.withCollisions = true
gltfShape7.isPointerBlocker = true
gltfShape7.visible = true
beachRock5.addComponentOrReplace(gltfShape7)

const beachRock6 = new Entity('beachRock6')
engine.addEntity(beachRock6)
beachRock6.setParent(_scene)
const transform16 = new Transform({
  position: new Vector3(30.8670711517334, 0, 38.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.3138473927974701, 1, 1.8450793027877808)
})
beachRock6.addComponentOrReplace(transform16)
beachRock6.addComponentOrReplace(gltfShape7)

const beachRock7 = new Entity('beachRock7')
engine.addEntity(beachRock7)
beachRock7.setParent(_scene)
beachRock7.addComponentOrReplace(gltfShape7)
const transform17 = new Transform({
  position: new Vector3(1.5371062755584717, 0, 38.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.3138473927974701, 1, 1.8450793027877808)
})
beachRock7.addComponentOrReplace(transform17)

const beachRock8 = new Entity('beachRock8')
engine.addEntity(beachRock8)
beachRock8.setParent(_scene)
beachRock8.addComponentOrReplace(gltfShape6)
const transform18 = new Transform({
  position: new Vector3(1.4796950817108154, 0, 31.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.43461623787879944, 1, 0.9999999403953552)
})
beachRock8.addComponentOrReplace(transform18)

const beachRock9 = new Entity('beachRock9')
engine.addEntity(beachRock9)
beachRock9.setParent(_scene)
beachRock9.addComponentOrReplace(gltfShape4)
const transform19 = new Transform({
  position: new Vector3(1.5086867809295654, 0, 29),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.33458301424980164, 1.3836231231689453, 1.7909952402114868)
})
beachRock9.addComponentOrReplace(transform19)

const beachRock10 = new Entity('beachRock10')
engine.addEntity(beachRock10)
beachRock10.setParent(_scene)
beachRock10.addComponentOrReplace(gltfShape3)
const transform20 = new Transform({
  position: new Vector3(1.3761718273162842, 0, 22.997455596923828),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.3665660321712494, 1, 1.4999998807907104)
})
beachRock10.addComponentOrReplace(transform20)

const beachRock11 = new Entity('beachRock11')
engine.addEntity(beachRock11)
beachRock11.setParent(_scene)
beachRock11.addComponentOrReplace(gltfShape5)
const transform21 = new Transform({
  position: new Vector3(1.5571162700653076, 0, 17.190624237060547),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.40079623460769653, 1, 0.9999998807907104)
})
beachRock11.addComponentOrReplace(transform21)

const beachRock12 = new Entity('beachRock12')
engine.addEntity(beachRock12)
beachRock12.setParent(_scene)
beachRock12.addComponentOrReplace(gltfShape7)
const transform22 = new Transform({
  position: new Vector3(1.1700352430343628, 3.5, 14),
  rotation: new Quaternion(-0.8314695954322815, 3.2861924326063304e-15, 9.911889264913043e-8, 0.5555702447891235),
  scale: new Vector3(0.2991991937160492, 1.5312527418136597, 1.5312527418136597)
})
beachRock12.addComponentOrReplace(transform22)

const jungleFern = new Entity('jungleFern')
engine.addEntity(jungleFern)
jungleFern.setParent(_scene)
const transform23 = new Transform({
  position: new Vector3(30.406700134277344, 2.6322696208953857, 30.424724578857422),
  rotation: new Quaternion(-0.1300995796918869, -0.2877538800239563, 0.6676415205001831, 0.6741859316825867),
  scale: new Vector3(1.0000243186950684, 1.000017762184143, 1.0000020265579224)
})
jungleFern.addComponentOrReplace(transform23)
const gltfShape8 = new GLTFShape("models/JunglePlant_01/JunglePlant_01.glb")
gltfShape8.withCollisions = true
gltfShape8.isPointerBlocker = true
gltfShape8.visible = true
jungleFern.addComponentOrReplace(gltfShape8)

const bentPalmTree = new Entity('bentPalmTree')
engine.addEntity(bentPalmTree)
bentPalmTree.setParent(_scene)
const transform24 = new Transform({
  position: new Vector3(2.181615114212036, 2.931337356567383, 22.83397674560547),
  rotation: new Quaternion(0.18577559292316437, 0.9526169300079346, -0.046101149171590805, 0.23639608919620514),
  scale: new Vector3(1.0000059604644775, 0.9999973177909851, 1.0000059604644775)
})
bentPalmTree.addComponentOrReplace(transform24)
const gltfShape9 = new GLTFShape("models/PalmTree_01/PalmTree_01.glb")
gltfShape9.withCollisions = true
gltfShape9.isPointerBlocker = true
gltfShape9.visible = true
bentPalmTree.addComponentOrReplace(gltfShape9)

const musaAcuminata = new Entity('musaAcuminata')
engine.addEntity(musaAcuminata)
musaAcuminata.setParent(_scene)
const transform25 = new Transform({
  position: new Vector3(14.106797218322754, 0, 24.70170021057129),
  rotation: new Quaternion(-1.2059229245883155e-15, -0.2834801971912384, 3.3793472908882904e-8, 0.9589781165122986),
  scale: new Vector3(1, 1, 1)
})
musaAcuminata.addComponentOrReplace(transform25)
const gltfShape10 = new GLTFShape("models/JunglePlant_04/JunglePlant_04.glb")
gltfShape10.withCollisions = true
gltfShape10.isPointerBlocker = true
gltfShape10.visible = true
musaAcuminata.addComponentOrReplace(gltfShape10)

const beachgrassFern = new Entity('beachgrassFern')
engine.addEntity(beachgrassFern)
beachgrassFern.setParent(_scene)
const transform26 = new Transform({
  position: new Vector3(2.119762659072876, 0.16640901565551758, 32.76369857788086),
  rotation: new Quaternion(-0.020653212442994118, -0.5385450720787048, -0.39790984988212585, 0.7424355149269104),
  scale: new Vector3(2.0000104904174805, 1.9999985694885254, 2.0000085830688477)
})
beachgrassFern.addComponentOrReplace(transform26)
const gltfShape11 = new GLTFShape("models/JunglePlant_06/JunglePlant_06.glb")
gltfShape11.withCollisions = true
gltfShape11.isPointerBlocker = true
gltfShape11.visible = true
beachgrassFern.addComponentOrReplace(gltfShape11)

const birdOfParadise = new Entity('birdOfParadise')
engine.addEntity(birdOfParadise)
birdOfParadise.setParent(_scene)
const transform27 = new Transform({
  position: new Vector3(23, 0, 32.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(3.75, 3.75, 3.75)
})
birdOfParadise.addComponentOrReplace(transform27)
const gltfShape12 = new GLTFShape("models/JunglePlant_05/JunglePlant_05.glb")
gltfShape12.withCollisions = true
gltfShape12.isPointerBlocker = true
gltfShape12.visible = true
birdOfParadise.addComponentOrReplace(gltfShape12)

const beachgrassFern2 = new Entity('beachgrassFern2')
engine.addEntity(beachgrassFern2)
beachgrassFern2.setParent(_scene)
const transform28 = new Transform({
  position: new Vector3(20.272327423095703, 0, 19.0546817779541),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.5709724426269531, 1.5709724426269531, 1.5709724426269531)
})
beachgrassFern2.addComponentOrReplace(transform28)
beachgrassFern2.addComponentOrReplace(gltfShape11)

const plumeria = new Entity('plumeria')
engine.addEntity(plumeria)
plumeria.setParent(_scene)
const transform29 = new Transform({
  position: new Vector3(10.5, 0, 35),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.0199999809265137, 1, 0.9999998211860657)
})
plumeria.addComponentOrReplace(transform29)
const gltfShape13 = new GLTFShape("models/JunglePlant_08/JunglePlant_08.glb")
gltfShape13.withCollisions = true
gltfShape13.isPointerBlocker = true
gltfShape13.visible = true
plumeria.addComponentOrReplace(gltfShape13)

const musaAcuminata2 = new Entity('musaAcuminata2')
engine.addEntity(musaAcuminata2)
musaAcuminata2.setParent(_scene)
const transform30 = new Transform({
  position: new Vector3(9.622838020324707, 0, 9.030513763427734),
  rotation: new Quaternion(2.5573870735803644e-15, -0.7295803427696228, 8.697274722635484e-8, -0.6838951706886292),
  scale: new Vector3(1.0000029802322388, 1, 1.0000029802322388)
})
musaAcuminata2.addComponentOrReplace(transform30)
musaAcuminata2.addComponentOrReplace(gltfShape10)

const monsteraDeliciosa = new Entity('monsteraDeliciosa')
engine.addEntity(monsteraDeliciosa)
monsteraDeliciosa.setParent(_scene)
const transform31 = new Transform({
  position: new Vector3(26.5, 0, 37),
  rotation: new Quaternion(-4.261451609696151e-16, -0.5655549168586731, 6.741939273524622e-8, 0.8247106671333313),
  scale: new Vector3(1, 1, 1)
})
monsteraDeliciosa.addComponentOrReplace(transform31)
const gltfShape14 = new GLTFShape("models/JunglePlant_03/JunglePlant_03.glb")
gltfShape14.withCollisions = true
gltfShape14.isPointerBlocker = true
gltfShape14.visible = true
monsteraDeliciosa.addComponentOrReplace(gltfShape14)

const musaAcuminata3 = new Entity('musaAcuminata3')
engine.addEntity(musaAcuminata3)
musaAcuminata3.setParent(_scene)
musaAcuminata3.addComponentOrReplace(gltfShape10)
const transform32 = new Transform({
  position: new Vector3(23.87055778503418, 0, 12.121696472167969),
  rotation: new Quaternion(-1.5555474202705527e-15, -0.9601854681968689, 1.1446301328987829e-7, 0.2793634533882141),
  scale: new Vector3(1.5000048875808716, 1.5, 1.5000048875808716)
})
musaAcuminata3.addComponentOrReplace(transform32)

const bamboo = new Entity('bamboo')
engine.addEntity(bamboo)
bamboo.setParent(_scene)
const transform33 = new Transform({
  position: new Vector3(8, 0, 25.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bamboo.addComponentOrReplace(transform33)
const gltfShape15 = new GLTFShape("models/Bamboo_01/Bamboo_01.glb")
gltfShape15.withCollisions = true
gltfShape15.isPointerBlocker = true
gltfShape15.visible = true
bamboo.addComponentOrReplace(gltfShape15)

const bamboo2 = new Entity('bamboo2')
engine.addEntity(bamboo2)
bamboo2.setParent(_scene)
const transform34 = new Transform({
  position: new Vector3(8.5, 0, 24.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bamboo2.addComponentOrReplace(transform34)
bamboo2.addComponentOrReplace(gltfShape15)

const bamboo3 = new Entity('bamboo3')
engine.addEntity(bamboo3)
bamboo3.setParent(_scene)
bamboo3.addComponentOrReplace(gltfShape15)
const transform35 = new Transform({
  position: new Vector3(8.5, 0, 28.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bamboo3.addComponentOrReplace(transform35)

const bamboo4 = new Entity('bamboo4')
engine.addEntity(bamboo4)
bamboo4.setParent(_scene)
bamboo4.addComponentOrReplace(gltfShape15)
const transform36 = new Transform({
  position: new Vector3(8, 0, 27.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bamboo4.addComponentOrReplace(transform36)

const bamboo5 = new Entity('bamboo5')
engine.addEntity(bamboo5)
bamboo5.setParent(_scene)
bamboo5.addComponentOrReplace(gltfShape15)
const transform37 = new Transform({
  position: new Vector3(7.5, 0, 26.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bamboo5.addComponentOrReplace(transform37)

const sticksLargeFence = new Entity('sticksLargeFence')
engine.addEntity(sticksLargeFence)
sticksLargeFence.setParent(_scene)
const transform38 = new Transform({
  position: new Vector3(30.062461853027344, 0, 43.27724075317383),
  rotation: new Quaternion(-4.4183853743008953e-16, -0.7071068286895752, 8.429368136830817e-8, -0.7071068286895752),
  scale: new Vector3(1.000011920928955, 1.5, 2.448672294616699)
})
sticksLargeFence.addComponentOrReplace(transform38)
const gltfShape16 = new GLTFShape("models/FenceSticksLarge_01/FenceSticksLarge_01.glb")
gltfShape16.withCollisions = true
gltfShape16.isPointerBlocker = true
gltfShape16.visible = true
sticksLargeFence.addComponentOrReplace(gltfShape16)

const sticksLargeFence2 = new Entity('sticksLargeFence2')
engine.addEntity(sticksLargeFence2)
sticksLargeFence2.setParent(_scene)
sticksLargeFence2.addComponentOrReplace(gltfShape16)
const transform39 = new Transform({
  position: new Vector3(2.2786874771118164, 0, 43.27724075317383),
  rotation: new Quaternion(-1.887858562510912e-14, -0.7071068286895752, 8.429368847373553e-8, 0.7071068286895752),
  scale: new Vector3(1.0000197887420654, 1.5, 2.44868803024292)
})
sticksLargeFence2.addComponentOrReplace(transform39)

const sticksLargeFence3 = new Entity('sticksLargeFence3')
engine.addEntity(sticksLargeFence3)
sticksLargeFence3.setParent(_scene)
sticksLargeFence3.addComponentOrReplace(gltfShape16)
const transform40 = new Transform({
  position: new Vector3(2.2786874771118164, 0, 4.739563465118408),
  rotation: new Quaternion(-1.887858562510912e-14, -0.7071068286895752, 8.429368847373553e-8, 0.7071068286895752),
  scale: new Vector3(1.000025749206543, 1.5, 2.448699951171875)
})
sticksLargeFence3.addComponentOrReplace(transform40)

const sticksLargeFence4 = new Entity('sticksLargeFence4')
engine.addEntity(sticksLargeFence4)
sticksLargeFence4.setParent(_scene)
sticksLargeFence4.addComponentOrReplace(gltfShape16)
const transform41 = new Transform({
  position: new Vector3(30.062461853027344, 0, 4.739563465118408),
  rotation: new Quaternion(-4.4183853743008953e-16, -0.7071068286895752, 8.429368136830817e-8, -0.7071068286895752),
  scale: new Vector3(1.0000178813934326, 1.5, 2.4486842155456543)
})
sticksLargeFence4.addComponentOrReplace(transform41)

const invisibleWall4 = new Entity('invisibleWall4')
engine.addEntity(invisibleWall4)
invisibleWall4.setParent(_scene)
const transform42 = new Transform({
  position: new Vector3(8.448509216308594, 2.0795280933380127, 4.72955322265625),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(12.571993827819824, 9, 1.2567554712295532)
})
invisibleWall4.addComponentOrReplace(transform42)

const caribbeanShoreWithRocksPatch = new Entity('caribbeanShoreWithRocksPatch')
engine.addEntity(caribbeanShoreWithRocksPatch)
caribbeanShoreWithRocksPatch.setParent(_scene)
const transform43 = new Transform({
  position: new Vector3(11.0092191696167, 0.025069236755371094, 26.30135154724121),
  rotation: new Quaternion(-9.971355499581165e-16, -0.5993155837059021, 7.1443977844865e-8, 0.8005129098892212),
  scale: new Vector3(0.41758933663368225, 0.4175882339477539, 0.41758933663368225)
})
caribbeanShoreWithRocksPatch.addComponentOrReplace(transform43)
const gltfShape17 = new GLTFShape("models/WaterPatchCurve_02/WaterPatchCurve_02.glb")
gltfShape17.withCollisions = true
gltfShape17.isPointerBlocker = true
gltfShape17.visible = true
caribbeanShoreWithRocksPatch.addComponentOrReplace(gltfShape17)

const caribbeanWater = new Entity('caribbeanWater')
engine.addEntity(caribbeanWater)
caribbeanWater.setParent(_scene)
const transform44 = new Transform({
  position: new Vector3(30.516477584838867, 3.3260409832000732, 27.420557022094727),
  rotation: new Quaternion(0.01874825730919838, 0.030052587389945984, 0.5289639830589294, 0.8479047417640686),
  scale: new Vector3(0.2680557072162628, 0.26805561780929565, 0.2680554687976837)
})
caribbeanWater.addComponentOrReplace(transform44)
const gltfShape18 = new GLTFShape("models/WaterPatchFull_01/WaterPatchFull_01.glb")
gltfShape18.withCollisions = true
gltfShape18.isPointerBlocker = true
gltfShape18.visible = true
caribbeanWater.addComponentOrReplace(gltfShape18)

const caribbeanWater2 = new Entity('caribbeanWater2')
engine.addEntity(caribbeanWater2)
caribbeanWater2.setParent(_scene)
caribbeanWater2.addComponentOrReplace(gltfShape18)
const transform45 = new Transform({
  position: new Vector3(30.650320053100586, 4.109255790710449, 27.5),
  rotation: new Quaternion(0, 0, 0.6160597205162048, 0.7876995205879211),
  scale: new Vector3(0.26805633306503296, 0.26805633306503296, 0.2680554687976837)
})
caribbeanWater2.addComponentOrReplace(transform45)

const caribbeanWater3 = new Entity('caribbeanWater3')
engine.addEntity(caribbeanWater3)
caribbeanWater3.setParent(_scene)
caribbeanWater3.addComponentOrReplace(gltfShape18)
const transform46 = new Transform({
  position: new Vector3(30.332416534423828, 2.752516269683838, 27.351953506469727),
  rotation: new Quaternion(0, 0, 0.5863973498344421, 0.8100236058235168),
  scale: new Vector3(0.26805856823921204, 0.26805856823921204, 0.2680554687976837)
})
caribbeanWater3.addComponentOrReplace(transform46)

const caribbeanWater4 = new Entity('caribbeanWater4')
engine.addEntity(caribbeanWater4)
caribbeanWater4.setParent(_scene)
caribbeanWater4.addComponentOrReplace(gltfShape18)
const transform47 = new Transform({
  position: new Vector3(30.13623809814453, 2.133298397064209, 27.315004348754883),
  rotation: new Quaternion(0, 0, 0.5207972526550293, 0.853680431842804),
  scale: new Vector3(0.2680554687976837, 0.2680554687976837, 0.2680554687976837)
})
caribbeanWater4.addComponentOrReplace(transform47)

const caribbeanWater5 = new Entity('caribbeanWater5')
engine.addEntity(caribbeanWater5)
caribbeanWater5.setParent(_scene)
caribbeanWater5.addComponentOrReplace(gltfShape18)
const transform48 = new Transform({
  position: new Vector3(30.13623809814453, 0.9817638397216797, 27.315004348754883),
  rotation: new Quaternion(0, 0, 0.25056153535842896, 0.9681007266044617),
  scale: new Vector3(0.2680554687976837, 0.2680554687976837, 0.2680554687976837)
})
caribbeanWater5.addComponentOrReplace(transform48)

const caribbeanWater6 = new Entity('caribbeanWater6')
engine.addEntity(caribbeanWater6)
caribbeanWater6.setParent(_scene)
caribbeanWater6.addComponentOrReplace(gltfShape18)
const transform49 = new Transform({
  position: new Vector3(30.12211036682129, 0.7412760853767395, 27.433507919311523),
  rotation: new Quaternion(0.566983163356781, 0.2037019580602646, 0.26505246758461, 0.7528497576713562),
  scale: new Vector3(0.2549564838409424, 0.4634528160095215, 0.07091651856899261)
})
caribbeanWater6.addComponentOrReplace(transform49)

const caribbeanWater7 = new Entity('caribbeanWater7')
engine.addEntity(caribbeanWater7)
caribbeanWater7.setParent(_scene)
caribbeanWater7.addComponentOrReplace(gltfShape18)
const transform50 = new Transform({
  position: new Vector3(30.614992141723633, 1.8672313690185547, 27.467588424682617),
  rotation: new Quaternion(0.48841774463653564, 0.3527216613292694, 0.46313542127609253, 0.6500316858291626),
  scale: new Vector3(0.25495681166648865, 0.46345651149749756, 0.0709170252084732)
})
caribbeanWater7.addComponentOrReplace(transform50)

const caribbeanWater8 = new Entity('caribbeanWater8')
engine.addEntity(caribbeanWater8)
caribbeanWater8.setParent(_scene)
caribbeanWater8.addComponentOrReplace(gltfShape18)
const transform51 = new Transform({
  position: new Vector3(31.196542739868164, 4.112514495849609, 27.5),
  rotation: new Quaternion(0, 0, 0.01123377587646246, 0.9999369382858276),
  scale: new Vector3(0.07628103345632553, 0.21796560287475586, 0.21803556382656097)
})
caribbeanWater8.addComponentOrReplace(transform51)

const caribbeanWater9 = new Entity('caribbeanWater9')
engine.addEntity(caribbeanWater9)
caribbeanWater9.setParent(_scene)
const transform52 = new Transform({
  position: new Vector3(30.234390258789062, 1.3334721326828003, 25.20022964477539),
  rotation: new Quaternion(-0.6831459999084473, -0.2232557237148285, 0.21599239110946655, 0.6609204411506653),
  scale: new Vector3(0.3326980471611023, 0.38670265674591064, 0.09861232340335846)
})
caribbeanWater9.addComponentOrReplace(transform52)
caribbeanWater9.addComponentOrReplace(gltfShape18)

const caribbeanWater10 = new Entity('caribbeanWater10')
engine.addEntity(caribbeanWater10)
caribbeanWater10.setParent(_scene)
caribbeanWater10.addComponentOrReplace(gltfShape18)
const transform53 = new Transform({
  position: new Vector3(29.971675872802734, 1.9615637063980103, 25.20022964477539),
  rotation: new Quaternion(-0.6037952899932861, -0.3898240327835083, 0.377141535282135, 0.5841513276100159),
  scale: new Vector3(0.33269813656806946, 0.38670286536216736, 0.09861250221729279)
})
caribbeanWater10.addComponentOrReplace(transform53)

const caribbeanWater11 = new Entity('caribbeanWater11')
engine.addEntity(caribbeanWater11)
caribbeanWater11.setParent(_scene)
caribbeanWater11.addComponentOrReplace(gltfShape18)
const transform54 = new Transform({
  position: new Vector3(30.531763076782227, 3.9851741790771484, 25.318580627441406),
  rotation: new Quaternion(-0.6037952899932861, -0.3898240327835083, 0.377141535282135, 0.5841513276100159),
  scale: new Vector3(0.33269813656806946, 0.38670286536216736, 0.09861327707767487)
})
caribbeanWater11.addComponentOrReplace(transform54)

const mediumSandDune = new Entity('mediumSandDune')
engine.addEntity(mediumSandDune)
mediumSandDune.setParent(_scene)
const transform55 = new Transform({
  position: new Vector3(29.51188850402832, 0, 28.115997314453125),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
mediumSandDune.addComponentOrReplace(transform55)
const gltfShape19 = new GLTFShape("models/SandPatchMedium_01/SandPatchMedium_01.glb")
gltfShape19.withCollisions = true
gltfShape19.isPointerBlocker = true
gltfShape19.visible = true
mediumSandDune.addComponentOrReplace(gltfShape19)

const mediumSandDune2 = new Entity('mediumSandDune2')
engine.addEntity(mediumSandDune2)
mediumSandDune2.setParent(_scene)
const transform56 = new Transform({
  position: new Vector3(28.574535369873047, 0, 24.50920295715332),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
mediumSandDune2.addComponentOrReplace(transform56)
mediumSandDune2.addComponentOrReplace(gltfShape19)

const caribbeanWaterWithSideRocks = new Entity('caribbeanWaterWithSideRocks')
engine.addEntity(caribbeanWaterWithSideRocks)
caribbeanWaterWithSideRocks.setParent(_scene)
const transform57 = new Transform({
  position: new Vector3(28.400325775146484, 0.03360271453857422, 27.573810577392578),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.31313133239746094, 0.31313133239746094, 0.31313133239746094)
})
caribbeanWaterWithSideRocks.addComponentOrReplace(transform57)
const gltfShape20 = new GLTFShape("models/WaterPatchSide_01/WaterPatchSide_01.glb")
gltfShape20.withCollisions = true
gltfShape20.isPointerBlocker = true
gltfShape20.visible = true
caribbeanWaterWithSideRocks.addComponentOrReplace(gltfShape20)

const caribbeanWaterWithSideRocks2 = new Entity('caribbeanWaterWithSideRocks2')
engine.addEntity(caribbeanWaterWithSideRocks2)
caribbeanWaterWithSideRocks2.setParent(_scene)
caribbeanWaterWithSideRocks2.addComponentOrReplace(gltfShape20)
const transform58 = new Transform({
  position: new Vector3(25.91260528564453, 0.03360271453857422, 27.573810577392578),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.31313133239746094, 0.31313133239746094, 0.31313133239746094)
})
caribbeanWaterWithSideRocks2.addComponentOrReplace(transform58)

const caribbeanWaterWithSideRocks3 = new Entity('caribbeanWaterWithSideRocks3')
engine.addEntity(caribbeanWaterWithSideRocks3)
caribbeanWaterWithSideRocks3.setParent(_scene)
caribbeanWaterWithSideRocks3.addComponentOrReplace(gltfShape20)
const transform59 = new Transform({
  position: new Vector3(23.417888641357422, 0.03360271453857422, 27.573810577392578),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.31313133239746094, 0.31313133239746094, 0.31313133239746094)
})
caribbeanWaterWithSideRocks3.addComponentOrReplace(transform59)

const caribbeanWaterWithSideRocks4 = new Entity('caribbeanWaterWithSideRocks4')
engine.addEntity(caribbeanWaterWithSideRocks4)
caribbeanWaterWithSideRocks4.setParent(_scene)
caribbeanWaterWithSideRocks4.addComponentOrReplace(gltfShape20)
const transform60 = new Transform({
  position: new Vector3(20.96040916442871, 0.03360271453857422, 27.573810577392578),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.31313133239746094, 0.31313133239746094, 0.31313133239746094)
})
caribbeanWaterWithSideRocks4.addComponentOrReplace(transform60)

const caribbeanWaterWithSideRocks6 = new Entity('caribbeanWaterWithSideRocks6')
engine.addEntity(caribbeanWaterWithSideRocks6)
caribbeanWaterWithSideRocks6.setParent(_scene)
caribbeanWaterWithSideRocks6.addComponentOrReplace(gltfShape20)
const transform61 = new Transform({
  position: new Vector3(18.50408363342285, 0.03360271453857422, 27.573810577392578),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.31313133239746094, 0.31313133239746094, 0.31313133239746094)
})
caribbeanWaterWithSideRocks6.addComponentOrReplace(transform61)

const caribbeanWaterWithSideRocks7 = new Entity('caribbeanWaterWithSideRocks7')
engine.addEntity(caribbeanWaterWithSideRocks7)
caribbeanWaterWithSideRocks7.setParent(_scene)
caribbeanWaterWithSideRocks7.addComponentOrReplace(gltfShape20)
const transform62 = new Transform({
  position: new Vector3(16.02275276184082, 0.03360271453857422, 27.573810577392578),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.31313133239746094, 0.31313133239746094, 0.31313133239746094)
})
caribbeanWaterWithSideRocks7.addComponentOrReplace(transform62)

const caribbeanWaterWithSideRocks8 = new Entity('caribbeanWaterWithSideRocks8')
engine.addEntity(caribbeanWaterWithSideRocks8)
caribbeanWaterWithSideRocks8.setParent(_scene)
caribbeanWaterWithSideRocks8.addComponentOrReplace(gltfShape20)
const transform63 = new Transform({
  position: new Vector3(13.522754669189453, 0.03360271453857422, 25.573810577392578),
  rotation: new Quaternion(4.783441116216211e-15, -1, 1.1920928244535389e-7, 0),
  scale: new Vector3(0.31313133239746094, 0.31313133239746094, 0.31313133239746094)
})
caribbeanWaterWithSideRocks8.addComponentOrReplace(transform63)

const caribbeanWaterWithSideRocks9 = new Entity('caribbeanWaterWithSideRocks9')
engine.addEntity(caribbeanWaterWithSideRocks9)
caribbeanWaterWithSideRocks9.setParent(_scene)
caribbeanWaterWithSideRocks9.addComponentOrReplace(gltfShape20)
const transform64 = new Transform({
  position: new Vector3(18.505191802978516, 0.03360271453857422, 25.573810577392578),
  rotation: new Quaternion(4.783441116216211e-15, -1, 1.1920928244535389e-7, 0),
  scale: new Vector3(0.31313133239746094, 0.31313133239746094, 0.31313133239746094)
})
caribbeanWaterWithSideRocks9.addComponentOrReplace(transform64)

const caribbeanWaterWithSideRocks10 = new Entity('caribbeanWaterWithSideRocks10')
engine.addEntity(caribbeanWaterWithSideRocks10)
caribbeanWaterWithSideRocks10.setParent(_scene)
caribbeanWaterWithSideRocks10.addComponentOrReplace(gltfShape20)
const transform65 = new Transform({
  position: new Vector3(16.010475158691406, 0.03360271453857422, 25.573810577392578),
  rotation: new Quaternion(4.783441116216211e-15, -1, 1.1920928244535389e-7, 0),
  scale: new Vector3(0.31313133239746094, 0.31313133239746094, 0.31313133239746094)
})
caribbeanWaterWithSideRocks10.addComponentOrReplace(transform65)

const caribbeanWaterWithSideRocks11 = new Entity('caribbeanWaterWithSideRocks11')
engine.addEntity(caribbeanWaterWithSideRocks11)
caribbeanWaterWithSideRocks11.setParent(_scene)
caribbeanWaterWithSideRocks11.addComponentOrReplace(gltfShape20)
const transform66 = new Transform({
  position: new Vector3(20.962671279907227, 0.03360271453857422, 25.573810577392578),
  rotation: new Quaternion(4.783441116216211e-15, -1, 1.1920928244535389e-7, 0),
  scale: new Vector3(0.31313133239746094, 0.31313133239746094, 0.31313133239746094)
})
caribbeanWaterWithSideRocks11.addComponentOrReplace(transform66)

const caribbeanWaterWithSideRocks12 = new Entity('caribbeanWaterWithSideRocks12')
engine.addEntity(caribbeanWaterWithSideRocks12)
caribbeanWaterWithSideRocks12.setParent(_scene)
caribbeanWaterWithSideRocks12.addComponentOrReplace(gltfShape20)
const transform67 = new Transform({
  position: new Vector3(23.418996810913086, 0.03360271453857422, 25.573810577392578),
  rotation: new Quaternion(4.783441116216211e-15, -1, 1.1920928244535389e-7, 0),
  scale: new Vector3(0.31313133239746094, 0.31313133239746094, 0.31313133239746094)
})
caribbeanWaterWithSideRocks12.addComponentOrReplace(transform67)

const caribbeanWaterWithSideRocks13 = new Entity('caribbeanWaterWithSideRocks13')
engine.addEntity(caribbeanWaterWithSideRocks13)
caribbeanWaterWithSideRocks13.setParent(_scene)
caribbeanWaterWithSideRocks13.addComponentOrReplace(gltfShape20)
const transform68 = new Transform({
  position: new Vector3(25.900327682495117, 0.03360271453857422, 25.573810577392578),
  rotation: new Quaternion(4.783441116216211e-15, -1, 1.1920928244535389e-7, 0),
  scale: new Vector3(0.31313133239746094, 0.31313133239746094, 0.31313133239746094)
})
caribbeanWaterWithSideRocks13.addComponentOrReplace(transform68)

const caribbeanShoreWithRocksPatch2 = new Entity('caribbeanShoreWithRocksPatch2')
engine.addEntity(caribbeanShoreWithRocksPatch2)
caribbeanShoreWithRocksPatch2.setParent(_scene)
caribbeanShoreWithRocksPatch2.addComponentOrReplace(gltfShape17)
const transform69 = new Transform({
  position: new Vector3(11.003283500671387, 0.025069236755371094, 26.97382926940918),
  rotation: new Quaternion(-5.825589796936434e-15, -0.9938190579414368, 1.1847244962837067e-7, -0.11101216822862625),
  scale: new Vector3(0.41758882999420166, 0.4175882339477539, 0.41758882999420166)
})
caribbeanShoreWithRocksPatch2.addComponentOrReplace(transform69)

const caribbeanShoreWithRocksPatch3 = new Entity('caribbeanShoreWithRocksPatch3')
engine.addEntity(caribbeanShoreWithRocksPatch3)
caribbeanShoreWithRocksPatch3.setParent(_scene)
caribbeanShoreWithRocksPatch3.addComponentOrReplace(gltfShape17)
const transform70 = new Transform({
  position: new Vector3(11.003283500671387, 0.025069236755371094, 26.97382926940918),
  rotation: new Quaternion(3.045348990208174e-15, -0.637574315071106, 7.600476692459779e-8, -0.7703889012336731),
  scale: new Vector3(0.41758912801742554, 0.4175882339477539, 0.41758912801742554)
})
caribbeanShoreWithRocksPatch3.addComponentOrReplace(transform70)

const caribbeanShoreWithRocksPatch4 = new Entity('caribbeanShoreWithRocksPatch4')
engine.addEntity(caribbeanShoreWithRocksPatch4)
caribbeanShoreWithRocksPatch4.setParent(_scene)
caribbeanShoreWithRocksPatch4.addComponentOrReplace(gltfShape17)
const transform71 = new Transform({
  position: new Vector3(11.0092191696167, 0.025069236755371094, 26.30135154724121),
  rotation: new Quaternion(-4.548486458625604e-15, 0.13538989424705505, -1.613972600011948e-8, 0.990792453289032),
  scale: new Vector3(0.41758987307548523, 0.4175882339477539, 0.41758987307548523)
})
caribbeanShoreWithRocksPatch4.addComponentOrReplace(transform71)

const caribbeanWater12 = new Entity('caribbeanWater12')
engine.addEntity(caribbeanWater12)
caribbeanWater12.setParent(_scene)
const transform72 = new Transform({
  position: new Vector3(13.906244277954102, 0.017602920532226562, 27.623432159423828),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.577529788017273, 0.32883644104003906, 0.25946199893951416)
})
caribbeanWater12.addComponentOrReplace(transform72)
caribbeanWater12.addComponentOrReplace(gltfShape18)

const tallPalmTree = new Entity('tallPalmTree')
engine.addEntity(tallPalmTree)
tallPalmTree.setParent(_scene)
const transform73 = new Transform({
  position: new Vector3(29, 0, 23),
  rotation: new Quaternion(0, 0, 0.06464880704879761, 0.9979081153869629),
  scale: new Vector3(0.9999997019767761, 0.9999997019767761, 1)
})
tallPalmTree.addComponentOrReplace(transform73)
const gltfShape21 = new GLTFShape("models/PalmTree_02/PalmTree_02.glb")
gltfShape21.withCollisions = true
gltfShape21.isPointerBlocker = true
gltfShape21.visible = true
tallPalmTree.addComponentOrReplace(gltfShape21)

const flowerSprouts = new Entity('flowerSprouts')
engine.addEntity(flowerSprouts)
flowerSprouts.setParent(_scene)
const transform74 = new Transform({
  position: new Vector3(13.5, 0, 39.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1.680518388748169, 1)
})
flowerSprouts.addComponentOrReplace(transform74)
const gltfShape22 = new GLTFShape("models/Plant_03/Plant_03.glb")
gltfShape22.withCollisions = true
gltfShape22.isPointerBlocker = true
gltfShape22.visible = true
flowerSprouts.addComponentOrReplace(gltfShape22)

const magentaMushroom = new Entity('magentaMushroom')
engine.addEntity(magentaMushroom)
magentaMushroom.setParent(_scene)
const transform75 = new Transform({
  position: new Vector3(9.565384864807129, 0, 15.060791015625),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(3.20965576171875, 3.20965576171875, 3.20965576171875)
})
magentaMushroom.addComponentOrReplace(transform75)
const gltfShape23 = new GLTFShape("models/Mushroom_01/Mushroom_01.glb")
gltfShape23.withCollisions = true
gltfShape23.isPointerBlocker = true
gltfShape23.visible = true
magentaMushroom.addComponentOrReplace(gltfShape23)

const rose = new Entity('rose')
engine.addEntity(rose)
rose.setParent(_scene)
const transform76 = new Transform({
  position: new Vector3(28.502012252807617, 0, 27.846725463867188),
  rotation: new Quaternion(0, 0, 0.162406787276268, 0.9867239594459534),
  scale: new Vector3(1.7716654539108276, 1.7716654539108276, 1.7716636657714844)
})
rose.addComponentOrReplace(transform76)
const gltfShape24 = new GLTFShape("models/Flower_03/Flower_03.glb")
gltfShape24.withCollisions = true
gltfShape24.isPointerBlocker = true
gltfShape24.visible = true
rose.addComponentOrReplace(gltfShape24)

const invisibleWall5 = new Entity('invisibleWall5')
engine.addEntity(invisibleWall5)
invisibleWall5.setParent(_scene)
const transform77 = new Transform({
  position: new Vector3(1.7278175354003906, 0, 24.14251708984375),
  rotation: new Quaternion(-3.7938632177299714e-17, -0.7041303515434265, 8.393887185320636e-8, 0.710070788860321),
  scale: new Vector3(37.94434356689453, 17.841886520385742, 1.7888730764389038)
})
invisibleWall5.addComponentOrReplace(transform77)

const invisibleWall6 = new Entity('invisibleWall6')
engine.addEntity(invisibleWall6)
invisibleWall6.setParent(_scene)
const transform78 = new Transform({
  position: new Vector3(30.67792320251465, 0, 24.14251708984375),
  rotation: new Quaternion(-3.7938632177299714e-17, -0.7041303515434265, 8.393887185320636e-8, 0.710070788860321),
  scale: new Vector3(37.94361877441406, 17.841886520385742, 1.4177521467208862)
})
invisibleWall6.addComponentOrReplace(transform78)

const flatMediumStone = new Entity('flatMediumStone')
engine.addEntity(flatMediumStone)
flatMediumStone.setParent(_scene)
const transform79 = new Transform({
  position: new Vector3(22, 0, 40.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
flatMediumStone.addComponentOrReplace(transform79)
const gltfShape25 = new GLTFShape("models/RockMedium_03/RockMedium_03.glb")
gltfShape25.withCollisions = true
gltfShape25.isPointerBlocker = true
gltfShape25.visible = true
flatMediumStone.addComponentOrReplace(gltfShape25)

const arecaPalm = new Entity('arecaPalm')
engine.addEntity(arecaPalm)
arecaPalm.setParent(_scene)
const transform80 = new Transform({
  position: new Vector3(30.024707794189453, 1.7619197368621826, 15.334359169006348),
  rotation: new Quaternion(0, 0, 0.42818179726600647, 0.9036926627159119),
  scale: new Vector3(1, 1, 1)
})
arecaPalm.addComponentOrReplace(transform80)
const gltfShape26 = new GLTFShape("models/JunglePlant_09/JunglePlant_09.glb")
gltfShape26.withCollisions = true
gltfShape26.isPointerBlocker = true
gltfShape26.visible = true
arecaPalm.addComponentOrReplace(gltfShape26)

const parrot = new Entity('parrot')
engine.addEntity(parrot)
parrot.setParent(_scene)
const transform81 = new Transform({
  position: new Vector3(13.75268840789795, 0, 25.089208602905273),
  rotation: new Quaternion(0.29109176993370056, -2.218636972163435e-16, -3.470083953516223e-8, 0.9566951394081116),
  scale: new Vector3(1, 1, 1)
})
parrot.addComponentOrReplace(transform81)

const sandWeeds = new Entity('sandWeeds')
engine.addEntity(sandWeeds)
sandWeeds.setParent(_scene)
const transform82 = new Transform({
  position: new Vector3(14, 0, 27.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
sandWeeds.addComponentOrReplace(transform82)
const gltfShape27 = new GLTFShape("models/ShoreGrass_01/ShoreGrass_01.glb")
gltfShape27.withCollisions = true
gltfShape27.isPointerBlocker = true
gltfShape27.visible = true
sandWeeds.addComponentOrReplace(gltfShape27)

const invisibleWall2 = new Entity('invisibleWall2')
engine.addEntity(invisibleWall2)
invisibleWall2.setParent(_scene)
const transform83 = new Transform({
  position: new Vector3(8.448509216308594, 2.0795280933380127, 43.51594161987305),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(12.571993827819824, 9, 1.2567554712295532)
})
invisibleWall2.addComponentOrReplace(transform83)

const invisibleWall7 = new Entity('invisibleWall7')
engine.addEntity(invisibleWall7)
invisibleWall7.setParent(_scene)
const transform84 = new Transform({
  position: new Vector3(23.988922119140625, 2.078564405441284, 43.4868278503418),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(12.571993827819824, 9, 1.25428307056427)
})
invisibleWall7.addComponentOrReplace(transform84)

const greenLightButton = new Entity('greenLightButton')
engine.addEntity(greenLightButton)
greenLightButton.setParent(_scene)
const transform85 = new Transform({
  position: new Vector3(14.486412048339844, 1.0901949405670166, 44.45048141479492),
  rotation: new Quaternion(0, 0, -0.3286009132862091, 0.9444689154624939),
  scale: new Vector3(1.0000004768371582, 1.0000004768371582, 1)
})
greenLightButton.addComponentOrReplace(transform85)

const smallLog = new Entity('smallLog')

///////////////////////////////////////////////////
@Component("lerpData")
export class LerpSizeData {
  originScale: Vector3 = new Vector3(1.388832926750183, 1.0000123977661133, 1)
  targetScale: Vector3 = new Vector3(1.388832926750183, 1.0000123977661133, 1)
  originPosition: Vector3 = new Vector3(16.98699951171875, 2.131305456161499, 43.4439582824707)
  targetPosition: Vector3 = new Vector3(16.98699951171875, 2.131305456161499, 43.4439582824707)
  fraction: number = 0
}
// a system to carry out the movement
export class LerpSize implements ISystem {
  update(dt: number) {
    let transform = smallLog.getComponent(Transform)
    let lerp = smallLog.getComponent(LerpSizeData)
    if (lerp.fraction < 1 && moveDoor == 1) {
      let newScale = Vector3.Lerp(lerp.originScale, lerp.targetScale, lerp.fraction)
      let newPosition = Vector3.Lerp(lerp.originPosition, lerp.targetPosition, lerp.fraction)
      transform.scale.set(newScale.x, newScale.y, newScale.z)
      transform.position.set(newPosition.x, newPosition.y, newPosition.z)
      lerp.fraction += dt / 7
    }

    transform = smallLog2.getComponent(Transform)
    lerp = smallLog2.getComponent(LerpSizeData2)
    if (lerp.fraction < 1 && moveDoor == 1) {
      let newScale = Vector3.Lerp(lerp.originScale, lerp.targetScale, lerp.fraction)
      let newPosition = Vector3.Lerp(lerp.originPosition, lerp.targetPosition, lerp.fraction)
      transform.scale.set(newScale.x, newScale.y, newScale.z)
      transform.position.set(newPosition.x, newPosition.y, newPosition.z)
      lerp.fraction += dt / 7
    }

    transform = smallLog3.getComponent(Transform)
    lerp = smallLog3.getComponent(LerpSizeData3)
    if (lerp.fraction < 1 && moveDoor == 1) {
      let newScale = Vector3.Lerp(lerp.originScale, lerp.targetScale, lerp.fraction)
      let newPosition = Vector3.Lerp(lerp.originPosition, lerp.targetPosition, lerp.fraction)
      transform.scale.set(newScale.x, newScale.y, newScale.z)
      transform.position.set(newPosition.x, newPosition.y, newPosition.z)
      lerp.fraction += dt / 7
    }

    transform = smallLog4.getComponent(Transform)
    lerp = smallLog4.getComponent(LerpSizeData4)
    if (lerp.fraction < 1 && moveDoor2 == 1) {
      let newScale = Vector3.Lerp(lerp.originScale, lerp.targetScale, lerp.fraction)
      let newPosition = Vector3.Lerp(lerp.originPosition, lerp.targetPosition, lerp.fraction)
      transform.scale.set(newScale.x, newScale.y, newScale.z)
      transform.position.set(newPosition.x, newPosition.y, newPosition.z)
      lerp.fraction += dt / 6
    }

    transform = smallLog5.getComponent(Transform)
    lerp = smallLog5.getComponent(LerpSizeData5)
    if (lerp.fraction < 1 && moveDoor2 == 1) {
      let newScale = Vector3.Lerp(lerp.originScale, lerp.targetScale, lerp.fraction)
      let newPosition = Vector3.Lerp(lerp.originPosition, lerp.targetPosition, lerp.fraction)
      transform.scale.set(newScale.x, newScale.y, newScale.z)
      transform.position.set(newPosition.x, newPosition.y, newPosition.z)
      lerp.fraction += dt / 6
    }

    transform = smallLog6.getComponent(Transform)
    lerp = smallLog6.getComponent(LerpSizeData6)
    if (lerp.fraction < 1 && moveDoor2 == 1) {
      let newScale = Vector3.Lerp(lerp.originScale, lerp.targetScale, lerp.fraction)
      let newPosition = Vector3.Lerp(lerp.originPosition, lerp.targetPosition, lerp.fraction)
      transform.scale.set(newScale.x, newScale.y, newScale.z)
      transform.position.set(newPosition.x, newPosition.y, newPosition.z)
      lerp.fraction += dt / 6
    }
  }
}
// Add system to engine
var systemPuertas = new LerpSize()
engine.addSystem(systemPuertas)
smallLog.addComponent(new LerpSizeData())
//////////////////////////////////////////////////////

engine.addEntity(smallLog)
smallLog.setParent(_scene)
const transform86 = new Transform({
  position: new Vector3(16.98699951171875, 2.131305456161499, 43.4439582824707),
  rotation: new Quaternion(0, 0, 0.7071068286895752, 0.7071068286895752),
  scale: new Vector3(1.388832926750183, 1.0000123977661133, 1)
})
smallLog.addComponentOrReplace(transform86)
const gltfShape28 = new GLTFShape("models/Log_Small_01/Log_Small_01.glb")
gltfShape28.withCollisions = true
gltfShape28.isPointerBlocker = true
gltfShape28.visible = true
smallLog.addComponentOrReplace(gltfShape28)

const smallLog2 = new Entity('smallLog2')

///////////////////////////////////////////////////
@Component("lerpData2")
export class LerpSizeData2 {
  originScale: Vector3 = new Vector3(1.3888341188430786, 1.0000135898590088, 1)
  targetScale: Vector3 = new Vector3(1.3888341188430786, 1.0000135898590088, 1)
  originPosition: Vector3 = new Vector3(16.417932510375977, 2.131305456161499, 43.4439582824707)
  targetPosition: Vector3 = new Vector3(16.417932510375977, 2.131305456161499, 43.4439582824707)
  fraction: number = 0
}
smallLog2.addComponent(new LerpSizeData2())
//////////////////////////////////////////////////////


engine.addEntity(smallLog2)
smallLog2.setParent(_scene)
smallLog2.addComponentOrReplace(gltfShape28)
const transform87 = new Transform({
  position: new Vector3(16.417932510375977, 2.131305456161499, 43.4439582824707),
  rotation: new Quaternion(0, 0, 0.7071068286895752, 0.7071068286895752),
  scale: new Vector3(1.3888341188430786, 1.0000135898590088, 1)
})
smallLog2.addComponentOrReplace(transform87)

const smallLog3 = new Entity('smallLog3')

///////////////////////////////////////////////////
@Component("lerpData3")
export class LerpSizeData3 {
  originScale: Vector3 = new Vector3(1.3888365030288696, 1.0000159740447998, 1)
  targetScale: Vector3 = new Vector3(1.3888365030288696, 1.0000159740447998, 1)
  originPosition: Vector3 = new Vector3(15.801841735839844, 2.131305456161499, 43.4439582824707)
  targetPosition: Vector3 = new Vector3(15.801841735839844, 2.131305456161499, 43.4439582824707)
  fraction: number = 0
}
smallLog3.addComponent(new LerpSizeData3())
//////////////////////////////////////////////////////

engine.addEntity(smallLog3)
smallLog3.setParent(_scene)
smallLog3.addComponentOrReplace(gltfShape28)
const transform88 = new Transform({
  position: new Vector3(15.801841735839844, 2.131305456161499, 43.4439582824707),
  rotation: new Quaternion(0, 0, 0.7071068286895752, 0.7071068286895752),
  scale: new Vector3(1.3888365030288696, 1.0000159740447998, 1)
})
smallLog3.addComponentOrReplace(transform88)

const smallLog4 = new Entity('smallLog4')

///////////////////////////////////////////////////
@Component("lerpData4")
export class LerpSizeData4 {
  originScale: Vector3 = new Vector3(1.3888365030288696, 1.0000159740447998, 1)
  targetScale: Vector3 = new Vector3(1.3888365030288696, 1.0000159740447998, 1)
  originPosition: Vector3 = new Vector3(16.98699951171875, 2.131305456161499, 4.43063497543335)
  targetPosition: Vector3 = new Vector3(16.98699951171875, 2.131305456161499, 4.43063497543335)
  fraction: number = 0
}
smallLog4.addComponent(new LerpSizeData4())
//////////////////////////////////////////////////////

engine.addEntity(smallLog4)
smallLog4.setParent(_scene)
smallLog4.addComponentOrReplace(gltfShape28)
const transform89 = new Transform({
  position: new Vector3(16.98699951171875, 2.131305456161499, 4.43063497543335),
  rotation: new Quaternion(0, 0, 0.7071068286895752, 0.7071068286895752),
  scale: new Vector3(1.3888365030288696, 1.0000159740447998, 1)
})
smallLog4.addComponentOrReplace(transform89)

const smallLog5 = new Entity('smallLog5')

///////////////////////////////////////////////////
@Component("lerpData5")
export class LerpSizeData5 {
  originScale: Vector3 = new Vector3(1.3888376951217651, 1.0000171661376953, 1)
  targetScale: Vector3 = new Vector3(1.3888376951217651, 1.0000171661376953, 1)
  originPosition: Vector3 = new Vector3(16.417932510375977, 2.131305456161499, 4.43063497543335)
  targetPosition: Vector3 = new Vector3(16.417932510375977, 2.131305456161499, 4.43063497543335)
  fraction: number = 0
}
smallLog5.addComponent(new LerpSizeData5())
//////////////////////////////////////////////////////

engine.addEntity(smallLog5)
smallLog5.setParent(_scene)
smallLog5.addComponentOrReplace(gltfShape28)
const transform90 = new Transform({
  position: new Vector3(16.417932510375977, 2.131305456161499, 4.43063497543335),
  rotation: new Quaternion(0, 0, 0.7071068286895752, 0.7071068286895752),
  scale: new Vector3(1.3888376951217651, 1.0000171661376953, 1)
})
smallLog5.addComponentOrReplace(transform90)

const smallLog6 = new Entity('smallLog6')

///////////////////////////////////////////////////
@Component("lerpData6")
export class LerpSizeData6 {
  originScale: Vector3 = new Vector3(1.3888400793075562, 1.0000195503234863, 1)
  targetScale: Vector3 = new Vector3(1.3888400793075562, 1.0000195503234863, 1)
  originPosition: Vector3 = new Vector3(15.801841735839844, 2.131305456161499, 4.43063497543335)
  targetPosition: Vector3 = new Vector3(15.801841735839844, 2.131305456161499, 4.43063497543335)
  fraction: number = 0
}
smallLog6.addComponent(new LerpSizeData6())
//////////////////////////////////////////////////////

engine.addEntity(smallLog6)
smallLog6.setParent(_scene)
smallLog6.addComponentOrReplace(gltfShape28)
const transform91 = new Transform({
  position: new Vector3(15.801841735839844, 2.131305456161499, 4.43063497543335),
  rotation: new Quaternion(0, 0, 0.7071068286895752, 0.7071068286895752),
  scale: new Vector3(1.3888400793075562, 1.0000195503234863, 1)
})
smallLog6.addComponentOrReplace(transform91)

const scriptorium = new Entity('scriptorium')
engine.addEntity(scriptorium)
scriptorium.setParent(_scene)
const transform92 = new Transform({
  position: new Vector3(14.499545097351074, 0, 44.46702575683594),
  rotation: new Quaternion(1.2927677303626412e-15, 0.6738516092300415, -8.032936449353656e-8, 0.7388667464256287),
  scale: new Vector3(1.0283163785934448, 1, 1.012158751487732)
})
scriptorium.addComponentOrReplace(transform92)
const gltfShape29 = new GLTFShape("models/PapyrusDesk_01/PapyrusDesk_01.glb")
gltfShape29.withCollisions = true
gltfShape29.isPointerBlocker = true
gltfShape29.visible = true
scriptorium.addComponentOrReplace(gltfShape29)

const greenLightButton2 = new Entity('greenLightButton2')
engine.addEntity(greenLightButton2)
greenLightButton2.setParent(_scene)
const transform93 = new Transform({
  position: new Vector3(17.888935089111328, 1.3943811655044556, 5.122447490692139),
  rotation: new Quaternion(-0.5197373628616333, 0.4794507622718811, 0.5197373032569885, -0.47945085167884827),
  scale: new Vector3(0.9999996423721313, 0.9999996423721313, 1.000000238418579)
})
greenLightButton2.addComponentOrReplace(transform93)

// Create AudioClip object, holding audio file
const clipButton = new AudioClip('sounds/win.mp3')
// Create AudioSource component, referencing `clip`
const sourceButton = new AudioSource(clipButton)
greenLightButton2.addComponent(sourceButton)

const treasureChest = new Entity('treasureChest')
engine.addEntity(treasureChest)
treasureChest.setParent(_scene)
const transform94 = new Transform({
  position: new Vector3(28, 0, 21.5),
  rotation: new Quaternion(-1.5394153601527394e-15, -0.7071068286895752, 8.429369557916289e-8, 0.7071068286895752),
  scale: new Vector3(1.0000040531158447, 1, 1.0000040531158447)
})
treasureChest.addComponentOrReplace(transform94)

const goldBar = new Entity('goldBar')
engine.addEntity(goldBar)
goldBar.setParent(_scene)
const transform95 = new Transform({
  position: new Vector3(27.92440414428711, 0.3500518798828125, 21.76287078857422),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
goldBar.addComponentOrReplace(transform95)
const gltfShape30 = new GLTFShape("models/GoldBar_01/GoldBar_01.glb")
gltfShape30.withCollisions = true
gltfShape30.isPointerBlocker = true
gltfShape30.visible = true
goldBar.addComponentOrReplace(gltfShape30)

const goldBar2 = new Entity('goldBar2')
engine.addEntity(goldBar2)
goldBar2.setParent(_scene)
const transform96 = new Transform({
  position: new Vector3(28.00566864013672, 0.2410430908203125, 21.307758331298828),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
goldBar2.addComponentOrReplace(transform96)
goldBar2.addComponentOrReplace(gltfShape30)

const goldBar3 = new Entity('goldBar3')
engine.addEntity(goldBar3)
goldBar3.setParent(_scene)
goldBar3.addComponentOrReplace(gltfShape30)
const transform97 = new Transform({
  position: new Vector3(28.075597763061523, 0.2410430908203125, 21.476346969604492),
  rotation: new Quaternion(-2.0818430371536622e-17, 0.18569013476371765, -2.213598726541477e-8, 0.9826083779335022),
  scale: new Vector3(1, 1, 1)
})
goldBar3.addComponentOrReplace(transform97)

const goldBar4 = new Entity('goldBar4')
engine.addEntity(goldBar4)
goldBar4.setParent(_scene)
goldBar4.addComponentOrReplace(gltfShape30)
const transform98 = new Transform({
  position: new Vector3(28.075597763061523, 0.2410430908203125, 21.854389190673828),
  rotation: new Quaternion(-2.0818430371536622e-17, 0.18569013476371765, -2.213598726541477e-8, 0.9826083779335022),
  scale: new Vector3(1, 1, 1)
})
goldBar4.addComponentOrReplace(transform98)

const goldBar5 = new Entity('goldBar5')
engine.addEntity(goldBar5)
goldBar5.setParent(_scene)
goldBar5.addComponentOrReplace(gltfShape30)
const transform99 = new Transform({
  position: new Vector3(28.075597763061523, 0.2410430908203125, 21.145610809326172),
  rotation: new Quaternion(6.923958066069175e-16, -0.22012163698673248, 2.6240538630872834e-8, 0.9754725098609924),
  scale: new Vector3(1, 1, 1)
})
goldBar5.addComponentOrReplace(transform99)

const parrot2 = new Entity('parrot2')
engine.addEntity(parrot2)
parrot2.setParent(_scene)
const transform100 = new Transform({
  position: new Vector3(20.22637367248535, 1.2201982736587524, 43.27125930786133),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
parrot2.addComponentOrReplace(transform100)

const messageBubble = new Entity('messageBubble')
engine.addEntity(messageBubble)
messageBubble.setParent(_scene)
const transform101 = new Transform({
  position: new Vector3(20.027908325195312, 2.0872340202331543, 43.471954345703125),
  rotation: new Quaternion(6.83978342578195e-15, -0.9999976754188538, 1.1920900533368695e-7, 0.0021607428789138794),
  scale: new Vector3(1.1487975120544434, 1, 1.000000238418579)
})
messageBubble.addComponentOrReplace(transform101)

const indicatorArrowBlue = new Entity('indicatorArrowBlue')
engine.addEntity(indicatorArrowBlue)
indicatorArrowBlue.setParent(_scene)
const transform102 = new Transform({
  position: new Vector3(27.933197021484375, 0.7947921752929688, 21.51837158203125),
  rotation: new Quaternion(5.802256686217539e-16, 0.7138912677764893, -8.51024566372871e-8, 0.7002566456794739),
  scale: new Vector3(2.4356117248535156, 2.4356117248535156, 2.4356117248535156)
})
indicatorArrowBlue.addComponentOrReplace(transform102)

const indicatorArrowBlue2 = new Entity('indicatorArrowBlue2')
engine.addEntity(indicatorArrowBlue2)
indicatorArrowBlue2.setParent(_scene)
const transform103 = new Transform({
  position: new Vector3(17.881792068481445, 1.8319730758666992, 5.412631034851074),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2.557332992553711, 2.557332992553711, 2.557332992553711)
})
indicatorArrowBlue2.addComponentOrReplace(transform103)

const channelId = Math.random().toString(16).slice(2)
const channelBus = new MessageBus()
const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
const options = { inventory }
const script1 = new Script1()
const script2 = new Script2()
const script3 = new Script3()
const script4 = new Script4()
const script5 = new Script5()
const script6 = new Script6()
script1.init()
script2.init()
script3.init()
script4.init()
script5.init()
script6.init()
script1.spawn(invisibleWall3, {"enabled":true}, createChannel(channelId, invisibleWall3, channelBus))
script1.spawn(invisibleWall4, {"enabled":true}, createChannel(channelId, invisibleWall4, channelBus))
script1.spawn(invisibleWall5, {"enabled":true}, createChannel(channelId, invisibleWall5, channelBus))
script1.spawn(invisibleWall6, {"enabled":true}, createChannel(channelId, invisibleWall6, channelBus))
script2.spawn(parrot, {"onActivate":[],"onDeactivate":[]}, createChannel(channelId, parrot, channelBus))
script1.spawn(invisibleWall2, {"enabled":true}, createChannel(channelId, invisibleWall2, channelBus))
script1.spawn(invisibleWall7, {"enabled":true}, createChannel(channelId, invisibleWall7, channelBus))
let verde1 = script3.spawn(greenLightButton, {}, createChannel(channelId, greenLightButton, channelBus))
let verde2 = script3.spawn(greenLightButton2, {"onClick":[]}, createChannel(channelId, greenLightButton2, channelBus))

var channelChest = createChannel(channelId, treasureChest, channelBus)
var propsChest = {"onClickText":"Open/Close","onClick":[{"entityName":"treasureChest","actionId":"toggle","values":{}}]}
let chest = script4.spawn(treasureChest, propsChest, channelChest)
script2.spawn(parrot2, {"onActivate":[{"entityName":"messageBubble","actionId":"open","values":{}}],"onDeactivate":[{"entityName":"messageBubble","actionId":"close","values":{}}]}, createChannel(channelId, parrot2, channelBus))
script5.spawn(messageBubble, {"text":"Get the treasure and \nescape to the other \nside with it.","fontSize":12}, createChannel(channelId, messageBubble, channelBus))
script6.spawn(indicatorArrowBlue, {"active":true}, createChannel(channelId, indicatorArrowBlue, channelBus))
script6.spawn(indicatorArrowBlue2, {"active":true}, createChannel(channelId, indicatorArrowBlue2, channelBus))

chest.addComponent(
  new OnPointerDown(() => {
    //If the game started
    if(flagMine == 1)
    {
      //Open the chest
      channelChest.sendActions(propsChest.onClick)
      //Now the user have gold
      haveGold = 1
      goldText.visible = true
      setTimeout(function(){
        //Found gold message after 3 seconds
        goldText.visible = false
        //Close the chest after 3 seconds
        channelChest.sendActions([{"entityName":"treasureChest","actionId":"close","values":{}}])
      }, 3000);
    }
    else
    {
      bugText.visible = true
      looseText.visible = false
      setTimeout(function(){
        //Found gold message after 3 seconds
        bugText.visible = false
      }, 3000);
    }
  },
    {
      button: ActionButton.POINTER,
      hoverText: propsChest.onClickText,
      distance: 4
    }))

verde1.addComponent(
    new OnPointerDown(
        () => {
          moveDoor = 1
          startGame()
          moveDoor2 = 0
          CloseExitDoor()
        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Start Game',
          distance: 4
        }
    )
)

function CloseExitDoor()
{
  smallLog4.getComponent(Transform).scale = new Vector3(1.3888365030288696, 1.0000159740447998, 1)
  smallLog4.getComponent(LerpSizeData4).originScale = new Vector3(1.3888365030288696, 1.0000159740447998, 1)
  smallLog4.getComponent(Transform).position = new Vector3(16.98699951171875, 2.131305456161499, 4.43063497543335)
  smallLog4.getComponent(LerpSizeData4).originPosition = new Vector3(16.98699951171875, 2.131305456161499, 4.43063497543335)

  smallLog5.getComponent(Transform).scale = new Vector3(1.3888376951217651, 1.0000171661376953, 1)
  smallLog5.getComponent(LerpSizeData5).originScale = new Vector3(1.3888376951217651, 1.0000171661376953, 1)
  smallLog5.getComponent(Transform).position = new Vector3(16.417932510375977, 2.131305456161499, 4.43063497543335)
  smallLog5.getComponent(LerpSizeData5).originPosition = new Vector3(16.417932510375977, 2.131305456161499, 4.43063497543335)

  smallLog6.getComponent(Transform).scale = new Vector3(1.3888400793075562, 1.0000195503234863, 1)
  smallLog6.getComponent(LerpSizeData6).originScale = new Vector3(1.3888400793075562, 1.0000195503234863, 1)
  smallLog6.getComponent(Transform).position = new Vector3(15.801841735839844, 2.131305456161499, 4.43063497543335)
  smallLog6.getComponent(LerpSizeData6).originPosition = new Vector3(15.801841735839844, 2.131305456161499, 4.43063497543335)
}

function closeMainDoor()
{
  smallLog.getComponent(Transform).scale = new Vector3(1.388832926750183, 1.0000123977661133, 1)
  smallLog.getComponent(LerpSizeData).originScale = new Vector3(1.388832926750183, 1.0000123977661133, 1)
  smallLog.getComponent(Transform).position = new Vector3(16.98699951171875, 2.131305456161499, 43.4439582824707)
  smallLog.getComponent(LerpSizeData).originPosition = new Vector3(16.98699951171875, 2.131305456161499, 43.4439582824707)
  smallLog.getComponent(LerpSizeData).fraction = 0

  smallLog2.getComponent(Transform).scale = new Vector3(1.3888341188430786, 1.0000135898590088, 1)
  smallLog2.getComponent(LerpSizeData2).originScale = new Vector3(1.3888341188430786, 1.0000135898590088, 1)
  smallLog2.getComponent(Transform).position = new Vector3(16.417932510375977, 2.131305456161499, 43.4439582824707)
  smallLog2.getComponent(LerpSizeData2).originPosition = new Vector3(16.417932510375977, 2.131305456161499, 43.4439582824707)
  smallLog2.getComponent(LerpSizeData2).fraction = 0

  smallLog3.getComponent(Transform).scale = new Vector3(1.3888365030288696, 1.0000159740447998, 1)
  smallLog3.getComponent(LerpSizeData3).originScale = new Vector3(1.3888365030288696, 1.0000159740447998, 1)
  smallLog3.getComponent(Transform).position = new Vector3(15.801841735839844, 2.131305456161499, 43.4439582824707),
  smallLog3.getComponent(LerpSizeData3).originPosition = new Vector3(15.801841735839844, 2.131305456161499, 43.4439582824707),
  smallLog3.getComponent(LerpSizeData3).fraction = 0
}

function openExitDoor()
{
  smallLog4.getComponent(LerpSizeData4).targetScale = new Vector3(0.3888365030288696, 1.0000159740447998, 1)
  smallLog4.getComponent(LerpSizeData4).targetPosition = new Vector3(16.98699951171875, 4.131305456161499, 4.43063497543335)
  smallLog4.getComponent(LerpSizeData4).fraction = 0

  smallLog5.getComponent(LerpSizeData5).targetScale = new Vector3(0.3888376951217651, 1.0000171661376953, 1)
  smallLog5.getComponent(LerpSizeData5).targetPosition = new Vector3(16.417932510375977, 4.131305456161499, 4.43063497543335)
  smallLog5.getComponent(LerpSizeData5).fraction = 0

  smallLog6.getComponent(LerpSizeData6).targetScale = new Vector3(0.3888400793075562, 1.0000195503234863, 1)
  smallLog6.getComponent(LerpSizeData6).targetPosition = new Vector3(15.801841735839844, 4.131305456161499, 4.43063497543335) 
  smallLog6.getComponent(LerpSizeData6).fraction = 0
}

verde2.addComponent(
  new OnPointerDown(
      () => {
        if(haveGold == 1)
        {
          stopGame() 
          //Abre puerta
          openExitDoor()

          moveDoor2 = 1
          moveDoor = 0

          //Cierra la puerta
          closeMainDoor()
          //Oculta todo
          factTxt.visible = false
          factTxt2.visible = false
          factTxt3.visible = false
          factTxt4.visible = false
          sunImgScreen.visible = false
          sunImgScreen2.visible = false
          factTxt0.visible = false
          looseText.visible = false
          //Muestra texto de ganar
          winText.value = 'You WIN! Congrats - Time: ' + factTxt4.value
          winText.visible = true
          //Activa música de ganador
          sourceButton.playOnce()
          //Envia el score al API
          /*let name = factTxt0.value.replace(" phone's", "")
          let myBody = {
            score:factTxt4.value,
            username:name,
            password:"NVW99EHqgRtC"
          }
          executeTask(async () => {
            try {
              let response = await fetch("https://www.gcycloned.com/decentraland/api/saveScore.php", {
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Headers": "*" },
                method: "POST",
                body: JSON.stringify(myBody),
              })
              let json = await response.json()
              log(json)
            } catch {
              log("failed to reach URL API when saving score :(")
            }
          }) */
        }
        else
        {
          //Abre puerta
          openExitDoor()
          
          moveDoor2 = 1
          moveDoor = 0

          //Cierra la puerta
          closeMainDoor()
          //Oculta todo
          factTxt.visible = false
          factTxt2.visible = false
          factTxt3.visible = false
          factTxt4.visible = false
          sunImgScreen.visible = false
          sunImgScreen2.visible = false
          factTxt0.visible = false
          looseText.visible = false
          //Muestra mensaje de gameover sin oro
          noGoldText.visible = true
          flagLed = 0
          flagMine = 0
          setTimeout(function(){
            //Found gold message after 3 seconds
            noGoldText.visible = false
          }, 5000);
        }
      },
      {
        button: ActionButton.POINTER,
        hoverText: 'Open Door',
        distance: 5
      }
  )
)

const bermudaGrass = new Entity('bermudaGrass')
engine.addEntity(bermudaGrass)
bermudaGrass.setParent(_scene)
const gltfShape999 = new GLTFShape("models/FloorBaseGrass_01/FloorBaseGrass_01.glb")
gltfShape999.withCollisions = true
gltfShape999.isPointerBlocker = true
gltfShape999.visible = true
bermudaGrass.addComponentOrReplace(gltfShape999)
const transform299 = new Transform({
  position: new Vector3(8, -0.09, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass.addComponentOrReplace(transform299)

const bermudaGrass2 = new Entity('bermudaGrass2')
engine.addEntity(bermudaGrass2)
bermudaGrass2.setParent(_scene)
bermudaGrass2.addComponentOrReplace(gltfShape999)
const transform399 = new Transform({
  position: new Vector3(24, -0.09, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass2.addComponentOrReplace(transform399)

const bermudaGrass3 = new Entity('bermudaGrass3')
engine.addEntity(bermudaGrass3)
bermudaGrass3.setParent(_scene)
bermudaGrass3.addComponentOrReplace(gltfShape999)
const transform499 = new Transform({
  position: new Vector3(8, -0.09, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass3.addComponentOrReplace(transform499)

const bermudaGrass4 = new Entity('bermudaGrass4')
engine.addEntity(bermudaGrass4)
bermudaGrass4.setParent(_scene)
bermudaGrass4.addComponentOrReplace(gltfShape999)
const transform599 = new Transform({
  position: new Vector3(24, -0.09, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass4.addComponentOrReplace(transform599)

const bermudaGrass5 = new Entity('bermudaGrass5')
engine.addEntity(bermudaGrass5)
bermudaGrass5.setParent(_scene)
bermudaGrass5.addComponentOrReplace(gltfShape999)
const transform699 = new Transform({
  position: new Vector3(8, -0.09, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass5.addComponentOrReplace(transform699)

const bermudaGrass6 = new Entity('bermudaGrass6')
engine.addEntity(bermudaGrass6)
bermudaGrass6.setParent(_scene)
bermudaGrass6.addComponentOrReplace(gltfShape999)
const transform799 = new Transform({
  position: new Vector3(24, -0.09, 40),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
bermudaGrass6.addComponentOrReplace(transform799)