import React from 'react';
import PropTypes from 'prop-types'

const sizes = {
    'small': {
        height: "h-12",
        width: "w-12",
        border: "border-2",
        padding: "px-4",
        text: 'text-md',
    },
    'medium': {
        height: "h-16",
        width: "w-16",
        border: "border-2",
        padding: "px-6",
        text: 'text-xl',
    }
}


export class Button extends React.Component {
    
    static propTypes = {
        /**
         *  Действие при нажатии кнопки либо по истечении времени
         */
        onClick: PropTypes.func,

        /**
         *  Время в секундах до осуществления действия
         */
        timeout: PropTypes.number,

        /**
         * Размер кнопки. 
         */
        size: PropTypes.oneOf(['small', 'medium']),

        /**
         * Цвет кнопки (как в css)
         */
        color: PropTypes.string,

        /**
         * Активна ли кнопка?
         */
        disabled: PropTypes.bool,

        /** 
         * Добавочные css классы к кнопке <br/>
         * Желательно использовать классы Tailwind Css
         * @example className = "col-span-2 row-span-1" 
         * растянет кнопку внутри сетки (CSS) на 1 ряд и 2 колонки 
         * @example className = "bg-blue-lighter hover:bg-red"
         * сделает кнопку синей, а при наведении на неё мышкой - красной 
         */
        className: PropTypes.string,
    }

    static defaultProps = {
        onClick: ((e) => {
            e.preventDefault(); 
            this.setState({timer: this.props.timeout},
                 this.onTimerTick.call(this))}
        ).bind(this),
        timeout: undefined,
        size: 'medium',
    }

    constructor(props) {
        super(props);
        this.state = {timer: props.timeout}
    }

    componentDidMount() {
        if (this.state.timer)
            this.onTimerTick.call(this);
    }

    onTimerTick() {
        if (this.state.timer <= 0) {
            this.btn?.click?.();
        }
        else {
            setTimeout(() => {
                this.setState({timer: this.state.timer - 1},
                    this.onTimerTick.call(this));
            }, 1000)
        }
    }

    render() {
        const size = sizes[this.props.size]

        return (
        <button 
            disabled={this.props.disabled}
            className={`flex justify-items-stretch font-semibold shadow-md bg-red ${size.height} ${size.text} text-white ${this.props.className} disabled:opacity-75`}
            onClick={this.props.onClick}
            ref={node => (this.btn = node)}>
            <div className={`w-full shrink flex items-center justify-self-center justify-center text-center ${size.padding} `}>
                {this.props.children}
            </div>
            {
                this.props.timeout ?
                <div className={`justify-self-end flex-shrink-0 flex items-center ${size.height} justify-center font-black`}>
                    <span className={`border-l-2 ${size.width} border-white`}>
                    {this.state.timer}
                    </span>
                </div>
                : null
            }
        </button>
        )
    }
}