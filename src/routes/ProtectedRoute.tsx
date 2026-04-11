import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/types';
import { UnauthorizedPage } from '@/pages/UnauthorizedPage';

interface ProtectedRouteProps {
  roles: UserRole[];
}

export const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return roles.includes(user.role) ? <Outlet /> : <UnauthorizedPage />;
};
