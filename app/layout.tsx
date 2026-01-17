"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { AuthProvider } from "../src/contexts/AuthContext";
import "../src/index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <title>Hệ thống quản lý dân cư</title>
        <meta
          name="description"
          content="Quản lý dân cư địa phương cho phường xã"
        />
      </head>
      <body>
        <AntdRegistry>
          <ConfigProvider locale={viVN}>
            <AuthProvider>{children}</AuthProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
