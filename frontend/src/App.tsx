import '@/plugins/reactI18n';
import './App.css';

import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminLayout from '@/layouts/AdminLayout';
import MainLayout from '@/layouts/MainLayout';
import AdminCategories from '@/pages/Admin/Categories';
import AdminCategory from '@/pages/Admin/Categories/Item';
import AdminNewsList from '@/pages/Admin/News';
import AdminNews from '@/pages/Admin/News/Item';
import AdminOrders from '@/pages/Admin/Orders';
import Login from '@/pages/Auth/Login';
import Protected from '@/pages/Auth/Protected';
import Dashboard from '@/pages/Dashboard';
import NewsList from '@/pages/News';
import News from '@/pages/News/Item';
import { useAppSelector } from '@/store/hooks';

const App: FC = () => {
	const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Dashboard />} />
				<Route path='news/:id' element={<News />} />
				<Route path='news' element={<NewsList />} />
			</Route>
			<Route
				path='/admin'
				element={<Protected isAuthenticated={isAuthenticated} outlet={<AdminLayout />} />}
			>
				<Route path='categories' element={<AdminCategories />} />
				<Route path='categories/:id' element={<AdminCategory />} />
				<Route path='orders' element={<AdminOrders />} />
				<Route path='news' element={<AdminNewsList />} />
				<Route path='news/:id' element={<AdminNews />} />
			</Route>
		</Routes>
	);
};

export default App;
