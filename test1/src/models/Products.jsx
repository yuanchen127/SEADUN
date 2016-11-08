import dva from 'dva';
import {queryDevices,querySblx,queryOrgs} from '../services/products';
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
      // console.log('search--printdevices:',printDevices);
      const {data} = yield call(searchByPayload,parse(payload));
      if(data){
        yield put({
          type:'querySuccess',
          payload:{
            list:data,
          },
        });
      }

    }
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    querySuccess(state,action) {
      console.log('querysuccess-state-start:',state);
      state = { ...state, ...action.payload, loading: false ,ModalVisible:true};
      console.log('querysuccess-state-end:',state);
      return state;
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
