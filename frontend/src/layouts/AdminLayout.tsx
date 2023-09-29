import '@/styles/AdminLayout.sass';

import {
	ApartmentOutlined,
	AppleOutlined,
	CameraOutlined,
	InfoCircleOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	NotificationOutlined,
	UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Layout, Menu, Row, Select, Space, theme } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import type { FC } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import logo from '@/assets/logo.svg';
// import logoURL from '@/assets/tff.svg';

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
			key: '/admin/categories',
			label: <Link to='/admin/category'> Bölümler </Link>,
			icon: <ApartmentOutlined />
		},
		{
			key: '/admin/products',
			label: <Link to='/admin/products'> {t('product')} </Link>,
			icon: <AppleOutlined />
		},
		{
			key: 'news',
			label: t('news'),
			icon: <NotificationOutlined />
		},
		{
			key: 'media',
			label: t('media'),
			icon: <CameraOutlined />
		},
		{
			key: 'aboutUs',
			label: t('aboutUs'),
			icon: <InfoCircleOutlined />
			// children: [
			// 	{
			// 		key: '/admin/stadiums',
			// 		label: t('stadium', { count: 2 })
			// 	},
			// 	{ key: '/admin/referees', label: t('referee', { count: 2 }) },
			// 	{ key: '/admin/employees', label: t('employee', { count: 2 }) }
			// ]
		}
	];

	const onSelectLang = (value: string) => {
		localStorage.setItem('I18N_LANGUAGE', value);
		i18n.changeLanguage(value);
	};

	const contentStyle = {
		backgroundColor: token.colorBgElevated,
		borderRadius: token.borderRadiusLG,
		boxShadow: token.boxShadowSecondary
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
						<img src={logo} alt='' title='' className='r-logo' style={{ height: '200px' }} />{' '}
					</a>
				</div>
				<Menu
					selectedKeys={[
						location.pathname + (searchParams.get('is_article') ? '?is_article=true' : '')
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
