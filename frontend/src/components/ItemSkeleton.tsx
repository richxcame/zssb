import { Col, Row, Skeleton, Space } from 'antd';
import type { FC } from 'react';

const colStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const ItemSkeleton: FC = () => (
	<>
		<Row>
			<Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
				<Skeleton.Image />
			</Col>
			<Col span={20}>
				<Row gutter={[16, 16]}>
					<Col span={8} style={colStyle}>
						<Skeleton.Input active size='large' />
					</Col>
					<Col span={8} style={colStyle}>
						<Skeleton.Input active size='large' />
					</Col>
					<Col span={8} style={colStyle}>
						<Skeleton.Input active size='large' />
					</Col>
					<Col span={24} style={colStyle}>
						<Skeleton.Button block />
					</Col>
					<Col span={24}>
						<Skeleton.Button block />
					</Col>
				</Row>
			</Col>
		</Row>
		<Row justify='end' style={{ marginTop: 10 }}>
			<Space size='large'>
				<Skeleton.Button active />
				<Skeleton.Button active />
			</Space>
		</Row>
	</>
);

export default ItemSkeleton;
