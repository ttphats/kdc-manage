import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, TeamOutlined, HomeOutlined, RiseOutlined } from '@ant-design/icons';
import { mockResidents } from '../data/mockData';

const Dashboard: React.FC = () => {
  const totalResidents = mockResidents.length;
  const maleCount = mockResidents.filter(r => r.gioiTinh === 'Nam').length;
  const femaleCount = mockResidents.filter(r => r.gioiTinh === 'Nữ').length;
  const permanentCount = mockResidents.filter(r => r.trangThai === 'Thường trú').length;
  const temporaryCount = mockResidents.filter(r => r.trangThai === 'Tạm trú').length;

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Tổng quan</h1>
      
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng dân số"
              value={totalResidents}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Nam"
              value={maleCount}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Nữ"
              value={femaleCount}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Số hộ khẩu"
              value={4}
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Thường trú"
              value={permanentCount}
              prefix={<RiseOutlined />}
              suffix={`/ ${totalResidents}`}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tạm trú"
              value={temporaryCount}
              prefix={<RiseOutlined />}
              suffix={`/ ${totalResidents}`}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tạm vắng"
              value={mockResidents.filter(r => r.trangThai === 'Tạm vắng').length}
              prefix={<RiseOutlined />}
              suffix={`/ ${totalResidents}`}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }} title="Thông tin hệ thống">
        <p>Chào mừng đến với hệ thống quản lý dân cư địa phương.</p>
        <p>Hệ thống giúp quản lý thông tin dân cư, hộ khẩu và thống kê dân số một cách hiệu quả.</p>
      </Card>
    </div>
  );
};

export default Dashboard;

