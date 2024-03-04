import React, {FunctionComponent} from "react";
import css from "./Logo.module.css";

const Logo: FunctionComponent = (): JSX.Element => {
    return (
        <div className={css.Logo}>Замечательная канбан-доска</div>
    )
}

export default Logo;