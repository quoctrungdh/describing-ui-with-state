import React from 'react';

import app from '../makeApp';

const RECT_HEIGHT = 20;
const RECT_MARGIN = 5;

function xScale(x) {
	return x*100 - 50;
}

function yScale(y) {
	return y*(RECT_HEIGHT + RECT_MARGIN);
}

function renderItem(item, index) {
	return (
		<g key={item.get('id')}>
			<text
				x="0"
				y={yScale(index)}
				dy="15"
			>
				{` vs ${item.get('id')}`}
			</text>
			<rect
				x="80"
				y={yScale(index)}
				width={xScale(item.get('value'))}
				height={RECT_HEIGHT}
			/>
		</g>
	)
}

function ArmyBalance() {
	return (
		<div> 
			<h3>
				Army balance
			</h3>
			<svg>
				{app.projections.armyBalance().map(renderItem).toArray()}
			</svg>
		</div>
	)
}

export default ArmyBalance;
