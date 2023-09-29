import { Button, Col, Form, Input, InputNumber, notification, Row, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import ItemSkeleton from '@/components/ItemSkeleton';
import { getCategories } from '@/services/category';
import { getProduct, postProduct, putProduct } from '@/services/product';
import { setCategories } from '@/store/category/categorySlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setProduct } from '@/store/product/productSlice';
import type { TProduct } from '@/types/product';

const { Item } = Form;
const { Option } = Select;

const Category: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const category = useAppSelector(state => state.category.categories);
	const [form] = Form.useForm();

	const categories = useAppSelector(state => state.category.categories);

	useEffect(() => {
		try {
			const fetchData = async () => {
				const toursRes = await getCategories();
				dispatch(setCategories(toursRes.data.categories));
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

	const onFinish = async (values: TProduct) => {
		try {
			if (Number(id)) {
				await putProduct(Number(id), {
					...values
				});
				notification.success({
					message: 200,
					description: t('updatedSuccessfully')
				});
			} else {
				await postProduct(values);
				notification.success({
					message: 200,
					description: t('addedSuccessfully')
				});
				// navigate(`/admin/product/${data.id}`, { replace: true });
			}
		} catch (err) {
			notification.error({
				message: t('couldNotPost')
			});
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		notification.error({
			message: t('wrongValues'),
			description: errorInfo.errorFields[0].errors[0] || t('unknownError')
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (Number(id)) {
					const { data } = await getProduct(Number(id));
					dispatch(setProduct(data));
				}
				setIsLoading(false);
			} catch (err) {
				if (axios.isAxiosError(err) && err.response) {
					if (err.response.status === 404) {
						navigate('/404', { replace: true });
					}
					notification.error({
						message: err.response.status,
						description: t('pageNotFound')
					});
				} else {
					notification.error({
						message: 500,
						description: t('unknownError')
					});
				}
			}
		};

		fetchData();
	}, [id]);

	useEffect(() => {
		form.resetFields();
	}, [category]);

	return (
		<div className='container'>
			<div className='sheet'>
				{isLoading ? (
					<ItemSkeleton />
				) : (
					<Form
						form={form}
						initialValues={category}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						labelCol={{ span: 24 }}
					>
						{/* Title TK, EN, RU */}
						<Row justify='space-around'>
							<Col span={5}>
								<Item
									label={`${t('title')} (TK)`}
									name={['title', 'tk']}
									rules={[{ required: true, message: t('enterValue') }]}
								>
									<Input />
								</Item>
							</Col>

							<Col span={5}>
								<Item
									label={`${t('title')} (EN)`}
									name={['title', 'en']}
									rules={[{ required: true, message: t('enterValue') }]}
								>
									<Input />
								</Item>
							</Col>

							<Col span={5}>
								<Item
									label={`${t('title')} (RU)`}
									name={['title', 'ru']}
									rules={[{ required: true, message: t('enterValue') }]}
								>
									<Input />
								</Item>
							</Col>
						</Row>

						<Row justify='space-around'>
							<Col span={5}>
								<Item
									label={t('price')}
									name='price'
									rules={[{ required: true, message: t('enterValue') }]}
								>
									<InputNumber style={{ width: '100%' }} />
								</Item>
							</Col>
							<Col span={5}>
								<Item name='categories_id' label='Bölümi'>
									<Select placeholder='Bolum sayla' style={{ width: '100%' }}>
										{categories.map(item => (
											<Option key={item.id} value={item.id}>
												{item.title.tk}
											</Option>
										))}
									</Select>
								</Item>
							</Col>
							<Col span={5}>
								<Item
									name={['description', 'ru']}
									label={`${t('description')} (TK)`}
									rules={[{ required: true, message: t('enterValue') }]}
								>
									<TextArea rows={4} />
								</Item>
							</Col>
						</Row>
						<Row justify='space-around'>
							<Col span={5}>
								<Item
									name={['description', 'en']}
									label={`${t('description')} (EN)`}
									rules={[{ required: true, message: t('enterValue') }]}
								>
									<TextArea rows={4} />
								</Item>
							</Col>
							<Col span={5}>
								<Item
									name={['description', 'tk']}
									label={`${t('description')} (RU)`}
									rules={[{ required: true, message: t('enterValue') }]}
								>
									<TextArea rows={4} />
								</Item>
							</Col>
						</Row>
						{/* Actions */}
						<Row justify='end' style={{ marginTop: '20px' }}>
							<Space>
								<Button htmlType='reset' type='ghost'>
									{t('cancel')}
								</Button>
								<Button htmlType='submit' type='primary'>
									{Number(id) ? t('update') : t('save')}
								</Button>
							</Space>
						</Row>
					</Form>
				)}
			</div>
		</div>
	);
};

export default Category;
