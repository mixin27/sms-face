module.exports = [
  {
    title: "Model No",
    dataIndex: "model_number",
    key: "model_number",
    align: "center",
    editable: true,
    sortDirections: ["ascend", "descend"],
    sorter: (a, b) => a.model_number.length - b.model_number.length
  },
  {
    title: "FUP No",
    dataIndex: "FUP_number",
    align: "center",
    key: "FUP_number",
    sorter: (a, b) => a.FUP_number.length - b.FUP_number.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  },
  {
    title: "Machine Serial No",
    dataIndex: "machine_serial_number",
    align: "center",
    key: "machine_serial_number",
    sorter: (a, b) =>
      a.machine_serial_number.length - b.machine_serial_number.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  },
  {
    title: "Warranty Year",
    dataIndex: "warranty_year",
    align: "center",
    key: "warranty_year",
    sorter: (a, b) => a.warranty_year.length - b.warranty_year.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  },
  {
    title: "Working Your",
    dataIndex: "working_hour",
    align: "center",
    key: "working_hour",
    sorter: (a, b) => a.working_hour.length - b.working_hour.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    sorter: (a, b) => a.location.length - b.location.length,
    sortDirections: ["descend", "ascend"],
    editable: true
  }
];
