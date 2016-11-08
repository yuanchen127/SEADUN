import React, { PropTypes } from 'react';
import { Menu, Switch,Icon } from 'antd';
import { Link } from 'dva/router';
import {Button,notification,Tooltip} from 'antd';
import styles from './MainLayout.less';
import {Radio} from 'antd';
import ProductSearch from '../../components/ProductSearch';

const RadioButton=Radio.Button;
const RadioGroup=Radio.Group;

function getMenuKeyFromUrl(pathname) {
  let key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
    /* eslint no-empty:0 */
  } catch (e) {}
  return key;
}

function Header({ location,handlePrint ,ProductSearchProps}) {

  return (
    <Menu
      selectedKeys={[getMenuKeyFromUrl(location.pathname)]}
      mode="horizontal"
      theme="light"
    >
      <div>
        <ProductSearch {...ProductSearchProps} />
      </div>

    </Menu>
  );
}

Header.propTypes = {
  location: PropTypes.object,
};

export default Header;
