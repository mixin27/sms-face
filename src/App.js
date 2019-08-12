import React from 'react'
import { Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'

import store from './store'
import routes from './router/routes'
import history from './router/history'
import { localeSet } from './actions/locale';

export default () => {
    
    if(localStorage.alhubLang){
        store.dispatch(localeSet(localStorage.alhubLang))
    }
    
    return (
        <Provider store={store}>
            <Router history={history}>
                <div>{renderRoutes(routes)}</div>
            </Router>
        </Provider>
    )
}
