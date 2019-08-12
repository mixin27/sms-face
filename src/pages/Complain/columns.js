module.exports = [
    {
      title: "Complain No",
      dataIndex: "complain_no",
      key: "complain_no",
      align: "center",
      editable: true,
      fixed: "left",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.complain_no.length - b.complain_no.length
    },
    {
      title: "Model No",
      dataIndex: "model_no",
      key: "model_no",
      align: "center",
      editable: true,
      fixed: "left",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.model_no.length - b.model_no.length
    },
    {
      title: "FUP No",
      dataIndex: "fup_no",
      key: "fup_no",
      align: "center",
      editable: true,
      fixed: "left",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.fup_no.length - b.fup_no.length
    },
    {
      title: "Warranty Year",
      dataIndex: "warranty_year",
      key: "warranty_year",
      align: "center",
      editable: true,
      // sortDirections: ["ascend", "descend"],
      // sorter: (a, b) => a.warranty_year.length - b.warranty_year.length
    },
    {
      title: "Working Hour",
      dataIndex: "working_hr",
      key: "working_hr",
      align: "center",
      editable: true,
      // sortDirections: ["ascend", "descend"],
      // sorter: (a, b) => a.working_hr.length - b.working_hr.length
    },
    {
      title: "Warranty Description",
      dataIndex: "warranty_description",
      key: "warranty_description",
      editable: true,
      width: "30%",
      // sortDirections: ["ascend", "descend"],
      // sorter: (a, b) =>
      //   a.warranty_description.length - b.warranty_description.length
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
      align: "center",
      editable: true,
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.customer_name.length - b.customer_name.length
    },
    {
      title: "Customer Phone No",
      dataIndex: "customer_phone_no",
      key: "customer_phone_no",
      align: "center",
      editable: true,
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.customer_phone_no.length - b.customer_phone_no.length
    },
    {
      title: "Date",
      dataIndex: "date",
      // key: "date",
      align: "center",
      editable: true,
      // sortDirections: ["ascend", "descend"],
      // sorter: (a, b) => a.date.length - b.date.length
    },
    {
      title: "Distance",
      dataIndex: "distance",
      key: "distance",
      align: "center",
      editable: true,
      // sortDirections: ["ascend", "descend"],
      // sorter: (a, b) => a.distance.length - b.distance.length
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      align: "center",
      editable: true,
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.location.length - b.location.length
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      editable: true,
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.amount.length - b.amount.length
    },
    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "job_title",
      align: "center",
      editable: true,
      // sortDirections: ["ascend", "descend"],
      // sorter: (a, b) => a.job_title.length - b.job_title.length
    },
    {
      title: "Complain Job Title",
      dataIndex: "complain_job_title",
      key: "complain_job_title",
      align: "center",
      editable: true,
      // sortDirections: ["ascend", "descend"],
      // sorter: (a, b) => a.complain_job_title.length - b.complain_job_title.length
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "30%",
      key: "description",
      // sorter: (a, b) =>
      //   a.description.length - b.description.length,
      // sortDirections: ["descend", "ascend"],
      editable: true
    }
  ];
  