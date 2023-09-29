import './index.sass';

import { Col, Row } from 'antd';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const AboutUs: FC = () => {
	const { t } = useTranslation();

	return (
		<div className='container r-about'>
			<Row>
				<Col md={4}>{}</Col>
				<Col xs={24} md={12} lg={8} xl={7} className='r-about-card'>
					<div className='r-title'>{t('mainAim').toUpperCase()}</div>
					<div className='r-description'>{t('aboutUsPageText')}</div>
				</Col>
			</Row>
		</div>
	);
};

export default AboutUs;
