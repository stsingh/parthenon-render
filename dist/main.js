import * as THREE from 'https://unpkg.com/browse/three@0.152.2/';
import { TrackballControls } from 'https://unpkg.com/browse/three@0.152.2/examples/jsm/controls/TrackballControls.js';
// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 5; // Set camera position
// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#233143"); // Set background colour
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Add renderer to HTML as a canvas element
// Make Canvas Responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight); // Update size
    camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
    camera.updateProjectionMatrix(); // Apply changes
})

// load a texture, set wrap mode to repeat
const columnTexture = new THREE.TextureLoader().load( "./textures/column.jpg" );
columnTexture.wrapS = THREE.RepeatWrapping;
columnTexture.wrapT = THREE.RepeatWrapping;
columnTexture.repeat.set( 4, 4 );

const marbleTexture = new THREE.TextureLoader().load( "./textures/marble.jpg" );
marbleTexture.wrapS = THREE.RepeatWrapping;
marbleTexture.wrapT = THREE.RepeatWrapping;
marbleTexture.repeat.set( 4, 4 );

const decTexture = new THREE.TextureLoader().load( "./textures/imgtexture.jpg" );
decTexture.wrapS = THREE.RepeatWrapping;
decTexture.wrapT = THREE.RepeatWrapping;
decTexture.repeat.set( 4, 4 );

// Create box:
const group = new THREE.Group();
const boxGeometry = new THREE.BoxGeometry(4.35, 2.25, 0.1); // Define geometry
const marbleMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF}); // Define material
marbleMaterial.map = marbleTexture;
const boxMesh1 = new THREE.Mesh(boxGeometry, marbleMaterial); // Build box
group.add(boxMesh1);

const lowerGeom = new THREE.BoxGeometry(4.75, 2.5, 0.1); // Define geometry
const lowerBox = new THREE.Mesh(lowerGeom, marbleMaterial); // Build box
lowerBox.position.set(0,0,0.1);
group.add(lowerBox);

const ceilingGeom = new THREE.BoxGeometry(4.25, 2, 0.1);
const boxMesh2 = new THREE.Mesh(ceilingGeom, marbleMaterial); // Build box
boxMesh2.position.set(-0.1,0,-1.5);
group.add(boxMesh2);

const decGeom = new THREE.BoxGeometry(4.25, 2, 0.2);
const decMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
decMaterial.map = decTexture;
const boxMesh3 = new THREE.Mesh(decGeom, decMaterial); // Build box
boxMesh3.position.set(-0.1,0,-1.65);
group.add(boxMesh3);


// Create walls: 
const sideWallGeom = new THREE.BoxGeometry(3, 1.5, 0.1);
const sideWallMesh1 = new THREE.Mesh(sideWallGeom, marbleMaterial);
sideWallMesh1.rotation.set(Math.PI/2,0,0);
sideWallMesh1.position.set(-0.2,0.60,-0.75)
group.add(sideWallMesh1);

const sideWallMesh2 = new THREE.Mesh(sideWallGeom, marbleMaterial);
sideWallMesh2.rotation.set(Math.PI/2,0,0);
sideWallMesh2.position.set(-0.2,-0.60,-0.75)
group.add(sideWallMesh2);

const frontWallGeom = new THREE.BoxGeometry(1.2, 1.5, 0.1);
const frontWall1 = new THREE.Mesh(frontWallGeom, marbleMaterial);
frontWall1.rotation.set(Math.PI/2,Math.PI/2,0);
frontWall1.position.set(-1.65,0,-0.75);
group.add(frontWall1);


//doors
const doorGeom = new THREE.BoxGeometry(1.2, 0.6, 0.1);
const door1 = new THREE.Mesh(doorGeom, marbleMaterial);
door1.rotation.set(Math.PI/2,Math.PI/2,0);
door1.position.set(1.25,0,-1.2);
group.add(door1);

const sideGeom = new THREE.BoxGeometry(0.4, 1.1, 0.1);
const side11 = new THREE.Mesh(sideGeom, marbleMaterial);
side11.rotation.set(Math.PI/2,Math.PI/2,0);
side11.position.set(1.25,0.4,-0.6)
group.add(side11)

const side12 = new THREE.Mesh(sideGeom, marbleMaterial);
side12.rotation.set(Math.PI/2,Math.PI/2,0);
side12.position.set(1.25,-0.4,-0.6)
group.add(side12)

const door2 = new THREE.Mesh(doorGeom, marbleMaterial);
door2.rotation.set(Math.PI/2,Math.PI/2,0);
door2.position.set(0,0,-1.2);
group.add(door2);

const side21 = new THREE.Mesh(sideGeom, marbleMaterial);
side21.rotation.set(Math.PI/2,Math.PI/2,0);
side21.position.set(0,0.4,-0.6)
group.add(side21)

const side22 = new THREE.Mesh(sideGeom, marbleMaterial);
side22.rotation.set(Math.PI/2,Math.PI/2,0);
side22.position.set(0,-0.4,-0.6)
group.add(side22)


// Create columns: 
let columnMeshes = Array(8).fill().map(() => Array(18).fill(0));

const outer = new THREE.CylinderGeometry(0.075, 0.075, 1.5, 32); 
const inner = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 32); 
const smaller = new THREE.CylinderGeometry(0.03, 0.03, 1.5, 32); 
const colMaterial = new THREE.MeshPhongMaterial({color: 0xffffff}); 
colMaterial.map = columnTexture;


for(let i = 0; i<8; i++) {
    for(let j = 0; j < 17; j++) {
        if((j > 15 || j < 1) || (i > 6 || i < 1)) {
            columnMeshes[i][j] = new THREE.Mesh(outer, colMaterial); 
            columnMeshes[i][j].rotation.set(Math.PI/2,0,0);
            columnMeshes[i][j].position.set(-2.1+j*0.25,0.85-0.25*i,-0.75)
            group.add(columnMeshes[i][j]);
        } else if(j == 15 || ((j == 12 || j == 10) && (i == 2 || i == 5)) || j == 1) {
            columnMeshes[i][j] = new THREE.Mesh(inner, colMaterial); 
            columnMeshes[i][j].rotation.set(Math.PI/2,0,0);
            columnMeshes[i][j].position.set(-2.1+j*0.25,0.85-0.25*i,-0.75)
            group.add(columnMeshes[i][j]);
        } else if(((j > 3 && j < 14) && (i == 2 || i == 5)) || j == 4) {
            columnMeshes[i][j] = new THREE.Mesh(smaller, colMaterial); 
            columnMeshes[i][j].rotation.set(Math.PI/2,0,0);
            columnMeshes[i][j].position.set(-2.1+j*0.15,0.85-0.25*i,-0.75)
            group.add(columnMeshes[i][j]);
        }
        
    }
    
}


//Create roof

const shape = new THREE.Shape();

const x = 0;
const y = 0;

shape.moveTo(x - 1, y - 1);
shape.lineTo(x + 1, y - 1);
shape.lineTo(x, -.5);

const extrudeSettings = {
	steps: 2,
	depth: 4.25,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 0,
	bevelOffset: 0,
	bevelSegments: 0
};

const roofGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const roof = new THREE.Mesh(roofGeom,marbleMaterial);
roof.rotation.set(-Math.PI/2,Math.PI/2,0);
roof.position.set(-2.225,0,-2.75)
group.add(roof)


group.rotation.set(40,0,40)
scene.add(group)

// Lights
const lights = []; // Storage for lights
// const lightHelpers = []; // Storage for light helpers
// Properties for each light
const lightValues = [
    {colour: 0xFFFFFF, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
    {colour: 0xFFFFFF, intensity: 6, dist: 12, x: -2, y: 1, z: -10},
    {colour: 0xFFFFFF, intensity: 3, dist: 10, x: 0, y: 10, z: 1},
    {colour: 0xFFFFFF, intensity: 6, dist: 12, x: 0, y: -10, z: -1},
    {colour: 0xFFFFFF, intensity: 6, dist: 12, x: 10, y: 3, z: 0},
    {colour: 0xFFFFFF, intensity: 6, dist: 12, x: -10, y: -1, z: 0}
];
for (let i=0; i<6; i++) {
    // Loop 6 times to add each light to lights array
    // using the lightValues array to input properties
    lights[i] = new THREE.PointLight(
      lightValues[i]['colour'], 
      lightValues[i]['intensity'], 
      lightValues[i]['dist']
    );
  
    lights[i].position.set(
      lightValues[i]['x'], 
      lightValues[i]['y'], 
      lightValues[i]['z']
    );
  
    scene.add(lights[i]);

};
//Trackball Controls for Camera 
const controls = new TrackballControls(camera, renderer.domElement); 
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;

// Rendering Function
const rendering = function() {
    // Rerender every time the page refreshes (pause when on another tab)
    requestAnimationFrame(rendering);
// Update trackball controls
    controls.update();
    renderer.render(scene, camera);
}
rendering();