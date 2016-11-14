import dva from 'dva';
import {queryDevices,querySblx,queryOrgs,queryExcelData} from '../services/products';
import {searchByPayload} from '../services/products';
import {parse} from 'qs';

export default {
  namespace: 'products',
  state:{
    list:[],
    printDevices:[],
    productSelectedKeys:[],
    ModalVisible:false,
    printStyle:"J",
    pagination:{pageSize:10},
    excel:[],
  },

  subscriptions: {
    setup({ location,dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/') {
          dispatch({
            type: 'query',
            payload:location.query,
          });
        }
      });
    },
  },

  effects: {
    *query({payload},{select,call,put}) {
      const {data} = yield call(queryDevices,parse(payload));
      const {data:sblx} = yield call(querySblx,parse(payload));
      const {data:orgs} = yield call(queryOrgs,parse(payload));
      if(data){
        yield put({
          type:'querySuccess',
          payload:{
            list:data,
            printDevices:[],
            sblxs:sblx,
            orgs:orgs,
          },
        });
      }
      },

    *search({payload},{call,put}) {
      console.log('开始进行搜索------');
      const {data} = yield call(searchByPayload,parse(payload));
      if(data){
        yield put({
          type:'querySuccess',
          payload:{
            list:data,
          },
        });
      }
    },
    *excelData({payload},{call,put}) {
      const {data} = yield call(queryExcelData,parse(payload));
      if(data){
        yield put({
          type:'handleExcelToPrintDevice',
          payload:{
            excel:data,
          },
        });
      }
    }
  },
  reducers: {
    handleExcelToPrintDevice(state,action){
      if(action.payload.excel){
        for(let i=0;i<action.payload.excel.length;i++){
          action.payload.excel[i].print_close_status="none";
          action.payload.excel[i].printStyle="TS";
          action.payload.excel[i].key=action.payload.excel[i].zch;
          action.payload.excel[i].sbmjcode=1;
          state.printDevices.push(action.payload.excel[i]);
        }
      }
      console.log('see-excel-stat:',state);
    return {...state};
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    querySuccess(state,action) {
      return { ...state, ...action.payload, loading: false ,ModalVisible:true};
    },
    'delete'(state,{payload: zch}){
      return {...state,list:state.list.filter(item => item.zch !== zch)};
    },
    'deletePrintDevice'(state,{payload: zch}){
      return {...state,printDevices:state.printDevices.filter(item => item.zch !== zch),productSelectedKeys:state.productSelectedKeys.filter(item => item !==zch)};
    },
    'search_bak'(state,{payload:zch}){
      return {...state,list:state.list.filter(item=> zch?item.zch ==zch:state.list)};
    },
    'addToPrintDevices'(state,{payload: printDevicesCache}){
      return {...state,printDevices:printDevicesCache};
    },
    updateProductSelectKeys(state,{payload:keys}){
      return {...state,productSelectedKeys:keys};
    },
    changePrintCloseStatus(state,{payload:printDevicesCache}){
      return {...state,printDevices:printDevicesCache};
    },
    changeModalVisible(state,{payload:visible}){
      return {...state,ModalVisible:visible};
    },
    changePrintStyle(state,{payload:printStyle}){
      return {...state,printStyle:printStyle};
    },
    changePagination(state,{payload:pagination}){
      state =  {...state,pagination:pagination};
      console.log('changePagination',state);
      return state;
    },
  },
};

