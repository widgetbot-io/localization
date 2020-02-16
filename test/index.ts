import { Localization } from "../src";

(async () => {
	await Localization.setup({
		languageLocation: `${__dirname}/languages`,
		languages: {
			en: {
				'ping.start': 'Ping',
				ping: 'Pong! My ping to discord is {PING1} and to my gateway is: {PING2}',
				'hello.world': 'lmfao GANG GANG GANG U GET ME'
			}
		},
		autoSetup: true
	});

	console.log(Localization.translate('en', 'hello.world'));
})();
