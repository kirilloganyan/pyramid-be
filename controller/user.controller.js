const db = require('../db');
const cron = require('node-cron');

class UserController {
    async createUser(req, res) {
            const {name, login,money,tg_id, contract} = req.body;
        const userContract = contract !== undefined ? contract : false;
        const newPerson = await db.query(
            `INSERT INTO person (name, login, money, tg_id, contract)
             VALUES ($1, $2, $3, $4, $5)
                 RETURNING *`,
            [name, login, money, tg_id, userContract]
        );
        res.json(newPerson.rows[0]);
    }
    async getUsers(req, res) {
        const users = await db.query(`SELECT * FROM person`);
        res.json(users.rows);
    }
    async updateUser(req, res) {
        const {name, login,money,tg_id, id, contract} = req.body;
        const user = await db.query(
            `UPDATE person set name = $1, login = $2, money = $3, tg_id = $4, contract = $5 WHERE id = $6 RETURNING *`,[name, login,money,tg_id, contract, id]
        )
        res.json(user.rows[0]);
    }
    async deleteUser(req, res) {
        const {id} = req.params;
        const user = await db.query('DELETE FROM person WHERE id = $1', [id]);
        res.json(user.rows[0]);
    }
    async getUserById(req, res) {
        const id = req.params.id;
        const users = await db.query(`SELECT * FROM person where id = $1`, [id]);
        res.json(users.rows[0]);
    }
    async getUserByTgId(req, res) {
        try {
            const tg_id = req.params.id; // Извлекаем параметр из маршрута
            const users = await db.query(`SELECT * FROM person WHERE tg_id = $1`, [tg_id]);

            if (!users.rows[0]) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(users.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async incrementVariable() {
        try {
            const result = await db.query(
                `UPDATE person SET money = money * 1.023 WHERE money IS NOT NULL RETURNING *`
            );
            console.log(`${result.rowCount} users updated. Money incremented by 5%.`);
        } catch (error) {
            console.error('Error incrementing money:', error);
        }
    }
}
const userController = new UserController();

cron.schedule('10 21 * * *', async () => {
    console.log('Running daily incrementVariable task at 8:45 PM');
    await userController.incrementVariable();
});

module.exports = new UserController();

// cron.schedule('*/5 * * * *', async () => {
//     console.log('Running incrementVariable task every 5 minutes');
//     await userController.incrementVariable();
// });
// CREATE TABLE person (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     login VARCHAR(100) UNIQUE,
//     money NUMERIC(12, 2) DEFAULT 0,
//     tg_id VARCHAR(50) UNIQUE