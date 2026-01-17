"use client";

import React, { useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "../../src/contexts/AuthContext";

const { Title, Text } = Typography;

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const success = await login(values.username, values.password);
      if (success) {
        message.success("Đăng nhập thành công!");
        router.push("/");
      } else {
        message.error("Tên đăng nhập hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi đăng nhập!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            Hệ thống quản lý dân cư
          </Title>
          <Text type="secondary">Đăng nhập để tiếp tục</Text>
        </div>

        <Form name="login" onFinish={onFinish} autoComplete="off" size="large">
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <div
          style={{
            marginTop: 16,
            padding: 12,
            background: "#f5f5f5",
            borderRadius: 4,
          }}
        >
          <Text strong>Tài khoản demo:</Text>
          <div style={{ marginTop: 8 }}>
            <Text style={{ display: "block", fontSize: 12 }}>
              Admin: <Text code>admin / admin@</Text>
            </Text>
            <Text style={{ display: "block", fontSize: 12 }}>
              Cán bộ: <Text code>canbo01 / canbo123</Text>
            </Text>
            <Text style={{ display: "block", fontSize: 12 }}>
              Chỉ xem: <Text code>viewer01 / viewer123</Text>
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
}
