import React from 'react';

import app from '../makeApp';

function renderResourceItem(item) {
	return (
		<div key={item.get('id')}>
			<div>{item.get('name')}: {item.get('quantity')}</div>
		</div>
	)
}

function Resources() {
	return (
		<div className="resources">
			Resources:
			{app.projections.resourcesRemaining().map(renderResourceItem)}
		</div>
	)
}

export default Resources;
