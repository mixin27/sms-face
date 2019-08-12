import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config'
import { Layout } from 'antd';
import { connect } from 'react-redux'
import {IntlProvider} from 'react-intl';
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import my from 'react-intl/locale-data/my'
import zgh from 'react-intl/locale-data/zgh'

import Header from '../components/Header'
import Sider from '../components/Sider'
import Breadcrumbs from '../components/Breadcrumb'
import messages from '../utils/messages'
import { setLocale } from '../actions/locale'

import './layout.css'

addLocaleData(en)
addLocaleData(my)
addLocaleData(zgh)

const { Content } = Layout;

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

  render() {
    const { collapsed } = this.state;
    const { route:{routes} ,lang  } = this.props

    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
      <Layout>
        <Sider collapsed={collapsed}/>
        <Layout>
          <Header 
            collapsed = {collapsed}
            toggle = {this.toggle}
          />
          <Content style={{
            margin: '24px 16px', padding: 10, background: 'wheat',
          }}>
            <Breadcrumbs />
            {renderRoutes(routes)}
          </Content>
        </Layout>
      </Layout>
      </IntlProvider>
    );
  }
}

function mapStateToProps(state){
  return {
    lang: state.locale.lang
  }
}

export default connect(mapStateToProps,{ setLocale})(App);
