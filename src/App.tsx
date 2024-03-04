import React, {useState} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';
import './App.css';


class record {

  public id: number;
  public name: string;
  public desc: string;
  public blockId: number

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.desc = "";
    this.blockId = 0;
  }

  setBlockId(id: number) {
    this.blockId = id;
  }

}

class block {

  public id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}


class database {

  public blocks: Array<block>;
  public records: Array<record>;
  public changed: boolean;

  constructor() {
    this.blocks = [];
    this.records = [];
    this.changed = false;
  }

  addBlock(block: block)  {
    this.blocks.push(block);
  }

  addRecord(name: string) { 
    let max = this.records.reduce((acc, curr) => acc > curr.id ? acc : curr.id, 0); // максимальное значение id в записях
    const rec = new record(++max, name);
    this.records.push(rec);
    this.save();
  }

  moveRecord(id: number, blockId: number) {
    const rec = this.records.find(el => el.id === +id);
    if (rec) {
      rec.blockId = blockId;
      // перемещение записи в конец массива
      this.records.splice(this.records.indexOf(rec), 1);
      this.records.push(rec);
      this.save();
    }
  }

  load() {

    const storedBlocks = localStorage.getItem('kanban_blocks');
    if (storedBlocks) {
      this.blocks = JSON.parse(storedBlocks);
    } else {
      this.addBlock(new block(0, "BackLog"));
      this.addBlock(new block(1, "Ready"));
      this.addBlock(new block(2, "In progress"));
      this.addBlock(new block(3, "Finished"));
    }

    const storedRecords = localStorage.getItem('kanban_records');
    if (storedRecords) {
      this.records = JSON.parse(storedRecords);
    } /*else {
      this.addRecord("запись №1");
      this.addRecord("запись №2");
      this.addRecord("запись №3");
      (this.records)[0].setBlockId(0);
      (this.records)[1].setBlockId(0);
      (this.records)[2].setBlockId(1);
    }*/
    
  }

  save() {
    localStorage.setItem('kanban_blocks', JSON.stringify(this.blocks));
    localStorage.setItem('kanban_records', JSON.stringify(this.records));
    this.changed = true;
  }
  
}

function App() {
  
  const db = new database();
  db.load();
  const [refresh, setRefresh] = useState(0);

  const addRec = (name: string) => {
      db.addRecord(name);
      setRefresh(refresh + 1);
  }

  const moveRec = (id: number, blockId: number) => {
    db.moveRecord(id, blockId);
    setRefresh(refresh + 1);
}

  return (
    <>
      <Header/>
      <BrowserRouter>
        <Content db={db} addRec={addRec} moveRec={moveRec}/>
      </BrowserRouter>
      <Footer db={db}/>            
    </>
  );


}

export default App;
