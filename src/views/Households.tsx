import React, { useState } from 'react';
import { Table, Button, Space, Tag, Input } from 'antd';
import { PlusOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Household } from '../types';
import { mockHouseholds } from '../data/mockData';
import dayjs from 'dayjs';

const { Search } = Input;

const Households: React.FC = () => {
  const [households] = useState<Household[]>(mockHouseholds);
  const [filteredHouseholds, setFilteredHouseholds] = useState<Household[]>(mockHouseholds);

  const handleSearch = (value: string) => {
    const filtered = households.filter(
      (h) =>
        h.soHoKhau.toLowerCase().includes(value.toLowerCase()) ||
        h.chuHoTen.toLowerCase().includes(value.toLowerCase()) ||
        h.diaChi.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredHouseholds(filtered);
  };

  const columns: ColumnsType<Household> = [
    {
      title: 'Số hộ khẩu',
      dataIndex: 'soHoKhau',
      key: 'soHoKhau',
      width: 150,
    },
    {
      title: 'Chủ hộ',
      dataIndex: 'chuHoTen',
      key: 'chuHoTen',
      width: 150,
    },
    {
      title: 'Địa chỉ',
      key: 'diaChi',
      width: 300,
      render: (_, record) => (
        <span>
          {record.diaChi}, {record.phuongXa}, {record.quanHuyen}, {record.tinhThanh}
        </span>
      ),
    },
    {
      title: 'Số thành viên',
      dataIndex: 'soThanhVien',
      key: 'soThanhVien',
      width: 120,
      align: 'center',
    },
    {
      title: 'Ngày lập',
      dataIndex: 'ngayLap',
      key: 'ngayLap',
      width: 120,
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      width: 120,
      render: (status: string) => {
        let color = 'green';
        if (status === 'Đã chuyển đi') color = 'orange';
        if (status === 'Đã giải thể') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      render: () => (
        <Space size="small">
          <Button type="link" icon={<EyeOutlined />}>
            Xem
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Quản lý hộ khẩu</h1>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Tìm kiếm theo số hộ khẩu, chủ hộ, địa chỉ"
          allowClear
          enterButton={<SearchOutlined />}
          onSearch={handleSearch}
          style={{ width: 350 }}
        />
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm hộ khẩu
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredHouseholds}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Households;

