import { Component } from 'react';
import Taro from '@tarojs/taro';
import { Provider } from 'react-redux';
import configStore from './store';
import 'taro-ui/dist/style/index.scss';

const store = configStore();

class App extends Component {
  componentDidMount() {
    const token = Taro.getStorageSync('Token')
    if(!token){
      Taro.login({
        success(res){
          console.log('Taro.login-success', res)
          // todo 请求接口获取唯一token
          Taro.setStorageSync('Token', res.code)
        },
        fail(res){
          console.log('Taro.login-error', res)
          Taro.showToast({
            title: res
          })
        }
      })
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
