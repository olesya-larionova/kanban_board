import React, {FunctionComponent, RefObject, useRef} from "react";
import css from './UserMenu.module.css';
import userMenuDownImg from './user-menu-down.svg';
import userMenuUpImg from './user-menu-up.svg';

const UserMenu: FunctionComponent = (): JSX.Element => {
    
    const refMenuList: RefObject<HTMLUListElement> = useRef(null);
    const refMenuImg: RefObject<HTMLImageElement> = useRef(null);

    const onClickMenuIcon = () => {
        if(refMenuList.current) {
            refMenuList.current.hidden = !refMenuList.current.hidden;
            if(refMenuImg.current) {
                if (refMenuList.current.hidden) {
                    refMenuImg.current.src = userMenuDownImg.toString();
                } else {
                    refMenuImg.current.src = userMenuUpImg.toString();
                }
            }
        }
    }

    return (
        <div className={css.UserMenu} onClick={onClickMenuIcon}>
            <img ref={refMenuImg} src={userMenuDownImg.toString()} alt="User menu"/>
            <ul ref={refMenuList} className={css.Menu} hidden>
                <span className={css.Arrow}></span>
                <li>Profile</li>
                <li>Log Out</li>
            </ul>
        </div>
    )
}

export default UserMenu;