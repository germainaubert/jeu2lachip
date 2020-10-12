const PostgresStore = require("../PostgresStore")

class Game {
    /** @type {Number} */
    id
    /** @type {String} */
    name
    /** @type {String} */
    logo

    /**
     * @param {Number} gameId
     * @returns {Promise<Game>}
     */
    static async getById (gameId) {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Game.tableName}
            WHERE id=$1`,
            values: [gameId]
        })
        return result.rows[0]
    }

    /**
     * @param {Game} game
     */
    static async create (game) {

        await PostgresStore.client.query({
            text: `
            INSERT INTO ${Game.tableName} 
                   (name, logo)
            VALUES ($1,   $2)`,
            values: [game.name, game.logo]
        })
    }

    static toSQLTable () {
        return `
            CREATE TABLE ${Game.tableName} (
                id SERIAL PRIMARY KEY,
                name TEXT,
                logo VARCHAR(80)
            )
        `
    }
}


/** @type {String} */
Game.tableName = 'game'

module.exports = Game