import React from 'react';
import PropTypes from 'prop-types'

export const CloseButton = ({onClick}) => {
    return (
        <button type="button" class="p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
        onClick={onClick}>
        <span class="sr-only">Close menu</span>
        <svg class="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </button>
    );
}

CloseButton.propTypes = {
    /**
     *  Действие при закрытии окна
     *  @default (e) => {e.preventDefault()}
     */
     onClick: PropTypes.func,
}