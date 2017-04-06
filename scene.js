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
  const leftFrontMiddle = scene.getObjectByName(NAMES.ANT_LEG_LEFT_FRONT.MIDDLE);
  const leftFrontUpper = scene.getObjectByName(NAMES.ANT_LEG_LEFT_FRONT.UPPER);
  const leftMidMiddle = scene.getObjectByName(NAMES.ANT_LEG_LEFT_MIDDLE.MIDDLE);
  const leftMidUpper = scene.getObjectByName(NAMES.ANT_LEG_LEFT_MIDDLE.UPPER);
  const leftBackMiddle = scene.getObjectByName(NAMES.ANT_LEG_LEFT_BACK.MIDDLE);
  const leftBackUpper = scene.getObjectByName(NAMES.ANT_LEG_LEFT_BACK.UPPER);
  const rightFrontMiddle = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_FRONT.MIDDLE);
  const rightFrontUpper = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_FRONT.UPPER);
  const rightMidMiddle = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_MIDDLE.MIDDLE);
  const rightMidUpper = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_MIDDLE.UPPER);
  const rightBackMiddle = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_BACK.MIDDLE);
  const rightBackUpper = scene.getObjectByName(NAMES.ANT_LEG_RIGHT_BACK.UPPER);
  const legFrontRotationsInit = { 
    leftFrontMiddleZ: -2.45,
    leftFrontMiddleY: -0.30,
    leftFrontUpperZ: 0.85,
    leftFrontUpperY: 1.25,
    rightFrontMiddleZ: -0.75,
    rightFrontMiddleY: 0.15,
    rightFrontUpperZ: 0.5,
    rightFrontUpperY: -0.75,
  };
  const legFrontRotations = {
    leftFrontMiddleZ: [-0.75, -1.05, -2.45],
    leftFrontMiddleY: [-0.15, 0.00, -0.30],
    leftFrontUpperZ: [0.5, 0.15, 0.85],
    leftFrontUpperY: [0.75, 0.75, 1.25],
    rightFrontMiddleZ: [-1.05, -2.45, -0.75],
    rightFrontMiddleY: [0.00, 0.30, 0.15],
    rightFrontUpperZ: [0.15, 0.85, 0.5],
    rightFrontUpperY: [-0.75, -1.25, -0.75]
  };
  const legMidRotationsInit = {
    leftMidMiddleZ: -1.5,
    leftMidMiddleY: -0.30,
    leftMidUpperZ: 0.45,
    leftMidUpperY: 0.95,
    rightMidMiddleZ: -2.25,
    rightMidMiddleY: 0.30,
    rightMidUpperZ: 0.75,
    rightMidUpperY: -1.95,
  };
  const legMidRotations = {
    leftMidMiddleZ: [-2.25, -1.0, -1.5],
    leftMidMiddleY: [0.30, 0.00, -0.30],
    leftMidUpperZ: [0.75, 0.60, 0.45],
    leftMidUpperY: [1.95, 0.95, 0.95],
    rightMidMiddleZ: [-1.0, -1.5, -2.25],
    rightMidMiddleY: [-0.30, 0.00, 0.30],
    rightMidUpperZ: [0.60, 0.45, 0.75],
    rightMidUpperY: [-0.95, -0.95, -1.95]
  };
  const legBackRotationsInit = {
    leftBackMiddleZ: -0.80,
    leftBackMiddleY: 0.30,
    leftBackUpperZ: 0.00,
    leftBackUpperY: 2.5,
    rightBackMiddleZ: -1.0,
    rightBackMiddleY: -0.30,
    rightBackUpperZ: 0.55,
    rightBackUpperY: -1.5

  };
  const legBackRotations = {
    leftBackMiddleZ: [-1.0, -1.45, -0.80],
    leftBackMiddleY: [-0.30, 0.00, 0.30],
    leftBackUpperZ: [0.55, 0.40, 0.00],
    leftBackUpperY: [1.5, 1.5, 2.5],
    rightBackMiddleZ: [-1.45, -0.80, -1.0],
    rightBackMiddleY: [0.00, 0.30, -0.30],
    rightBackUpperZ: [0.40, 0.00, 0.55],
    rightBackUpperY: [-1.5, -2.5, -1.5],
  };
  const legSpeed = 1000;
  const legFrontRotationsTween = new TWEEN.Tween(legFrontRotationsInit).to(legFrontRotations, legSpeed);
  const legMidRotationsTween = new TWEEN.Tween(legMidRotationsInit).to(legMidRotations, legSpeed);
  const legBackRotationsTween = new TWEEN.Tween(legBackRotationsInit).to(legBackRotations, legSpeed);

  const legFrontRotationsFunc = () => {
    leftFrontMiddle.rotation.z = legFrontRotationsInit.leftFrontMiddleZ;
    leftFrontMiddle.rotation.y = legFrontRotationsInit.leftFrontMiddleY;
    leftFrontUpper.rotation.z = legFrontRotationsInit.leftFrontUpperZ;
    leftFrontUpper.rotation.y = legFrontRotationsInit.leftFrontUpperY;
    rightFrontMiddle.rotation.z = legFrontRotationsInit.rightFrontMiddleZ;
    rightFrontMiddle.rotation.y = legFrontRotationsInit.rightFrontMiddleY;
    rightFrontUpper.rotation.z = legFrontRotationsInit.rightFrontUpperZ;
    rightFrontUpper.rotation.y = legFrontRotationsInit.rightFrontUpperY;
  };
  const legMidRotationsFunc = () => {
    leftMidMiddle.rotation.z = legMidRotationsInit.leftMidMiddleZ;
    leftMidMiddle.rotation.y = legMidRotationsInit.leftMidMiddleY;
    leftMidUpper.rotation.z = legMidRotationsInit.leftMidUpperZ;
    leftMidUpper.rotation.y = legMidRotationsInit.leftMidUpperY;
    rightMidMiddle.rotation.z = legMidRotationsInit.rightMidMiddleZ;
    rightMidMiddle.rotation.y = legMidRotationsInit.rightMidMiddleY;
    rightMidUpper.rotation.z = legMidRotationsInit.rightMidUpperZ;
    rightMidUpper.rotation.y = legMidRotationsInit.rightMidUpperY;
  }
  const legBackRotationsFunc = () => {
    leftBackMiddle.rotation.z = legBackRotationsInit.leftBackMiddleZ;
    leftBackMiddle.rotation.y = legBackRotationsInit.leftBackMiddleY;
    leftBackUpper.rotation.z = legBackRotationsInit.leftBackUpperZ;
    leftBackUpper.rotation.y = legBackRotationsInit.leftBackUpperY;
    rightBackMiddle.rotation.z = legBackRotationsInit.rightBackMiddleZ;
    rightBackMiddle.rotation.y = legBackRotationsInit.rightBackMiddleY;
    rightBackUpper.rotation.z = legBackRotationsInit.rightBackUpperZ;
    rightBackUpper.rotation.y = legBackRotationsInit.rightBackUpperY;
  }
  legFrontRotationsTween.onUpdate(legFrontRotationsFunc);
  legFrontRotationsTween.repeat(Infinity);
  legFrontRotationsTween.start();
  legMidRotationsTween.onUpdate(legMidRotationsFunc);
  legMidRotationsTween.repeat(Infinity);
  legMidRotationsTween.start();
  legBackRotationsTween.onUpdate(legBackRotationsFunc);
  legBackRotationsTween.repeat(Infinity);
  legBackRotationsTween.start();

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

