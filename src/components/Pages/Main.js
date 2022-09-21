import React from 'react';
import PropTypes from 'prop-types'
import { Header } from '../Header';
import background from '../../assets/img/background.jpg'
import { FlatMenu } from '../FlatMenu';

export const Main = ({location, navigate}) => {
    return (
        <>
        <div className="fixed top-0 left-0 right-0 bottom-0 select-none -z-10">
            <img src={background} 
                className="select-none -z-10 absolute top-0 left-0 h-screen w-screen"
                alt="Фоновая картинка"/>
        </div>

        <div className="select-none">
            <Header/>
        </div>

        {
            location == "" || location == "/"
            ? <div className="absolute bottom-0 left-0 right-0">
                <FlatMenu path={location} navigate={navigate} />
            </div>
            : <div className="mt-12">
                <FlatMenu path={location} navigate={navigate}/>
            </div>
        }
        </>
    )
}
