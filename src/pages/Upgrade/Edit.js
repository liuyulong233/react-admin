import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload, Switch, message } from "antd";
import { typeOption, platformOption } from "./share.js";
import Api from "../../api/upgrade.js";
import style from "./style.module.scss";
export default function Edit(props) {
  const form = {
    _id: "",
    appid: "",
    name: "",
    title: "",
    content: "",
    platform: "Android",
    type: "native_app",
    version: "1.0.0",
    url: "url",
    status: 1,
    is_silently: false,
    is_mandatory: false,
    create_at: "",
  };
  const [disabledpid, setDisabledpid] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const [option, setOption] = useState([]);
  const [formRef] = Form.useForm();
  const handleSubmit = (value) => {
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
    appid: [
      {
        required: true,
        message: "输入名称",
      },
    ],
  };
  const upProps = {
    accept: "application/vnd.android.package-archive",
    name: "file",
    action: process.env.REACT_APP_API + "/api/app/upload",
    showUploadList: false,
    headers: {
      authorization: "Bearer " + sessionStorage.getItem("token"),
    },

    onChange(info) {
      if (info.file.status === "done") {
        let res = info.file.response;
        let url = process.env.REACT_APP_API + res.data.url;

        let data = formRef.getFieldsValue();
        data.url = url;
        console.log(data, url);
        formRef.setFieldsValue(data);

        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
      <Form.Item label="应用ID" name="appid" rules={rules.appid}>
        <Input />
      </Form.Item>
      <Form.Item label="应用名称" name="name" rules={rules.name}>
        <Input />
      </Form.Item>
      <Form.Item label="更新标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="安装包类型" name="type">
        <Select placeholder="选择类型" allowClear options={typeOption}></Select>
      </Form.Item>

      <Form.Item label="平台" name="platform">
        <Select
          placeholder="选择类型"
          allowClear
          options={platformOption}
        ></Select>
      </Form.Item>
      <Form.Item label="版本号" name="version">
        <Input />
      </Form.Item>
      <Form.Item label="下载地址" name="url">
        <Input />
        
        {/*<span></span> */}
      </Form.Item>
      <Upload  className={style.upload} {...upProps} >
        <Button icon={<UploadOutlined />}>上传包</Button>
      </Upload>
      <Form.Item label="静默更新" name="is_silently" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="强制更新" name="is_mandatory" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="状态" name="status" valuePropName="checked">
        <Switch />
      </Form.Item>
      {props.mode != 0 && (
        <Form.Item label="创建时间" name="create_at">
          <Input disabled />
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
