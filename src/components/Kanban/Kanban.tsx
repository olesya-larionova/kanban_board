import React, {FunctionComponent} from "react";
import RecordsBlock from '../RecordsBlock/RecordsBlock';
import css from './Kanban.module.css';

type TProps = {
    db: {
        blocks: Array<{id:number, name:string}>,
        records: Array<{id:number, name:string, desc:string, blockId: number}>
    },
    addRec: Function,
    moveRec: Function,
}

type TRecord = {id:number, name:string, desc:string, blockId: number}
type TDatabse = {
    blocks: Array<{id:number, name:string}>,
    records: Array<{id:number, name:string, desc:string, blockId: number}>
}

const Kanban: FunctionComponent<TProps> = (props) => {

    return (
        <div className={css.Kanban}>
            {props.db.blocks.map(function(block) { 
                return <RecordsBlock key={block.id} blockData={block} db={props.db} records={createArrayOfRecords(props.db, block.id)} addRec={(name: string)=>{return props.addRec(name)}} moveRec={(id: number, blockId: number)=>{return props.moveRec(id, blockId)}}/>
            })}
        </div> 
    );

    function createArrayOfRecords(db: TDatabse, blockId: number) {
        const result: Array<TRecord> = [];
        db.records.forEach(rec => {
            if (rec.blockId === blockId) {
                result.push(rec);
            }
        });
        return result;
    }
        
}


export default Kanban;