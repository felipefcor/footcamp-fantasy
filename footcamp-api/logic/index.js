module.exports = {
    registerUser: require('./user/register'),
    authenticateUser: require('./user/authenticate'),
    retrieveUser: require('./user/retrieve'),
    unregisterUser: require('./user/unregister'),
    updateUser: require('./user/update'),
    createLeague: require('./league/create'),
    joinLeague: require('./league/join'), 
    leaveLeagues: require('./league/leave'),
    retrieveAllLeagues: require('./league/retrieve-all'),
    retrieveLeague: require('./league/retrieve'),
    retrieveTable: require ('./league/retrieve-table'),
    createTeam: require('./team/create'),
    retrieveTeam: require('./team/retrieve'),
    lineUpTeam: require('./team/team-lineup'),
    retrievelineUpTeam: require('./team/retrieve-lineup'),
    deleteTeam: require('./team/delete'),
    retrievePlayer: require('./player/retrieve'),
    updateTeam: require('./team/update')
    
    
}
