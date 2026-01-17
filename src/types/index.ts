// Định nghĩa các kiểu dữ liệu cho ứng dụng quản lý dân cư

export interface Resident {
  id: string;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: 'Nam' | 'Nữ' | 'Khác';
  soCCCD: string;
  soDienThoai: string;
  email?: string;
  diaChiThuongTru: string;
  diaChiTamTru?: string;
  ngheNghiep?: string;
  danToc?: string;
  tonGiao?: string;
  trangThai: 'Thường trú' | 'Tạm trú' | 'Tạm vắng';
  hoKhauId?: string;
  quanHeVoiChuHo?: string;
  ghiChu?: string;
  ngayDangKy: string;
  ngayCapNhat?: string;
}

export interface Household {
  id: string;
  soHoKhau: string;
  chuHoId: string;
  chuHoTen: string;
  diaChi: string;
  phuongXa: string;
  quanHuyen: string;
  tinhThanh: string;
  soThanhVien: number;
  ngayLap: string;
  trangThai: 'Hoạt động' | 'Đã chuyển đi' | 'Đã giải thể';
  ghiChu?: string;
}

export interface Statistics {
  tongDanSo: number;
  soHoKhau: number;
  danSoNam: number;
  danSoNu: number;
  thuongTru: number;
  tamTru: number;
  tamVang: number;
}

// User & Authentication
export type UserRole = 'admin' | 'canbo' | 'viewer';

export interface User {
  id: string;
  username: string;
  password: string;
  hoTen: string;
  email: string;
  soDienThoai: string;
  role: UserRole;
  trangThai: 'Hoạt động' | 'Khóa';
  ngayTao: string;
  lanDangNhapCuoi?: string;
}

export interface Permission {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission> = {
  admin: {
    canView: true,
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canExport: true,
  },
  canbo: {
    canView: true,
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canExport: true,
  },
  viewer: {
    canView: true,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canExport: false,
  },
};

// Tạm trú
export interface TamTru {
  id: string;
  nguoiTamTruId: string;
  hoTen: string;
  soCCCD: string;

  // Địa chỉ tạm trú
  diaChiTamTru: string;
  phuongXa: string;
  quanHuyen: string;
  tinhThanh: string;

  // Chủ nhà
  chuNha: string;
  soCCCDChuNha: string;
  soDienThoaiChuNha: string;

  // Thời gian
  tuNgay: string;
  denNgay: string;
  thoiHan: number; // số tháng

  // Lý do
  lyDoTamTru: string;

  // Trạng thái
  trangThai: 'Đang tạm trú' | 'Hết hạn' | 'Đã hủy';

  // Metadata
  ngayDangKy: string;
  nguoiDangKy?: string;
  ghiChu?: string;
}

// Tạm vắng
export interface TamVang {
  id: string;
  nguoiTamVangId: string;
  hoTen: string;
  soCCCD: string;
  soHoKhau: string;

  // Nơi đến
  noiDen: string;
  diaChiNoiDen: string;
  phuongXa: string;
  quanHuyen: string;
  tinhThanh: string;

  // Thời gian
  tuNgay: string;
  denNgay: string;
  thoiHan: number; // số tháng

  // Lý do
  lyDoTamVang: string;

  // Trạng thái
  trangThai: 'Đang tạm vắng' | 'Đã về' | 'Hết hạn';

  // Metadata
  ngayDangKy: string;
  nguoiDangKy?: string;
  ghiChu?: string;
}

