import React, {FunctionComponent} from "react";
import css from './Record.module.css';
import {Link} from "react-router-dom";

interface IRecordData {
    id: number;
    name: string;
}

type TMyProps = {
    recordData: IRecordData;
};

const Record: FunctionComponent<TMyProps> = (props) => {
        return (
        <Link to={"/tasks/" + props.recordData.id}>
            <div className={css.Record}>
                {props.recordData.name}
            </div>
        </Link>
    )
}

export default Record;
