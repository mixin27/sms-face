module.exports = [
  {
    title: "Position Type",
    dataIndex: "position_type",
    key: "position_type",
    align: "left",
    editable: true,
    width: '20%',
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.position_type.length - b.position_type.length
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "60%",
    align: "left",
    key: "description",
    sorter: (a, b) => a.description.length - b.description.length,
    sortDirections: ["ascend", "descend"],
    editable: true
  }
];