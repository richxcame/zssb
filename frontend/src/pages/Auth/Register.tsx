import { Button, Col, Form, Input, notification, Row } from 'antd';
import axios from 'axios';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { register } from '@/services/auth';
import type { TRegister } from '@/types/auth';

const { Item } = Form;

const Register: FC = () => {
	const { t } = useTranslation();

	const onFinish = async (values: TRegister) => {
		try {
			await register(values);
			notification.success({
				message: 201,
				description: t('addedSuccessfully'),
			});
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
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
				>
					<Item
						label={t('email')}
						name='email'
						rules={[{ required: true, message: t('enterEmail') }]}
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
					<Item>
						<Row justify='end'>
							<Button type='primary' htmlType='submit'>
								{t('register')}
							</Button>
						</Row>
					</Item>
				</Form>
			</Col>
		</Row>
	);
};

export default Register;
