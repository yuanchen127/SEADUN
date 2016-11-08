import React, { PropTypes } from 'react';
import styles from './printStyle.less';
import {Icon} from 'antd';

//计算机设备
const PrintStyle1=({changePrintCloseStatus,handleClick,product})=> {
  const {sbmjcode,sbmjname="公开",orgname="orgname",zch="zch",personname="personname",csblxname="sblxname",sbytname="sbytname",print_close_status="none"} = product;
  let div_sbmj;
  // if(sbmjcode==3){
  //   div_sbmj = <div className={`${styles.secret} ${styles.level_3}`}>{sbmjname}</div>;
  // }
  switch (sbmjcode){
    case "1":
      div_sbmj = <div className={`${styles.secret} ${styles.level_1}`}>{sbmjname}</div>;
          break;
    case "2":
      div_sbmj = <div className={`${styles.secret} ${styles.level_2}`}>{sbmjname}</div>;
          break;
    case "3":
      div_sbmj = <div className={`${styles.secret} ${styles.level_3}`}>{sbmjname}</div>;
          break;
    default:
      div_sbmj = <div className={`${styles.secret} ${styles.level_4}`}>{sbmjname}</div>;
          break;

  }

  return (
    <div className={`${styles.size_JSJ} ${styles.print_item} `} id="t1" style={{position:"relative"}}>
      <a onClick={handleClick.bind(this, zch)} style={{position:"absolute",top:"0",right:"0",display:print_close_status}}><Icon type="close-circle-o" /></a>

      <div  onClick={changePrintCloseStatus.bind(this,product)} className={styles.print_content}>
        <h4>中航工业成飞</h4>
        {div_sbmj}
        <div className={styles.content}>
          <p>责任部门</p>
          <span>{orgname}</span>
          <p>统一编号</p>
          <span>{zch}</span>
          <p>责任人</p>
          <span>{personname}</span>
          <p>设备类型</p>
          <span>{csblxname}</span>
          <p className={styles.last}>用途</p>
          <span>{sbytname}</span>
        </div>
      </div>
    </div>
  );
}

export default PrintStyle1;
