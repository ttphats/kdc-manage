import { User } from '../types';

// Mock data cho người dùng hệ thống
export const mockUsers: User[] = [
  {
    id: 'U001',
    username: 'admin',
    password: 'admin@', // Trong thực tế phải hash
    hoTen: 'Nguyễn Văn Admin',
    email: 'admin@phuong.gov.vn',
    soDienThoai: '0901111111',
    role: 'admin',
    trangThai: 'Hoạt động',
    ngayTao: '2023-01-01',
    lanDangNhapCuoi: '2026-01-17T10:30:00',
  },
  {
    id: 'U002',
    username: 'canbo01',
    password: 'canbo123',
    hoTen: 'Trần Thị Bình',
    email: 'ttbinh@phuong.gov.vn',
    soDienThoai: '0902222222',
    role: 'canbo',
    trangThai: 'Hoạt động',
    ngayTao: '2023-02-15',
    lanDangNhapCuoi: '2026-01-17T09:15:00',
  },
  {
    id: 'U003',
    username: 'canbo02',
    password: 'canbo123',
    hoTen: 'Lê Văn Cường',
    email: 'lvcuong@phuong.gov.vn',
    soDienThoai: '0903333333',
    role: 'canbo',
    trangThai: 'Hoạt động',
    ngayTao: '2023-03-20',
    lanDangNhapCuoi: '2026-01-16T16:45:00',
  },
  {
    id: 'U004',
    username: 'viewer01',
    password: 'viewer123',
    hoTen: 'Phạm Thị Dung',
    email: 'ptdung@phuong.gov.vn',
    soDienThoai: '0904444444',
    role: 'viewer',
    trangThai: 'Hoạt động',
    ngayTao: '2023-04-10',
    lanDangNhapCuoi: '2026-01-17T08:00:00',
  },
  {
    id: 'U005',
    username: 'canbo03',
    password: 'canbo123',
    hoTen: 'Hoàng Văn Em',
    email: 'hvem@phuong.gov.vn',
    soDienThoai: '0905555555',
    role: 'canbo',
    trangThai: 'Khóa',
    ngayTao: '2023-05-05',
    lanDangNhapCuoi: '2025-12-20T14:30:00',
  },
];

// Hàm helper để lấy user theo username
export const getUserByUsername = (username: string): User | undefined => {
  return mockUsers.find(u => u.username === username);
};

// Hàm helper để xác thực đăng nhập
export const authenticateUser = (username: string, password: string): User | null => {
  const user = mockUsers.find(u => u.username === username && u.password === password);
  if (user && user.trangThai === 'Hoạt động') {
    return user;
  }
  return null;
};

