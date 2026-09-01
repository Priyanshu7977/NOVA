const fs = require('fs');

// Read GLB header and JSON chunk
const buffer = fs.readFileSync('public/nike_shoe.glb');
const magic = buffer.readUInt32LE(0);
const version = buffer.readUInt32LE(4);
const length = buffer.readUInt32LE(8);
const jsonChunkLength = buffer.readUInt32LE(12);
const jsonChunkType = buffer.readUInt32LE(16);

if (jsonChunkType === 0x4E4F534A) {
  const jsonData = buffer.subarray(20, 20 + jsonChunkLength).toString('utf8');
  const gltf = JSON.parse(jsonData);
  console.log('Meshes:', gltf.meshes.map(m => m.name || 'unnamed'));
  console.log('Materials:', gltf.materials.map(m => m.name || 'unnamed'));
  console.log('Nodes:', gltf.nodes.map(n => n.name || 'unnamed'));
} else {
  console.log('Not standard GLB JSON chunk');
}
