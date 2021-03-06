import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter} from 'react-router-dom'
import Header from '../Header'

 function PlayerDetail ({ match, history }) {
    const [player, setPlayer] = useState()
    const [error , setError] = useState(undefined) 
    
    useEffect(() => {
        debugger
       
        (async () => {
            try {
            const { params: { id }} = match
            
            const player = await logic.retrievePlayer(id)

            setPlayer(player)
            
        } catch({message}) {
            setError(message)
          }
        })()
    }, [])
      
    function handleBack ()  {
     
        history.go(-1)
    }

    function addDefaultSrc(event) {
        
        event.target.src = 'https://infinite-caverns-24790.herokuapp.com/images/avatar.jpg'
        
    }

    function positionPlayer(number){
        switch(number){
            case 1: 
            return 'Goalkeeper'
            break;
            case 2:
            return 'Defender'
            break;
            case 3:
            return 'Midfielder'
            break;
            case 4:
            return 'Striker'
            break;
            
        }
    }

    return <div>
        <section className="detail">
            <Header />
            {player && <div className="player-detail">
                <img className="player-detail__image" onError={addDefaultSrc} src={"https://infinite-caverns-24790.herokuapp.com" + player.player.photo} width="300px"/>
                <div className="player-detail__content">
                    <p className="player-detail__content__name">{player.player.name} {player.player.surname}</p>
                    <p className="player-detail__content__position">{positionPlayer(player.player.position)}</p>
                    <p className="player-detail__content__points">Total points: {player.player.totalPoints}</p>
                    <p className="player-detail__content__goals">Goals: {player.player.goals}</p>
                    <p className="player-detail__content__cost">Cost: {player.player.cost} J$</p>
                </div>
                <a href="#" onClick={event => {
                event.preventDefault()
                handleBack()
            }}><i className="fas fa-arrow-circle-left fa-2x"></i></a>
            </div>}
    </section>
    </div>
}

export default withRouter(PlayerDetail)
