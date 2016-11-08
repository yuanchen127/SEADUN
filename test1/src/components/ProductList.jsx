import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button } from 'antd';

const ProductList=({pagination,rowSelection, onDelete, products })=> {
  const columns = [
    {
      title: '资产号',
      dataIndex: 'zch',
      key: 'zch',
    },
    {
      title: '密级',
      dataIndex: 'sbmjname',
      key: 'sbmjname',
    },
    {
      title: '设备类型',
      dataIndex: 'csblxname',
      key: 'csblxname',
    },
    {
      title: '责任部门',
      dataIndex: 'orgname',
      key: 'orgname',
    },
    {
      title: '责任人',
      dataIndex: 'personname',
      key: 'personname',
    },
    {
      title: '用途',
      dataIndex: 'sbytname',
      key: 'sbytname',
    },
  ];
  return (
    <div>
      <Table
        rowSelection={rowSelection}
        dataSource={products}
        columns={columns}
        pagination={pagination}
      />
    </div>
  );
}

ProductList.proptypes={
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};
export default ProductList;
