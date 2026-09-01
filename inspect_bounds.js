const fs = require('fs');

// Inspect mesh vertices min/max from GLB
const buffer = fs.readFileSync('public/nike_shoe.glb');
const jsonChunkLength = buffer.readUInt32LE(12);
const jsonData = buffer.subarray(20, 20 + jsonChunkLength).toString('utf8');
const gltf = JSON.parse(jsonData);

console.log('Accessors count:', gltf.accessors.length);
gltf.accessors.forEach((acc, i) => {
  if (acc.min && acc.max) {
    console.log(`Accessor ${i} (${acc.type}): min=${JSON.stringify(acc.min)}, max=${JSON.stringify(acc.max)}`);
  }
});
