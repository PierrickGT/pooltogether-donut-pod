import 'dayjs/locale/fr';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import Root from 'app/Root';

import './index.css';

ReactModal.setAppElement('#root');

ReactDOM.render(<Root />, document.getElementById('root'));
