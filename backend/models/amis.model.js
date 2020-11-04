const PostgresStore = require("../PostgresStore")
const User = require('./user.model')

class Ami {
    /** @type {Number} */
    idAmitie
    /** @type {Number} */
    idAmi1
    /** @type {Number} */
    idAmi2

    /**
     * @param {Number} AmitieId
     * @returns {Promise<Ami>}
     */
    static async getById (amitieId) {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Ami.tableName}
            WHERE id=$1`,
            values: [amitieId]
        })
        return result.rows[0]
    }

    static async getAmi2Pseudo (userId) {
        const result = await PostgresStore.client.query({
            text: `SELECT
                    u.pseudo AS pseudo 
                    FROM ${User.tableName} AS u 
                    LEFT JOIN ${Ami.tableName} AS ami 
                        ON ami.idAmi2 = u.id 
                    WHERE idAmi1=$1`,
            values: [userId]
        })
        //console.log(result.rows)
        return result.rows
    }

    static async getAll() {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Ami.tableName}`
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