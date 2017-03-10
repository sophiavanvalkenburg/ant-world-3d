let camera, scene, renderer, ant;

const KEYCODES = {
  LEFT_ARROW: 37
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
    if (e.keyCode == KEYCODES.LEFT_ARROW){
      move();
    }
  }, false);
}

function setupScene(){
    const scene = new THREE.Scene();
    ant = createAnt();
    const lights = createLight();
    // add to scene
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
  renderer.render(scene, camera);
  requestAnimationFrame(renderLoop);
}

function move(){
  ant.rotation.y += 0.05;
}

