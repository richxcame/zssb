import { Button, Checkbox, Col, Form, Input, notification, Row } from 'antd';
import axios from 'axios';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { getMe, login } from '@/services/auth';
import { setAccessToken, setAuth } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import type { TLogin } from '@/types/auth';

const { Item } = Form;

const Login: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				await getMe();
				navigate('/admin');
			} catch (err) {
				// ?
			}
		};

		fetchData();
	}, []);

	const onFinish = async (values: TLogin) => {
		try {
			const { data } = await login(values);
			localStorage.setItem('token', data.token);
			dispatch(setAuth(true));
			dispatch(setAccessToken(data.token));
			navigate('/admin');
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				notification.error({
					message: err.response.status,
					description: t('badCredentials'),
				});
			} else {
				notification.error({
					message: 500,
					description: t('unknownError'),
				});
			}
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		notification.error({
			message: t('wrongValues'),
			description: errorInfo.errorFields[0].errors[0] || t('unknownError'),
		});
	};

	return (
		<Row className='container' justify='center' align='middle' style={{ height: '100vh' }}>
			<Col span={8}>
				<Form
					labelCol={{ span: 24 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
				>
					<Item
						label={t('username')}
						name='username'
						rules={[{ required: true, message: t('enterUsername') }]}
					>
						<Input />
					</Item>

					<Item
						label={t('password')}
						name='password'
						rules={[{ required: true, message: t('enterPassword') }]}
					>
						<Input.Password />
					</Item>

					<Item name='remember' valuePropName='checked'>
						<Checkbox>{t('rememberMeForMonth')}</Checkbox>
					</Item>

					<Item>
						<Button type='primary' htmlType='submit'>
							{t('login')}
						</Button>
					</Item>
				</Form>
			</Col>
		</Row>
	);
};

export default Login;
