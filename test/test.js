var expect = require('chai').expect;
var emailObfuscator = require('../index');

describe('obfuscate', function() {
	var obfuscated = emailObfuscator.obfuscate('mail@example.com');

	it('should not contain a @', function () {
		expect(obfuscated).not.to.match(/@/);
	});
	
	it('should contain a /', function () {
		expect(obfuscated).to.match(/\//);
	});
});

describe('asHtmlScript', function() {
	var obfuscated = emailObfuscator.asHtmlScript('mail@example.com');

	it('should return script tags', function () {
		expect(obfuscated).to.match(/<script>/);
		expect(obfuscated).to.match(/<\/script>/);
	});
});

describe('unobfuscate', function() {
	it('should return original email', function () {
		var email = 'mail@example.com';
		var obfuscated = emailObfuscator.obfuscate(email);
		var original = emailObfuscator.unobfuscate(obfuscated);
		expect(original).to.equal(email);
	});
});
