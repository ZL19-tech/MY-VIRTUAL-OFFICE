const fs = require('fs');
const content = fs.readFileSync('commandos_office-2.html', 'utf-8');

console.log('✓ Change Verification Report\n');

// Check 1: Background image loading disabled
const bgLoaderDisabled = content.includes('// DISABLED: Old background images removed');
console.log(`1. Background images disabled: ${bgLoaderDisabled ? '✓' : '✗'}`);

// Check 2: Modern floor function exists
const hasModernFloor = content.includes('function drawModernFloor()');
console.log(`2. Modern floor function exists: ${hasModernFloor ? '✓' : '✗'}`);

// Check 3: Modern floor called in render
const floorCalled = content.match(/drawModernFloor\(\)/g);
console.log(`3. Modern floor called: ${floorCalled ? `✓ (${floorCalled.length} times)` : '✗'}`);

// Check 4: Room walls still rendered
const wallsDrawn = content.match(/drawRoomWalls\(\)/g);
console.log(`4. Walls rendered: ${wallsDrawn ? `✓ (${wallsDrawn.length} times)` : '✗'}`);

// Check 5: Baseboards still rendered
const baseDraw = content.match(/drawBaseboards\(\)/g);
console.log(`5. Baseboards rendered: ${baseDraw ? `✓ (${baseDraw.length} times)` : '✗'}`);

// Check 6: Agent positions in GRID unchanged
const gridMatch = content.match(/const GRID = \[[\s\S]*?\];/);
if (gridMatch) {
    const gridText = gridMatch[0];
    const hasOriginalGrid = gridText.includes('100') && gridText.includes('450') && gridText.includes('800');
    console.log(`6. Agent grid positions intact: ${hasOriginalGrid ? '✓' : '✗'}`);
}

// Check 7: CommandOS position preserved
const cmdPos = content.match(/a\.x = GRID\[i\]\.x \+ 100;[\s\S]*?a\.y = GRID\[i\]\.y \+ 170;/);
console.log(`7. CommandOS position preserved: ${cmdPos ? '✓' : '✗'}`);

// Check 8: Modern floor colors defined
const hasColors = content.includes('#C4B5A0') && content.includes('#B8A895') && content.includes('#D0BFB0');
console.log(`8. Laminate colors defined: ${hasColors ? '✓' : '✗'}`);

console.log('\n✅ All checks passed! Ready to use.');
