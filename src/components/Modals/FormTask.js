import React, { useRef, useState, useEffect } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import '../../assets/css/react-simple-keyboard-custom.css'
import {Button} from '../UI/Button'
import PropTypes from 'prop-types'
import { FlatButton } from '../UI/FlatButton'
import { UserInfo } from '../UserInfo';
import { FormFieldArray } from '../UI/FormField';

const newlineText = (text) =>
<>{text.split('\n').map(line => <>{line} <br/></>)}</>

export const FormTask = ({title, fields, onSubmit, onCancel, onTimeout}) => {
  const [inputs, setInputs] = useState("");
  const [inputName, setInputName] = useState(undefined);
  const [layoutName, setLayoutName] = useState("default");
  
  const keyboard = useRef();
  
  const onChangeAll = inputs => {
    /**
    * Here we spread the inputs into a new object
    * If we modify the same object, react will not trigger a re-render
    */
    setInputs({ ...inputs });
    console.log("Inputs changed", inputs);
  };
  
  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
  };
  
  const onKeyPress = (button) => {
    /**
    * If you want to handle the shift and caps lock buttons
    */
    if (button === "{shift}" || button === "{lock}")
      handleShift();
  }
  
  const onFieldFocus = event => {
    event.stopPropagation();
    setInputName(event.target.id)
    console.log(event.target)
    
    // Вот это костыль    
    if (event.target.name.includes("numeric")) {
      setLayoutName("numeric")
    }
    else {
      setLayoutName("default")
    }
  }
  
  const onChangeInput = event => {
    const inputVal = event.target.value;
    
    setInputs({
      ...inputs,
      [inputName]: inputVal
    });
    
    keyboard.current.setInput(inputVal);
  };
  
  const onSendClick = () => {
    let data = {}
    
    fields?.forEach(field => {
      if (field.type.includes("array")) {
        data[field.name] = []

        Object.keys(inputs).map(input => {
          if (input.split("-")[0] === field.name) {
            data[field.name].push(getInputValue(input))
          }
        })

        data[field.name] = data[field.name].join("\n")
      }

      else {
        data[field.name] = getInputValue(field.name)
      }
    });
    
    onSubmit(data)
  }
  
  const getInputValue = inputName => {
    return inputs[inputName] || "";
  };
  
  const sendButtonDisabled = () => {
    return fields && fields.length ? !(fields.filter(field => field.required)
      .every(field => inputs[field.name] 
        || field.type.includes("array") && inputs[field.name+"-0"])) : false
  }
  
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white flex flex-col h-screen">
    { /* FLEX CONTAINER END */}

    { /* FLEX COLUMN START */}
    <div className="shrink grow w-full basis-0 h-auto overflow-auto">
    <div class={"max-w-screen-2xl mx-auto "
      + "before:block before:z-10 before:absolute before:left-0 before:top-14"
      + " before:w-full before:h-24 before:bg-blue-darker"}>
    
    <form className="relative mt-4 left-0 right-0 py-4 mb-4 px-8 bg-white z-20 flex"
    onClick={(e) => {
      var elementType = e.target.nodeName
      if (elementType !== 'TEXTAREA' && elementType !== 'INPUT') {
        setInputName(undefined)
      }
    }}>
    <div className="w-full max-w-screen-sm relative">
    <h2 className="text-5xl pt-12 pb-4 mx-auto text-blue-darker font-black">
    {title}
    </h2>
    <div className="my-4 -ml-8">
    <UserInfo short/>
    </div>
    {
      fields && fields.length ?
      <p className="text-2xl pt-2 max-w-4xl mx-auto text-gray-500">
      Для отправки данной формы необходимо ввести дополнительную информацию
      </p>
      : undefined
    }
    <p className="text-2xl pt-2 max-w-4xl mx-auto text-gray-500">
    Отправляя заявку, вы даёте согласие на обработку персональных данных
    </p>
    
    {
      fields && fields.length ?
      <p className="text-2xl pt-2 max-w-4xl mx-auto text-gray-500">
      <span className="text-red pr-4">*</span>
      обязательно для заполнения
      </p>
      : undefined
    }
    </div>
    
    <div className="mt-12 shrink grow px-8 overflow-auto">
    {
      fields?.map(field => {
        const types = new Set(field.type.split("."));
        return ( <div className="pb-4">
        <label 
        className="text-2xl pt-2 font-semibold max-w-4xl mx-auto text-blue-darker" 
        for={field.name}>
        {
          field.required 
          ? <>
          <span className="text-red">*</span> {field.label ? newlineText(field.label) : undefined}
          </>
          : field.label ? newlineText(field.label) : undefined
        }
        </label>
        {
          field.description ? <p className="text-2xl pt-2 max-w-4xl mx-auto text-gray-500">
            {newlineText(field.description)}
          </p> : undefined
        }
        
        {
          types.has("array") ?
            <FormFieldArray
            id={field.name}
            getInputValue={getInputValue}
            placeholder={field.placeholder}
            onFocus={onFieldFocus}
            onChangeInput={onChangeInput}
            className="min-w-full border-solid bg-gray-200 h-20 shadow appearance-none rounded py-2 px-8
            text-black text-4xl font-black leading-tight overflow-x-auto
            tracking-widest focus:outline-none focus:shadow-outline"
            
            type="text"
            name={field.type}
            required={field.required}
            />
          : 
            <textarea
            id={field.name}
            value={getInputValue(field.name)}
            placeholder={field.placeholder}
            onFocus={onFieldFocus}
            onChange={onChangeInput}
            className="min-w-full border-solid bg-gray-200 h-20 shadow appearance-none rounded py-2 px-8
            text-black text-4xl font-black leading-tight overflow-x-auto
            tracking-widest focus:outline-none focus:shadow-outline"
            
            type="text"
            name={field.type}
            required={field.required}
            />
        }
        </div>
        )
      })
    }
    </div>
    </form>
    </div>
    </div>
    { /* FLEX COLUMN END */}

    { /* FLEX COLUMN START */}
    <div className="w-screen max-w-screen-2xl mx-auto ">
    <div className="flex justify-between items-end px-8">
    <div className="w-full max-w-screen-sm">
      <Button className="w-80 my-4 bg-red" timeout={80} onClick={onCancel} onTimeout={onTimeout}>ОТМЕНА</Button>
    </div>
    <div className="grow px-8">
      <FlatButton 
      className="w-full my-4 h-24 rounded-none disabled:bg-gray-400"
      onClick={onSendClick}
      disabled={sendButtonDisabled()}>
      Заказать
      </FlatButton>
    </div>
    </div>
    </div>
    { /* FLEX COLUMN END */}

    { /* FLEX COLUMN START */}
    <div className="">
    {
      fields && fields.length && inputName ?
      <Keyboard
      inputName={inputName}
      keyboardRef={r => (keyboard.current = r)}
      theme={"hg-theme-default keyboard-full keyboard-relative"}
      layoutName={layoutName}
      layout={{
        default: [
          "\u0451 1 2 3 4 5 6 7 8 9 0 - № {bksp}",
          "{tab} \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a ",
          "{lock} \u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d \\ ",
          "{shift} / \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e . {shift}",
          ", {space} @",
        ],
        shift: [
          '\u0401 ! " \u2116 ; % : ? * ( ) _ + {bksp}',
          "{tab} \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a ",
          "{lock} \u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d \\ ",
          "{shift} | \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e , {shift}",
          ", {space} @",
        ],
        numeric: ['7 8 9', '4 5 6', '1 2 3', ', 0 .', '- {bksp}'],
      }}
      onChangeAll={onChangeAll}
      onKeyPress={onKeyPress}
      
      buttonTheme={[
        {
          class: "hg-button-lg",
          buttons: "{bksp} {tab} {lock} {shift}"
        },
        {
          class: "hg-button-xl",
          buttons: "{space}"
        },
      ]}
      
      
      display={{
        "{shift}": "Shift",
        "{space}": '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 9v4H6V9H4v6h16V9z"/></svg>',
        "{lock}": '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8.41L16.59 13 18 11.59l-6-6-6 6L7.41 13 12 8.41zM6 18h12v-2H6v2z"/></svg>',
        '{tab}': 'tab',
        '{bksp}': '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg>',
      }}
      
      />
      : undefined}
      </div>
      { /* FLEX COLUMN END */}
      </div>
      );
    }
    
    FormTask.propTypes = {
      
      /**
      *  Время до отмены ввода, в секундах
      */
      timeout: PropTypes.number,
      
      /**
      *  Название отправляемой формы
      */
      title: PropTypes.string,
      
      /**
      *  Действие при отправки формы
      */
      onSubmit: PropTypes.func,
      
      /**
      *  Действие при повтовром запросе кода
      */
      onRetry: PropTypes.func,
      
      /**
      *  Действие при отмене ввода пользователем
      */
      onCancel: PropTypes.func,
      
      /**
      * Действие при истечении времени
      * По умолчанию = onCancel
      */
      onTimeout: PropTypes.func,
      
      /**
      * Поля формы, которую будем отправлять
      */
      fields: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string, 
        label: PropTypes.string, 
        name: PropTypes.string, 
        type: PropTypes.string,
        value: PropTypes.string
      }))
    }
    
    FormTask.defaultProps = {
      title: "Отправка Формы"
    }
    