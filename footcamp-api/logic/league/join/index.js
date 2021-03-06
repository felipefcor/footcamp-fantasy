const {validate } = require('footcamp-utils')
const { models: { User,  League } } = require('footcamp-data')

 /**
 * User joins to an existent league
 * 
 * @param {*} id 
 * @param {*} code 
 *  
 * @returns {Promise}
*/

module.exports = function(id, code) {
   
    validate.string(id, 'id')
    validate.string(code, 'code')
   
    return (async () => {
        
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist.`)
               
        const league = await League.findOne({ code })

        if (!league) throw Error(`cannot find league with code ${ code }`)
        
        const participantExist = league.participants.find(participant=> participant.toString()===id)

        if(participantExist) throw Error(`User with id ${id} already plays in this league`)

        if (league.participants.length ===10) throw Error(`This league is full. Create another!`)

        league.participants.push(id)
        user.leagues.push(league.id)
        await user.save()
        await league.save()

        return league.id
        
    })()
}
