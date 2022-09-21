import React from 'react';
import PropTypes from 'prop-types'

const newlineText = (text) =>
    <>{text.split('\n').map(line => <>{line} <br/></>)}</>

export const SuccessOrFailReport = ({fail, label, text}) => 
    <div className={`flex items-center gap-4 my-4
    ${fail ? 'bg-red' : 'bg-blue-darker'} p-4 rounded-md max-w-5xl mx-auto`}>
    <div className="w-max">
        <div className="h-24 w-28 flex text-white border-r-4 border-white">
            {
                fail 
                ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
            }
        </div>
    </div>
    <div className="space-y-1 pl-2 text-left">
        <h6 className="font-black text-2xl text-white">{label}</h6>
        {
            text ?
            <p className="font-black text-xl text-gray-100">{newlineText(text)}</p>
            : null
        }
    </div>
    </div>

SuccessOrFailReport.propTypes = {
    /**
     * Выводим ли мы сообщение об ошибке?
     */
    fail: PropTypes.bool,

    /** 
     * Текст сообщения
     */
    label: PropTypes.string,

    /** 
     * Текст сообщения
     */
    text: PropTypes.string,
}

SuccessOrFailReport.defaultProps = {
    fail: false,
}