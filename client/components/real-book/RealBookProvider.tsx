import React from 'react';
import store from './store';
import {Provider} from 'react-redux';
import RealBook from './RealBook';

const RealBookProvider: React.FunctionComponent = () => <Provider store={store}><RealBook /></Provider>;

export default RealBookProvider;
