import 'dayjs/locale/tk';

import { ConfigProvider } from 'antd';
import tkTK from 'antd/locale/tk_TK';
import dayjs from 'dayjs';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import ScrollToTop from '@/components/ScrollTop';
import { customTheme } from '@/plugins/antd';

import App from './App';
import store from './store';

dayjs.locale('tk');

ReactDOM.render(
	<StrictMode>
		<ConfigProvider locale={tkTK} theme={customTheme}>
			<Provider store={store}>
				<BrowserRouter>
					<div id='app'>
						<ScrollToTop />
						<App />
					</div>
				</BrowserRouter>
			</Provider>
		</ConfigProvider>
	</StrictMode>,
	document.getElementById('root')
);
