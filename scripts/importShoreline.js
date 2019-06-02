const fs = require("fs-extra");
const earcut = require("earcut");
const shoreline = require("../data/shoreline.json");

const faces = [];
const lines = shoreline.geometries.map((line, index) => {
	console.log(`Line ${index}, ${line.coordinates.length} coords`);
	const scaledCoords = line.coordinates.map(scale);
	faces.push(earcut(scaledCoords.slice(0, 1000), null, 0));
	return scaledCoords;
});

fs.outputJSON("./shoreline.json", lines);
fs.outputJSON("./shorelineFaces.json", faces);

function scale(coordinates) {
	return [
		mapLinear(coordinates[1], 194479, 259992, 0, 65513) - 65513 / 2,
		0,
		mapLinear(coordinates[0], 978979, 1009996, 0, 31017) - 31017 / 2
	];
}

function mapLinear(x, a1, a2, b1, b2) {
	return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
}
