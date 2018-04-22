import Immutable from 'immutable';

import State from './State';
import Actions from './Actions';
import Projections from './Projections';

describe('Projections.resourcesRemaining', () => {
	it('should return the correct resourcesRemaining', () => {
		let state = State.initial();

		state = Actions.select(state, 'archer');

		const projectionValues = Projections.resourcesRemaining(state);

		const expectedProjectionValues = Immutable.fromJS([
			{
				id: 'gold',
				name: 'Gold',
				quantity: 1360
			},
			{
				id: 'supply',
				name: 'Supply',
				quantity: 9
			}
		])

		expect(projectionValues).toEqual(expectedProjectionValues)
	})
})
