import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'
import zh_CN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from 'antd';
// console.log(process.env)
ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zh_CN}>
       <App />
    </ConfigProvider>
   
  </Provider>,
  document.getElementById('root')
);
