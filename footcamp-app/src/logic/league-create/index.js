import {validate} from 'footcamp-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Create a league with name and code and it relates to the user
 * @param {*} name 
 * @param {*} code 
 */
  
export default function ( name, code) {
    
    validate.string(name, 'name')
    validate.string(code, 'code')
    debugger
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/leagues`, {
    
            method: 'post',
            headers: {
               
                 'authorization': `bearer ${this.__token__}`,
                 'content-type': 'application/json' 
                
                },

               
            body: JSON.stringify({ name, code })
        })
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            
            const { leagueId } = await response.json()
            return leagueId
        }
    })()
}

