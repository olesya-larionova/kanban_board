import React, {FunctionComponent, RefObject} from "react";
import css from './CardAdd.module.css';

type TProps = {
  blockId: number,
  db: {
    blocks: Array<{id:number, name:string}>,
    records: Array<{id:number, name:string, desc:string, blockId:number}>
  },
  addRec: Function,
  moveRec: Function
}

const CardAdd: FunctionComponent<TProps> = (props: TProps) => {

  const inputRef: RefObject<HTMLInputElement> = React.createRef();
  const buttonRef: RefObject<HTMLButtonElement> = React.createRef();
  const selectRef: RefObject<HTMLSelectElement> = React.createRef();
  let isDisabled: boolean = true;

  // selectOnChange 
  // при выборе из списка вызывает перенос записи в текущий блок
  const selectOnChange = (event: { target: { value: any; }; }) => {
    props.moveRec(event.target.value, props.blockId);  
    const select = selectRef.current;
    const button = buttonRef.current; 
    if (select !== null) { select.hidden = true; }
    if (button !== null) { button.innerHTML = "+Add card"; }
    isDisabled = true;
  }

  // showHideInput
  // управляет видимостью полей ввода и списков, а также доступностью кнопок
  // в зависимости от назначения блока, в котором эти элементы находятся
  const showHideInput = (event: { preventDefault: () => void; }) => {

    event.preventDefault();
  
    const button = buttonRef.current;  
    
    if (props.blockId === 0) {
      // первый блок
      const input = inputRef.current;
      if (input !== null && button !== null) {
        if (input.style.display === "" || input.style.display === "none") {
          input.style.display = "block";
          button.innerHTML = "Submit";
        } else {
          if (input.value) {
            props.addRec(input.value);
          }
          input.value = "";
          input.style.display = "none";
          button.innerHTML = "+Add card";
        }
      }
    } else {
      // следующие блоки
      const select = selectRef.current;
      if (select !== null && button !== null) {
        select.hidden = !select.hidden;
        if (select.hidden) {
          button.innerHTML = "+Add card";
        } else {
          select.value = "none";
          button.innerHTML = "Cancel";
        }
      }
    }
  }  

  // createSelectList
  // заполняет список задачами из предыдущего блока
  const createSelectList = () => {
  
    if (props.blockId !== 0 ) {
      return (
        <select className={css.Select} hidden={true} ref={selectRef} onChange={selectOnChange}>
        <option disabled hidden key="none" value="none">Select record to move</option>
          {
            props.db.records.map(function(rec) {
              if(rec.blockId === props.blockId - 1) {
                isDisabled = false;
                return (<option key={rec.id.toString()} value={rec.id.toString()}>{rec.name}</option>)
              }
              return '';
            })
          }
        </select>
      )
    } else {
      isDisabled = false;
    }
  
  }  

  // рендер
  return (
    <form className={css.CardAdd}>
      <div className={css.CardAdd}>
      <input ref={inputRef} type="text" name="name"/>
      {
        createSelectList()
      }
      <button ref={buttonRef} disabled={isDisabled} onClick={showHideInput.bind(this)}>+Add card</button>
      </div>
    </form>
  )
  
}

export default CardAdd;