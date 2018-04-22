const Actions = {};

Actions.select = function(state, unit) {
	return state.updateIn(['units', unit, 'count'], 0, (count) => {
		return count + 1;
	});
}

Actions.remove = function(state, unit) {
	return state.updateIn(['units', unit, 'count'], 0, (count) => {
		return count - 1;
	})
}

Actions.reset = function(state) {
	return state.update('units', (units) => {
		return units.map(unit => unit.set('count', 0));
	});
}

Actions.sort = function(state, sort) {
	return state.set('sort', sort);
}

export default Actions;
