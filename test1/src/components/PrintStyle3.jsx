import React, { PropTypes } from 'react';
import styles from './printStyle.less';
import {Icon} from 'antd';

//网络设备
const PrintStyle3=({changePrintCloseStatus,handleClick,product})=> {
  const {sbmjcode,sbmjname="sbmjname",orgname="orgname",zch="zch",csblxname="sblxname",print_close_status="none"} = product;
  let div_sbmj;
  // if(sbmjcode==3){
  //   div_sbmj = <div className={`${styles.secret} ${styles.level_3}`}>{sbmjname}</div>;
  // }
  switch (sbmjcode){
    case "1":
      div_sbmj = <span className={styles.N_level_1}>{sbmjname}</span>;
      break;
    case "2":
      div_sbmj = <span className={styles.N_level_2}>{sbmjname}</span>;
      break;
    case "3":
      div_sbmj = <span className={styles.N_level_3}>{sbmjname}</span>;
      break;
    default:
      div_sbmj = <span className={styles.N_level_4}>{sbmjname}</span>;
      break;

  }

  return (
  <div>
    <div className={`${styles.size_N} ${styles.print_item}`} id="t3" style={{position:"relative"}}>
      <a onClick={handleClick.bind(this, zch)} style={{position:"absolute",top:"1",right:"0",display:print_close_status}}><Icon type="close-circle-o" /></a>
      <h4>中航工业成飞</h4>
      <div onClick={changePrintCloseStatus.bind(this,product)} className={styles.print_content}>
        <div className={styles.content}>
          <p>责任部门</p>
          <span>{orgname}</span>
          <p>统一编号</p>
          <span>{zch}</span>
          <p>设备类型</p>
          <span>{csblxname}</span>
          <p className={styles.last}>密级</p>
          {div_sbmj}
        </div>
      </div>
    </div>
  </div>
);

}

export default PrintStyle3;
