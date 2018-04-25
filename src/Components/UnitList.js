import React from 'react';

import app from '../makeApp';

function renderUnit(unit) {
	return (
		<div key={unit.get('id')}>
			<div>{unit.get('name')}</div>
			<div>{unit.get('description')}</div>
			<div>{unit.get('cost')}</div>
			<div>
				<span
					style={{ opacity: unit.get('count') ? 1 : 0 }}
				>
					({unit.get('count')})
				</span>
				<button
					onClick={() => app.actions.select(unit.get('id'))}
					disabled={!unit.get('isSelectable')}
				>+</button>
				<button
					onClick={() => app.actions.remove(unit.get('id'))}
					disabled={!unit.get('isRemovable')}
				>-</button>
			</div>
		</div>
	)
}

function UnitList() {
	return (
		<div>
			Unit list:
			{app.projections.unitList().map(renderUnit).toArray()}
		</div>
	)
}

export default UnitList;
