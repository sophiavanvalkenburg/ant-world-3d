let camera, scene, renderer;

const KEYCODES = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
}

init();
initTweens();
renderLoop();

function init(){
    // set the scene size
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;
    // set some camera attributes
    const VIEW_ANGLE = 45;
    const ASPECT = WIDTH / HEIGHT;
    const NEAR = 0.1;
    const FAR = 10000;
    // get the DOM element to attach to
    const container = document.querySelector("#container");
    // create a WebGL renderer, camera
    // and a scene
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(
                VIEW_ANGLE,
                ASPECT,
                NEAR,
                FAR
            );
    camera.position.z = 300;
    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);
    //attach the renderer-supplied DOM element
    container.appendChild(renderer.domElement);
    //add orbit control
    const orbit = new THREE.OrbitControls(camera, container);
    orbit.enableZoom = false;
    orbit.enableKeys = false;
    //setup key presses
    setupUserEventListeners();
    // add the camera to the scene
    scene = setupScene();
    scene.add(camera);
}

function setupUserEventListeners(){
  window.addEventListener("keydown", function(e){
    moveOnKeyDown(e.keyCode);
  }, false);
}

function createGround(){
  const ground = new THREE.BoxGeometry(300, 1, 300);
  const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
  const mesh = new THREE.Mesh(ground, material);
  return mesh;
}

function setupScene(){
    const scene = new THREE.Scene();
    const ant = createAnt();
    const ground = createGround();
    const lights = createLight();
    // add to scene
    scene.add(ground);
    scene.add(ant);
    for (let i=0; i<lights.length; i++){
        scene.add(lights[i]);
    }
    return scene;
}

function createLight(){
    const lightA = new THREE.AmbientLight( 0x404040 );
    const light = new THREE.SpotLight(0xffffff);
    light.position.y = 1000;
    return [lightA, light]
}

function renderLoop(){
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderLoop);
}

function initTweens(){
  const ant = scene.getObjectByName(NAMES.ANT);
  const antHead = scene.getObjectByName(NAMES.ANT_HEAD);
  const antBack = scene.getObjectByName(NAMES.ANT_BACK);
  const leftFrontLower = scene.getObjectByName(NAMES.ANT_LEG_LEFT_FRONT.LOWER);
  const leftFrontMiddle = scene.getObjectByName(NAMES.ANT_LEG_LEFT_FRONT.MIDDLE);
  const leftFrontUpper = scene.getObjectByName(NAMES.ANT_LEG_LEFT_FRONT.UPPER);
  const leftMidLower = scene.getObjectByName(NAMES.ANT_LEG_LEFT_MIDDLE.LOWER);
  const leftMidMiddle = scene.getObjectByName(NAMES.ANT_LEG_LEFT_MIDDLE.MIDDLE);
  const leftMidUpper = scene.getObjectByName(NAMES.ANT_LEG_LEFT_MIDDLE.UPPER);
  const leftBackLower = scene.getObjectByName(NAMES.ANT_LEG_LEFT_BACK.LOWER);
  const leftBackMiddle = scene.getObjectByName(NAMES.ANT_LEG_LEFT_BACK.MIDDLE);
  const leftBackUpper = scene.getObjectByName(NAMES.ANT_LEG_LEFT_BACK.UPPER);
  const rightFrontLower = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_FRONT.LOWER);
  const rightFrontMiddle = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_FRONT.MIDDLE);
  const rightFrontUpper = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_FRONT.UPPER);
  const rightMidLower = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_MIDDLE.LOWER);
  const rightMidMiddle = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_MIDDLE.MIDDLE);
  const rightMidUpper = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_MIDDLE.UPPER);
  const rightBackLower = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_BACK.LOWER);
  const rightBackMiddle = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_BACK.MIDDLE);
  const rightBackUpper = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_BACK.UPPER);
  const legRotationsInit = {
    // left front
    leftFrontLowerZ: 1.25,
    leftFrontMiddleZ: -2.45,
    leftFrontMiddleY: -0.30,
    leftFrontUpperZ: 0.85,
    leftFrontUpperY: 1.25,
    // right front
    rightFrontLowerZ: 0.25,
    rightFrontMiddleZ: -0.75,
    rightFrontMiddleY: 0.15,
    rightFrontUpperZ: 0.5,
    rightFrontUpperY: -0.75,
    // left middle
    leftMidLowerZ: 0.5,
    leftMidMiddleZ: -1.5,
    leftMidMiddleY: -0.30,
    leftMidUpperZ: 0.45,
    leftMidUpperY: 0.95,
    // right middle
    rightMidLowerZ: 1.0,
    rightMidMiddleZ: -2.25,
    rightMidMiddleY: 0.30,
    rightMidUpperZ: 0.75,
    rightMidUpperY: -1.95,
    // left back
    leftBackLowerZ: 0.5,
    leftBackMiddleZ: -0.80,
    leftBackMiddleY: 0.30,
    leftBackUpperZ: 0.00,
    leftBackUpperY: 2.5,
    // right back
    rightBackLowerZ: 0.25,
    rightBackMiddleZ: -1.0,
    rightBackMiddleY: -0.30,
    rightBackUpperZ: 0.55,
    rightBackUpperY: -1.5
  }
  const legRotations = {
    // left front
    leftFrontLowerZ: [0.25, 0.5, 1.25],
    leftFrontMiddleZ: [-0.75, -1.05, -2.45],
    leftFrontMiddleY: [-0.15, 0.00, -0.30],
    leftFrontUpperZ: [0.5, 0.15, 0.85],
    leftFrontUpperY: [0.75, 0.75, 1.25],
    // right front
    rightFrontLowerZ: [0.5, 1.25, 0.25],
    rightFrontMiddleZ: [-1.05, -2.45, -0.75],
    rightFrontMiddleY: [0.00, 0.30, 0.15],
    rightFrontUpperZ: [0.15, 0.85, 0.5],
    rightFrontUpperY: [-0.75, -1.25, -0.75],
    // left middle
    leftMidLowerZ: [1.0, 0.25, 0.5],
    leftMidMiddleZ: [-2.25, -1.0, -1.5],
    leftMidMiddleY: [0.30, 0.00, -0.30],
    leftMidUpperZ: [0.75, 0.60, 0.45],
    leftMidUpperY: [1.95, 0.95, 0.95],
    // right middle
    rightMidLowerZ: [0.25, 0.5, 1.0],
    rightMidMiddleZ: [-1.0, -1.5, -2.25],
    rightMidMiddleY: [-0.30, 0.00, 0.30],
    rightMidUpperZ: [0.60, 0.45, 0.75],
    rightMidUpperY: [-0.95, -0.95, -1.95],
    // left back
    leftBackLowerZ: [0.25, 0.25, 0.5],
    leftBackMiddleZ: [-1.0, -1.45, -0.80],
    leftBackMiddleY: [-0.30, 0.00, 0.30],
    leftBackUpperZ: [0.55, 0.40, 0.00],
    leftBackUpperY: [1.5, 1.5, 2.5],
    // right back
    rightBackLowerZ: [0.25, 0.5, 0.25],
    rightBackMiddleZ: [-1.45, -0.80, -1.0],
    rightBackMiddleY: [0.00, 0.30, -0.30],
    rightBackUpperZ: [0.40, 0.00, 0.55],
    rightBackUpperY: [-1.5, -2.5, -1.5],
  };
  const antHalfStepMovementsInit = {
    yPosition: ant.position.y,
    backZRotation: antBack.rotation.z,
    headZRotation: antHead.rotation.z - 0.1
  }
  const antWholeStepMovementsInit = {
    headYRotation: antHead.rotation.y,
  }
  const antHalfStepMovements = {
    yPosition: [ant.position.y + 1, ant.position.y, ant.position.y - 1, ant.position.y],
    backZRotation: [antBack.rotation.z - 0.2, antBack.rotation.z],
    headZRotation: [antHead.rotation.z, antHead.rotation.z - 0.1]
  }
  const antWholeStepMovements = {
    headYRotation: [antHead.rotation.y - 0.15, antHead.rotation.y, antHead.rotation.y + 0.15, antHead.rotation.y],
  }
  const stepSpeed = 750;
  const legRotationsTween = new TWEEN.Tween(legRotationsInit).to(legRotations, stepSpeed);
  const antHalfStepMovementsTween = new TWEEN.Tween(antHalfStepMovementsInit).to(antHalfStepMovements, stepSpeed/2);
  const antWholeStepMovementsTween = new TWEEN.Tween(antWholeStepMovementsInit).to(antWholeStepMovements, stepSpeed);

  const legRotationsFunc = () => {
    // left front
    leftFrontLower.rotation.z = legRotationsInit.leftFrontLowerZ;
    leftFrontMiddle.rotation.z = legRotationsInit.leftFrontMiddleZ;
    leftFrontMiddle.rotation.y = legRotationsInit.leftFrontMiddleY;
    leftFrontUpper.rotation.z = legRotationsInit.leftFrontUpperZ;
    leftFrontUpper.rotation.y = legRotationsInit.leftFrontUpperY;
    // right front
    rightFrontLower.rotation.z = legRotationsInit.rightFrontLowerZ;
    rightFrontMiddle.rotation.z = legRotationsInit.rightFrontMiddleZ;
    rightFrontMiddle.rotation.y = legRotationsInit.rightFrontMiddleY;
    rightFrontUpper.rotation.z = legRotationsInit.rightFrontUpperZ;
    rightFrontUpper.rotation.y = legRotationsInit.rightFrontUpperY;
    // left middle
    leftMidLower.rotation.z = legRotationsInit.leftMidLowerZ;
    leftMidMiddle.rotation.z = legRotationsInit.leftMidMiddleZ;
    leftMidMiddle.rotation.y = legRotationsInit.leftMidMiddleY;
    leftMidUpper.rotation.z = legRotationsInit.leftMidUpperZ;
    leftMidUpper.rotation.y = legRotationsInit.leftMidUpperY;
    // right middle
    rightMidLower.rotation.z = legRotationsInit.rightMidLowerZ;
    rightMidMiddle.rotation.z = legRotationsInit.rightMidMiddleZ;
    rightMidMiddle.rotation.y = legRotationsInit.rightMidMiddleY;
    rightMidUpper.rotation.z = legRotationsInit.rightMidUpperZ;
    rightMidUpper.rotation.y = legRotationsInit.rightMidUpperY;
    // left back
    leftBackLower.rotation.z = legRotationsInit.leftBackLowerZ;
    leftBackMiddle.rotation.z = legRotationsInit.leftBackMiddleZ;
    leftBackMiddle.rotation.y = legRotationsInit.leftBackMiddleY;
    leftBackUpper.rotation.z = legRotationsInit.leftBackUpperZ;
    leftBackUpper.rotation.y = legRotationsInit.leftBackUpperY;
    // right back
    rightBackLower.rotation.z = legRotationsInit.rightBackLowerZ;
    rightBackMiddle.rotation.z = legRotationsInit.rightBackMiddleZ;
    rightBackMiddle.rotation.y = legRotationsInit.rightBackMiddleY;
    rightBackUpper.rotation.z = legRotationsInit.rightBackUpperZ;
    rightBackUpper.rotation.y = legRotationsInit.rightBackUpperY;
  };
  const antHalfStepMovementsFunc = () => {
    ant.position.y = antHalfStepMovementsInit.yPosition;
    antBack.rotation.z = antHalfStepMovementsInit.backZRotation;
    antHead.rotation.z = antHalfStepMovementsInit.headZRotation;
  }
  const antWholeStepMovementsFunc = () => {
    antHead.rotation.y = antWholeStepMovementsInit.headYRotation;
  }
  legRotationsTween.onUpdate(legRotationsFunc);
  legRotationsTween.repeat(Infinity);
  legRotationsTween.start();
  antHalfStepMovementsTween.onUpdate(antHalfStepMovementsFunc);
  antHalfStepMovementsTween.repeat(Infinity);
  antHalfStepMovementsTween.start();
  antWholeStepMovementsTween.onUpdate(antWholeStepMovementsFunc);
  antWholeStepMovementsTween.repeat(Infinity);
  antWholeStepMovementsTween.start();
}

function moveOnKeyDown(keyCode){
  //const ant = scene.getObjectByName(NAMES.ANT);
  //ant.rotation.y += 0.05;
  middle = scene.getObjectByName(NAMES.ANT_LEG_LEFT_MIDDLE.MIDDLE);
  upper = scene.getObjectByName(NAMES.ANT_LEG_LEFT_MIDDLE.UPPER);
  switch (keyCode){
    case KEYCODES.RIGHT_ARROW:
      
      break;
    case KEYCODES.LEFT_ARROW:
      
      break;
  }
  console.log("UPPER Y: " + upper.rotation.y)
  console.log("UPPER Z: " + upper.rotation.z)
  console.log("MIDDLE Z: " + middle.rotation.z)
 }

