const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { AssertionError } = require('chai');

chai.use(chaiHttp);

suite('Functional Tests', () => {
	suite('Integration test with chai-http', () => {
		// #1
		test('Valid input conversion', done => {
			chai
				.request(server)
				.get('/api/convert?input=10L')
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.type, 'application/json');
					assert.equal(res.body.initNum, 10);
					assert.equal(res.body.initUnit, 'L');
					assert.equal(res.body.returnNum, 2.64172);
					assert.equal(res.body.returnUnit, 'gal');
					assert.equal(res.body.string,
						"10 liters converts to 2.64172 gallons");

					done();
				})
		});

		// #2
		test('Invalid number conversion', done => {
			chai
				.request(server)
				.get('/api/convert?input=12/3.4/1kg')
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.type, 'text/html');
					assert.equal(res.text, 'invalid number');

					done();
				})
		});

		// #3
		test('Invalid unit conversion', done => {
			chai
				.request(server)
				.get('/api/convert?input=5g')
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.type, 'text/html');
					assert.equal(res.text, 'invalid unit');

					done();
				})
		});

		// #4
		test('Invalid number and unit conversion', done => {
			chai
				.request(server)
				.get('/api/convert?input=1.2/3/4.2gl')
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.type, 'text/html');
					assert.equal(res.text, 'invalid number and unit');

					done();
				})
		});

		// #5
		test('Valid input conversion', done => {
			chai
				.request(server)
				.get('/api/convert?input=gal')
				.end((err, res) => {
					assert.equal(res.status, 200);
					assert.equal(res.type, 'application/json');
					assert.equal(res.body.initNum, 1);
					assert.equal(res.body.initUnit, 'gal');

					done();
				})
		});
	})
});
