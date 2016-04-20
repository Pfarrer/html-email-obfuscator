var htmlencode = require('htmlencode');
var rot = require('rot');

module.exports.obfuscate = function (email) {
	email = htmlencode.htmlEncode(email);

	var atIndex = email.indexOf('@');
	if (atIndex === -1) return email;
	
	email = email.replace('@', '');
	email = rot(email);
	
	return email + '/' + atIndex;
};

function extractIndexAndRotEmail(obfuscated) {
	var slashIndex = obfuscated.lastIndexOf('/');
	if (slashIndex === -1) return null;
	
	var rotEmail = obfuscated.substr(0, slashIndex);
	var index = +obfuscated.substr(slashIndex+1);
	return [rotEmail, index];
}

module.exports.asHtmlScript = function (email) {
	var obfuscated = module.exports.obfuscate(email);
	var res = extractIndexAndRotEmail(obfuscated);
	var rotMail = res[0];
	var atIndex = res[1];
	
	return '<script>'
		+ 'var action=":otliam".split("").reverse().join("");'
		+ 'var href="'+rotMail+'".replace(/[a-zA-Z]/g, function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});'
		+ 'href=href.substr(0, '+atIndex+') + String.fromCharCode(4*2*2*4) + href.substr('+atIndex+');'
		+ 'var a = "<a href=\""+action+href+"\">"+href+"</a>";'
		+ 'document.write(a);'
		+ '</script>';
};

module.exports.unobfuscate = function (obfuscated) {
	var res = extractIndexAndRotEmail(obfuscated);
	if (res === null) return null;
	
	var atIndex = res[1];
	var email = rot(res[0]);
	return email.substr(0, atIndex) + '@' + email.substr(atIndex);
};
