const fs = require('fs');

const buffer = fs.readFileSync('public/nike_shoe.glb');
const jsonChunkLength = buffer.readUInt32LE(12);
const jsonData = buffer.subarray(20, 20 + jsonChunkLength).toString('utf8');
const gltf = JSON.parse(jsonData);

console.log('--- GLTF STRUCTURE ---');
console.log('Nodes:', JSON.stringify(gltf.nodes, null, 2));
console.log('Meshes:', JSON.stringify(gltf.meshes, null, 2));
console.log('Materials:', JSON.stringify(gltf.materials, null, 2));
