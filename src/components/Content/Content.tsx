import {Route, Routes} from "react-router-dom";
import React, {FunctionComponent}  from "react";
import Task from "../Task/Task";
import Kanban from "../Kanban/Kanban";
import css from './Content.module.css';

type TProps = {
    db: {
        blocks: Array<{id:number, name:string}>,
        records: Array<{id:number, name:string, desc:string, blockId: number}>,
        addRecord: Function;
        moveRecord: Function;
        save: Function
    },
    addRec: Function,
    moveRec: Function
}

const Content: FunctionComponent<TProps> = (props) => {

    return (
        <main className={css.Content}>
            <Routes>
                <Route path='/' element={<Kanban db={props.db}  addRec={(name: string)=>{return props.addRec(name)}} moveRec={(id: number, blockId: number)=>{return props.moveRec(id, blockId)}}/>} />
                <Route path='/tasks/:id' element={<Task db={props.db}/>}/>
            </Routes>
        </main>
    )
}

export default Content;