import Immutable from 'immutable';

const initState = {
	resources: { gold: 1500, supply: 10 },
	sort: 'cost',
	units: {
		footman: {
			count: 0,
			name: '',
			description: '',
			cost: 0,
			attack: 0,
			hp: 0
		},
		archer: {
			count: 0,
			name: 'Archer',
			description: 'Ranged unit, strong vs light armor',
			cost: 140,
			attack: 5,
			hp: 40,
			bonus: {
				light: 4
			}
		},
		pikeman: {
			count: 0,
			name: '',
			description: '',
			cost: 0,
			attack: 0,
			hp: 0
		},
		knight: {
			count: 0,
			name: '',
			description: '',
			cost: 0,
			attack: 0,
			hp: 0
		}
	}
}

const State = {};

State.initial = function() {
	return Immutable.fromJS(initState)
}

export default State;
