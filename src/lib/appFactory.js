import EventEmmitter from 'events';

const CHANGE_EVENT = 'change';

function appFactory(State, Actions, Projections) {
	let app = {};

	app._State = State;
	app._Actions = Actions;
	app._Projections = Projections;

	app = Object.assign(
		{},
		EventEmmitter.prototype,
		{
			emitChange: function() {
				this.emit(CHANGE_EVENT);
			},
			addChangeListener: function(callback) {
				this.on(CHANGE_EVENT, callback);
			},
			removeChangeListener: function(callback) {
				this.removeChangeListener(CHANGE_EVENT, callback)
			},
		}
	)

	app._state = State.initial();
	app.state = function() {
		return this.state;
	}

	app.reset = function() {
		this.state = State.initial()
	}

	app.actions = {};
	Object.keys(Actions).forEach(fnName => {
		app.actions[fnName] = function() {
			const args = Array.prototype.slice.call(arguments);
			args.unshift(app._state);
			app._state = Actions[fnName].apply(Actions, args);
			app.emitChange();
		}
	});

	app.projections = {};
	Object.keys(Projections).forEach(fnName => {
		app.projections[fnName] = function() {
			const args = Array.prototype.slice.call(arguments);
			args.unshift(app._state);
			return Projections[fnName].apply(Projections, args);
		}
	});

	return app;
}

export default appFactory;
