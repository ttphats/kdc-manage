# 🏘️ Hệ thống Quản lý Hộ Dân cư

Hệ thống quản lý hộ khẩu, nhân khẩu, tạm trú/tạm vắng cho phường/xã, phục vụ cán bộ hành chính.

## 🚀 Tính năng

### 1. Đăng nhập & Phân quyền

- Hệ thống đăng nhập với 3 cấp quyền:
  - **Admin**: Toàn quyền (CRUD, quản lý người dùng, xuất báo cáo)
  - **Cán bộ**: Xem, thêm, sửa, xuất báo cáo (không xóa)
  - **Viewer**: Chỉ xem dữ liệu

### 2. Quản lý Nhân khẩu

- Danh sách nhân khẩu với tìm kiếm nâng cao
- Thêm/sửa/xóa thông tin nhân khẩu
- Thông tin đầy đủ: CCCD, địa chỉ, nghề nghiệp, dân tộc, tôn giáo...

### 3. Quản lý Hộ khẩu

- Danh sách hộ khẩu
- Tìm kiếm theo số hộ khẩu, chủ hộ, địa chỉ
- Xem chi tiết thành viên trong hộ

### 4. Quản lý Tạm trú / Tạm vắng

- **Tạm trú**: Đăng ký người tạm trú tại địa phương
- **Tạm vắng**: Đăng ký người vắng khỏi địa phương
- Theo dõi thời hạn, cảnh báo hết hạn
- Quản lý trạng thái: Đang tạm trú/vắng, Hết hạn, Đã hủy/về

### 5. Thống kê & Báo cáo

- Dashboard với biểu đồ trực quan
- Thống kê theo giới tính, độ tuổi, trạng thái
- Báo cáo dân số theo nhiều tiêu chí

## 🛠️ Công nghệ sử dụng

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **UI Library**: Ant Design 5
- **Styling**: CSS-in-JS
- **Date**: Day.js
- **State Management**: React Context API

## 📋 Yêu cầu hệ thống

- Node.js >= 18.0.0
- npm >= 9.0.0

## 🔧 Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/ttphats/kdc-manage.git
cd kdc-manage
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

### 4. Build cho production

```bash
npm run build
npm start
```

## 👤 Tài khoản demo

Hệ thống có sẵn các tài khoản demo để test:

| Tài khoản  | Mật khẩu    | Quyền                      |
| ---------- | ----------- | -------------------------- |
| `admin`    | `admin@`    | Quản trị viên (toàn quyền) |
| `canbo01`  | `canbo123`  | Cán bộ (xem, thêm, sửa)    |
| `viewer01` | `viewer123` | Chỉ xem                    |

## 📁 Cấu trúc thư mục

```
kdc-manage/
├── app/                      # Next.js App Router
│   ├── login/               # Trang đăng nhập
│   ├── residents/           # Quản lý nhân khẩu
│   ├── households/          # Quản lý hộ khẩu
│   ├── tam-tru-vang/        # Tạm trú/tạm vắng
│   ├── statistics/          # Thống kê
│   └── layout.tsx           # Root layout
├── src/
│   ├── components/          # React components
│   ├── contexts/            # React contexts
│   ├── data/                # Mock data
│   ├── pages/               # Page components
│   ├── types/               # TypeScript types
│   └── index.css            # Global styles
├── public/                  # Static files
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🎯 Hướng dẫn sử dụng

### 1. Đăng nhập

- Truy cập http://localhost:3000
- Nhập tài khoản: `admin` / `admin@`
- Click "Đăng nhập"

### 2. Quản lý Nhân khẩu

- Vào menu "Quản lý nhân khẩu"
- Click "Thêm nhân khẩu" để thêm mới
- Click "Sửa" để chỉnh sửa thông tin
- Click "Xóa" để xóa (chỉ Admin)
- Sử dụng ô tìm kiếm để lọc dữ liệu

### 3. Quản lý Tạm trú/Tạm vắng

- Vào menu "Tạm trú / Tạm vắng"
- Chọn tab "Tạm trú" hoặc "Tạm vắng"
- Click "Đăng ký tạm trú/vắng" để thêm mới
- Form sẽ mở ở bên phải (Drawer)
- Điền đầy đủ thông tin và click "Thêm mới"

### 4. Xem Thống kê

- Vào menu "Thống kê"
- Xem các biểu đồ và số liệu tổng hợp

## 🔐 Phân quyền

| Chức năng    | Admin | Cán bộ | Viewer |
| ------------ | ----- | ------ | ------ |
| Xem dữ liệu  | ✅    | ✅     | ✅     |
| Thêm mới     | ✅    | ✅     | ❌     |
| Chỉnh sửa    | ✅    | ✅     | ❌     |
| Xóa          | ✅    | ❌     | ❌     |
| Xuất báo cáo | ✅    | ✅     | ❌     |
| Quản lý user | ✅    | ❌     | ❌     |

## 📝 Lưu ý

- Dữ liệu hiện tại là **mock data** (dữ liệu giả)
- Dữ liệu lưu trong **state** và **localStorage**
- Để sử dụng thực tế, cần kết nối backend API và database

## � Tính năng sẽ phát triển

- [ ] Kết nối backend API (Node.js/Express hoặc NestJS)
- [ ] Kết nối database (PostgreSQL/MySQL)
- [ ] Xuất báo cáo Excel/PDF
- [ ] Upload ảnh CCCD/chân dung
- [ ] Gửi thông báo email/SMS
- [ ] Lịch sử thay đổi dữ liệu (audit log)
- [ ] Backup/Restore dữ liệu
- [ ] Tích hợp bản đồ (Google Maps)
- [ ] Responsive mobile app

## 📸 Screenshots

### Trang đăng nhập

![Login](https://via.placeholder.com/800x400?text=Login+Page)

### Dashboard

![Dashboard](https://via.placeholder.com/800x400?text=Dashboard)

### Quản lý nhân khẩu

![Residents](https://via.placeholder.com/800x400?text=Residents+Management)

### Quản lý tạm trú/tạm vắng

![Temporary](https://via.placeholder.com/800x400?text=Temporary+Residence)

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📞 Liên hệ

- GitHub: [@ttphats](https://github.com/ttphats)
- Repository: [https://github.com/ttphats/kdc-manage](https://github.com/ttphats/kdc-manage)

## �📄 License

MIT License

---

**Made with ❤️ for Vietnamese local government administration**
