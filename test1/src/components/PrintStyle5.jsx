import React, { PropTypes } from 'react';
import styles from './printStyle.less';
import {Icon} from 'antd';

//移动介质
const PrintStyle5=({changePrintCloseStatus,handleClick,product})=> {
  const {csblxname="sblxname",personname="personname",sbmjname="sbmjname",zch="zch",print_close_status="none"} = product;
  return (
    <div className={` ${styles.print_item} ${styles.size_M}`} id="t5" style={{position:"relative"}}>
      <a onClick={handleClick.bind(this, zch)} style={{position:"absolute",top:"0",right:"0",display:print_close_status}}><Icon type="close-circle-o" /></a>
      <div onClick={changePrintCloseStatus.bind(this,product)} className={styles.print_content}>
        <div className={styles.content} style={{width:'100%'}}>
          <p>{csblxname}</p>
          <span>{personname}</span>
          <p className={styles.last}>{sbmjname}</p>
          <span>{zch}</span>
        </div>
      </div>
    </div>
  );
}

export default PrintStyle5;
