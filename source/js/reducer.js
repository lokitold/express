var core = require('./core');
function reducer(state, action) {
	if (typeof state === 'undefined') {
    	return {
			vote: null,
		};
  	}
	
	switch(action.type){
		case 'SET_STATE' : 
			return core.resetState(state, core.setState(state, action.state));
		case 'VOTE'	:
			return core.vote(state,action.select);
	}
	
	return state;
}

module.exports = reducer;