import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Context from '../Context'
import PlayerResultInitial from '../PlayerResultInitial'
import InitialHeader from '../InitialHeader'

function MyLineup (props) {
  
    const {  teamId} = useContext(Context)
    const [lineup, setLineup] = useState()
    const [player, setPlayer] = useState()
    const [error , setError] = useState(undefined) 
    const { history} = props
    

    useEffect(() => {
        (async () => {
            try {
            
            const leagueId  = await logic.retrieveAllLeagues()
                     
            const resultTeam  = await logic.getLineup(sessionStorage.league, teamId)
            sessionStorage.league = leagueId
            
            const lineup  = resultTeam.lineup.map(results=> results)
           
            setLineup(lineup)

            const res = await Promise.all(lineup.map((playerId) => 
                     logic.retrievePlayer( playerId)
                ))
            const player  = res.map(res=> res.player)
                
            setPlayer(player)

        } catch ({ message }) {
                
            setError(message)
          }
            
        })()
    }, [])

    return <div>
          <section className="create-lineups">
            <InitialHeader />

                <h2  className="create-lineups__title">THIS IS YOUR STARTING LINEUP</h2>   
                <ul className="create-teams__list">
                
                {player && player.map(playerlineup => 
                <li className="item-players-lineup"  key={playerlineup.id}>
                
                    <PlayerResultInitial player={playerlineup}/>
                        
                </li>)}
                <a className="create-lineups__link" href="#" onClick={event => {
                    event.preventDefault()
                    history.push('/myleague')
                }}>OK</a>
            </ul>
        </section>
        </div>
}



export default withRouter(MyLineup)
