import '@/plugins/reactI18n';
import './App.css';

import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import SingleItem from '@/components/SingleItem';
import AdminLayout from '@/layouts/AdminLayout';
import MainLayout from '@/layouts/MainLayout';
import AdminCategories from '@/pages/Admin/Categories';
import AdminCategory from '@/pages/Admin/Categories/Item';
<<<<<<< HEAD
import AdminNewsList from '@/pages/Admin/News';
import AdminNews from '@/pages/Admin/News/Item';
import AdminOrders from '@/pages/Admin/Orders';
=======
import AdminProducts from '@/pages/Admin/Products';
import AdminProduct from '@/pages/Admin/Products/item';
>>>>>>> 5f30a24 (added two menu in admin)
import Login from '@/pages/Auth/Login';
import Protected from '@/pages/Auth/Protected';
import Dashboard from '@/pages/Dashboard';
import NewsList from '@/pages/News';
import News from '@/pages/News/Item';
import { useAppSelector } from '@/store/hooks';

import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';

const App: FC = () => {
	const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Dashboard />} />
				<Route path='news/:id' element={<News />} />
				<Route path='news' element={<NewsList />} />
				<Route path='/about-us' element={<AboutUs />} />
				<Route path='/contact-us' element={<ContactUs />} />
				<Route path='/products' element={<SingleItem />} />
			</Route>
			<Route
				path='/admin'
				element={<Protected isAuthenticated={isAuthenticated} outlet={<AdminLayout />} />}
			>
				<Route path='categories' element={<AdminCategories />} />
				<Route path='categories/:id' element={<AdminCategory />} />
<<<<<<< HEAD
				<Route path='orders' element={<AdminOrders />} />
				<Route path='news' element={<AdminNewsList />} />
				<Route path='news/:id' element={<AdminNews />} />
=======
				<Route path='categories/new' element={<AdminCategory />} />
				<Route path='products' element={<AdminProducts />} />
				<Route path='products/:id' element={<AdminProduct />} />
				<Route path='products/new' element={<AdminProduct />} />
>>>>>>> 5f30a24 (added two menu in admin)
			</Route>
		</Routes>
	);
};

export default App;
