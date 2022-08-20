import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Switch,
  message,
} from "antd";
import { typeOption, platformOption } from "./share.js";
import Api from "../../api/config";
const { Option } = Select;
const { TextArea } = Input;

export default function Edit(props) {
  const form = {
    _id: "",
    name: "",
    type: "user",
    uid: null,
    platform: "app",
    default_avatar: "",
    is_closeChat: false,
    is_closeComment: false,
    create_at: "",
  };
  const [disabledpid, setDisabledpid] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const [option, setOption] = useState([]);
  const [formRef] = Form.useForm();
  const handleSubmit = (value) => {
    value.isLeaf = +value.isLeaf;
    value.status = +value.status;
    console.log(value, props);
    if (props.mode == 0) {
      handleAdd(value);
    } else {
      handleEdit(value);
    }
  };
  console.log("function");
  useEffect(() => {
    console.log("useEffect");
    // setDisabledpid(!form.isLeaf)
  }, []);
  useEffect(() => {
    let f = props.mode == 1 ? true : false;
    setFormDisabled(f);
    props.id && getDetail(props.id);
    if (props.mode == 0) {
      formRef.resetFields();
    }
  }, [props.mode, props.id]);

  const getDetail = (id) => {
    Api.detail({ _id: id }).then((res) => {
      let data = res.data || {};
      formRef.resetFields();
      formRef.setFieldsValue(data);
    });
  };

  const handleEdit = (value) => {
    Api.edit(value).then((res) => {
      message.success(res.message);
      props.closeDrawer();
    });
  };
  const handleAdd = (value) => {
    Api.add(value).then((res) => {
      message.success(res.message);
      props.closeDrawer();
    });
  };

  const rules = {
    name: [
      {
        required: true,
        message: "输入名称",
      },
    ],
    uid: [
      {
        required: true,
        message: "输入名称",
      },
    ],
  };
  return (
    <Form
      form={formRef}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      onFinish={handleSubmit}
      initialValues={form}
      disabled={formDisabled}
    >
      {props.mode != 0 && (
        <Form.Item label="_id" name="_id">
          <Input />
        </Form.Item>
      )}

      <Form.Item label="名称" name="name" rules={rules.name}>
        <Input />
      </Form.Item>
      <Form.Item label="类型" name="type">
        <Select placeholder="选择类型" allowClear options={typeOption}></Select>
      </Form.Item>
      <Form.Item label="用户uid" name="uid" >
        <Input />
      </Form.Item>
      <Form.Item label="平台" name="platform">
        <Select
          placeholder="选择类型"
          allowClear
          options={platformOption}
        ></Select>
      </Form.Item>
      <Form.Item label="头像" name="default_avatar">
        <Input />
      </Form.Item>

      <Form.Item
        label="关闭聊天功能"
        name="is_closeChat"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        label="关闭评论功能"
        name="is_closeComment"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      {props.mode != 0 && (
        <Form.Item label="创建时间" name="create_at" >
        <Input disabled/>
      </Form.Item>
      )}
      
      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
}
