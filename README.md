email-obfuscator for Node.js
============================

This module combines some Email obfuscation technics in the browser.

 * The @ char is removed and only its index is passed on. It will be reinserted using the expression String.fromCharCode(4*2*2*4).
 * The address itself will be transmitted as a ROT13 transformed string which will be retransformed by Javascript.


Usage
-----

The Email address "mail@example.com" will result in the following string:

```js
var emailObfuscator = require('email-obfuscator');

var obfuscated = emailObfuscator.obfuscate('mail@example.com');
// obfuscated = 'znvyrknzcyr.pbz/4'

var htmlScript = emailObfuscator.asHtmlScript('mail@example.com');
// htmlScript = '<script type="text/javascript">
	var action=":otliam".split("").reverse().join("");
	var href="znvyrknzcyr.pbz".replace(/[a-zA-Z]/g, function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
	href=href.substr(0, 4) + String.fromCharCode(4*2*2*4) + href.substr(4);
	var a = "<a href=\""+action+href+"\">"+href+"</a>";
	document.write(a);
	</script>'

var original = emailObfuscator.unobfuscate(obfuscate);
// original = 'mail@example.com'
```

Installation
------------

```
npm install --save email-obfuscator
```
