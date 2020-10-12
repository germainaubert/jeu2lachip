const PostgresStore = require("../PostgresStore")
const Game = require("./game.model")
const User = require("./user.model")

class Score {
    /** @type {Number} */
    id
    /** @type {Number} */
    score
    /** @type {Number} */
    userId
    /** @type {Number} */
    gameId

    /**
     * @param {Number} userId
     * @returns {Promise<User>}
     */

    /**
     * @param {User} user
     */
    static async addScore (score, userId, gameId) {

        await PostgresStore.client.query({
            text: `INSERT INTO ${ArticleCart.tableName}
            (score, userId, gameId)
            VALUES ($1, $2, $3)`,
            values: [score, userId, gameId]
        })
    }

    static toSQLTable () {
        return `
             CREATE TABLE ${Score.tableName} (
                id SERIAL PRIMARY KEY,
                score INTEGER,
                userId INTEGER REFERENCES ${User.tableName}(id),
                gameId INTEGER REFERENCES ${Game.tableName}(id)
                
            )
        `
    }
}

/** @type {String} */
Score.tableName = 'score'

module.exports = Score