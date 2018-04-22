import Immutable from 'immutable';
import Actions from './Actions';

describe('Actions.select', () => {
	it('should increase the correct selected unit', () => {
		const state = Immutable.fromJS({
			units: {
				archer: {
					count: 0
				}
			}
		});

		const expectedStateAfterSelect = Immutable.fromJS({
			units: {
				archer: {
					count: 1
				}
			}
		});

		expect(Actions.select(state, 'archer')).toEqual(expectedStateAfterSelect);
	});
})

describe('Actions.remove', () => {
	it('should increase the correct selected unit', () => {
		const state = Immutable.fromJS({
			units: {
				archer: {
					count: 1
				}
			}
		});

		const expectedStateAfterSelect = Immutable.fromJS({
			units: {
				archer: {
					count: 0
				}
			}
		});

		expect(Actions.remove(state, 'archer')).toEqual(expectedStateAfterSelect);
	});
})

describe('Actions.reset', () => {
	it('should set the count of all units to 0', () => {
		const state = Immutable.fromJS({
			units: {
				archer: {
					count: 1
				},
				knight: {
					count: 2
				}
			}
		});

		const expectedResetState = Immutable.fromJS({
			units: {
				archer: {
					count: 0
				},
				knight: {
					count: 0
				}
			}
		});

		expect(Actions.reset(state)).toEqual(expectedResetState);
	});
})

describe('Actions.sort', () => {
	it('should set the sort', () => {
		const state = Immutable.fromJS({
			sort: 'cost'
		})

		const updatedStateAfterSetSort = Immutable.fromJS({
			sort: 'name'
		})

		expect(Actions.sort(state, 'name')).toEqual(updatedStateAfterSetSort);
	})
})