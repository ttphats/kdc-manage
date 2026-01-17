"use client";

import React, { useEffect } from "react";
import { Layout, Menu, Avatar, Dropdown, Typography, Space, Tag } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  BarChartOutlined,
  TeamOutlined,
  LogoutOutlined,
  SettingOutlined,
  FileTextOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Trang chủ",
    },
    {
      key: "/residents",
      icon: <UserOutlined />,
      label: "Quản lý nhân khẩu",
    },
    {
      key: "/households",
      icon: <TeamOutlined />,
      label: "Quản lý hộ khẩu",
    },
    {
      key: "/tam-tru-vang",
      icon: <SwapOutlined />,
      label: "Tạm trú / Tạm vắng",
    },
    {
      key: "/statistics",
      icon: <BarChartOutlined />,
      label: "Thống kê",
    },
    {
      key: "/reports",
      icon: <FileTextOutlined />,
      label: "Báo cáo",
    },
  ];

  // Thêm menu quản lý người dùng cho admin
  if (user?.role === "admin") {
    menuItems.push({
      key: "/users",
      icon: <SettingOutlined />,
      label: "Quản lý người dùng",
    });
  }

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key);
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Thông tin cá nhân",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
    },
  ];

  const handleUserMenuClick = (e: { key: string }) => {
    if (e.key === "logout") {
      logout();
      router.push("/login");
    }
  };

  const getRoleTag = (role: string) => {
    const roleMap = {
      admin: { color: "red", text: "Quản trị viên" },
      canbo: { color: "blue", text: "Cán bộ" },
      viewer: { color: "green", text: "Chỉ xem" },
    };
    const roleInfo = roleMap[role as keyof typeof roleMap] || {
      color: "default",
      text: role,
    };
    return <Tag color={roleInfo.color}>{roleInfo.text}</Tag>;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {!collapsed ? "Quản lý dân cư" : "QLDC"}
        </div>
        <Menu
          theme="dark"
          selectedKeys={pathname ? [pathname] : []}
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text strong style={{ fontSize: "20px" }}>
            Hệ thống quản lý hộ dân cư - Phường/Xã
          </Text>
          <Dropdown
            menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
            placement="bottomRight"
          >
            <Space style={{ cursor: "pointer" }}>
              <Avatar icon={<UserOutlined />} />
              <div>
                <div>
                  <Text strong>{user?.hoTen}</Text>
                </div>
                <div>{getRoleTag(user?.role || "")}</div>
              </div>
            </Space>
          </Dropdown>
        </Header>
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#fff",
              borderRadius: "8px",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
