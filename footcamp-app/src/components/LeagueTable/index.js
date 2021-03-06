import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Header from '../Header'


function MyLeagues (props) {
    const [table, setTable] = useState(null)
    const [error , setError] = useState(undefined) 
    

    useEffect(() => {
        (async () => {
            try {
                
                const leagueId  = await logic.retrieveAllLeagues()
                const result  = await logic.retrieveTable(leagueId)
                sessionStorage.league = leagueId
                const tableSorted  = result.teams.map(results=> results)
                const table = tableSorted.sort((a, b) => (b.totalPoints - a.totalPoints))
                setTable(table)                


           } catch({message}) {
            setError(message)
        }
                 
        })()
    }, [])

    

    return <div>
            <section className="table">
            <Header />
                    <h2 className="table__title">MY TABLE</h2>
                
                <ul className="table__clasification">
                    {table && table.map((tables ,i) => <li className="table__clasification__list" key={tables.id}> 
                    <a className="table__clasification__list__tables" href={`/#/team/${tables.id}`}>
                    <p className="table__clasification__list__team">{tables.name}</p>
                    <p className="table__clasification__list__points">{tables.totalPoints} </p>
                            
                    
                    </a>
                    </li>)}
                </ul>
            </section>
        </div>
}


export default withRouter(MyLeagues)


