import React, { PropTypes } from 'react';
import styles from './printStyle.less';
import {Icon} from 'antd';

//key
const PrintStyle6=({changePrintCloseStatus,handleClick,product})=> {
  const {csblxname="sblxname",personname="personname",zch="zch",print_close_status="none"} = product;

  return (
    <div className={`${styles.size_K} ${styles.print_item}`} id="t6" style={{position:"relative"}}>
      <a onClick={handleClick.bind(this, zch)} style={{position:"absolute",top:"0",right:"0",display:print_close_status}}><Icon type="close-circle-o" /></a>
      <div onClick={changePrintCloseStatus.bind(this,product)} className={styles.print_content}>
        <div className={styles.content} style={{width:'100%'}}>
          <p>{csblxname}</p>
          <span>{personname}</span>
          <span className={styles.full_row}>{zch}</span>
        </div>
      </div>
    </div>
  );
}


export default PrintStyle6;
