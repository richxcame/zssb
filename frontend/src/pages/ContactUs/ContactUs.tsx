import '@/pages/ContactUs/ContactUs.css';

import { Button, Col, Form, Input, Row, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const { Item } = Form;

const { TextArea } = Input;

const ContactUs = () => {
	const { t } = useTranslation();
	return (
		<Form labelCol={{ span: '24' }}>
			<Row justify='center'>
				<Col span={8}>
					<Item label={t('enterEmail')} name='email'>
						<Input placeholder='example@gmail.com' />
					</Item>
				</Col>
			</Row>
			<Row justify='center'>
				<Col span={8}>
					<Item label={t('addComment')} name='comment'>
						<TextArea rows={4} placeholder='comment' maxLength={6} />
					</Item>
				</Col>
			</Row>
			<Row justify='center'>
				<Col span={8}>
					<Space style={{ float: 'right' }}>
						<Button htmlType='reset' type='ghost'>
							{t('cancel')}
						</Button>
						<Button htmlType='submit' type='primary'>
							{t('save')}
						</Button>
					</Space>
				</Col>
			</Row>
		</Form>
	);
};

export default ContactUs;
