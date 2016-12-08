var redux = require('redux');
var createLogger = require('redux-logger');
var reducer = require('./reducer');
var socket = require('socket.io-client')('http://socket-io-laboratoria.herokuapp.com/');
var remoteActionsMiddleware = require('./middleware');

var logger = createLogger();

var store = redux.createStore(reducer, redux.applyMiddleware(logger, remoteActionsMiddleware(socket)));

var renderVote = require('./renderVote');
var renderResults = require('./renderResults');

store.subscribe(function () {
	renderVote(store.getState());
	renderResults(store.getState());
});

function listen() {
	socket.on('state', function(state){
		store.dispatch({
			type:'SET_STATE',
			state : state
		});
	});
}

module.exports = {
	listen:listen,
	store:store
};
