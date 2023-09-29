import './index.sass';

import { Spin } from 'antd';
import type { FC } from 'react';

const Loader: FC = () => (
	<div className='r-loader'>
		<Spin size='large' />
	</div>
);

export default Loader;
