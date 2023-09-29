/* eslint-disable import/namespace */
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TablePaginationConfig } from 'antd';
import { Button, Col, Image, notification, Row, Spin, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { deleteNews, getNewsList } from '@/services/news';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setNewsList, setTotalNumberOfNews } from '@/store/news/newsSlice';
import type { TNews } from '@/types/news';

const NewsList: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const newsList = useAppSelector(state => state.news.newsList);
	const totalNews = useAppSelector(state => state.news.totalNews);
	const [searchParams, setSearchParams] = useSearchParams();

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.shiftKey === true && e.key === 'N') {
			navigate('/admin/news/new');
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
	}, []);

	useEffect(() => {
		try {
			const fetchData = async () => {
				const newsListRes = await getNewsList({
					is_article: searchParams.get('is_article') || '',
					offset: searchParams.get('offset') || '',
					limit: searchParams.get('limit') || '',
				});
				dispatch(setNewsList(newsListRes.data.news));
				dispatch(setTotalNumberOfNews(newsListRes.data.total));
			};
			fetchData();
			setIsLoading(false);
		} catch (err) {
			notification.error({
				message: 500,
				description: t('couldNotFetch'),
			});
		}
	}, [searchParams]);

	const onDeleteNews = async (id: number) => {
		try {
			await deleteNews(id);
			notification.success({
				message: 200,
				description: t('deletedSuccessfully'),
			});
			const newsListRes = await getNewsList();
			dispatch(setNewsList(newsListRes.data.news));
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				notification.error({
					message: err.response.status,
					description: t('unknownError'),
				});
			} else {
				notification.error({
					message: 500,
					description: t('unknownError'),
				});
			}
		}
	};

	const columns: ColumnsType<TNews> = [
		{
			title: 'ID',
			dataIndex: 'id',
			width: 20,
			fixed: 'left',
		},
		{
			title: t('image', { count: 2 }),
			dataIndex: 'images',
			fixed: 'left',
			width: 250,
			render: (_, record) => (
				<div>
					<Image
						width={100}
						src={import.meta.env.VITE_STATIC_URL + record.image}
						fallback='data:image/png;base64,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'
					/>
				</div>
			),
		},
		{
			title: `${t('title')} (TK)`,
			dataIndex: 'title',
			fixed: 'left',
			width: 250,
			render: (_, record) => <div>{record.title.tk}</div>,
		},
		{
			title: `${t('title')} (EN)`,
			dataIndex: 'title',
			fixed: 'left',
			width: 250,
			render: (_, record) => <div>{record.title.en}</div>,
		},
		{
			title: `${t('title')} (RU)`,
			dataIndex: 'title',
			fixed: 'left',
			width: 250,
			render: (_, record) => <div>{record.title.ru}</div>,
		},
		// {
		// 	title: `${t('isArticle')}`,
		// 	dataIndex: 'isArticle',
		// 	fixed: 'left',
		// 	width: 250,
		// 	// render: (_, record) => <div></div>,
		// },
		{
			title: t('action'),
			fixed: 'right',
			width: 140,
			render: (_, record) => (
				<div>
					<Button type='text' href={`/admin/news/${record.id}`}>
						<EditOutlined />
					</Button>
					<Button type='text' onClick={() => onDeleteNews(record.id)}>
						<DeleteOutlined />
					</Button>
				</div>
			),
		},
	];

	const onTableChange = (pagination: TablePaginationConfig) => {
		if (!pagination.current) pagination.current = 1;
		if (!pagination.pageSize) pagination.pageSize = 10;

		const offset = pagination.current * pagination.pageSize - pagination.pageSize;
		const limit = pagination.pageSize;
		setSearchParams({
			is_article: searchParams.get('is_article') || '',
			offset: offset.toString(),
			limit: limit.toString(),
		});
	};

	return (
		<div className='container'>
			<div className='sheet'>
				{isLoading ? (
					<div
						style={{
							height: '500px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Spin size='large' />
					</div>
				) : (
					<Table
						title={() => (
							<Row align='middle'>
								<Col span={12}>
									<Typography.Title level={4}>{t('news', { count: 2 })}</Typography.Title>
								</Col>
								<Col offset={10} span={2} style={{ display: 'flex', justifyContent: 'end' }}>
									<Button href='/admin/news/new' type='primary'>
										<PlusOutlined />
									</Button>
								</Col>
							</Row>
						)}
						key='id'
						columns={columns}
						dataSource={newsList}
						rowKey={news => news.id}
						onChange={onTableChange}
						pagination={{
							total: totalNews,
							showSizeChanger: true,
							showQuickJumper: true,
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default NewsList;
