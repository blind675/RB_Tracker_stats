export const firebaseConfig = {
	apiKey: 'AIzaSyCzenI1WpO2JBbltc3ARFKTCJyUumY-zkk',
	authDomain: 'rbtrack-ab0e9.firebaseapp.com',
	databaseURL: 'https://rbtrack-ab0e9.firebaseio.com',
	projectId: 'rbtrack-ab0e9',
	storageBucket: 'rbtrack-ab0e9.appspot.com',
	messagingSenderId: '381452575978',
	appId: '1:381452575978:web:9999b9c4b6d38967',
};

export const actionsOptions = [
	{ label: '', value: null },
	{ label: 'Stay', value: 'stay' },
	{ label: 'Walk', value: 'walk' },
	{ label: 'Car', value: 'car' },
	{ label: 'Bike', value: 'bike' },
	{ label: 'e-Bike', value: 'e-bike' },
	{ label: 'Scooter', value: 'scooter' },
	{ label: 'e-Scooter', value: 'e-scooter' },
	{ label: 'e-Board', value: 'rb' },
	{ label: 'e-Board Bad Road', value: 'rb-bad' },
];

export const csvHeader = [
	{ label: 'id', key: 'id' },
	{ label: 'x1', key: 'x1' },
	{ label: 'x2', key: 'x2' },
	{ label: 'x3', key: 'x3' },
	{ label: 'x4', key: 'x4' },
	{ label: 'x5', key: 'x5' },
	{ label: 'x6', key: 'x6' },
	{ label: 'x7', key: 'x7' },
	{ label: 'x8', key: 'x8' },
	{ label: 'x9', key: 'x9' },
	{ label: 'x10', key: 'x10' },
	{ label: 'x11', key: 'x11' },
	{ label: 'x12', key: 'x12' },
	{ label: 'x13', key: 'x13' },
	{ label: 'x14', key: 'x14' },
	{ label: 'x15', key: 'x15' },
	{ label: 'x16', key: 'x16' },
	{ label: 'x17', key: 'x17' },
	{ label: 'x18', key: 'x18' },
	{ label: 'x19', key: 'x19' },
	{ label: 'x20', key: 'x20' },
	{ label: 'x21', key: 'x21' },
	{ label: 'x22', key: 'x22' },
	{ label: 'x23', key: 'x23' },
	{ label: 'x24', key: 'x24' },
	{ label: 'x25', key: 'x25' },
	{ label: 'x26', key: 'x26' },
	{ label: 'x27', key: 'x27' },
	{ label: 'x28', key: 'x28' },
	{ label: 'x29', key: 'x29' },
	{ label: 'x30', key: 'x30' },
	{ label: 'y1', key: 'y1' },
	{ label: 'y2', key: 'y2' },
	{ label: 'y3', key: 'y3' },
	{ label: 'y4', key: 'y4' },
	{ label: 'y5', key: 'y5' },
	{ label: 'y6', key: 'y6' },
	{ label: 'y7', key: 'y7' },
	{ label: 'y8', key: 'y8' },
	{ label: 'y9', key: 'y9' },
	{ label: 'y10', key: 'y10' },
	{ label: 'y11', key: 'y11' },
	{ label: 'y12', key: 'y12' },
	{ label: 'y13', key: 'y13' },
	{ label: 'y14', key: 'y14' },
	{ label: 'y15', key: 'y15' },
	{ label: 'y16', key: 'y16' },
	{ label: 'y17', key: 'y17' },
	{ label: 'y18', key: 'y18' },
	{ label: 'y19', key: 'y19' },
	{ label: 'y20', key: 'y20' },
	{ label: 'y21', key: 'y21' },
	{ label: 'y22', key: 'y22' },
	{ label: 'y23', key: 'y23' },
	{ label: 'y24', key: 'y24' },
	{ label: 'y25', key: 'y25' },
	{ label: 'y26', key: 'y26' },
	{ label: 'y27', key: 'y27' },
	{ label: 'y28', key: 'y28' },
	{ label: 'y29', key: 'y29' },
	{ label: 'y30', key: 'y30' },
	{ label: 'z1', key: 'z1' },
	{ label: 'z2', key: 'z2' },
	{ label: 'z3', key: 'z3' },
	{ label: 'z4', key: 'z4' },
	{ label: 'z5', key: 'z5' },
	{ label: 'z6', key: 'z6' },
	{ label: 'z7', key: 'z7' },
	{ label: 'z8', key: 'z8' },
	{ label: 'z9', key: 'z9' },
	{ label: 'z10', key: 'z10' },
	{ label: 'z11', key: 'z11' },
	{ label: 'z12', key: 'z12' },
	{ label: 'z13', key: 'z13' },
	{ label: 'z14', key: 'z14' },
	{ label: 'z15', key: 'z15' },
	{ label: 'z16', key: 'z16' },
	{ label: 'z17', key: 'z17' },
	{ label: 'z18', key: 'z18' },
	{ label: 'z19', key: 'z19' },
	{ label: 'z20', key: 'z20' },
	{ label: 'z21', key: 'z21' },
	{ label: 'z22', key: 'z22' },
	{ label: 'z23', key: 'z23' },
	{ label: 'z24', key: 'z24' },
	{ label: 'z25', key: 'z25' },
	{ label: 'z26', key: 'z26' },
	{ label: 'z27', key: 'z27' },
	{ label: 'z28', key: 'z28' },
	{ label: 'z29', key: 'z29' },
	{ label: 'z30', key: 'z30' },
	{ label: 'label', key: 'label' },
];

export function newCSVRowFromLocationObject(location) {

	return {
		id: String(location.id),
		x1: String(location.accelerometerData[0].x),
		x2: String(location.accelerometerData[1].x),
		x3: String(location.accelerometerData[2].x),
		x4: String(location.accelerometerData[3].x),
		x5: String(location.accelerometerData[4].x),
		x6: String(location.accelerometerData[5].x),
		x7: String(location.accelerometerData[6].x),
		x8: String(location.accelerometerData[7].x),
		x9: String(location.accelerometerData[8].x),
		x10: String(location.accelerometerData[9].x),
		x11: String(location.accelerometerData[10].x),
		x12: String(location.accelerometerData[11].x),
		x13: String(location.accelerometerData[12].x),
		x14: String(location.accelerometerData[13].x),
		x15: String(location.accelerometerData[14].x),
		x16: String(location.accelerometerData[15].x),
		x17: String(location.accelerometerData[16].x),
		x18: String(location.accelerometerData[17].x),
		x19: String(location.accelerometerData[18].x),
		x20: String(location.accelerometerData[19].x),
		x21: String(location.accelerometerData[20].x),
		x22: String(location.accelerometerData[21].x),
		x23: String(location.accelerometerData[22].x),
		x24: String(location.accelerometerData[23].x),
		x25: String(location.accelerometerData[24].x),
		x26: String(location.accelerometerData[25].x),
		x27: String(location.accelerometerData[26].x),
		x28: String(location.accelerometerData[27].x),
		x29: String(location.accelerometerData[28].x),
		x30: String(location.accelerometerData[29].x),
		y1: String(location.accelerometerData[0].y),
		y2: String(location.accelerometerData[1].y),
		y3: String(location.accelerometerData[2].y),
		y4: String(location.accelerometerData[3].y),
		y5: String(location.accelerometerData[4].y),
		y6: String(location.accelerometerData[5].y),
		y7: String(location.accelerometerData[6].y),
		y8: String(location.accelerometerData[7].y),
		y9: String(location.accelerometerData[8].y),
		y10: String(location.accelerometerData[9].y),
		y11: String(location.accelerometerData[10].y),
		y12: String(location.accelerometerData[11].y),
		y13: String(location.accelerometerData[12].y),
		y14: String(location.accelerometerData[13].y),
		y15: String(location.accelerometerData[14].y),
		y16: String(location.accelerometerData[15].y),
		y17: String(location.accelerometerData[16].y),
		y18: String(location.accelerometerData[17].y),
		y19: String(location.accelerometerData[18].y),
		y20: String(location.accelerometerData[19].y),
		y21: String(location.accelerometerData[20].y),
		y22: String(location.accelerometerData[21].y),
		y23: String(location.accelerometerData[22].y),
		y24: String(location.accelerometerData[23].y),
		y25: String(location.accelerometerData[24].y),
		y26: String(location.accelerometerData[25].y),
		y27: String(location.accelerometerData[26].y),
		y28: String(location.accelerometerData[27].y),
		y29: String(location.accelerometerData[28].y),
		y30: String(location.accelerometerData[29].y),
		z1: String(location.accelerometerData[0].z),
		z2: String(location.accelerometerData[1].z),
		z3: String(location.accelerometerData[2].z),
		z4: String(location.accelerometerData[3].z),
		z5: String(location.accelerometerData[4].z),
		z6: String(location.accelerometerData[5].z),
		z7: String(location.accelerometerData[6].z),
		z8: String(location.accelerometerData[7].z),
		z9: String(location.accelerometerData[8].z),
		z10: String(location.accelerometerData[9].z),
		z11: String(location.accelerometerData[10].z),
		z12: String(location.accelerometerData[11].z),
		z13: String(location.accelerometerData[12].z),
		z14: String(location.accelerometerData[13].z),
		z15: String(location.accelerometerData[14].z),
		z16: String(location.accelerometerData[15].z),
		z17: String(location.accelerometerData[16].z),
		z18: String(location.accelerometerData[17].z),
		z19: String(location.accelerometerData[18].z),
		z20: String(location.accelerometerData[19].z),
		z21: String(location.accelerometerData[20].z),
		z22: String(location.accelerometerData[21].z),
		z23: String(location.accelerometerData[22].z),
		z24: String(location.accelerometerData[23].z),
		z25: String(location.accelerometerData[24].z),
		z26: String(location.accelerometerData[25].z),
		z27: String(location.accelerometerData[26].z),
		z28: String(location.accelerometerData[27].z),
		z29: String(location.accelerometerData[28].z),
		z30: String(location.accelerometerData[29].z),
		label: location.label,
	};
}
