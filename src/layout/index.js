import React, { Component } from 'react'
import Media from 'react-media';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config'
import { Layout } from 'antd';
import { connect } from 'react-redux'
import {IntlProvider} from 'react-intl';
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import my from 'react-intl/locale-data/my'
import zgh from 'react-intl/locale-data/zgh'

import Header from '../components/Header'
import PageLoading from '../components/PageLoading';
import Sider from '../components/Sider'
import messages from '../utils/messages'
import { setLocale } from '../actions/locale'
import { currentUser } from '../actions/Auth'
import config from '../utils/config'
//import SwitchWithSlide from '../components/SwitchWithSlide/SwitchWithSlide'

import './layout.css'
import styles from './index.module.less';

addLocaleData(en)
addLocaleData(my)
addLocaleData(zgh)

const { Content,Footer } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    name       : 'Eric',
    unreadCount: 1000,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  componentDidMount(){
    this.props.currentUser()
  }

  handleMenuCollapse = collapsed => {
    this.setState({
      collapsed: collapsed
    })
  };

  render() {
    const { collapsed } = this.state;
    const { route:{routes} ,lang,isSignIn,roleid,isMobile } = this.props
   // const SwitchComponent = isSignIn ? SwitchWithSlide : null 

    if(!isSignIn){
      return (
        <React.Fragment>{renderRoutes(routes)}</React.Fragment>
      )
    }
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
      <Layout>
        <Sider collapsed={collapsed} onCollapse={this.handleMenuCollapse} isMobile={isMobile} roleid={roleid}/>
        <Layout>
          <Header 
            collapsed = {collapsed}
            isMobile={isMobile}
            toggle = {this.toggle}/>
              {/* <SwitchComponent> */}
              <Content  
              style={ isMobile ? {paddingLeft: '1px'} :{ paddingLeft: collapsed ? '80px' : '256px', minHeight: '85vh',}}
              className={styles.content}>
                {
                  routes ? renderRoutes(routes)
                  :
                  <PageLoading />
                }
                
              </Content>
              {/* </SwitchComponent> */}
              <Footer style={{ textAlign: 'left' ,marginLeft : collapsed?'1%' : '15%',backgroundColor : 'white'}}>
                  {/* {config.footerText} */}
                  Copyright ©2019-2020. <span style={{color: 'blue', marginLeft: '3%', marginRight: '3%'}}>Hyundai</span> All right reserved.
              </Footer>
        </Layout>
      </Layout>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  lang: PropTypes.string,
  isSignIn: PropTypes.bool,
  roleid: PropTypes.string
}

function mapStateToProps(state){
  return {
    lang: state.locale.lang,
    isSignIn: state.auth.isSignedIn,
    roleid:state.auth.roleid
  }
}

export default connect(mapStateToProps,{ currentUser,setLocale})(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <App {...props} isMobile={isMobile} />}
  </Media>
));
