import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  Input,
  Modal,
  Form,
  Select,
  DatePicker,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Resident } from "../types";
import { mockResidents } from "../data/mockData";
import dayjs from "dayjs";

const { Search } = Input;

const Residents: React.FC = () => {
  const [residents, setResidents] = useState<Resident[]>(mockResidents);
  const [filteredResidents, setFilteredResidents] =
    useState<Resident[]>(mockResidents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [form] = Form.useForm();

  const handleSearch = (value: string) => {
    const filtered = residents.filter(
      (r) =>
        r.hoTen.toLowerCase().includes(value.toLowerCase()) ||
        r.soCCCD.includes(value) ||
        r.soDienThoai.includes(value)
    );
    setFilteredResidents(filtered);
  };

  const handleAdd = () => {
    setEditingResident(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Resident) => {
    setEditingResident(record);
    form.setFieldsValue({
      ...record,
      ngaySinh: dayjs(record.ngaySinh),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa dân cư này?",
      onOk: () => {
        const newResidents = residents.filter((r) => r.id !== id);
        setResidents(newResidents);
        setFilteredResidents(newResidents);
        message.success("Xóa thành công");
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        ngaySinh: values.ngaySinh.format("YYYY-MM-DD"),
      };

      if (editingResident) {
        // Update
        const newResidents = residents.map((r) =>
          r.id === editingResident.id
            ? {
                ...r,
                ...formattedValues,
                ngayCapNhat: new Date().toISOString(),
              }
            : r
        );
        setResidents(newResidents);
        setFilteredResidents(newResidents);
        message.success("Cập nhật thành công");
      } else {
        // Add new
        const newResident: Resident = {
          id: Date.now().toString(),
          ...formattedValues,
          ngayDangKy: new Date().toISOString(),
        };
        const newResidents = [...residents, newResident];
        setResidents(newResidents);
        setFilteredResidents(newResidents);
        message.success("Thêm mới thành công");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const columns: ColumnsType<Resident> = [
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      fixed: "left",
      width: 150,
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      width: 120,
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      key: "gioiTinh",
      width: 100,
    },
    {
      title: "Số CCCD",
      dataIndex: "soCCCD",
      key: "soCCCD",
      width: 130,
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
      width: 120,
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChiThuongTru",
      key: "diaChiThuongTru",
      width: 250,
      ellipsis: true,
    },
    {
      title: "Nghề nghiệp",
      dataIndex: "ngheNghiep",
      key: "ngheNghiep",
      width: 120,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      width: 120,
      render: (status: string) => {
        let color = "green";
        if (status === "Tạm trú") color = "blue";
        if (status === "Tạm vắng") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Quản lý dân cư</h1>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Tìm kiếm theo tên, CCCD, SĐT"
          allowClear
          enterButton={<SearchOutlined />}
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm dân cư
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredResidents}
        rowKey="id"
        scroll={{ x: 1500 }}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={
          editingResident ? "Chỉnh sửa thông tin dân cư" : "Thêm dân cư mới"
        }
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        width={800}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="hoTen"
            label="Họ tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ngaySinh"
            label="Ngày sinh"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
          >
            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name="gioiTinh"
            label="Giới tính"
            rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
          >
            <Select>
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nữ">Nữ</Select.Option>
              <Select.Option value="Khác">Khác</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="soCCCD"
            label="Số CCCD"
            rules={[{ required: true, message: "Vui lòng nhập số CCCD" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="soDienThoai"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="diaChiThuongTru"
            label="Địa chỉ thường trú"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="diaChiTamTru" label="Địa chỉ tạm trú">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="ngheNghiep" label="Nghề nghiệp">
            <Input />
          </Form.Item>
          <Form.Item name="danToc" label="Dân tộc">
            <Input />
          </Form.Item>
          <Form.Item name="tonGiao" label="Tôn giáo">
            <Input />
          </Form.Item>
          <Form.Item
            name="trangThai"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select>
              <Select.Option value="Thường trú">Thường trú</Select.Option>
              <Select.Option value="Tạm trú">Tạm trú</Select.Option>
              <Select.Option value="Tạm vắng">Tạm vắng</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="ghiChu" label="Ghi chú">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Residents;
