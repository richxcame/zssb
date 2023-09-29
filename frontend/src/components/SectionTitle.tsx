import { RightOutlined } from '@ant-design/icons';
import { Button, Row, Typography } from 'antd';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

type TProps = {
	title: string;
	link?: string;
};

const SectionTitle: FC<TProps> = ({ title, link }) => {
	const { t } = useTranslation();
	return (
		<Row justify='space-between' className='container'>
			<Typography.Title level={4} style={{ color: '#429941' }}>
				{title.toUpperCase()}
			</Typography.Title>
			{link ? (
				<Button type='text' href={link} size='small'>
					{t('showAll')}
					<RightOutlined />
				</Button>
			) : (
				''
			)}
		</Row>
	);
};

SectionTitle.defaultProps = {
	link: undefined,
};

export default SectionTitle;
