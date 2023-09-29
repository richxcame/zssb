import '@/styles/AdminLayout.sass';

import {
	ApartmentOutlined,
	CameraOutlined,
	InfoCircleOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	NotificationOutlined,
	UserOutlined,
	UserSwitchOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Layout, Menu, Row, Select, Space, theme } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import type { FC } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import logoURL from '@/assets/tff.svg';

const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { useToken } = theme;

const AdminLayout: FC = () => {
	const { t, i18n } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();
	const { token } = useToken();
	const [collapsed, setCollapsed] = useState(false);
	const [searchParams, _] = useSearchParams();
	const [__, ___, removeCookie] = useCookies(['access_token', 'refresh_token']);

	const menus: ItemType[] = [
		{
			key: '',
			label: t('match'),
			icon: <ApartmentOutlined />,
			children: [
				{
					key: '/admin/competitions',
					label: t('competition', { count: 2 }),
				},
				{ key: '/admin/teams', label: t('team', { count: 2 }) },
				{ key: '/admin/tours', label: t('tour', { count: 2 }) },
				{ key: '/admin/matches', label: t('match', { count: 2 }) },
			],
		},
		{
			key: 'news',
			label: t('news', { count: 2 }),
			icon: <NotificationOutlined />,
			children: [
				{
					key: `/admin/news?is_article=true`,
					label: t('article', { count: 2 }),
				},
				{ key: '/admin/news', label: t('news', { count: 2 }) },
			],
		},
		{
			key: 'media',
			label: t('media'),
			icon: <CameraOutlined />,
			children: [
				{ key: '/admin/sliders', label: t('slider', { count: 2 }) },
				{ key: '/admin/albums', label: t('album', { count: 2 }) },
				{ key: '/admin/videos', label: t('video', { count: 2 }) },
			],
		},
		{
			key: 'nationalTeam',
			label: t('nationalTeam', { count: 2 }),
			icon: <UserSwitchOutlined />,
			children: [
				{
					key: '/admin/national-teams',
					label: t('nationalTeam', { count: 2 }),
				},
			],
		},
		{
			key: 'aboutUs',
			label: t('aboutUs'),
			icon: <InfoCircleOutlined />,
			children: [
				{
					key: '/admin/stadiums',
					label: t('stadium', { count: 2 }),
				},
				{ key: '/admin/referees', label: t('referee', { count: 2 }) },
				{ key: '/admin/employees', label: t('employee', { count: 2 }) },
			],
		},
	];

	const onSelectLang = (value: string) => {
		localStorage.setItem('I18N_LANGUAGE', value);
		i18n.changeLanguage(value);
	};

	const contentStyle = {
		backgroundColor: token.colorBgElevated,
		borderRadius: token.borderRadiusLG,
		boxShadow: token.boxShadowSecondary,
	};

	const logout = () => {
		sessionStorage.removeItem('access_token');
		sessionStorage.removeItem('refresh_token');
		removeCookie('access_token');
		removeCookie('refresh_token');
		navigate('/');
	};

	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed} width={200} className='r-sider'>
				<div className='r-logo-area'>
					<a href='/'>
						<img src={logoURL} alt='TFF' title='TFF' className='r-logo' />
					</a>
				</div>
				<Menu
					selectedKeys={[
						location.pathname + (searchParams.get('is_article') ? '?is_article=true' : ''),
					]}
					onSelect={({ key }) => {
						navigate(key);
					}}
					mode='inline'
					style={{ height: '100%', borderRight: 0 }}
					items={menus}
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, backgroundColor: 'white' }}>
					<Row>
						<Col span={2}>
							<Button type='text' className='trigger' onClick={() => setCollapsed(!collapsed)}>
								{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							</Button>
						</Col>
						<Col offset={19} span={2} style={{ display: 'flex', justifyContent: 'center' }}>
							<span>
								<Select defaultValue={i18n.language} onChange={onSelectLang}>
									<Option value='tk'>TK</Option>
									<Option value='en'>EN</Option>
									<Option value='ru'>RU</Option>
								</Select>
							</span>
						</Col>
						<Col span={1}>
							<Dropdown
								dropdownRender={() => (
									<div style={contentStyle}>
										<Space style={{ padding: 8 }}>
											<Button danger color='error' type='primary' onClick={() => logout()}>
												Logout
											</Button>
										</Space>
									</div>
								)}
								placement='topRight'
							>
								<Avatar style={{ backgroundColor: '#429941' }} icon={<UserOutlined />} />
							</Dropdown>
						</Col>
					</Row>
				</Header>

				<Content>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;
