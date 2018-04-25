import React from 'react';

import app from '../makeApp';

function renderItem(item) {
	return (
		<div key={item.get('id')}>
			{item.get('name')}: {item.get('count')}
		</div>
	)
}

function ArmySummary() {
	return (
		<div>
			Summary:
			{app.projections.armySummary().map(renderItem).toArray()}
		</div>
	)
}

export default ArmySummary;
