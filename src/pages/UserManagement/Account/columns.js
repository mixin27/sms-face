module.exports = [
  {
    title: "User Name",
    dataIndex: "user_name",
    key: "user_name",
    align: "center",
    width: "20%",
    editable: true,
    sorter: (a, b) => a.user_name.length - b.user_name.length,
    sortDirections: ["ascend", "descend"]
  },
  {
    title: "Email",
    dataIndex: "email",
    align: "center",
    key: "email",
    width: "20%",
    sorter: (a, b) => a.email.length - b.email.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  },
  {
    title: "Phone",
    dataIndex: "phone_no",
    align: "center",
    key: "phone_no",
    width: "20%",
    sorter: (a, b) => a.phone_no.length - b.phone_no.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  },
  {
    title: "Role",
    dataIndex: "role",
    align: "center",
    key: "role",
    width: "20%",
    editable: true,
    sorter: (a, b) => a.role.length - b.role.length,
    sortDirections: ["descend", "ascend"]
  }
];
