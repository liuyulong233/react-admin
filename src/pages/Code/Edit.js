import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  message,
} from "antd";
import {formatDate} from "../../util/func.js";
import Api from "../../api/code";
import {typeOption,statusOption} from "./share.js";
export default function Edit(props) {
  const form = {
    _id: "",

    code: "",

    type: "",

    status: 1,

    expired_at: '',

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
    // getParentMenu();
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
      data.expired_at=formatDate(data.expired_at)
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
    code: [
      {
        required: true,
        message: "输入菜单唯一标识",
      },
    ],
    name: [
      {
        required: true,
        message: "输入菜单名称",
      },
    ],
    path: [
      {
        required: true,
        message: "输入菜单路径",
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

      <Form.Item label="验证码" name="code" rules={rules.code}>
        <Input />
      </Form.Item>
      
   

      <Form.Item name="type" label="验证类型">
        <Select placeholder="选择" allowClear options={typeOption} >
        </Select>
        
      </Form.Item>
      <Form.Item name="status" label="验证类型">
        <Select placeholder="选择" allowClear options={statusOption}>
          {/* {statusOption.map((item) => {
            return (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            );
          })} */}
        </Select>
      </Form.Item>
      <Form.Item label="创建时间" name="create_at" >
        <Input />
      </Form.Item>
      <Form.Item label="过期时间" name="expired_at">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
}
