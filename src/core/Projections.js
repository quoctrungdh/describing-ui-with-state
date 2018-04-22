import Immutable from 'immutable';

const Projections = {};

Projections.resourcesRemaining = function(state) {
	const resourcesRemaining = this._resourcesRemainingMap(state);

	return Immutable.fromJS([
		{
			id: 'gold',
			name: 'Gold',
			quantity: resourcesRemaining.get('gold')
		},
		{
			id: 'supply',
			name: 'Supply',
			quantity: resourcesRemaining.get('supply')
		}
	])
}

Projections._resourcesRemainingMap = function (state) {
	return Immutable.Map({
		gold: state.getIn(['resources', 'gold']) - this._goldSpent(state),
		supply: state.getIn(['resources', 'supply']) - this._supplySpent(state)
	})
}

Projections._goldSpent = function(state) {
	return state.get('units').reduce((result, unit) => {
		return result + unit.get('cost') * unit.get('count');
	}, 0);
}

Projections._supplySpent = function(state) {
	return state.get('units').reduce((result, unit) => {
		return result + unit.get('count');
	}, 0);
}

export default Projections;
