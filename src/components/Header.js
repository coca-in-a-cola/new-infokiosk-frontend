import logo from '../assets/img/logo-lg.png'

import qrVK from '../assets/img/qr-code вк.png'
import qrTG from '../assets/img/qr-code телеграм.png'
import qr from '../assets/img/qrcod_dU7.png'

import { UserInfo } from './UserInfo'

export const Header = ({ navigate }) => {
    return (
    <header className='mt-16 container w-full max-w-screen-2xl mx-auto grid grid-cols-3 gap-4 justify-between'>
        <div className="col-span-1">
        { /* Логотип RMRail инфокиоск */ }
        <button className = "h-30 max-w-xl" onClick={() => navigate('/')}>
            <div className = "flex justify-center items-center">
                <div className='relative after:block after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0'>
                <img src={logo} alt='логотип' className='-z-10'/>
                </div>
            </div>
        </button>
        </div>

        <div className="col-span-1 ">
            <div className="flex justify-center">
            {
                [qrVK, qrTG, qr].map(qr => <div
                className="shrink w-28 relative after:block after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0">
                    <img src={qr} alt='qr'/>
                    </div>
                )
            }
            </div>

            { /* Тут меняем номер телефона */ }
            <div className="flex justify-center items-center">
                <span className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
                </span>
                <p className="text-xl text-white te font-semibold">
                    8 800 20 10 700
                </p>
            </div>
        </div>

        <div className="col-span-1 flex justify-end mt-8">
            <UserInfo navigate={navigate} textClassName={"text-white"}/>
        </div>
    </header>
    )
}