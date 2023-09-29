import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, notification, Row, Spin, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { deleteProduct, getProducts } from '@/services/product';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setProducts } from '@/store/product/productSlice';
import type { TProduct } from '@/types/product';

const Tours: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();

	const products = useAppSelector(state => state.product.products);

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.shiftKey === true && e.key === 'N') {
			navigate('/admin/products/new');
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
	}, []);

	useEffect(() => {
		try {
			const fetchData = async () => {
				const { data } = await getProducts();
				dispatch(setProducts(data.products));
			};
			fetchData();
			setIsLoading(false);
		} catch (err) {
			notification.error({
				message: 500,
				description: t('couldNotFetch')
			});
		}
	}, []);

	const onDeleteTour = async (id: number) => {
		try {
			await deleteProduct(id);
			notification.success({
				message: 200,
				description: t('deletedSuccessfully')
			});
			const { data } = await getProducts();
			dispatch(setProducts(data.products));
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				notification.error({
					message: err.response.status,
					description: t('errorWhileDeleting')
				});
			} else {
				notification.error({
					message: 500,
					description: t('unknownError')
				});
			}
		}
	};

	const columns: ColumnsType<TProduct> = [
		{
			title: 'ID',
			dataIndex: 'id',
			width: 20,
			fixed: 'left'
		},
		{
			title: `${t('title')} (TK)`,
			dataIndex: 'title',
			fixed: 'left',
			width: 250,
			render: (_, record) => <div>{record.title.tk}</div>
		},
		{
			title: `${t('title')} (EN)`,
			dataIndex: 'title',
			fixed: 'left',
			width: 250,
			render: (_, record) => <div>{record.title.en}</div>
		},
		{
			title: `${t('title')} (RU)`,
			dataIndex: 'title',
			fixed: 'left',
			width: 250,
			render: (_, record) => <div>{record.title.ru}</div>
		},
		{
			title: t('action'),
			fixed: 'right',
			width: 140,
			render: (_, record) => (
				<div>
					<Button type='text' href={`/admin/products/${record.id}`}>
						<EditOutlined />
					</Button>
					<Button type='text' onClick={() => onDeleteTour(record.id)}>
						<DeleteOutlined />
					</Button>
				</div>
			)
		}
	];

	return (
		<div className='container'>
			<div className='sheet'>
				{isLoading ? (
					<div
						style={{
							height: '500px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Spin size='large' />
					</div>
				) : (
					<Table
						title={() => (
							<Row align='middle'>
								<Col span={12}>
									<Typography.Title level={4}> Önümler </Typography.Title>
								</Col>
								<Col offset={10} span={2} style={{ display: 'flex', justifyContent: 'end' }}>
									<Button href='/admin/products/new' type='primary'>
										<PlusOutlined />
									</Button>
								</Col>
							</Row>
						)}
						key='id'
						columns={columns}
						dataSource={products}
						rowKey={tour => tour.id}
					/>
				)}
			</div>
		</div>
	);
};

export default Tours;
