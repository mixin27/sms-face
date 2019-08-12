module.exports = [
  {
    title: "Department Name",
    dataIndex: "dept_name",
    key: "dept_name",
    align: "left",
    editable: true,
    width: "25%",
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.dept_name.length - b.dept_name.length
  },
  {
    title: "Code No",
    dataIndex: "dept_code_no",
    width: "15%",
    align: "left",
    key: "dept_code_no",
    sorter: (a, b) => a.dept_code_no.length - b.dept_code_no.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  },
  {
    title: "Descritpion",
    dataIndex: "description",
    width: "30%",
    align: "left",
    key: "description",
    sorter: (a, b) => a.description.length - b.description.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  }
];
