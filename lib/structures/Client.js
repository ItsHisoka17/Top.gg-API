const request = require('node-superfetch')
const APIError = require('../errors/ApiError')
class Client{
    constructor(token) {
        this.token = token;
        this.clientStats = {};
    }
    async getClientInfo({clientID = null}){
        /**
         * @param {String} clientID
         * 
         * @param {String} token
         */
        if (!this.token) throw new APIError('No AUTH Token found')
        if (clientID === null) throw new APIError('No Client ID Found')
        const info = {};
        let result = await request
        .get(`https://top.gg/api/bots/${clientID}`)
        .set("Authorization", this.token)
        info.avatar = result.body.defAvatar;

        info.invite = result.body.invite;

        info.shortdesc = result.body.shortdesc;

        info.description = result.body.longdesc
        return info;
    }
    async getUserInfo({userID = null}){
        this.userID = userID
        /**
         * @param {String} userID
         * 
         * @param {String} token
         */
        if (!this.token) throw new APIError('No AUTH Token found')
        if (this.userID === null) throw new APIError('No Client ID Found')
        let res = await request
        .get(`https://top.gg/api//users/${this.userID}`)
        .set("Authorization", this.token)
        if (!res.ok) throw new APIError("Error: 404 Not found")
        if (res.headers.authorization !== this.token) throw new APIError("Error: Unauthorized")
        let data = {
            avatar: res.body.defavatar,
            username: res.body.username,
            discriminator: res.body.descriminator,
            id: res.body.id
        }
        this.userResult = data;
        return this.userResult;
    }
    getRequestURL(type, {id = null}){
        let types = ['user', 'bot']
        types.some(t => {
            if (types !== t) throw new APIError(`No type ${type} found`)
        })
        if (type === 'bot'){
            return {
                baseURL: 'https://top.gg/api//bots',
                oneBot: `https://top.gg/api//bots/${id!==null?id:':bot_id'}:bot_id`,
                voteURL: `https://top.gg/api//bots/${id!==null?id:':bot_id'}/votes`
            }
        } else {
            if(type === 'user'){
                return {
                    getUserByID : `https://top.gg/api//users/${id!==null?id:':user_id'}`
                }  
            }
        }
    } 
    
    async hasVoted(userID, clientID){
        /**
         * @param {String} userID
         * 
         * @param {String} clientID
         * 
         * @param {String} token
         */
        if (!this.token) throw new APIError('No AUTH Token found')
        if (userID === null) throw new APIError('No Client ID Found')
        let check = await request
        .get(`https://top.gg/api//bots/${clientID}/check?userId=${userID}`)
        .set("Authorization", this.token)
        if (!check.ok) throw new APIError("Error: 404 not found")
        let res;
        if (check.body.voted>0){
            res = true;
        } else {
            res = false;
        }
        return res;
    }
}
module.exports = Client;