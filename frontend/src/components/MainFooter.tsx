import { Col, Divider, Row, Space, Typography } from 'antd';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import MainLink from '@/components/MainLink';

const MainFooter: FC = () => {
	const { t } = useTranslation();

	return (
		<div>
			<Divider />
			<Row className='container'>
				<Col xs={24} md={12} lg={6} style={{ marginTop: '20px' }}>
					<Typography.Title level={5}>{t('aboutUs')}</Typography.Title>
					<Space direction='vertical'>
						<MainLink to='/about-us' text={t('mainAim')} />
						<MainLink to='/stadiums' text={t('stadium', { count: 2 })} />
						<MainLink to='/referees' text={t('referee', { count: 2 })} />
						<MainLink to='/employees' text={t('employee', { count: 2 })} />
					</Space>
				</Col>
				<Col xs={24} md={12} lg={6} style={{ marginTop: '20px' }}>
					<Typography.Title level={5}>{t('media')}</Typography.Title>
					<Space direction='vertical'>
						<MainLink to='/albums' text={t('album', { count: 2 })} />
						<MainLink to='/videos' text={t('video', { count: 2 })} />
					</Space>
				</Col>
			</Row>
			<Divider />
			<div style={{ textAlign: 'center' }}>
				ZSSB © {new Date().getFullYear()}. {t('allRightsReserved')}
			</div>
		</div>
	);
};

export default MainFooter;
