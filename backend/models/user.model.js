const PostgresStore = require("../PostgresStore")
const bcrypt = require('bcrypt')

class User {
    /** @type {Number} */
    id
    /** @type {String} */
    pseudo
    /** @type {String} */
    password
    /** @type {Boolean} */
    is_admin

    /**
     * @param {Number} userId
     * @returns {Promise<User>}
     */
    static async getAll () {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${User.tableName}`
        })
        return result.rows
    }

    static async getAllPseudo () {
        const result = await PostgresStore.client.query({
            text: `SELECT pseudo FROM ${User.tableName}`
        })
        return result.rows
    }

    static async findByPseudo (pseudo) {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${User.tableName}
            WHERE pseudo=$1`,
            values: [pseudo]
        })
        return result.rows[0]
    }

    static async getIdByPseudo (pseudo) {
        const result = await PostgresStore.client.query({
            text: `SELECT id FROM ${User.tableName}
            WHERE pseudo=$1`,
            values: [pseudo]
        })
        return result.rows[0]
    }

    /**
     * @param {User} user
     */

    static async create (pseudo, password) {
        const hashedPw = await bcrypt.hash(password, 10)

        const result = await PostgresStore.client.query({
            text: `
            INSERT INTO ${User.tableName} 
                   (pseudo, password, is_admin)
            VALUES ($1,        $2,       $3)
            RETURNING *`,
            values: [pseudo, hashedPw, false]
        })
        return result.rows[0]
    }

    static toSQLTable () {
        return `
            CREATE TABLE ${User.tableName} (
                id SERIAL PRIMARY KEY,
                pseudo TEXT,
                password VARCHAR(60),
                is_admin BOOLEAN
            )
        `
    }
}

/* Pour faire une référence:
    user_id INTEGER REFERENCES ${User.tableName}(id),
*/

/** @type {String} */
User.tableName = 'users'

module.exports = User