import React, { useRef, useState, useEffect } from 'react';
import {Button} from '../UI/Button'
import PropTypes from 'prop-types'
import { FlatButton } from '../UI/FlatButton'
import { newlineText } from '../../util/text';

export const Personal = ({title, timeout, userSrc, userName, userDescription}) => {
  
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white">
      <div class={"max-w-screen-2xl mx-auto "
      + "before:block before:z-10 before:absolute before:left-0 before:top-14 before:w-full before:h-24 before:bg-blue-darker "}>
      
      <div className="relative mt-4 left-0 right-0 py-4 mb-4 bg-white z-20">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-5xl pl-8 pt-12 pb-4 text-blue-darker font-black">
          {title}
        </h2>
        <div className="flex justify-end">
          <Button className="bg-blue-darker mr-4 w-48 justify-self-end">
            НАЗАД
          </Button>
          <Button className="bg-red w-60 mr-8" timeout={timeout}>
            ВЫХОД
          </Button>
        </div>
      </div>

      <div className="flex">
      <div className="w-48 relative mt-8">
      <div className="w-48 h-48">
        {
          userSrc 
          ? <img className={"object-contain max-h-full"} src={userSrc} alt={userName}/>
          : <svg xmlns="http://www.w3.org/2000/svg" className="w-48 h-48" 
          enable-background="new 0 0 24 24" viewBox="3 3 18 18"
          fill="#E41B43">
            <g><rect fill="none" height="24" width="24"></rect></g><g><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M12,6c1.93,0,3.5,1.57,3.5,3.5 c0,1.93-1.57,3.5-3.5,3.5s-3.5-1.57-3.5-3.5C8.5,7.57,10.07,6,12,6z M19,19H5v-0.23c0-0.62,0.28-1.2,0.76-1.58 C7.47,15.82,9.64,15,12,15s4.53,0.82,6.24,2.19c0.48,0.38,0.76,0.97,0.76,1.58V19z"></path></g></svg>
        }
      </div>
      
      </div>

      <div className="grow w-full mx-8 text-left">
        <h3 className="text-3xl pt-12 text-blue-darker font-black">
          {userName}
        </h3>
        <p className="text-2xl pt-2 max-w-4xl text-gray-500">
          {userDescription}
        </p>

        {
          /*
          Button group
          */
        }
        <div className="flex mt-8">
          <Button className="bg-blue-darker w-52">
            Отпуск
          </Button>
          <Button className="bg-blue-darker w-52">
            Медосмотр
          </Button>
          <Button className="bg-blue-darker w-52">
            Обучение
          </Button>
          <Button className="bg-blue-darker w-52">
            СИЗ
          </Button>
        </div>
      </div>
              
      </div>
      </div>
      </div>
    </div>
    );
  }
  
  Personal.propTypes = {
    
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
  
  Personal.defaultProps = {
    title: "Личный Кабинет",
    timeout: 120,
    userName: "Имя Фамилия Отчество",
    userDescription: "Должность, подразделение"
  }
  