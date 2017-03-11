let camera, scene, renderer;
let legForward = true;

const KEYCODES = {
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
}

init();
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
  move();
  renderer.render(scene, camera);
  requestAnimationFrame(renderLoop);
}

function move(){
  lower = scene.getObjectByName(NAMES.ANT_LEG_LEFT_FRONT.LOWER);
  middle = scene.getObjectByName(NAMES.ANT_LEG_LEFT_FRONT.MIDDLE);
  upper = scene.getObjectByName(NAMES.ANT_LEG_LEFT_FRONT.UPPER);
  let middleZDone = false;
  let upperYDone = false
  let upperZDone = false;
  if (!legForward){
    if (middle.rotation.z > -2.46){
      middle.rotation.z -= 0.11;
    }else{
      middleZDone = true;
    }
    if (upper.rotation.z > 0.6 && upper.rotation.y < 1.25){
      upper.rotation.y += 0.08;
    }else{
      upperYDone = true;
    }
    if (upper.rotation.z < 0.91){
      upper.rotation.z += 0.06;
    }else{
      upperZDone = true;
    }
  }else{
    if (middle.rotation.z < -1.09){
      middle.rotation.z += 0.05;
    }else{
      middleZDone = true;
    }
    if (upper.rotation.y > 0.23){
      upper.rotation.y -= 0.07;
    }else{
      upperYDone = true;
    }
    if (upper.rotation.z > 0.15){
      upper.rotation.z -= 0.025;
    }else{
      upperZDone = true;
    }
  }
  if (middleZDone && upperYDone && upperZDone){
    legForward = !legForward;
  }
}

function moveOnKeyDown(keyCode){
  //const ant = scene.getObjectByName(NAMES.ANT);
  //ant.rotation.y += 0.05;
  lower = scene.getObjectByName(NAMES.ANT_LEG_LEFT_FRONT.LOWER);
  middle = scene.getObjectByName(NAMES.ANT_LEG_LEFT_FRONT.MIDDLE);
  upper = scene.getObjectByName(NAMES.ANT_LEG_LEFT_FRONT.UPPER);
  switch (keyCode){
    case KEYCODES.RIGHT_ARROW:
      if (middle.rotation.z > -2.46){
        middle.rotation.z -= 0.11;
      }
      if (upper.rotation.z > 0.6 && upper.rotation.y < 1.25){
        upper.rotation.y += 0.08;
      }
      if (upper.rotation.z < 0.91){
        upper.rotation.z += 0.06;
      }
      break;
    case KEYCODES.LEFT_ARROW:
      if (middle.rotation.z < -1.09){
        middle.rotation.z += 0.05;
      }
      if (upper.rotation.y > 0.23){
        upper.rotation.y -= 0.07;
      }
      if (upper.rotation.z > 0.15){
        upper.rotation.z -= 0.025;
      }
      break;
  }
  console.log("UPPER Y: " + upper.rotation.y)
  console.log("UPPER Z: " + upper.rotation.z)
  console.log("MIDDLE Z: " + middle.rotation.z)
 }

