import React, {FunctionComponent} from "react";
import css from './Footer.module.css';

type TProps = {
    db: {
        blocks: Array<{id:number, name:string}>,
        records: Array<{id:number, name:string, desc:string, blockId: number}>,
    }
}

const Footer: FunctionComponent<TProps> = (props) => {
    
    const activeCount = props.db.records.filter(el=>el.blockId===0).length;
    const finishedCount = props.db.records.filter(el=>el.blockId===3).length;
    
    return (
        <footer className={css.Footer}>
            <div className={css.Tasks}>Active tasks: &lt;{activeCount}&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Finished tasks: &lt;{finishedCount}&gt;</div>
            <div className={css.Author}>Kanban board by &lt;NAME&gt; &lt;2024&gt;</div>
        </footer>
    )                                                                                       
}

export default Footer;