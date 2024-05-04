System.register(['./dedee2c334.5d050.js'], function (exports, imports) {
	'use strict';
	return {
		setters: [function (module) {}],
		execute: function () {
			var builtinBundles = JSON.parse('{"folder":"builtins","bundleVers":{"internal":{"index":"4055b","config":"11dec"}}}');
            cc &&
                (cc._builtins = Object.assign(
                    { url: imports.meta.url },
                    builtinBundles
                ));
			exports('_$meta', { name: '0bc343f586', alias: 'CAkQC3zGzpbHxIeACsdNEwfEx4JKg', version: '6.3.0-rc.1' });
		}
	};
});
