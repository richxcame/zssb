import { Carousel, Row } from 'antd';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import url from '@/assets/banner.jpg'
import './card.css'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const products = [
    {
        id : 1,
        name : 'first',
        img : '/@/assets/banner1.jpg'
    },
    {
        id : 2,
        name : 'second',
        img : '/@/assets/banner.jpg'
    },
]

const Card: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()

	return (
		<div className=''>
            <div className='card-container' onClick={() => navigate("/products")}>
                <img src={url} />
                <div className='card-title'>first</div>
                <div className='card-price'>29 TMT</div>
                <div className='card-bin'>
                    <ShoppingCartOutlined />
                    <span>Add to cart</span>
                </div>
            </div>
		</div>
	);
}

export default Card;
