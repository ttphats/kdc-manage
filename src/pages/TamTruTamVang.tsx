"use client";

import React, { useState } from "react";
import {
  Tabs,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Drawer,
  Form,
  DatePicker,
  Select,
  message,
  Modal,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { TamTru, TamVang } from "../types";
import { mockTamTru, mockTamVang } from "../data/mockTamTruTamVang";
import dayjs from "dayjs";
import { useAuth } from "../contexts/AuthContext";

const { TabPane } = Tabs;
const { TextArea } = Input;

export default function TamTruTamVang() {
  const { permissions } = useAuth();
  const [tamTruData, setTamTruData] = useState<TamTru[]>(mockTamTru);
  const [tamVangData, setTamVangData] = useState<TamVang[]>(mockTamVang);
  const [searchText, setSearchText] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerType, setDrawerType] = useState<"tamtru" | "tamvang">("tamtru");
  const [editingRecord, setEditingRecord] = useState<TamTru | TamVang | null>(
    null
  );
  const [form] = Form.useForm();

  // Tạm trú columns
  const tamTruColumns: ColumnsType<TamTru> = [
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: 150,
    },
    {
      title: "Số CCCD",
      dataIndex: "soCCCD",
      key: "soCCCD",
      width: 120,
    },
    {
      title: "Địa chỉ tạm trú",
      dataIndex: "diaChiTamTru",
      key: "diaChiTamTru",
    },
    {
      title: "Chủ nhà",
      dataIndex: "chuNha",
      key: "chuNha",
      width: 150,
    },
    {
      title: "Từ ngày",
      dataIndex: "tuNgay",
      key: "tuNgay",
      width: 110,
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Đến ngày",
      dataIndex: "denNgay",
      key: "denNgay",
      width: 110,
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      width: 130,
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          "Đang tạm trú": "green",
          "Hết hạn": "red",
          "Đã hủy": "default",
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      fixed: "right",
      render: (_: any, record: TamTru) => (
        <Space size="small">
          {permissions.canEdit && (
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record, "tamtru")}
            >
              Sửa
            </Button>
          )}
          {permissions.canDelete && (
            <Button
              type="link"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id, "tamtru")}
            >
              Xóa
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // Tạm vắng columns
  const tamVangColumns: ColumnsType<TamVang> = [
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: 150,
    },
    {
      title: "Số CCCD",
      dataIndex: "soCCCD",
      key: "soCCCD",
      width: 120,
    },
    {
      title: "Số hộ khẩu",
      dataIndex: "soHoKhau",
      key: "soHoKhau",
      width: 120,
    },
    {
      title: "Nơi đến",
      dataIndex: "noiDen",
      key: "noiDen",
      width: 150,
    },
    {
      title: "Địa chỉ nơi đến",
      dataIndex: "diaChiNoiDen",
      key: "diaChiNoiDen",
    },
    {
      title: "Từ ngày",
      dataIndex: "tuNgay",
      key: "tuNgay",
      width: 110,
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Đến ngày",
      dataIndex: "denNgay",
      key: "denNgay",
      width: 110,
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      width: 130,
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          "Đang tạm vắng": "orange",
          "Đã về": "green",
          "Hết hạn": "red",
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      fixed: "right",
      render: (_: any, record: TamVang) => (
        <Space size="small">
          {permissions.canEdit && (
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record, "tamvang")}
            >
              Sửa
            </Button>
          )}
          {permissions.canDelete && (
            <Button
              type="link"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id, "tamvang")}
            >
              Xóa
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleEdit = (record: TamTru | TamVang, type: "tamtru" | "tamvang") => {
    setEditingRecord(record);
    setDrawerType(type);
    if (type === "tamtru") {
      const tr = record as TamTru;
      form.setFieldsValue({
        ...tr,
        tuNgay: dayjs(tr.tuNgay),
        denNgay: dayjs(tr.denNgay),
      });
    } else {
      const tv = record as TamVang;
      form.setFieldsValue({
        ...tv,
        tuNgay: dayjs(tv.tuNgay),
        denNgay: dayjs(tv.denNgay),
      });
    }
    setDrawerVisible(true);
  };

  const handleDelete = (id: string, type: "tamtru" | "tamvang") => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xóa bản ghi ${type === "tamtru" ? "tạm trú" : "tạm vắng"} này?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        if (type === "tamtru") {
          setTamTruData(tamTruData.filter((item) => item.id !== id));
        } else {
          setTamVangData(tamVangData.filter((item) => item.id !== id));
        }
        message.success("Xóa thành công!");
      },
    });
  };

  const handleAdd = (type: "tamtru" | "tamvang") => {
    setEditingRecord(null);
    setDrawerType(type);
    form.resetFields();
    setDrawerVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        tuNgay: values.tuNgay.format("YYYY-MM-DD"),
        denNgay: values.denNgay.format("YYYY-MM-DD"),
        thoiHan: values.denNgay.diff(values.tuNgay, "month"),
      };

      if (editingRecord) {
        // Update
        if (drawerType === "tamtru") {
          setTamTruData(
            tamTruData.map((item) =>
              item.id === editingRecord.id
                ? { ...item, ...formattedValues }
                : item
            )
          );
        } else {
          setTamVangData(
            tamVangData.map((item) =>
              item.id === editingRecord.id
                ? { ...item, ...formattedValues }
                : item
            )
          );
        }
        message.success("Cập nhật thành công!");
      } else {
        // Create
        const newId =
          drawerType === "tamtru"
            ? `TT${String(tamTruData.length + 1).padStart(3, "0")}`
            : `TV${String(tamVangData.length + 1).padStart(3, "0")}`;

        if (drawerType === "tamtru") {
          setTamTruData([
            ...tamTruData,
            {
              id: newId,
              ...formattedValues,
              ngayDangKy: dayjs().format("YYYY-MM-DD"),
            },
          ]);
        } else {
          setTamVangData([
            ...tamVangData,
            {
              id: newId,
              ...formattedValues,
              ngayDangKy: dayjs().format("YYYY-MM-DD"),
            },
          ]);
        }
        message.success("Thêm mới thành công!");
      }
      setDrawerVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const filteredTamTru = tamTruData.filter(
    (item) =>
      item.hoTen.toLowerCase().includes(searchText.toLowerCase()) ||
      item.soCCCD.includes(searchText) ||
      item.chuNha.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredTamVang = tamVangData.filter(
    (item) =>
      item.hoTen.toLowerCase().includes(searchText.toLowerCase()) ||
      item.soCCCD.includes(searchText) ||
      item.soHoKhau.includes(searchText)
  );

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Input
          placeholder="Tìm kiếm theo tên, CCCD..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
      </div>

      <Tabs defaultActiveKey="tamtru">
        <TabPane tab="Tạm trú" key="tamtru">
          <div style={{ marginBottom: 16 }}>
            {permissions.canCreate && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAdd("tamtru")}
              >
                Đăng ký tạm trú
              </Button>
            )}
          </div>
          <Table
            columns={tamTruColumns}
            dataSource={filteredTamTru}
            rowKey="id"
            scroll={{ x: 1200 }}
            pagination={{ pageSize: 10 }}
          />
        </TabPane>

        <TabPane tab="Tạm vắng" key="tamvang">
          <div style={{ marginBottom: 16 }}>
            {permissions.canCreate && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAdd("tamvang")}
              >
                Đăng ký tạm vắng
              </Button>
            )}
          </div>
          <Table
            columns={tamVangColumns}
            dataSource={filteredTamVang}
            rowKey="id"
            scroll={{ x: 1200 }}
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
      </Tabs>

      <Drawer
        title={`${editingRecord ? "Cập nhật" : "Đăng ký"} ${drawerType === "tamtru" ? "tạm trú" : "tạm vắng"}`}
        width={720}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        extra={
          <Space>
            <Button onClick={() => setDrawerVisible(false)}>Hủy</Button>
            <Button type="primary" onClick={handleSubmit}>
              {editingRecord ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          {drawerType === "tamtru" ? (
            <>
              <Form.Item
                name="hoTen"
                label="Họ tên"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="soCCCD"
                label="Số CCCD"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="diaChiTamTru"
                label="Địa chỉ tạm trú"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phuongXa"
                label="Phường/Xã"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="quanHuyen"
                label="Quận/Huyện"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="tinhThanh"
                label="Tỉnh/Thành phố"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="chuNha"
                label="Chủ nhà"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="soCCCDChuNha"
                label="Số CCCD chủ nhà"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="soDienThoaiChuNha"
                label="Số điện thoại chủ nhà"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="tuNgay"
                label="Từ ngày"
                rules={[{ required: true }]}
              >
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
              <Form.Item
                name="denNgay"
                label="Đến ngày"
                rules={[{ required: true }]}
              >
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
              <Form.Item
                name="lyDoTamTru"
                label="Lý do tạm trú"
                rules={[{ required: true }]}
              >
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item
                name="trangThai"
                label="Trạng thái"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="Đang tạm trú">
                    Đang tạm trú
                  </Select.Option>
                  <Select.Option value="Hết hạn">Hết hạn</Select.Option>
                  <Select.Option value="Đã hủy">Đã hủy</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="ghiChu" label="Ghi chú">
                <TextArea rows={2} />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                name="hoTen"
                label="Họ tên"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="soCCCD"
                label="Số CCCD"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="soHoKhau"
                label="Số hộ khẩu"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="noiDen"
                label="Nơi đến"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="diaChiNoiDen"
                label="Địa chỉ nơi đến"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phuongXa"
                label="Phường/Xã"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="quanHuyen"
                label="Quận/Huyện"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="tinhThanh"
                label="Tỉnh/Thành phố"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="tuNgay"
                label="Từ ngày"
                rules={[{ required: true }]}
              >
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
              <Form.Item
                name="denNgay"
                label="Đến ngày"
                rules={[{ required: true }]}
              >
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
              <Form.Item
                name="lyDoTamVang"
                label="Lý do tạm vắng"
                rules={[{ required: true }]}
              >
                <TextArea rows={3} />
              </Form.Item>
              <Form.Item
                name="trangThai"
                label="Trạng thái"
                rules={[{ required: true }]}
              >
                <Select>
                  <Select.Option value="Đang tạm vắng">
                    Đang tạm vắng
                  </Select.Option>
                  <Select.Option value="Đã về">Đã về</Select.Option>
                  <Select.Option value="Hết hạn">Hết hạn</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="ghiChu" label="Ghi chú">
                <TextArea rows={2} />
              </Form.Item>
            </>
          )}
        </Form>
      </Drawer>
    </div>
  );
}
