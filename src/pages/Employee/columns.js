module.exports = [
  {
    title: "Name",
    dataIndex: "emp_name",
    key: "emp_name",
    align: "center",
    editable: true,
    fixed: 'left',
    sorter: (a, b) => a.emp_name.length - b.emp_name.length,
    sortDirections: ["ascend", "descend"]
  },
  {
    title: "NRIC",
    dataIndex: "nrc",
    key: "nrc",
    align: "center",
    fixed: 'left',
    editable: true,
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.nrc.length - b.nrc.length
  },
  {
    title: "Position",
    dataIndex: "position",
    align: "center",
    key: "position",
    fixed: 'left',
    sorter: (a, b) => a.position.length - b.position.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  },
  {
    title: "Department",
    dataIndex: "department",
    width: "15%",
    align: "center",
    key: "department",
    sorter: (a, b) => a.department.length - b.department.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  },
  
  {
    title: "Address",
    dataIndex: "temp_address",
    width: "15%",
    align: "center",
    key: "temp_address",
    sorter: (a, b) => a.temp_address.length - b.temp_address.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  },
  {
    title: "Phone",
    dataIndex: "phone_no",
    width: "15%",
    align: "center",
    key: "phone_no",
    sorter: (a, b) => a.phone_no.length - b.phone_no.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "15%",
    align: "center",
    key: "email",
    sorter: (a, b) => a.email.length - b.Email.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  }
];
