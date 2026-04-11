import {
  attendanceRecords,
  auditLogs,
  departments,
  employees,
  leaveRequests,
  payrollEntries,
  shifts,
} from '@/constants/mockData';
import { AttendanceRecord, AuditLog, Department, Employee, LeaveRequest, PayrollEntry, Shift } from '@/types';

const delay = async <T,>(data: T, duration = 250): Promise<T> =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(data), duration);
  });

export const api = {
  employees: {
    list: async () => delay(employees),
    getById: async (id: string) => delay(employees.find((employee) => employee.id === id) ?? null),
  },
  attendance: {
    list: async () => delay(attendanceRecords),
  },
  shifts: {
    list: async () => delay(shifts),
  },
  leave: {
    list: async () => delay(leaveRequests),
  },
  payroll: {
    list: async () => delay(payrollEntries),
  },
  departments: {
    list: async () => delay(departments),
  },
  audit: {
    list: async () => delay(auditLogs),
  },
};

export type ApiDataMap = {
  employees: Employee[];
  attendance: AttendanceRecord[];
  shifts: Shift[];
  leave: LeaveRequest[];
  payroll: PayrollEntry[];
  departments: Department[];
  audit: AuditLog[];
};
