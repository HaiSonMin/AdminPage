// import { ERole } from '@/enums';
import { PATH_ADMIN, PATH_AUTH, PATH_ROOT_ADMIN } from '@/constants/paths';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { getUser } from '@/storeReducer/public/userSlice';

export function ProtectAuthRouter() {
  const dataStore = localStorage.getItem(LOCAL_STORE_KEYS.DATA_USER);
  if (dataStore)
    return (
      <Navigate
        to={`/${PATH_ROOT_ADMIN}/${PATH_ADMIN.DASHBOARD.ROOT}`}
        replace={true}
      />
    );
  return <Outlet />;
}
