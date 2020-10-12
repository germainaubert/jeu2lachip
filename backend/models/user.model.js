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
    static async getById (userId) {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${User.tableName}
            WHERE id=$1`,
            values: [userId]
        })
        return result.rows[0]
    }

    /**
     * @param {User} user
     */
    static async create (user) {
        const hashedPw = await bcrypt.hash(user.password, 10)

        await PostgresStore.client.query({
            text: `
            INSERT INTO ${User.tableName} 
                   (firstname, password, is_admin)
            VALUES ($1,        $2,       $3)`,
            values: [user.firstname, hashedPw, user.is_admin]
        })
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