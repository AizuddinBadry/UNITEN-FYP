import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'Core/main'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Main/>, document.getElementById('main'));
registerServiceWorker();
