module.exports = [
    {
        title: 'Model',
        dataIndex: 'model_no',
        key: 'model_no',
        align: 'left',
        editable: true,
        width: '20%',
        sortDirections: ['ascend', 'descend'],
        sorter: (a, b) => a.model_no.length - b.model_no.length
    },
    {
        title: 'Descriptions',
        dataIndex: 'description',
        width: '60%',
        align: 'left',
        key: 'description',
        sorter: (a, b) => a.description.length - b.description.length,
        sortDirections: ['descend', 'ascend'],
        editable: true
    }
];