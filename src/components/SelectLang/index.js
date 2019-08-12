
//react
import React from 'react';
import HeaderDropdown from '../HeaderDropdown'
//redux
import { connect } from 'react-redux'
import { setLocale } from '../../actions/locale'
//ant
import { Menu, Icon } from 'antd';
//css
import './index.css'
//image
import enFlag from '../../assets/img/GB.png'
import mmFlag from '../../assets/img/MM.png'

const SelectLangComponent =  ({setLocale}) => {
    const locales = ['en', 'my', 'zgh'];
    const languageIcons = {
        'en': <span><img src={enFlag} alt='English Flag' /></span>,
        'my': <span><img src={mmFlag} alt= 'Myanmar Flag'/></span>,
        'zgh': <span><img src={mmFlag} alt= 'Myanmar Flag'/></span>,
        };
    const languageLabels = {
        'en': 'English',
        'my': 'မြန်မာ',
        'zgh': 'zawgyi',
    };
    const langMenu = (
        <Menu className='menu'>
            {locales.map(locale => (
                <Menu.Item key={locale} onClick={()=>setLocale(locale)}>
                    <span role="img" aria-label={languageLabels[locale]}>
                    {languageIcons[locale]}
                    </span>{' '}
                    {languageLabels[locale]}
                </Menu.Item>
            ))}        
        </Menu>
    );
    return (
        <HeaderDropdown  overlay={langMenu} placement="bottomRight">
            <Icon type="global" style = {{color : '#1890ff'}} className="world-icon" title='language'/>
        </HeaderDropdown>
    )
}
function mapStateToProps(state){
    return{
        lang : state.locale.lang
    }
}
const SelectLang = connect( mapStateToProps, {setLocale})(SelectLangComponent)  
export default SelectLang