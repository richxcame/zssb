import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, notification, Row, Spin, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { deleteOrder, getOrders } from '@/services/order';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setOrders } from '@/store/order/orderSlice';
import type { TOrder } from '@/types/order';

const Tours: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const orders = useAppSelector(state => state.order.orders);

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.shiftKey === true && e.key === 'N') {
			navigate('/admin/categories/new');
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
	}, []);

	useEffect(() => {
		try {
			const fetchData = async () => {
				const { data } = await getOrders();
				dispatch(setOrders(data.orders));
			};
			fetchData();
			setIsLoading(false);
		} catch (err) {
			notification.error({
				message: 500,
				description: t('couldNotFetch'),
			});
		}
	}, []);

	const onDeleteOrder = async (id: number) => {
		try {
			await deleteOrder(id);
			notification.success({
				message: 200,
				description: t('deletedSuccessfully'),
			});
			const toursRes = await getOrders();
			dispatch(setOrders(toursRes.data.orders));
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				notification.error({
					message: err.response.status,
					description: t('errorWhileDeleting'),
				});
			} else {
				notification.error({
					message: 500,
					description: t('unknownError'),
				});
			}
		}
	};
	const columns: ColumnsType<TOrder> = [
		{
			title: 'ID',
			dataIndex: 'id',
			width: 20,
			fixed: 'left',
		},
		{
			title: 'Phone number',
			dataIndex: 'phone',
			width: 20,
			fixed: 'left',
		},
		{
			title: 'Address',
			dataIndex: 'address',
			width: 20,
			fixed: 'left',
		},
		{
			title: 'Comment',
			dataIndex: 'comment',
			width: 20,
			fixed: 'left',
		},
		{
			title: t('action'),
			fixed: 'right',
			width: 140,
			render: (_, record) => (
				<div>
					<Button type='text' href={`/admin/orders/${record.id}`}>
						<EditOutlined />
					</Button>
					<Button type='text' onClick={() => onDeleteOrder(record.id)}>
						<DeleteOutlined />
					</Button>
				</div>
			),
		},
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
									<Typography.Title level={4}>{t('tour', { count: 2 })}</Typography.Title>
								</Col>
								<Col offset={10} span={2} style={{ display: 'flex', justifyContent: 'end' }}>
									<Button href='/admin/tours/new' type='primary'>
										<PlusOutlined />
									</Button>
								</Col>
							</Row>
						)}
						key='id'
						columns={columns}
						dataSource={orders}
						rowKey={tour => tour.id}
					/>
				)}
			</div>
		</div>
	);
};

export default Tours;
