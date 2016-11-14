import React, { PropTypes } from 'react';
import styles from './MainLayout.less';
import Header from './Header.jsx';
import {Tooltip,Radio,Button} from 'antd';
const RadioButton=Radio.Button;
const RadioGroup=Radio.Group;
const J_text="台式计算机终端(含专用计算机)、服务器、便携式计算机、打印机、扫描仪、绘图仪、移动硬盘、安全设备(防火墙、入侵检测系统、漏洞扫描)";
const A_text="电磁泄露防护设备、外设(扫描枪)";
const N_text="交换机";
const M_text="三合一介质、录音笔、存储卡、公司统一发放的U盘";
const K_text="智能卡、加密狗";
const P_text="只读光驱、刻录光驱、读卡器";
function MainLayout({ onChange, children, location, handlePrint ,ProductSearchProps}) {

  return (
    <div className={styles.normal}>
      <div style={{margin:"0px auto"}}>
        <RadioGroup onChange={onChange} defaultValue="J" size="large">
            <RadioButton value="J">
              <Tooltip placement="bottom" title={J_text}>
                <p>计算机设备</p>
              </Tooltip>
            </RadioButton>
            <RadioButton value="A">
              <Tooltip placement="bottom" title={A_text}>
                <p>安全设备</p>
              </Tooltip>
            </RadioButton>
            <RadioButton value="N">
              <Tooltip placement="bottom" title={N_text}>
                <p>网络设备</p>
              </Tooltip>
            </RadioButton>
            <RadioButton value="M">
              <Tooltip placement="bottom" title={M_text}>
                <p>移动介质</p>
              </Tooltip>
            </RadioButton>
            <RadioButton value="K">
              <Tooltip placement="bottom" title={K_text}>
                <p>存储介质</p>
              </Tooltip>
            </RadioButton>
            <RadioButton value="P">
              <Tooltip placement="bottom" title={P_text}>
                <p>外设</p>
              </Tooltip>
            </RadioButton>
        </RadioGroup>
      </div>
      <Header location={location} handlePrint={handlePrint} ProductSearchProps={ProductSearchProps}/>
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
};

export default MainLayout;
