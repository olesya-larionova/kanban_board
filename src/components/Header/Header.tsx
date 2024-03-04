import React from "react";
import Logo from '../Logo/Logo';
import UserMenu from '../UserMenu/UserMenu';
import css from './Header.module.css';

function Header() {
    return (
        <header className={css.Header}>
            <Logo/>
            <UserMenu/>
        </header>
    )
}

export default Header;