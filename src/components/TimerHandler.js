import React, {useEffect} from 'react';
import { useDispatch } from "react-redux"
import { refreshTimer } from '../features/timerSlice';

export const TimerHandler = ({children}) => {
    const dispatch = useDispatch()
    const RTF = () => {
        dispatch(refreshTimer())
    }

    useEffect(() => {
        document.body.addEventListener('click', RTF );

        return function cleanup() {
            window.removeEventListener('click', RTF );
        }
    },[]);


    return <div className='w-full min-w-80 min-h-80 h-full'>
        {children}
    </div>
}