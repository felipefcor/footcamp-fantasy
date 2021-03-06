const {validate} = require('footcamp-utils')
const { models: {  User, Player } } = require('footcamp-data')

 /**
 * Retrieves all the information of the player 
 * @param {*} id 
 * @param {*} id_player 
 *  
 * @returns {Promise}
*/

module.exports = function(id, player_id) {

    validate.string(id, 'id')
    validate.string(player_id, 'player id')
   
     return (async () => {

        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const player = await Player.findOne({ _id: player_id}).lean()
        
        if (!player) throw Error(`Player with id ${ player_id } does not exist`)
        
        player.id = player._id.toString()
        delete player._id

        return player
        
    })()
}
