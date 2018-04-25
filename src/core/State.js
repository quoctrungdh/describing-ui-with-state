import Immutable from 'immutable';

const initState = {
	resources: { gold: 1500, supply: 10 },
	sort: 'cost',
	units: {
		footman: {
			count: 0,
			name: 'Footman',
			description: 'Basic infratry unit',
			cost: 120,
			attack: 7,
			hp: 50
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
			name: 'Pikeman',
			description: 'Spear-wielding light infratry, strong vs cavalry',
			cost: 140,
			attack: 5,
			hp: 40,
			bonud: {
				light: 4
			}
		},
		knight: {
			count: 0,
			name: 'Knight',
			description: 'Heavy-armored cavalry unit, strong vs ranged',
			cost: 260,
			attack: 12,
			hp: 160,
			bonus: {
				ranged: 4
			}
		}
	}
}

const State = {};

State.initial = function() {
	return Immutable.fromJS(initState)
}

export default State;
