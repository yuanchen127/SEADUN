import React,{ PropTypes } from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';
import ProductSearch from '../components/ProductSearch';
import MainLayout from '../components/MainLayout/MainLayout';
import {Switch,Radio,Button,Modal,Row,Col,Badge} from 'antd';
import {Upload,message,Icon} from 'antd';
import styles from './products.less';
import PrintStyle1 from '../components/PrintStyle1';
import PrintStyle2 from '../components/PrintStyle2';
import PrintStyle3 from '../components/PrintStyle3';
import PrintStyle4 from '../components/PrintStyle4';
import PrintStyle5 from '../components/PrintStyle5';
import PrintStyle6 from '../components/PrintStyle6';
import PrintStyleTS from '../components/PrintStyleTS';
const RadioButton=Radio.Button;
const RadioGroup=Radio.Group;
const Products=({location,dispatch,products})=>{

  const {pagination,printStyle,ModalVisible,productSelectedKeys,list,printDevices=[],sblxs,orgs}=products;
  let printDevicesCache = printDevices;
  const printTables=[];

  const uploadProps={
    action: 'http://192.168.2.191:8080/JfinalTest/record/uploadFile/',
    showUploadList:false,
    onChange(info){
      if (info.file.status !=='uploading') {
        setTimeout(function () {
          dispatch({
            type:'products/excelData',
          });
        },5000);
      }
    }
  };

  function handleDeletePrintDevice(zch){
    dispatch({
      type:'products/deletePrintDevice',
      payload:zch,
    });
  }
  function changePrintCloseStatus(product){
    if(product.print_close_status == "none"){
      product.print_close_status="flex";
    }else{
      product.print_close_status="none";
    }
    for(let i=0;i<printDevicesCache.length;i++){
      if(printDevicesCache[i].zch == product.zch){
        printDevicesCache[i] = product;
      }
    }
    dispatch({
      type:'products/changePrintCloseStatus',
      payload:printDevicesCache,
    });
  }
  for (let i=0;i<printDevices.length;i++) {
    switch(printDevices[i].printStyle){
      case "J":
        printTables.push(<PrintStyle1 changePrintCloseStatus={changePrintCloseStatus} handleClick={handleDeletePrintDevice} product={printDevices[i]}/>);
        break;
      case "A":
        printTables.push(<PrintStyle2 changePrintCloseStatus={changePrintCloseStatus} handleClick={handleDeletePrintDevice} product={printDevices[i]}/>);
        break;
      case "N":
        printTables.push(<PrintStyle3 changePrintCloseStatus={changePrintCloseStatus} handleClick={handleDeletePrintDevice} product={printDevices[i]}/>);
        break;
      case "M":
        printTables.push(<PrintStyle5 changePrintCloseStatus={changePrintCloseStatus} handleClick={handleDeletePrintDevice} product={printDevices[i]}/>);
        break;
      case "K":
        printTables.push(<PrintStyle6 changePrintCloseStatus={changePrintCloseStatus} handleClick={handleDeletePrintDevice} product={printDevices[i]}/>);
            break;
      case "P":
        printTables.push(<PrintStyle4 changePrintCloseStatus={changePrintCloseStatus} handleClick={handleDeletePrintDevice} product={printDevices[i]}/>);
            break;
      case "TS":
        printTables.push(<PrintStyleTS changePrintCloseStatus={changePrintCloseStatus} handleClick={handleDeletePrintDevice} product={printDevices[i]}/>);
            break;
    }
  }
  function handleDelete(zch) {
    dispatch({
      type:'products/delete',
      payload:zch,
    });
  }
  function handleAddTo() {
    dispatch({
      type:'products/addToPrintDevices',
      payload:printDevicesCache,
    });
  }
  const rowSelection = {
    selectedRowKeys:productSelectedKeys,
    onSelect(record,selected,selectedRows) {
      if(selected){
        record.print_close_status="none";
        record.printStyle=printStyle;
        printDevicesCache.push(record);
        handleAddTo();
      }else {
        printDevicesCache = printDevicesCache.filter(item=>item.zch !==record.zch);
        handleAddTo();
      }
    },
    onSelectAll(selected, selectedRows, changeRows) {
      if(selected){
        for(let i=0;i<changeRows.length;i++){
          printDevicesCache.push(changeRows[i]);
        }
        for(let i=0;i<printDevicesCache.length;i++){
          printDevicesCache[i].print_close_status="none";
          printDevicesCache[i].printStyle=printStyle;
        }
        handleAddTo();
      }else {
        for(let i=0;i<changeRows.length;i++){
          printDevicesCache = printDevicesCache.filter(item => item.zch!=changeRows[i].zch);
        }
        handleAddTo();
      }
    },
    onChange(selectedRowKeys) {
      dispatch({
        type:'products/updateProductSelectKeys',
        payload:selectedRowKeys,
      });
    },
  };
  const ProductSearchProps={
    handleAddTo:handleAddTo,
    cascadersblxs:sblxs,
    cascaderorgs:orgs,
    onSearch(fieldsValue){
      dispatch({
        type:'products/search',
        payload:fieldsValue,
      });
    },
  };
  function handlePrint(){
    for(let i=0;i<printDevicesCache.length;i++){
      printDevicesCache[i].print_close_status="none";
    }
    handleAddTo();

    let el;
    let iframe;
    let doc ;
    setTimeout(function () {
      el = document.getElementById('printBody');
      iframe = document.createElement('iframe');

      iframe.setAttribute('style', 'position:absolute;width:210mm;height:290mm;left:-2000px;top:-2000px;');
      document.body.appendChild(iframe);
      doc = iframe.contentWindow.document;
      doc.write('<link rel="stylesheet" href="index.css" />');
      doc.write('<div>' + el.innerHTML + '</div>');
      doc.close();
    },1000);

    setTimeout(function(){
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      iframe.remove();
    },1500);

  }
  function handleCancel(){
    dispatch({
      type:'products/changeModalVisible',
      payload:false,
    });
  }
  function clear(){
    printDevicesCache=[];
    handleAddTo();
    dispatch({
      type:'products/updateProductSelectKeys',
      payload:[],
    });
  }
  function handlePrintStyleChange(e){
    dispatch({
      type:'products/changePrintStyle',
      payload:e.target.value,
    });
  }
  function handleChangePaginStatus(checked){
    if(checked){
      dispatch({
        type:'products/changePagination',
        payload:{pageSize:10},
      });
    }else{
      dispatch({
        type:'products/changePagination',
        payload:false,
      });
    }
  }

  // <p style={{position:"absolute",right:"90px",top:"-16px"}}><Badge count={printDevices.length} style={{ backgroundColor: '#2db7f5' }} /></p>
  return (
    <MainLayout onChange={handlePrintStyleChange} location={location} handlePrint={handlePrint} ProductSearchProps={ProductSearchProps}>

      <Modal  maskClosable={true} onCancel={handleCancel} visible={ModalVisible} closable={false} style={{width:"600px",margin:"0 auto"}} footer="">
        <ProductList  pagination={pagination} onDelete={handleDelete} products={list} rowSelection={rowSelection}/>
      </Modal>
      <Row style={{margin:"50px auto"}}>

        <Col span={3} />
        <Col span={18} style={{position:"relative"}}>
          <p style={{position:"absolute",right:"90px",top:"-16px"}}><Badge count={printDevices.length} style={{ backgroundColor: '#2db7f5' }} /></p>
            <div className={styles.identi} id="printBody" >
              {printTables}
            </div>

        </Col>

        <Col span={3} />
      </Row>
      <div style={{width: "70px",float: "right","margin-top":"-165px","margin-right":"20px"}}>
        <Switch defaultChecked={true} checkedChildren={'开'} unCheckedChildren={'关'} onChange={handleChangePaginStatus} style={{width:"65px"}}/>
        <div style={{"margin-top":"10px"}}>
          <Upload {...uploadProps} >
            <Button type="primary" style={{"width":"65px"}}>
               EXCEL
            </Button>
          </Upload>
        </div>
        <Button type="primary" size="large" style={{"margin-top":"10px"}} onClick={handlePrint}>打印</Button>
        <Button type="primary" size="large" style={{"margin-top":"10px"}} onClick={clear}>清除</Button>
      </div>


    </MainLayout>
  );
};

export default connect(({products})=>({products}))(Products);
