function arrayEquals(arr1, arr2) {
	if (arr1.length !== arr2.length) {
		return false;
	}

	for (var i = arr1.length; i--;) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}

	return true;
}

function setState(state, serverState){
	return Object.assign({},state, serverState);
}

function resetState(state, mergedState) {

	console.log('enters');
	if (!state.vote || !mergedState.vote) {
		return mergedState;
	}



	var pair = state.vote.pair;
	var oldPair = mergedState.vote.pair;

	if (mergedState.hasOwnProperty('hasVoted') && !arrayEquals(pair, oldPair)) {
		delete mergedState.hasVoted;
	}

	return mergedState;
}

function findIfExists(arr, item) {
	var index = arr.findIndex(function(element){
		return element === item;
	});
	if (index === -1) {
		return false;
	} else {
		return true;
	}
}

function vote(state,select){
	var pair = state.vote.pair;
	
	var exists = false;
	
	exists = findIfExists(pair,select);
	
	if (!exists) {
		return state;
	} else {
		return Object.assign({},state,{hasVoted:select});
	}
}

module.exports = {
	vote : vote,
	resetState: resetState,
	setState : setState
};