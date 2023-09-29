import {  Carousel, Row } from 'antd';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import './index.css'
import Card from '@/components/Card';

const Dashboard: FC = () => {
    const { t } = useTranslation();

	return (
		<div className='container home-slider'>
			<div> 
             <Carousel autoplay style={{width:'100%'}}>
                <div className='banner1'>
                </div>
                <div className='banner2'>
                </div>
            </Carousel>
            </div>
            

            <div style={{margin : '50px 0'}}>
                <h3 style={{margin : '20px 0', fontSize:'30px'}}>{t("famous_products")}</h3>
                <Card />
            </div>
		</div>
	);
}

export default Dashboard;
