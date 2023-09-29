import { Spin } from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { getMe } from '@/services/auth';
import { setAuth } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';

export type TProps = {
	isAuthenticated: boolean;
	authPath?: string;
	outlet: JSX.Element;
};

const Protected: FC<TProps> = ({ isAuthenticated, authPath, outlet }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const token = localStorage.getItem('token');
	useEffect(() => {
		const authCheck = async () => {
			try {
				await getMe({
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				dispatch(setAuth(true));
				setIsLoading(false);
			} catch (err) {
				dispatch(setAuth(false));
				navigate('/login');
				setIsLoading(false);
			}
		};
		authCheck();

		return () => {
			setIsLoading(false);
		};
	}, [location.pathname]);
	if (isLoading) {
		return (
			<div
				style={{
					height: '100vh',
					display: 'flex',
					alignContent: 'center',
					justifyContent: 'center',
				}}
			>
				<Spin />
			</div>
		);
	}

	if (isAuthenticated) {
		return outlet;
	}
	return <Navigate to={{ pathname: authPath }} />;
};

Protected.defaultProps = {
	authPath: '/login',
};

export default Protected;
