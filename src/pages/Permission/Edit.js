import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, InputNumber, Switch,message } from "antd";

import Api from "../../api/menu";
const { Option } = Select;
const { TextArea } = Input;
export default function Edit(props) {
  const form ={
    _id: "",
    menu_id: "",
    name: "",
    icon: "",
    pid: "",
    path: "",
    isLeaf: 0,
    comment: "",
    component: "",
    order: 1,
    status: 1,
  };
  const [disabledpid, setDisabledpid] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const [option, setOption] = useState([]);
  const [formRef] = Form.useForm();
  const handleSubmit = (value) => {
    value.isLeaf = +value.isLeaf;
    value.status = +value.status;
    console.log(value,props);
    if(props.mode==0){
      handleAdd(value)
    }else{
      handleEdit(value)
    }
  };
  console.log("function");
  useEffect(() => {
    console.log("useEffect");
    getParentMenu();
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
  const getParentMenu = () => {
    Api.getList({
      isLeaf: 0,
      page_size: 100,
    }).then((res) => {
      let data = res.data || [];
      setOption(data);
    });
  };
const handleEdit=(value)=>{
  Api.edit(value).then((res) => {
    message.success(res.message);
    props.closeDrawer()
  });
}
const handleAdd=(value)=>{
  Api.add(value).then((res) => {
    message.success(res.message);
    props.closeDrawer()
  });
}
  const showParent = (checked) => {
    // setDisabledpid(!checked)
    //   let value=formRef.getFieldValue('isLeaf');
  };
  const rules = {
    menu_id: [
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

      <Form.Item label="标识" name="menu_id" rules={rules.menu_id}>
        <Input />
      </Form.Item>
      <Form.Item label="名称" name="name" rules={rules.name}>
        <Input />
      </Form.Item>
      <Form.Item label="路径" name="path" rules={rules.path}>
        <Input />
      </Form.Item>
      <Form.Item label="组件" name="component">
        <Input />
      </Form.Item>
      <Form.Item label="叶子" name="isLeaf" valuePropName="checked">
        <Switch onChange={showParent} />
      </Form.Item>

      <Form.Item name="pid" label="上级菜单">
        <Select placeholder="选择上级菜单" allowClear disabled={disabledpid}>
          {option.map((item) => {
            return (
              <Option value={item.menu_id} key={item._id}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="排序" name="order">
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item label="状态" name="status" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="备注" name="comment">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
}
