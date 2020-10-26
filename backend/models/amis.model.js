const PostgresStore = require("../PostgresStore")

class Ami {
    /** @type {Number} */
    idAmitie
    /** @type {Number} */
    idAmi1
    /** @type {Number} */
    idAmi2

    /**
     * @param {Number} gameId
     * @returns {Promise<Game>}
     */
    static async getById (amitieId) {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Game.tableName}
            WHERE id=$1`,
            values: [amitieId]
        })
        return result.rows[0]
    }

    static async delete (amitieId) {
        await PostgresStore.client.query({
            text: `DELETE FROM ${Ami.tableName} WHERE id=$1`,
            values: [amitieId]
        })
    }

    /**
     * @param {Ami} ami
     */
    static async create (ami1, ami2) {

        await PostgresStore.client.query({
            text: `
            INSERT INTO ${Ami.tableName} 
                   (ami1, ami2)
            VALUES ($1,   $2)`,
            values: [ami1, ami2]
        })
    }

    static toSQLTable () {
        return `
            CREATE TABLE ${Ami.tableName} (
                idAmitie SERIAL PRIMARY KEY,
                idAmi1 INTEGER,
                idAmi2 INTEGER
            )
        `
    }
}


/** @type {String} */
Ami.tableName = 'ami'

module.exports = Ami