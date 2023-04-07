import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DOCSideAndNav from './DOCSideAndNav/DOCSideAndNav';

function DocLayout() {

  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/doctor/signin' && <DOCSideAndNav />}
      <Outlet />
    </div>
  )
}

export default DocLayout;