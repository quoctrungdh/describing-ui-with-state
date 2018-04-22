import State from './core/State';
import Actions from './core/Actions';
import Projections from './core/Projections';

import appFactory from './lib/appFactory';

const app = appFactory(State, Actions, Projections);

export default app;