'use strict';

const express = require('express');
const expect = require('chai').expect;
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

const ConvertHandler = require('./controllers/convertHandler.js');
const converter = new ConvertHandler();

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
	.get(function (_req, res) {
		res.sendFile(process.cwd() + '/views/index.html');
	});

app.route('/api/convert').get((req, res) => {
	const { input } = req.query;

	// extracting number from input
	let initNum;
	try {
		initNum = converter.getNum(input);
	} catch (_e) { }

	// extracting unit from input
	let initUnit;
	try {
		initUnit = converter.getUnit(input);
	} catch (_e) { }

	// Solving error case
	if (!initNum && !initUnit) res.send("invalid number and unit");
	else if (!initNum) res.send("invalid number");
	else if (!initUnit) res.send("invalid unit");
	else {
		const returnNum = converter.convert(initNum, initUnit);
		const returnUnit = converter.getReturnUnit(initUnit);
		const string = converter.getString(initNum, initUnit, returnNum, returnUnit);
		res.json({ initNum, initUnit, returnNum, returnUnit, string });
	}
})

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res, next) {
	res.status(404)
		.type('text')
		.send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
	console.log("Listening on port " + process.env.PORT);
	if (process.env.NODE_ENV === 'test') {
		console.log('Running Tests...');
		setTimeout(function () {
			try {
				runner.run();
			} catch (e) {
				let error = e;
				console.log('Tests are not valid:');
				console.log(error);
			}
		}, 1500);
	}
});

module.exports = app; //for testing
