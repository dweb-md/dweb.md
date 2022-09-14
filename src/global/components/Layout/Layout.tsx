import React, { ReactNode } from 'react';
import './layout.scss';

function Layout({ children }: { children?: ReactNode }) {
	return <div className='layout'>
		{children}
	</div>
}

export default Layout;
