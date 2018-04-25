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

Projections.unitList = function(state) {
	const units = this._unitListFromMap(state);
	const sortedUnits = this._unitListSorted(state, units)
	const flaggedUnits = this._unitListFlagged(state, sortedUnits);
	return flaggedUnits;
}

Projections._unitListFromMap = function(state) {
	return state.get('units')
		.map((unit, key) => unit.set('id', key))
		.toList();
}

Projections._unitListSorted = function(state, units) {
	const sortType = state.get('sort');
	return units.sortBy(unit => unit.get(sortType));
}

Projections._unitListFlagged = function(state, units) {
	const resourcesRemaining = this._resourcesRemainingMap(state);
	const goldRemaining = resourcesRemaining.get('gold');
	const supplyRemaining = resourcesRemaining.get('supply');

	return units.map((unit) => {
		return unit.merge({
			isRemovable: unit.get('count') > 0,
			isSelectable: goldRemaining >= unit.get('cost') && supplyRemaining > 0
		})
	})
}

Projections.armySummary = function(state) {
	const armyList = this._unitListFromMap(state);
	const sortedArmyList = this._unitListSorted(state, armyList);
	const filteredArmyList = this._unitListSelected(sortedArmyList);
	return this._unitListSummary(filteredArmyList);
}

Projections._unitListSelected = function(units) {
	return units.filter((unit) => {
		return unit.get('count') > 0
	});
}

Projections._unitListSummary = function(units) {
	return units.map((unit) => {
		return Immutable.Map({
			id: unit.get('id'),
			name: unit.get('name'),
			count: unit.get('count')
		})
	})
}

Projections.armyBalance = function(state) {
	const base = this._totalAttack(state);
	console.log(base)
	return Immutable.fromJS([
		{
			id: 'light',
			value: this._attackBalance(base, this._totalAttack(state, 'light'))
		},
		{
			id: 'ranged',
			value: this._attackBalance(base, this._totalAttack(state, 'ranged'))
		},
		{
			id: 'cavalry',
			value: this._attackBalance(base, this._totalAttack(state, 'cavalry'))
		}
	]);
}

Projections._totalAttack = function(state, type) {
	return state.get('units')
		.map((unit) => {
			let bonus = 0;

			if(type) {
				bonus = unit.getIn(['bonus', type], 0);
			}

			return (unit.get('attack') + bonus) * unit.get('count');
		})
		.reduce((result, value) => {
			console.log(value, 'value')
			return result + value;
		}, 0);
}

Projections._attackBalance = function(base, attack) {
	if (base === 0) {
		return 1;
	}

	return Math.round(attack/base*100)/100;
}

export default Projections;
