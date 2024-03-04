import React, {FunctionComponent} from "react";
import css from './RecordsBlock.module.css';
import Record from "../Record/Record";
import CardAdd from "../CardAdd/CardAdd";

type TProps = {
    blockData: {id: number, name:String},
    records: Array<{id:number, name:string, desc:string, blockId: number}>,
    db: {
        blocks: Array<{id:number, name:string}>,
        records: Array<{id:number, name:string, desc:string, blockId: number}>
    },
    addRec: Function,
    moveRec: Function
}

const RecordsBlock: FunctionComponent<TProps> = (MyProps) => {
        return (
        <div className={css.RecordsBlock}>
            {MyProps.blockData.name}
            {MyProps.records.map(function(rec){
                return <Record key={rec.id.toString()} recordData={rec}/>
            })}
            <CardAdd blockId={MyProps.blockData.id} db={MyProps.db} addRec={(name: string)=>{return MyProps.addRec(name)}} moveRec={(id: number, blockId: number)=>{return MyProps.moveRec(id, blockId)}} />
        </div>
    )                                                                                                           
}

export default RecordsBlock;

