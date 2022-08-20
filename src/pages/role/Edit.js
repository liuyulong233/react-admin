import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Tree, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../api/role";
const { Option } = Select;
const { TextArea } = Input;
export default function Edit(props) {
  const form = {
    _id: "",

    name: "",

    role_id: "",
    permission: [],
    comment: "",
  };
  //   const permission=useSelector(state=>state.permission)
  console.log("rfc");
  const [disabledpid, setDisabledpid] = useState(false);
  const dispatch = useDispatch();
  const [formDisabled, setFormDisabled] = useState(true);
  const [option, setOption] = useState([]);
  const [formRef] = Form.useForm();
  const [visible, setVisible] = useState(false);
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

  useEffect(() => {
    let f = props.mode == 1 ? true : false;
    setFormDisabled(f);
    props.id && getDetail(props.id);
    if (props.mode == 0) {
      formRef.resetFields();
    }
  }, [props.mode, props.id]);
  const getDetail = (id) => {
    //   console.log('getDetail',id)
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
    role_id: [
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
  };
  const handleOpen = () => {
    console.log("handleOpen");
    getRolePermissions();

    // setDefaultCheckedKeys(formRef.getFieldValue('permission')||[])
    // console.log("defaultCheckedKeys",defaultCheckedKeys,formRef.getFieldValue('permission'));
  };

  const getRolePermissions = () => {
    Api.getPermissionByRole({
      detail: true,
    }).then((res) => {
      let permissions = res.data.permission || {};
      let permissionList = res.data.permissionList || {};
      let treeData = [];
      let keys = Object.keys(permissions);
      for (let [key, value] of Object.entries(permissions)) {
        let children = [];
        for (let val of value) {
          children.push(permissionList[key + "_" + val]);
        }
        treeData.push({
          _id: key,
          name: key + "模块权限",
          children,
        });
      }
      console.log(keys);
      setTreeData(treeData);
      setKeys(keys);
      setExpandedKeys(keys);
      setCheckedKeys(formRef.getFieldValue("permission") || []);
      setAutoExpandParent(false);
      setVisible(true);
    });
  };
  const fieldNames = {
    title: "name",
    key: "_id",
    children: "children",
  };
  const [keys, setKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(["system"]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue, keys);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    // setSelectedKeys(selectedKeysValue);
  };
  let handleClose = () => {
    setVisible(false);
    let right = checkedKeys.filter((item) => {
      return !keys.includes(item);
    });
    console.log(right, keys);
    formRef.setFieldsValue({ permission: right });
  };
  const CuModal = () => (
    <Modal
      title="分配权限"
      centered
      visible={visible}
      onOk={handleClose}
      onCancel={handleClose}
      width={500}
      maskClosable={false}
    >
      <Tree
        height={500}
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
        fieldNames={fieldNames}
      />
    </Modal>
  );
  return (
    <>
      {" "}
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

        <Form.Item label="角色标识" name="role_id" rules={rules.role_id}>
          <Input />
        </Form.Item>
        <Form.Item label="角色名称" name="name" rules={rules.name}>
          <Input />
        </Form.Item>
        <Form.Item label="分配权限" name="permission" rules={rules.permission}>
          <Form.Item
          >
            <Button type="primary" onClick={handleOpen}>
              分配权限
            </Button>
          </Form.Item>
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
      {/* <CuModal></CuModal> */}
      {CuModal()}
    </>
  );
}
