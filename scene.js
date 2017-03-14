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
  const legFrontRotations = { 
    leftFrontMiddleZ: leftFrontMiddle.rotation.z,
    leftFrontMiddleY: leftFrontMiddle.rotation.y,
    leftFrontUpperZ: leftFrontUpper.rotation.z,
    leftFrontUpperY: leftFrontUpper.rotation.y,
    rightFrontMiddleZ: rightFrontMiddle.rotation.z,
    rightFrontMiddleY: rightFrontMiddle.rotation.y,
    rightFrontUpperZ: rightFrontMiddle.rotation.z,
    rightFrontUpperY: rightFrontMiddle.rotation.y,
  };
  const legMidRotations = {
    leftMidMiddleZ: leftMidMiddle.rotation.z,
    leftMidUpperZ: leftMidUpper.rotation.z,
    leftMidUpperY: leftMidUpper.rotation.y,
    rightMidMiddleZ: rightMidMiddle.rotation.z,
    rightMidUpperZ: rightMidUpper.rotation.z,
    rightMidUpperY: rightMidUpper.rotation.y,
  };
  const legBackRotations = {
    leftBackMiddleZ: leftBackMiddle.rotation.z,
    leftBackUpperZ: leftBackUpper.rotation.z,
    leftBackUpperY: leftBackUpper.rotation.y,
    rightBackMiddleZ: rightBackMiddle.rotation.z,
    rightBackUpperZ: rightBackUpper.rotation.z,
    rightBackUpperY: rightBackUpper.rotation.y,

  };
  const legFrontRotationsToBack = { 
    leftFrontMiddleZ: -2.46,
    leftFrontMiddleY: -0.30,
    leftFrontUpperZ: 0.85,
    leftFrontUpperY: 1.25,
    rightFrontMiddleZ: -1.09,
    rightFrontMiddleY: 0.00,
    rightFrontUpperZ: 0.15,
    rightFrontUpperY: -0.23,
  };
  const legFrontRotationsToFront = {
    leftFrontMiddleZ: -1.09,
    leftFrontMiddleY: 0.00,
    leftFrontUpperZ: 0.15,
    leftFrontUpperY: 0.23,
    rightFrontMiddleZ: -2.46,
    rightFrontMiddleY: 0.30,
    rightFrontUpperZ: 0.85,
    rightFrontUpperY: -1.25,
  };
  const legMidRotationsToBack = {
    leftMidMiddleZ: -1.6,
    leftMidUpperZ: 0.45,
    leftMidUpperY: 1.92,
    rightMidMiddleZ: -1.6,
    rightMidUpperZ: 0.45,
    rightMidUpperY: -0.96,
  };
  const legMidRotationsToFront = {
    leftMidMiddleZ: -1.6,
    leftMidUpperZ: 0.45,
    leftMidUpperY: 0.96,
    rightMidMiddleZ: -1.6,
    rightMidUpperZ: 0.45,
    rightMidUpperY: -1.92,
  };
  const legBackRotationsToBack = {
    leftBackMiddleZ: -1.15,
    leftBackUpperZ: 0.2,
    leftBackUpperY: 2.5,
    rightBackMiddleZ: -1.75,
    rightBackUpperZ: 0.55,
    rightBackUpperY: -1.8,

  };
  const legBackRotationsToFront = {
    leftBackMiddleZ: -1.75,
    leftBackUpperZ: 0.55,
    leftBackUpperY: 1.8,
    rightBackMiddleZ: -1.15,
    rightBackUpperZ: 0.2,
    rightBackUpperY: -2.5,
  };
  const legSpeed = 500;
  const legFrontRotationsToBackTween = new TWEEN.Tween(legFrontRotations).to(legFrontRotationsToBack, legSpeed);
  const legFrontRotationsToFrontTween = new TWEEN.Tween(legFrontRotations).to(legFrontRotationsToFront, legSpeed);
  const legMidRotationsToBackTween = new TWEEN.Tween(legMidRotations).to(legMidRotationsToBack, legSpeed);
  const legMidRotationsToFrontTween = new TWEEN.Tween(legMidRotations).to(legMidRotationsToFront, legSpeed);
  const legBackRotationsToBackTween = new TWEEN.Tween(legBackRotations).to(legBackRotationsToBack, legSpeed);
  const legBackRotationsToFrontTween = new TWEEN.Tween(legBackRotations).to(legBackRotationsToFront, legSpeed);
 
  const legFrontRotationsFunc = () => {
    leftFrontMiddle.rotation.z = legFrontRotations.leftFrontMiddleZ;
    leftFrontMiddle.rotation.y = legFrontRotations.leftFrontMiddleY;
    leftFrontUpper.rotation.z = legFrontRotations.leftFrontUpperZ;
    leftFrontUpper.rotation.y = legFrontRotations.leftFrontUpperY;
    rightFrontMiddle.rotation.z = legFrontRotations.rightFrontMiddleZ;
    rightFrontMiddle.rotation.y = legFrontRotations.rightFrontMiddleY;
    rightFrontUpper.rotation.z = legFrontRotations.rightFrontUpperZ;
    rightFrontUpper.rotation.y = legFrontRotations.rightFrontUpperY;
  };
  const legMidRotationsFunc = () => {
    leftMidMiddle.rotation.z = legMidRotations.leftMidMiddleZ;
    leftMidUpper.rotation.z = legMidRotations.leftMidUpperZ;
    leftMidUpper.rotation.y = legMidRotations.leftMidUpperY;
    rightMidMiddle.rotation.z = legMidRotations.rightMidMiddleZ;
    rightMidUpper.rotation.z = legMidRotations.rightMidUpperZ;
    rightMidUpper.rotation.y = legMidRotations.rightMidUpperY;
  }
  const legBackRotationsFunc = () => {
    leftBackMiddle.rotation.z = legBackRotations.leftBackMiddleZ;
    leftBackUpper.rotation.z = legBackRotations.leftBackUpperZ;
    leftBackUpper.rotation.y = legBackRotations.leftBackUpperY;
    rightBackMiddle.rotation.z = legBackRotations.rightBackMiddleZ;
    rightBackUpper.rotation.z = legBackRotations.rightBackUpperZ;
    rightBackUpper.rotation.y = legBackRotations.rightBackUpperY;
  }
  legFrontRotationsToBackTween.onUpdate(legFrontRotationsFunc);
  legFrontRotationsToFrontTween.onUpdate(legFrontRotationsFunc);
  legFrontRotationsToBackTween.chain(legFrontRotationsToFrontTween);
  legFrontRotationsToFrontTween.chain(legFrontRotationsToBackTween);
  //legFrontRotationsToFrontTween.interpolation(TWEEN.Interpolation.CatmullRom);
  legFrontRotationsToBackTween.start();
  legMidRotationsToBackTween.onUpdate(legMidRotationsFunc);
  legMidRotationsToFrontTween.onUpdate(legMidRotationsFunc);
  legMidRotationsToFrontTween.chain(legMidRotationsToBackTween);
  legMidRotationsToBackTween.chain(legMidRotationsToFrontTween);
  //legMidRotationsToFrontTween.start(50);
  legBackRotationsToBackTween.onUpdate(legBackRotationsFunc);
  legBackRotationsToFrontTween.onUpdate(legBackRotationsFunc);
  legBackRotationsToFrontTween.chain(legBackRotationsToBackTween);
  legBackRotationsToBackTween.chain(legBackRotationsToFrontTween);
  //legBackRotationsToBackTween.start(100);
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

