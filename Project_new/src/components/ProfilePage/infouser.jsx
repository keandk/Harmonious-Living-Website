/* eslint-disable react-hooks/exhaustive-deps */
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    message,
  } from "antd";
  import { rules } from "./rule";
  import { getCookie } from "../Login/cookie";
  import { useEffect, useState } from "react";
  const { TextArea } = Input;
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  
  function InfoUser() {
    const _id = getCookie("id");
    const [info, setInfo] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [form] = Form.useForm();
    const [mess, contextHolder] = message.useMessage();
  
    const fetchApi = async () => {
      try {
        const response = await axios.post(
          "https://coiboicuchay-be.vercel.app/api/detail-user",
          {
            _id,
          }
        );
        if (response) {
          setInfo(response);
        }
      } catch (error) {
        console.error("Error fetchApi:", error);
      }
    };
  
    useEffect(() => {
      fetchApi();
    }, []);
  
    const handleFinish = async (values) => {
      try {
        const response = await axios.patch(
          "https://coiboicuchay-be.vercel.app/api/detail-user",
          {
            _id,
            values,
          }
        );
        if (response) {
          mess.success("Cập nhật thành công!");
          fetchApi();
          setIsEdit(false);
        }
      } catch (error) {
        console.error("Error handleFinish:", error);
      }
    };
  
    const handleCancel = () => {
      setIsEdit(false);
      form.resetFields();
    };
  
    const handleEdit = () => {
      setIsEdit(true);
    };
  
    const navigate = useNavigate();
    const handleLogout = () => {
      navigate("/logout");
    };
  
    return (
      <>
        {contextHolder}
        <Button onClick={handleLogout}>Logout</Button>
        {info && (
          <Card
            title="Thông tin"
            extra={
              !isEdit ? (
                <Button onClick={handleEdit}>Chỉnh sửa</Button>
              ) : (
                <Button onClick={handleCancel}>Hủy</Button>
              )
            }
          >
            <Form
              layout="vertical"
              onFinish={handleFinish}
              initialValues={info.data}
              form={form}
              disabled={!isEdit}
            >
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item label="Họ và tên" name="fullname" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tên đăng nhập" name="username" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" name="email" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Địa chỉ" name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Lịch sử truy cập" name="history">
                    <TextArea rows={16} disabled='true'/>
                  </Form.Item>
                </Col>
                {isEdit && (
                  <Col span={24}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Cập nhật
                      </Button>
                      <Button onClick={handleCancel} className="ml-10">
                        Hủy
                      </Button>
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Form>
          </Card>
        )}
      </>
    );
  }
  
  export default InfoUser;