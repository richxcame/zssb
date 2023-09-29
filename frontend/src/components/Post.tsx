import '@/styles/Post.sass';

import { Col, Divider, Row } from 'antd';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import logoURL from '@/assets/download.jpeg';

type TProps = {
	image: string;
	link: string;
	title: string;
	description: string;
	direction?: 'vertical' | 'horizontal';
};

const Post: FC<TProps> = ({ image, link, title, description, direction }) => {
	if (direction === 'horizontal') {
		return (
			<div className='r-post'>
				<Row wrap={false}>
					<Col flex='120px' className='r-mr-1'>
						<Link to={link}>
							<div
								style={{
									backgroundImage: `url('${
										import.meta.env.VITE_STATIC_URL
									}${image}'), url('${logoURL}')`,
									backgroundPosition: 'center',
									backgroundSize: 'cover',
									backgroundRepeat: 'no-repeat',
									height: '90px',
								}}
							/>
							{/* <Image
								preview={false}
								title={title}
								alt={title}
								src={import.meta.env.VITE_STATIC_URL + image}
								height='90px'
								width='120px'
								fallback='/src/assets/default.svg'
								loading='lazy'
								placeholder={<Skeleton.Image active />}
							/> */}
						</Link>
					</Col>
					<Col flex='auto'>
						<Link to={link} style={{ fontSize: '14px', lineHeight: '16px', fontWeight: 700 }}>
							{title.toUpperCase()}
						</Link>
						<div
							style={{ fontSize: '12px', lineHeight: '16px' }}
							className='truncate-overflow'
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					</Col>
				</Row>
				<Divider style={{ margin: '10px 0' }} />
			</div>
		);
	}

	const style = {
		backgroundImage: `url('${import.meta.env.VITE_STATIC_URL}${image}'), url('${logoURL}')`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		aspectRatio: '4/3',
	};

	return (
		<div className='r-post'>
			<Link to={link} title={title} className='r-image-area'>
				<div style={style} />
				{/* <Image
					preview={false}
					className='r-image'
					title={title}
					alt={title}
					height={250}
					width='100%'
					src={import.meta.env.VITE_STATIC_URL + image}
					fallback='/src/assets/default.svg'
					loading='lazy'
					style={style}
					placeholder={<Loader />}
				/> */}
			</Link>
			<Link to={link}>
				<span className='r-title'>{title.toUpperCase()}</span>
			</Link>
			<div className='truncate-overflow' dangerouslySetInnerHTML={{ __html: description }} />
		</div>
	);
};

Post.defaultProps = {
	direction: 'vertical',
};

export default Post;
