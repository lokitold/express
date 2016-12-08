function getVotes(stateVote, entry){
	if(stateVote.tally && stateVote.tally.hasOwnProperty(entry)){
		return stateVote.tally[entry];
	}
	return 0;
}

function renderResults(state) {
	var results = '';

	if (state.winner) {
		results += (
			'<div>' + 
				'Ha ganado ' + state.winner +
			'</div>'
		);
	} else if (state.vote) {
		var pair = state.vote.pair;

		pair.forEach(function(entry){
			results += (
				'<div>' +
					entry + ': ' + getVotes(state.vote, entry) +
				'</div>'
			);
		});

		results += (
			'<button class="js-next">' +
				'next' +
			'</button>'
		);
	} else {
		results += (
			'<div>lo sentimos no hay votación activa</div>'
		);
	}

	var content = $('#results');

	if (content.length){
		content.empty();
		content.append(results);
	}
}

module.exports= renderResults;