import { Component } from "react"

export const newlineText = (text) =>
    <>{text?.split?.('\n').map(line => <>{line} <br/></>)}</>


/**
 * Обертка текста в красный цвет
 * @param {string} text Текст
 * @param {string} redMarker Маркер, который используется для выделения красного текста
 * @returns {Component} Размеченный текст
 */
export const redMarkerText = (text, redMarker = "__") => {
    // пришлось отказаться от regex
    //const re = new RegExp(`/(?<=${redMarker})[^${redMarker}]+(?=${redMarker})/`)
    return (<>
        {
            text?.split?.(redMarker).map((element, index) =>
                index % 2 ?
                    <span className="text-red">
                        {element}
                    </span>
                    : <>{element}</>
                )
        }
    </>)
}

