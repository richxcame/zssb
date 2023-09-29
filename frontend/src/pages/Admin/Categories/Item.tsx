import { Button, Checkbox, Col, Form, Input, notification, Row, Space } from 'antd';
import axios from 'axios';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import ItemSkeleton from '@/components/ItemSkeleton';
import { getCategory, postCategory, putCategory } from '@/services/category';
import { setCategory } from '@/store/category/categorySlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { TCategory } from '@/types/category';

const { Item } = Form;

const Category: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const category = useAppSelector(state => state.category.categories);
	const [form] = Form.useForm();

	const onFinish = async (values: TCategory) => {
		try {
			if (Number(id)) {
				await putCategory(Number(id), {
					...values,
				});
				notification.success({
					message: 200,
					description: t('updatedSuccessfully'),
				});
			} else {
				const { data } = await postCategory(values);
				notification.success({
					message: 200,
					description: t('addedSuccessfully'),
				});
				navigate(`/admin/categories/${data.id}`, { replace: true });
			}
		} catch (err) {
			notification.error({
				message: t('couldNotPost'),
			});
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		notification.error({
			message: t('wrongValues'),
			description: errorInfo.errorFields[0].errors[0] || t('unknownError'),
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (Number(id)) {
					const categoryRes = await getCategory(Number(id));
					dispatch(setCategory(categoryRes.data));
				}

				setIsLoading(false);
			} catch (err) {
				if (axios.isAxiosError(err) && err.response) {
					if (err.response.status === 404) {
						navigate('/404', { replace: true });
					}
					notification.error({
						message: err.response.status,
						description: t('pageNotFound'),
					});
				} else {
					notification.error({
						message: 500,
						description: t('unknownError'),
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

							<Col span={4}>
								<Item
									labelAlign='right'
									label={t('showMatches')}
									name='show_matches'
									valuePropName='checked'
								>
									<Checkbox style={{ display: 'flex', justifyContent: 'center' }} />
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
