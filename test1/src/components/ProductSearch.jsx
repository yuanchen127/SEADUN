import React, {PropTypes} from 'react';
import {Form, Input, Button, Select, Cascader} from 'antd';
import styles from './Product.less';

const ProductSearch = ({
  handleAddTo,
  onSearch,
  cascadersblxs,
  cascaderorgs,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      console.log(getFieldsValue());
      onSearch(getFieldsValue());
    });
  }


  return (
    <div className={styles.normal} >
      <div className={styles.search} style={{height:"25px"}}>
        <Form inline onSubmit={handleSubmit} style={{width:'760px',margin:'0 auto'}}>
          <Form.Item
            label="统一编号"
          >
            {getFieldDecorator('zch', {initialValue: ''})(
              <Input placeholder="输入统一编号"/>
            )}
          </Form.Item>

          <Form.Item
            label="责任单位"
          >
            {getFieldDecorator('orgid', {initialValue: ''})(
              <Cascader options={cascaderorgs} expandTrigger="hover" changeOnSelect placeholder="请选择责任单位"/>
            )}
          </Form.Item>
          <Form.Item
            label="设备类型"
          >
            {getFieldDecorator('sblxcode', {initialValue: ''})(
              <Cascader options={cascadersblxs} expandTrigger="hover" changeOnSelect placeholder="请选择设备类型"/>
            )}
          </Form.Item>
          <Button style={{marginRight: '10px'}} type="primary" htmlType="submit">搜索</Button>
        </Form>
      </div>
    </div>
  );
};

ProductSearch.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
  cascaderOptions: PropTypes.array,
};

export default Form.create()(ProductSearch);
