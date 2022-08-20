import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Pagination,
  Tag,
  Popconfirm,
  Drawer,
  Space,
  message,
  Form,
  Input,
  Select,
  Col,
  Row,
  Radio,
} from "antd";
import AuthButton from "../../components/AuthButton/AuthButton";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UndoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Api from "../../api/role";
import Edit from "./Edit";
import style from "./style.module.scss";
const { Option } = Select;

export default function Role() {
  //初始化state
  const [option, setOption] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [paging, setPaging] = useState({
    page: 1,
    page_size: 10,
  });
  const [query, setQuery] = useState({});

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("新增");
  const [id, setId] = useState(null);
  let [mode, setMode] = useState(0);
  let titles = ["新增", "查看", "编辑"];
  //抽屉
  const showDrawer = () => {
    setVisible(true);
  };
  const closeDrawer = () => {
    setVisible(false);
  };
  //add-0 view-1 edit-2
  // let mode=0;
  const changeMode = (val) => {
    // mode = val;
    setMode(val);
    setTitle(titles[val]);
  };
  const onClose = () => {
    setVisible(false);
  };
  //接口数据
  useEffect(() => {
    getData({ ...paging, ...query });
  }, [paging, query]);

  //获取数据
  const getData = (params) => {
    setLoading(true);
    Api.getList(params)
      .then((res) => {
        let data = res.data || [];
        setDataSource(data);
        setLoading(false);
        let paging = {
          ...res.paging,
        };
        setCount(paging.count);
        delete paging.count;
        // setPaging(paging);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  //删除
  const handleDelete = (_id) => {
    Api.remove({ _id }).then((res) => {
      message.success(res.message);
      getData({ ...paging, ...query });
    });
  };
  //查看
  const handleView = (id) => {
    showDrawer();
    changeMode(1);
    setId(id);
    console.log("查看", id);
  };
  //新增
  const handleAdd = () => {
    showDrawer();
    changeMode(0);
    setId(null);
  };
  //编辑
  const handleEdit = (id) => {
    showDrawer();
    changeMode(2);
    setId(id);
    console.log("编辑", id);
  };
  //
  const handlePageChange = (page, page_size) => {
    console.log(page, page_size);
    setPaging({ page, page_size });
  };

  //表格数据
  const columns = [
    {
      title: "序号",
      key: "id",
      align: "center",
      width: 50,
      render: (value, record, index) =>
        `${(paging.page - 1) * paging.page_size + index + 1}`,
    },
    { title: "名称", dataIndex: "name", align: "center" },

    {
      title: "标识",
      dataIndex: "role_id",
      align: "center",
      render: (value, record) => <Tag color="#2db7f5">{record.role_id}</Tag>,
    },
    { title: "备注", dataIndex: "comment", align: "center" },
    { title: "创建时间", dataIndex: "create_at", align: "center" },
    {
      title: "操作",
      key: "operator",
      width: 260,
      align: "center",
      render: (value, record) => {
        const { _id, name } = record;

        const confirm = (e) => {
          console.log(e);
          handleDelete(_id);
        };

        const cancel = (e) => {
          console.log(e);
        };

        return (
          <div className="flex justify-between">
            <AuthButton auth="role:r">
              <Button type="primary" onClick={() => handleView(_id)}>
                查看
              </Button>
            </AuthButton>
            <AuthButton auth="role:u">
              <Button
                type="primary"
                onClick={() => handleEdit(_id)}
                icon={<EditOutlined />}
              >
                编辑
              </Button>
            </AuthButton>
            <Popconfirm
              title="确定删除？"
              placement="leftTop"
              onConfirm={confirm}
              onCancel={cancel}
              okText="确定"
              cancelText="取消"
            >
              <AuthButton auth="role:d">
                <Button type="primary" danger icon={<DeleteOutlined />}>
                  删除
                </Button>
              </AuthButton>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container" className={`container ${style.container}`}>
      <div className="content">
        <div className="nav">
          <Space>
            <AuthButton auth="role:c">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                新增
              </Button>
            </AuthButton>
          </Space>
        </div>
        <div className="table-box">
          <Table
            rowKey="_id"
            size="middle"
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{ y: "calc(100vh - 64px - 50px - 130px)" }}
            loading={loading}
          />
          ;
        </div>
      </div>
      <div className="footer">
        <Pagination
          defaultCurrent={paging.page}
          defaultPageSize={paging.page_size}
          pageSize={paging.page_size}
          total={count}
          current={paging.page}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共${total}条`}
          onChange={handlePageChange}
          //   onShowSizeChange={handlePageChange}
        />
      </div>
      <Drawer
        title={title}
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Edit mode={mode} id={id} closeDrawer={closeDrawer}></Edit>
      </Drawer>
    </div>
  );
}
