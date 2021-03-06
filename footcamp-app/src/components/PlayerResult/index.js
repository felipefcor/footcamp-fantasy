import React from 'react'

function PlayerResult({ player }) {

   
    const {name, surname, position, photo, totalPoints}  = player
    
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
    return <div className="card-players"> 
   
        
            <img className="card-players__image" onError={addDefaultSrc} src={"https://infinite-caverns-24790.herokuapp.com" + photo} /> 
            
              <div className="card-players__content" >
            <p className="card-players__content__name">{name} {surname} </p>
            <p className="card-players__content__position">{positionPlayer(position)}</p>
            <p className="card-players__content__name">Points: {totalPoints} </p>
        </div>

    </div>


}

export default PlayerResult



