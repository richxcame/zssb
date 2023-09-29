import { Layout } from 'antd';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import MainFooter from '@/components/MainFooter';
import MainHeader from '@/components/MainHeader';

const { Header, Content, Footer } = Layout;

const backColor = '#FCFCFC';

const Home: FC = () => (
	<Layout style={{ backgroundColor: backColor }}>
		<Header
			style={{
				backgroundColor: backColor,
			}}
		>
			<MainHeader />
		</Header>
		<Content>
			<Outlet />
		</Content>
		<Footer style={{ backgroundColor: backColor, padding: '8px' }}>
			<MainFooter />
		</Footer>
	</Layout>
);

export default Home;
