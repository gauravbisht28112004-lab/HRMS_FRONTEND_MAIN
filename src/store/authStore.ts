import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole } from '@/types';

interface AuthUser {
  name: string;
  role: UserRole;
  email: string;
  employeeId?: string;
  hasUsedSelfServiceEdit: boolean;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
  markSelfServiceEditUsed: () => void;
}

const demoUsers: Record<UserRole, AuthUser> = {
  Admin: {
    name: 'Arjun Malhotra',
    role: 'Admin',
    email: 'admin@finbud.com',
    hasUsedSelfServiceEdit: true,
  },
  HR: {
    name: 'Ishita Rao',
    role: 'HR',
    email: 'ishita.rao@finbud.com',
    employeeId: 'EMP-1003',
    hasUsedSelfServiceEdit: true,
  },
  'Team Leader': {
    name: 'Rohan Mehta',
    role: 'Team Leader',
    email: 'rohan.mehta@finbud.com',
    hasUsedSelfServiceEdit: true,
  },
  Employee: {
    name: 'Aanya Sharma',
    role: 'Employee',
    email: 'aanya.sharma@finbud.com',
    employeeId: 'EMP-1001',
    hasUsedSelfServiceEdit: false,
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loginAsRole: (role) =>
        set({
          user: demoUsers[role],
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
      markSelfServiceEditUsed: () =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                hasUsedSelfServiceEdit: true,
              }
            : null,
        })),
    }),
    {
      name: 'finbud-auth',
    },
  ),
);
