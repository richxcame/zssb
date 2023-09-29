import { RightOutlined } from '@ant-design/icons';
import { Button, Col, notification, Row } from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Loader from '@/components/Loader';
import Post from '@/components/Post';
import { getNewsList } from '@/services/news';
import { getPartners } from '@/services/partner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setNewsList } from '@/store/news/newsSlice';
import { setPartners } from '@/store/partner/partnerSlice';

import Partners from './Partners';

const Dashboard: FC = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { t, i18n } = useTranslation();
	const dispatch = useAppDispatch();
	const partners = useAppSelector(state => state.partner.partners);
	const newsList = useAppSelector(state => state.news.newsList);

	useEffect(() => {
		const abortController = new AbortController();

		const fetchData = async () => {
			try {
				const partnersRes = await getPartners({ signal: abortController.signal });
				dispatch(setPartners(partnersRes.data.partners));
				const newsListRes = await getNewsList(
					{ offset: 0, limit: 4, is_article: false },
					{ signal: abortController.signal }
				);
				dispatch(setNewsList(newsListRes.data.news));
			} catch (err) {
				notification.error({
					message: 500,
					description: t('couldNotFetch'),
				});
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<div className='container'>
					{/* News */}
					<Row gutter={16} style={{ marginTop: '12px' }}>
						<Col xs={24} md={12} lg={8} span={24}>
							{newsList[0] && (
								<Post
									title={newsList[0].title[i18n.language as 'tk']}
									image={newsList[0].image}
									description={newsList[0].description[i18n.language as 'tk']}
									link={`/news/${newsList[0].id}`}
								/>
							)}
						</Col>
						<Col xs={24} md={12} lg={8}>
							{newsList.slice(1, newsList.length).map(item => (
								<div key={item.id}>
									<Post
										direction='horizontal'
										title={item.title[i18n.language as 'tk']}
										image={item.image}
										description={item.description[i18n.language as 'tk']}
										link={`/news/${item.id}`}
									/>
								</div>
							))}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<Button type='link' onClick={() => navigate('/news')}>
									{t('readMore')} <RightOutlined />
								</Button>
							</div>
						</Col>
					</Row>

					<Partners title={t('ourPartner', { count: 2 }).toUpperCase()} items={partners} />
				</div>
			)}
		</div>
	);
};

export default Dashboard;
