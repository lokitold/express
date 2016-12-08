function renderVote(state) {
	if (!state.vote) {
		var mount = $('#options-mount');

		if (mount.length) {
			mount.append('<div>lo sentimos no hay votación activa</div>');
		 }

		 return null;
	}

	var pair = state.vote.pair;
	var options = '';

	var votedEntry = state.hasVoted;

	var disabled = votedEntry
		? 'disabled style="opacity:0.5"'
		: '';

	pair.forEach(function (ele) {
		var voted = ele === votedEntry
			? '<i  class="fa fa-check-circle fa-2x" ></i>'
			: '';

		options += (
			'<button type="button" class="opciones js-option" data-option="' + ele +'" ' + disabled + '>' +
				voted +
				ele +
			'</button>'
		);
	});

	var mount = $('#options-mount');

	if (mount.length) {
		mount.empty();
		mount.append(options);
	}
};

module.exports = renderVote;
