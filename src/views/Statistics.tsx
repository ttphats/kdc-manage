import React from 'react';
import { Card, Row, Col, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { mockResidents } from '../data/mockData';

interface AgeGroup {
  group: string;
  count: number;
  percentage: string;
}

interface GenderStat {
  gender: string;
  count: number;
  percentage: string;
}

const Statistics: React.FC = () => {
  const totalResidents = mockResidents.length;

  // Thống kê theo giới tính
  const genderStats: GenderStat[] = [
    {
      gender: 'Nam',
      count: mockResidents.filter((r) => r.gioiTinh === 'Nam').length,
      percentage: '',
    },
    {
      gender: 'Nữ',
      count: mockResidents.filter((r) => r.gioiTinh === 'Nữ').length,
      percentage: '',
    },
  ].map((item) => ({
    ...item,
    percentage: ((item.count / totalResidents) * 100).toFixed(1) + '%',
  }));

  // Thống kê theo độ tuổi
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const ageGroups: AgeGroup[] = [
    { group: '0-14 tuổi', count: 0, percentage: '' },
    { group: '15-24 tuổi', count: 0, percentage: '' },
    { group: '25-54 tuổi', count: 0, percentage: '' },
    { group: '55-64 tuổi', count: 0, percentage: '' },
    { group: '65+ tuổi', count: 0, percentage: '' },
  ];

  mockResidents.forEach((r) => {
    const age = calculateAge(r.ngaySinh);
    if (age <= 14) ageGroups[0].count++;
    else if (age <= 24) ageGroups[1].count++;
    else if (age <= 54) ageGroups[2].count++;
    else if (age <= 64) ageGroups[3].count++;
    else ageGroups[4].count++;
  });

  ageGroups.forEach((group) => {
    group.percentage = ((group.count / totalResidents) * 100).toFixed(1) + '%';
  });

  // Thống kê theo trạng thái
  const statusStats = [
    {
      status: 'Thường trú',
      count: mockResidents.filter((r) => r.trangThai === 'Thường trú').length,
      percentage: '',
    },
    {
      status: 'Tạm trú',
      count: mockResidents.filter((r) => r.trangThai === 'Tạm trú').length,
      percentage: '',
    },
    {
      status: 'Tạm vắng',
      count: mockResidents.filter((r) => r.trangThai === 'Tạm vắng').length,
      percentage: '',
    },
  ].map((item) => ({
    ...item,
    percentage: ((item.count / totalResidents) * 100).toFixed(1) + '%',
  }));

  const genderColumns: ColumnsType<GenderStat> = [
    { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
    { title: 'Số lượng', dataIndex: 'count', key: 'count' },
    { title: 'Tỷ lệ', dataIndex: 'percentage', key: 'percentage' },
  ];

  const ageColumns: ColumnsType<AgeGroup> = [
    { title: 'Nhóm tuổi', dataIndex: 'group', key: 'group' },
    { title: 'Số lượng', dataIndex: 'count', key: 'count' },
    { title: 'Tỷ lệ', dataIndex: 'percentage', key: 'percentage' },
  ];

  const statusColumns = [
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    { title: 'Số lượng', dataIndex: 'count', key: 'count' },
    { title: 'Tỷ lệ', dataIndex: 'percentage', key: 'percentage' },
  ];

  return (
    <div>
      <h1>Thống kê dân số</h1>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="Thống kê theo giới tính" style={{ marginBottom: 16 }}>
            <Table
              columns={genderColumns}
              dataSource={genderStats}
              pagination={false}
              rowKey="gender"
              size="small"
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Thống kê theo độ tuổi" style={{ marginBottom: 16 }}>
            <Table
              columns={ageColumns}
              dataSource={ageGroups}
              pagination={false}
              rowKey="group"
              size="small"
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Thống kê theo trạng thái" style={{ marginBottom: 16 }}>
            <Table
              columns={statusColumns}
              dataSource={statusStats}
              pagination={false}
              rowKey="status"
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;

