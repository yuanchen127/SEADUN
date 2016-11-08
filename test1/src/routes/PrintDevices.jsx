import React,{ PropTypes } from 'react';
import { connect } from 'dva';
import styles from './products.less';
import MainLayout from '../components/MainLayout/MainLayout';
import {Row,Col} from 'antd';
const PrintDevices=()=>{


  return (
    <MainLayout location={location}>
      <Row>
        <Col span={3}></Col>
        <Col span={18}>
          <div className={styles.identi} style={{marginTop:"50px",marginBottom:"50px"}}>
          </div>
        </Col>
      </Row>
    </MainLayout>
  );

}

export default PrintDevices;
