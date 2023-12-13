import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ProtectAuthRouter, ProtectPrivateRouter } from './features/protects';
import { AdminLayout } from './layouts/admin';
import { PATH_ADMIN, PATH_AUTH, PATH_ROOT_ADMIN } from './constants/paths';

// -------------------- Auth Page --------------------
const LoginPage = lazy(() => import('@/pages/auth/login'));
const ConfirmOtpPage = lazy(() => import('@/pages/auth/confirm-otp'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/reset-password'));

// -------------------- Admin Page --------------------
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'));
const DashBoardPage = lazy(() => import('@/pages/admin/dashboard'));
const CustomerPage = lazy(() => import('@/pages/admin/customer'));
const VoucherPage = lazy(() => import('@/pages/admin/voucher'));
const EmployeePage = lazy(() => import('@/pages/admin/employee'));
const WebPage = lazy(() => import('@/pages/admin/web'));

export default function App() {
  const pathName = useLocation();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, [pathName]);

  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route element={<ProtectAuthRouter />}>
          <Route
            path=''
            element={
              <Navigate
                replace
                to={`/${PATH_ROOT_ADMIN}/${PATH_AUTH.ROOT}/${PATH_AUTH.FEATURE.LOGIN}`}
              />
            }
          />
          {/* Auth Feature */}
          <Route path={`/${PATH_ROOT_ADMIN}/${PATH_AUTH.ROOT}`}>
            {/* --- Login Page--- */}
            <Route path={PATH_AUTH.FEATURE.LOGIN} element={<LoginPage />} />
            {/* --- Confirm OTP Page--- */}
            <Route
              path={PATH_AUTH.FEATURE.CONFIRM_OTP}
              element={<ConfirmOtpPage />}
            />
            {/* --- ForgotPassword Page--- */}
            <Route
              path={PATH_AUTH.FEATURE.CONFIRM_RESET_PASSWORD}
              element={<ForgotPasswordPage />}
            />
          </Route>
        </Route>

        {/* Admin Feature */}
        <Route element={<ProtectPrivateRouter />}>
          <Route path={`/${PATH_ROOT_ADMIN}`} element={<AdminLayout />}>
            {/* --- Create Dashboard Page--- */}
            <Route
              path={PATH_ADMIN.DASHBOARD.ROOT}
              element={<DashBoardPage />}
            />
            {/* --- Manager Employee Page--- */}
            <Route path={PATH_ADMIN.EMPLOYEE.ROOT} element={<EmployeePage />} />
            {/* --- Manager Customer Page--- */}
            <Route path={PATH_ADMIN.CUSTOMER.ROOT} element={<CustomerPage />} />
            {/* --- Manager Web Page--- */}
            <Route path={PATH_ADMIN.WEB.ROOT} element={<WebPage />} />
            {/* --- Manager Voucher Page--- */}
            <Route path={PATH_ADMIN.VOUCHER.ROOT} element={<VoucherPage />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
