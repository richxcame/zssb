import '@/plugins/reactI18n';
import './App.css';

import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminLayout from '@/layouts/AdminLayout';
import MainLayout from '@/layouts/MainLayout';
import AdminCategories from '@/pages/Admin/Categories';
import AdminCategory from '@/pages/Admin/Categories/Item';
import Login from '@/pages/Auth/Login';
import Protected from '@/pages/Auth/Protected';
import Dashboard from '@/pages/Dashboard';
import { useAppSelector } from '@/store/hooks';

const App: FC = () => {
	const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Dashboard />} />
			</Route>
			<Route
				path='/admin'
				element={<Protected isAuthenticated={isAuthenticated} outlet={<AdminLayout />} />}
			>
				<Route path='categories' element={<AdminCategories />} />
				<Route path='categories/:id' element={<AdminCategory />} />
			</Route>
		</Routes>
	);
};

export default App;
