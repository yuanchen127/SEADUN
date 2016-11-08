import React, { PropTypes } from 'react';
import styles from './printStyle.less';
import {Icon} from 'antd';

//计算机外设
const PrintStyle4=({changePrintCloseStatus,handleClick,product})=> {
  const {sbmjname="sbmjname",csblxname="sblxname",orgname="orgname",zch="zch",personname="personname",sbytname="sbytname",print_close_status="none"} = product;

  return (
    <div className={`${styles.size_PW} ${styles.print_item}`} id="t4" style={{position:"relative"}}>
      <a onClick={handleClick.bind(this, zch)} style={{position:"absolute",top:"0",right:"0",display:print_close_status}}><Icon type="close-circle-o" /></a>
      <h4>中航工业成飞</h4>
      <div onClick={changePrintCloseStatus.bind(this,product)} className={styles.print_content}>
        <div className={styles.secret}>{sbmjname}</div>
        <div className={styles.content}>
          <span className={styles.full_row}>{csblxname}</span>
          <p>责任部门</p>
          <span>{orgname}</span>
          <p>统一编号</p>
          <span>{zch}</span>
          <p>责任人</p>
          <span>{personname}</span>
          <span className={styles.full_row}>{sbytname}</span>
        </div>
      </div>
    </div>
  );

}

export default PrintStyle4;
