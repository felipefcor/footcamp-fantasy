import React, { useState, useEffect} from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import InitialHeader from '../InitialHeader'


function MyLeagues (props) {
    const [leagues, setLeagues] = useState()
    const [error , setError] = useState(undefined) 
    const { history} = props
    

    useEffect(() => {
        (async () => {
            
            try {
            const leagueId  = await logic.retrieveAllLeagues()
            
            sessionStorage.league = leagueId
            const leagues = await logic.retrieveLeague(leagueId)

            setLeagues(leagues)
       
            const teamId = leagues.teams.find(team => { 
                if (team.owner === sessionStorage.id) return team._id
            })
            sessionStorage.team = teamId._id
                
           
         } catch({message}) {
            setError(message)
          }
        })()
    }, [])

    function checkTeam(){

        sessionStorage.team ? history.push('/myteam') : history.push('/create-teams')
    }


    return  <section className="league">
                    <InitialHeader />
                    <h2 className="league__title">My leagues</h2>

                    {leagues && 
                    <div className="league__content">
                    
                    <p className="league__content__title">League</p>
                    <p className="league__content__name"> {leagues.name} </p>
                    <p> {leagues.nameTeam}</p>
                    
                    <a className="link" href="" onClick={event => {
                        event.preventDefault()
                        checkTeam()
                       
                    }}><i class="fas fa-arrow-alt-circle-right fa-2x"></i></a>

                
                    </div>
            }
                </section>
            
      
}


export default withRouter(MyLeagues)


