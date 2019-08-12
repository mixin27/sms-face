module.exports = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      editable: true,
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      align: "center",
      key: "created_at",
      sorter: (a, b) => a.created_at.length - b.created_at.length,
      sortDirections: ["descend", "ascend"],
      editable: true
    },
    // {
    //   title: "Permission",
    //   dataIndex: "permission",
    //   align: "center",
    //   key: "permission",
    //   sorter: (a, b) =>
    //     a.permission.length - b.permission.length,
    //   sortDirections: ["descend", "ascend"],
    //   editable: true
    // },
    {
      title: "Descriptions",
      dataIndex: "description",
      align: "center",
      key: "description",
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ["descend", "ascend"],
      editable: true
    }
  ];
  