import { Pool } from 'pg';
import camelcaseKeys from 'camelcase-keys';

class PostgresqlProvider {
    async connect({ host, port, user, password, dbName }) {
        const url = 'postgres://' + user + ':' + password + '@' + host + ':' + port + '/' + dbName;

        const databaseConfig = { connectionString: url };

        const pool = await new Pool(databaseConfig);

        return pool;
    }

    async query(sql, { host, port, user, password, dbName }) {
        const pool = await this.connect({ host: host, port: port, user: user, password: password, dbName: dbName });

        return new Promise((resolve, reject) => {
            pool.query(sql)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        })
            .then((res) => {
                pool.end();
                return {
                    status: true,
                    message: 'success',
                    data: camelcaseKeys(res.rows) || [],
                };
            })
            .catch((err) => {
                pool.end();
                return {
                    status: false,
                    message: err.message,
                    data: [],
                };
            });
    }

    //= =============== Transaction ================//
    async openTransaction({ host, port, user, password, dbName }) {
        const pool = await this.connect({ host: host, port: port, user: user, password: password, dbName: dbName });

        return new Promise((resolve, reject) => {
            pool.query('BEGIN')
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        })
            .then((res) => {
                return {
                    status: true,
                    message: 'success',
                    data: [],
                    pool: pool,
                };
            })
            .catch((err) => {
                return {
                    status: false,
                    message: err.message,
                    data: [],
                    pool: null,
                };
            });
    }

    async commit(pool) {
        return new Promise((resolve, reject) => {
            pool.query('COMMIT')
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        })
            .then((res) => {
                return {
                    status: true,
                    message: 'success',
                    data: [],
                };
            })
            .catch((err) => {
                return {
                    status: false,
                    message: err.message,
                    data: [],
                };
            });
    }

    async rollback(pool) {
        return new Promise((resolve, reject) => {
            pool.query('ROLLBACK')
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        })
            .then((res) => {
                return {
                    status: true,
                    message: 'success',
                    data: [],
                };
            })
            .catch((err) => {
                return {
                    status: false,
                    message: err.message,
                    data: [],
                };
            });
    }

    async queryTransaction(sql, pool) {
        return new Promise((resolve, reject) => {
            pool.query(sql)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        })
            .then((res) => {
                return {
                    status: true,
                    message: 'success',
                    data: camelcaseKeys(res.rows) || [],
                };
            })
            .catch((err) => {
                return {
                    status: false,
                    message: err.message,
                    data: [],
                };
            });
    }
}

export default PostgresqlProvider;
