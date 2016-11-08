import React, { PropTypes } from 'react';
import styles from './printStyle.less';
import {Icon} from 'antd';
//安全设备
const PrintStyle2=({changePrintCloseStatus,handleClick,product})=> {
  const {csblxname="default",sbmjname="default",orgname="default",zch="default",personname="default",print_close_status="none"} = product;
  return (
    <div className={`${styles.size_AW} ${styles.print_item}`} id="t2" style={{position:"relative"}}>
      <a onClick={handleClick.bind(this, zch)} style={{position:"absolute",top:"0",right:"0",display:print_close_status}}><Icon type="close-circle-o" /></a>
      <div onClick={changePrintCloseStatus.bind(this,product)} className={styles.print_content}>
        <h4>中航工业成飞</h4>
        <div className={styles.secret}>{sbmjname}</div>
        <div className={styles.content}>
          <p>责任部门</p>
          <span>{orgname}</span>
          <p>统一编号</p>
          <span>{zch}</span>
          <p>责任人</p>
          <span>{personname}</span>
          <p className={styles.last}>设备类型</p>
          <span>{csblxname}</span>
        </div>
      </div>
    </div>
  );

}

export  default PrintStyle2;
