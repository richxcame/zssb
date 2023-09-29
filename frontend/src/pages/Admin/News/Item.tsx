import { InboxOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, notification, Row, Space, Upload } from 'antd';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import axios from 'axios';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import Editor from '@/components/Editor';
import ItemSkeleton from '@/components/ItemSkeleton';
import { deleteNewsImage, getNews, postNews, putNews } from '@/services/news';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setNews } from '@/store/news/newsSlice';
import type { TNews } from '@/types/news';

const { Item } = Form;
const { Dragger } = Upload;

const News: FC = () => {
	const [cookies, _] = useCookies(['access_token']);
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const news = useAppSelector(state => state.news.news);
	const [form] = Form.useForm();
	const [descriptionTK, setDescriptionTK] = useState('');
	const [descriptionEN, setDescriptionEN] = useState('');
	const [descriptionRU, setDescriptionRU] = useState('');

	const onFinish = async (values: TNews) => {
		try {
			if (Number(id)) {
				await putNews(Number(id), {
					...values,
					description: {
						tk: descriptionTK,
						en: descriptionEN,
						ru: descriptionRU,
					},
				});
				notification.success({
					message: 200,
					description: t('updatedSuccessfully'),
				});
			} else {
				const { data } = await postNews({
					...values,
					description: {
						tk: descriptionTK,
						en: descriptionEN,
						ru: descriptionRU,
					},
				});
				notification.success({
					message: 200,
					description: t('addedSuccessfully'),
				});
				navigate(`/admin/news/${data.id}`, { replace: true });
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
					const newsRes = await getNews(Number(id));
					dispatch(setNews(newsRes.data));
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
	}, [news]);

	const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
		if (info.file.status === 'removed') {
			try {
				await deleteNewsImage(news?.id || 0);
				notification.success({
					message: 200,
					description: t('deletedSuccessfully'),
				});
			} catch (err) {
				notification.error({
					message: 500,
					description: t('couldNotDelete'),
				});
			}
		}
	};

	useEffect(() => {
		form.resetFields();
		setDescriptionTK(news.description?.tk || '');
		setDescriptionEN(news.description?.en || '');
		setDescriptionRU(news.description?.ru || '');
	}, [news]);

	const newsImages: UploadFile[] =
		news?.image && news.image !== ''
			? [
					{
						uid: news.image,
						url: import.meta.env.VITE_STATIC_URL + news.image,
						name: news.image,
					},
			  ]
			: [];

	return (
		<div className='container'>
			<div className='sheet'>
				{isLoading ? (
					<ItemSkeleton />
				) : (
					<Form
						form={form}
						initialValues={news}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						labelCol={{ span: 24 }}
					>
						{/* Title TK, EN, RU */}
						<Row justify='space-around'>
							<Col span={7}>
								<Item
									label={`${t('title')} (TK)`}
									name={['title', 'tk']}
									rules={[{ required: true, message: t('enterValue') }]}
								>
									<Input />
								</Item>
							</Col>

							<Col span={7}>
								<Item
									label={`${t('title')} (EN)`}
									name={['title', 'en']}
									rules={[{ required: true, message: t('enterValue') }]}
								>
									<Input />
								</Item>
							</Col>

							<Col span={7}>
								<Item
									label={`${t('title')} (RU)`}
									name={['title', 'ru']}
									rules={[{ required: true, message: t('enterValue') }]}
								>
									<Input />
								</Item>
							</Col>
						</Row>

						{/* Description in turkmen */}
						<div style={{ margin: '30px' }}>
							{t('descriptionInTurkmen')}
							<Editor defaultValue={news.description?.tk} onChange={setDescriptionTK} />
						</div>

						{/* Description in english */}
						<div style={{ margin: '30px' }}>
							{t('descriptionInEnglish')}
							<Editor defaultValue={news.description?.en} onChange={setDescriptionEN} />
						</div>

						{/* Description in russian */}
						<div style={{ margin: '30px' }}>
							{t('descriptionInRussian')}
							<Editor defaultValue={news.description?.ru} onChange={setDescriptionRU} />
						</div>

						{/* Image */}
						<div style={{ margin: '30px' }}>
							<Item>
								<Dragger
									onChange={handleChange}
									maxCount={1}
									name='image'
									defaultFileList={newsImages}
									action={`${import.meta.env.VITE_API_URL}/news/${news?.id}/image`}
									listType='picture'
									headers={{
										Authorization: `Bearer ${
											cookies.access_token
												? cookies.access_token
												: sessionStorage.getItem('access_token')
										}`,
									}}
									accept='image/png, image/jpg, image/jpeg, image/svg+xml'
								>
									<p className='ant-upload-drag-icon'>
										<InboxOutlined />
									</p>
									<p className='ant-upload-text'>{t('image', { count: 2 })}</p>
									<p className='ant-upload-hint'>{t('clickOrDragFileToUpload')}</p>
								</Dragger>
							</Item>
						</div>

						{/* IsArticle */}
						<Item style={{ marginLeft: '30px' }} name='is_article' valuePropName='checked'>
							<Checkbox>{t('isArticle')}</Checkbox>
						</Item>

						{/* IsActive */}
						<Item
							initialValue
							style={{ marginLeft: '30px' }}
							name='is_active'
							valuePropName='checked'
						>
							<Checkbox>{t('isActive')}</Checkbox>
						</Item>
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

export default News;
