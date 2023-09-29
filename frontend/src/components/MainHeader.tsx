import { MenuOutlined, UnorderedListOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Col, Drawer, Dropdown, Menu, notification, Row, Space } from 'antd';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useMatch, useResolvedPath } from 'react-router-dom';

import logoURL from '@/assets/cotton-natural-logo-vector.svg';
import LanguageSelect from '@/components/LanguageSelect';
import { getCategories } from '@/services/category';
import { setCategories } from '@/store/category/categorySlice';
import { useAppDispatch } from '@/store/hooks';

type MenuItem = Required<MenuProps>['items'][number];

const MainHeader: FC = () => {

	

	const { t } = useTranslation();
	const location = useLocation();
	const resolved = useResolvedPath(location);
	const match = useMatch({ path: resolved.pathname, end: true });
	const dispatch = useAppDispatch();

	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		const abortController = new AbortController();

		const fetchData = async () => {
			try {
				const categoriesRes = await getCategories(undefined, { signal: abortController.signal });
				dispatch(setCategories(categoriesRes.data.categories));
			} catch (err) {
				notification.error({
					message: 500,
					description: t('couldNotFetch'),
				});
			}
		};

		fetchData();

		return () => {
			abortController.abort();
		};
	}, []);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	const createMenuItem = (
		label: ReactNode,
		key: string,
		icon?: ReactNode,
		children?: MenuItem[]
	): MenuItem =>
		({
			label: children?.length ? (
				label
			) : (
				<Link onClick={() => onClose()} to={key}>
					{label}
				</Link>
			),
			key,
			icon,
			children,
		} as MenuItem);

	const items: MenuItem[] = [
		createMenuItem(t('aboutUs'), 'aboutUs', null, [
			createMenuItem(t('mainAim'), '/about-us'),
			createMenuItem(t('stadium', { count: 2 }), '/stadiums'),
			createMenuItem(t('referee', { count: 2 }), '/referees'),
			createMenuItem(t('employee', { count: 2 }), '/employees'),
		]),
		createMenuItem(t('news', { count: 2 }), 'news', null, [
			createMenuItem(t('news', { count: 2 }), '/news'),
			createMenuItem(t('article', { count: 2 }), '/news?is_article=true'),
		]),
		createMenuItem(t('category', { count: 2 }), '/categories', null),
		createMenuItem(t('service', { count: 2 }), '/services', null),
		createMenuItem(t('media', { count: 2 }), '/media', null, [
			createMenuItem(t('album', { count: 2 }), '/albums'),
			createMenuItem(t('video', { count: 2 }), '/videos'),
		]),
		createMenuItem(t('contactUs', { count: 2 }), '/contact-us', null),
	];

	const categoryItems: MenuProps['items'] = [];

	const mediaItems: MenuProps['items'] = [
		{
			key: 'albums',
			label: <a href='/albums'>{t('album', { count: 2 })}</a>,
		},
		{
			key: 'videos',
			label: <a href='/videos'>{t('video', { count: 2 })}</a>,
		},
	];

	return (
		<Row className='container'>
			<Col xs={0} lg={2}>
				{/*  */}
			</Col>
			<Col span={24} lg={20}>
				<Row>
					<Col span={2} lg={0}>
						<LanguageSelect />
					</Col>

					<Col span={0} lg={1} />

					<Col span={0} lg={3} style={{ textAlign: 'center' }}>
						<Dropdown menu={{ items: categoryItems }} placement='bottom'>
							<div>
								<UnorderedListOutlined />
								<Button type='text' size='small'>
									{t('category', { count: 2 })}
								</Button>
							</div>
						</Dropdown>
						{/* <Link
							to='/categories'
							style={{ color: match?.pathname === '/categories' ? '#429941' : 'black' }}
						>
							<Space>
								<UnorderedListOutlined />
								{t('category', { count: 2 })}
							</Space>
						</Link> */}
					</Col>

					<Col span={0} lg={3} style={{ textAlign: 'center' }}>
						<Link
							to='/services'
							style={{ color: match?.pathname === '/services' ? '#429941' : 'black' }}
						>
							<Space>{t('service', { count: 2 })}</Space>
						</Link>
					</Col>

					<Col span={0} lg={3} style={{ textAlign: 'center' }}>
						<Link to='/news' style={{ color: match?.pathname === '/news' ? '#429941' : 'black' }}>
							<Space>{t('news', { count: 2 })}</Space>
						</Link>
					</Col>

					<Col
						span={20}
						lg={4}
						style={{
							display: 'flex',
							alignContent: 'center',
							justifyContent: 'center',
						}}
					>
						<a href='/' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<img src={logoURL} alt='TFF' title='TFF' className='r-logo' />
						</a>
					</Col>


					<Col span={0} lg={3} style={{ textAlign: 'center' }}>
						<Dropdown menu={{ items: mediaItems }} placement='bottom'>
							<Button type='text' size='small'>
								{t('media')}
							</Button>
						</Dropdown>
					</Col>

					<Col span={0} lg={3} style={{ textAlign: 'center' }}>
						<Link
							to='/about-us'
							style={{ color: match?.pathname === '/about-us' ? '#429941' : 'black' }}
						>
							{t('about', { count: 2 })}
						</Link>
					</Col>

					<Col span={0} lg={3} style={{ textAlign: 'center' }}>
						<Link
							to='/contact-us'
							style={{ color: match?.pathname === '/contact-us' ? '#429941' : 'black' }}
						>
							{t('contact', { count: 2 })}
						</Link>
					</Col>

					<Col span={2} lg={0}>
						<Button size='small' type='primary' onClick={showDrawer}>
							<MenuOutlined />
						</Button>
						<Drawer placement='left' onClose={onClose} open={open}>
							<Menu mode='inline' items={items} />
						</Drawer>
					</Col>
				</Row>
			</Col>

			<Col span={0} lg={2} style={{ textAlign: 'center' }}>
				<LanguageSelect />
			</Col>
		</Row>
	);
};

export default MainHeader;
