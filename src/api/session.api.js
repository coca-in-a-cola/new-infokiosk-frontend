//import { Session } from '../user/Session';
//import { status } from '../constants/dummyConstants';
import { API_URI, wrapFetch } from './shared';

export const refreshSession = (session) => {
    return new Promise(function(resolve, reject) {
        
    });
}


export const sendCardCode = ({cardCode}) => {
    return wrapFetch(
        fetch(API_URI + "/api/session", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ssid: cardCode})
      }))
}

export const sendConfirmNumber = ({confirmNumber}) => {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            reject("NOT IMPLEMENTED");
        }, Math.random() * 1000 + 250)
    });
}

export const requestService = (session, uuid, data = {}) => {
    // uuid - id запрашиваемой услуги
    return new Promise(function(resolve, reject) {
        fetch(`/api/forms/send/${uuid}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({authToken: session.authToken, ...data})
          })
        .then((response) => {
            if (response.ok) {
                //resolve(status.SUCCESS)
            }
            else {
                //reject(status.FAIL)
            }
        })
    });
}