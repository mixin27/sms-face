module.exports = [
    {
      title: "Module Name",
      dataIndex: "module_name",
      key: "module_name",
      align: "center",
      editable: true,
      sorter: (a, b) => a.emp_name.length - b.emp_name.length,
      sortDirections: ["ascend", "descend"]
    },
    {
      title: "Controller Name",
      dataIndex: "controller_name",
      key: "controller_name",
      align: "center",
      editable: true,
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.nrc.length - b.nrc.length
    },
    // {
    //   title: "Action Name",
    //   dataIndex: "action_name",
    //   key: "action_name",
    //   align: "center",
    //   width: "20%",
    //   editable: true,
    //   sortDirections: ["ascend", "descend"],
    //   sorter: (a, b) => a.nrc.length - b.nrc.length
    // },
    {
      title: "Remark",
      dataIndex: "remark",
      align: "center",
      key: "remark",
      sorter: (a, b) => a.position.length - b.position.length,
      sortDirections: ["descend", "ascend"],
      editable: true
    },
   
  ];
  