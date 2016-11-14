import React, { PropTypes } from 'react';
import styles from './printStyle.less';
import {Icon} from 'antd';

//计算机设备
const PrintStyle1=({changePrintCloseStatus,handleClick,product})=> {
  const {sbmj="",zch="zch",fgbm=" ",zrbm="",zrr=" ",sbyt="",print_close_status="none"} = product;
  let div_sbmj;
  switch (sbmj){
    case "机密":
      div_sbmj =`${styles.secret} ${styles.level_1}`;
      break;
    case "秘密":
      div_sbmj = `${styles.secret} ${styles.level_2}`;
      break;
    case "内部":
      div_sbmj =`${styles.secret} ${styles.level_3}`;
      break;
    default:
      div_sbmj = `${styles.secret} ${styles.level_4}`;
      break;

  }

  return (
    <div className={`${styles.size_TS} ${styles.print_item} `} id="t1" style={{position:"relative"}}>
      <a onClick={handleClick.bind(this, zch)} style={{position:"absolute",top:"0",right:"0",display:print_close_status}}><Icon type="close-circle-o" /></a>
      <div  onClick={changePrintCloseStatus.bind(this,product)} className={styles.print_content}>
        <h4>中航工业成飞</h4>
        <div className={`${styles.secret}`} style={{"font-size":"15px","padding":"0px 5px 0px 5px","background-color":"#02a724","height":"101%"}}>特殊设备信息</div>
        <div className={styles.content}>
          <p>统一编号</p>
          <span>{zch}</span>
          <p>分管部门</p>
          <span>{fgbm}</span>
          <p>责任部门</p>
          <span>{zrbm}</span>
          <p>责任人</p>
          <span>{zrr}</span>
          <p>用途</p>
          <span>{sbyt}</span>
          <p className={div_sbmj} style={{"width":"100%","border":"0pt","height":"22px","font-size":"17px"}}>{sbmj}</p>
        </div>
      </div>
    </div>
  );
}

export default PrintStyle1;
