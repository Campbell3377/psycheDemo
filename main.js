import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
camera.position.setZ(30);

var light = new THREE.DirectionalLight("#ffffff", 0.2);
var pointLight = new THREE.PointLight("#ffffff", 0.2);
var pointLightBack = new THREE.PointLight("#ffffff", 0.2);
var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
light.position.set( 0, -70, 100 ).normalize();
pointLight.position.set(0,-40,300);
pointLightBack.position.set(0,-40,-100);

scene.add(light);
scene.add(pointLight);
scene.add(pointLightBack);
scene.add(ambientLight);

var loader = new GLTFLoader();
var textureLoader = new THREE.TextureLoader

var mesh;


loader.load(
  '../psychegltf.gltf',
  function (gltf) {
    let texture = textureLoader.load('../PsycheMat.png', function(map){
      texture.encoding = THREE.sRGBEncoding;
      texture.flipY = false;
      // let material = new THREE.MeshStandardMaterial ( { map: texture} );
      mesh = gltf.scene.children[0];
      mesh.material.map = map;
      mesh.scale.set( 4, 4, 4 );
      // mesh.position.set( -10, 0, 0 );
      mesh.position.setX(-10);
      // mesh.rotateY(- Math.PI / 2);	
      scene.add( mesh );
    });
    
  }
)

// const fbxLoader = new FBXLoader()
// fbxLoader.load(
//     '../Psyche.fbx',
//     (object) => {
//         // object.traverse(function (child) {
//         //     if ((child as THREE.Mesh).isMesh) {
//         //         // (child as THREE.Mesh).material = material
//         //         if ((child as THREE.Mesh).material) {
//         //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
//         //         }
//         //     }
//         // })
//         console.log(object);
//         object.scale.set(.01, .01, .01)
//         scene.add(object);
        
//     }
// )

//renderer.render(scene, camera);

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// const mat = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true});

// const torus = new THREE.Mesh( geometry, mat);

// scene.add(torus);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff });
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set(x, y, z);
  scene.add(star);
}

const spaceTexture = textureLoader.load('../space.jpg');
scene.background = spaceTexture;

// Array(200).fill().forEach(addStar);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  console.log("hello");
  // mesh.rotation.x += 0.05;
  // mesh.rotation.y += 0.01;
  // mesh.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame( animate );

  // mesh.rotation.x += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();



