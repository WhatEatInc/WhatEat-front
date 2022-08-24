import Logo from '../../images/logo-horizontal.svg'

function Header() {
    return (
        <header className="header">
            <img className='header-logo' src={Logo}  alt="WhatEat logo"/>
        </header>
    )
}

export default Header