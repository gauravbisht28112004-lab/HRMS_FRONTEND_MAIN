export type UserRole = 'Admin' | 'HR' | 'Team Leader' | 'Employee';

export interface NavItem {
  label: string;
  path: string;
  roles: UserRole[];
  icon: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfJoining: string;
  department: string;
  designation: string;
  teamLeader: string;
  salaryStructure: string;
  employmentType: 'Full Time' | 'Contract' | 'Intern';
  shiftAssignment: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  emergencyContact: string;
  bankDetails: string;
  panAadhaar: string;
  performanceScore: number;
  profilePicture?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  department: string;
  date: string;
  punchIn: string;
  punchOut: string;
  workingHours: string;
  late: boolean;
  earlyExit: boolean;
  missingPunch: boolean;
  overtimeHours: number;
  status: 'Present' | 'Absent' | 'Remote';
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakTime: string;
  gracePeriod: string;
  weeklyOff: string;
  overtimeRule: string;
  assignedEmployees: string[];
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  leaveType: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface PayrollEntry {
  id: string;
  employeeName: string;
  month: string;
  department: string;
  salaryStructure: string;
  earnings: number;
  deductions: number;
  netSalary: number;
  status: 'Processed' | 'Pending';
}

export interface Department {
  id: string;
  name: string;
  teamLeader: string;
  totalEmployees: number;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  entity: string;
  timestamp: string;
  details: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  createdBy: string;
  createdAt: string;
  priority: 'High' | 'Medium' | 'Low';
  audience: UserRole[];
  imageUrl?: string;
}

export interface PerformanceMetric {
  employeeId: string;
  employeeName: string;
  teamLeader: string;
  productivityScore: number;
  qualityScore: number;
  attendanceScore: number;
  disbursalAmount: number;
  weekCompletion: number;
  monthCompletion: number;
  dailyReportingStatus: 'Submitted' | 'Pending';
}

export interface HourlyTaskLog {
  id: string;
  employeeId: string;
  date: string;
  hourSlot: string;
  task: string;
  output: string;
  status: 'Submitted' | 'Missed';
}

export interface GoalProgress {
  employeeId: string;
  dailyCommitment: string;
  weeklyTarget: string;
  monthlyTarget: string;
  dailyCompleted: number;
  weeklyCompleted: number;
  monthlyCompleted: number;
  dailyTotal: number;
  weeklyTotal: number;
  monthlyTotal: number;
  lastUpdated: string;
}
