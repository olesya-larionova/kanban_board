import React, {FunctionComponent, useRef, RefObject} from "react";
import {useParams, Link} from "react-router-dom";
import css from './Task.module.css';
import closeImg from './window_close_icon.module.svg';

type TProps = {
    db: {
        blocks: Array<{id:number, name:string}>,
        records: Array<{id:number, name:string, desc:string, blockId: number}>,
        addRecord: Function,
        moveRecord: Function
        save: Function
    }
    
}

const Task: FunctionComponent<TProps> = (props) => {

    const params = useParams();
    const rec = props.db.records.find(el => el.id === (params.id === undefined? -1: +params.id));
    const taskHeader = (rec===undefined? "" : rec.name);
    const taskDesc = (rec===undefined? "" : rec.desc);

    const ref: RefObject<HTMLTextAreaElement> = useRef(null);

    const closeTaskPage = () => {
        
        if(rec && ref.current) {
            rec.desc = ref.current.value;
            props.db.save();
        }
    }

    return (
        <div className={css.Task_page}>
           
            <div className={css.Task_header}>
                <h1 className={css.Title_task_page}>{taskHeader}</h1>
                <button onClick={closeTaskPage} className={css.Btn_close}> 
                    <Link to={`/`}><img className={css.Btn_close_img} src={closeImg.toString()} alt='Close'></img></Link>
                </button>
            </div>
            <div className={css.Text_task_page}>
                <textarea ref={ref} className={css.textArea}>{taskDesc}</textarea>
            </div>
       </div>
    );
}

export default Task;