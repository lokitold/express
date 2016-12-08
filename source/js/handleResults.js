var store = require('./start').store;

module.exports = function () {
	var content = $('#results');
	console.log('tst');
	if (content.length) {
		console.log('tst');
		content.on('click', '.js-next', function () {
			console.log('tst');
			store.dispatch({
				meta: {remote: true},
				type: 'NEXT',
			});
		});
	}
}