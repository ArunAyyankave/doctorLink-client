import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DocSideAndNav from './docSideAndNav/SideAndNav';

function DocLayout() {

  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/doctor/signin' && <DocSideAndNav />}
      <Outlet />
    </div>
  )
}

export default DocLayout;