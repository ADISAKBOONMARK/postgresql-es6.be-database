import { APP_CONFIG } from '../../AppConfig';

import { POSTGRE } from '../../MainProperty';

import OutputOnDbProperty from '../../BusinessData/Result/OutputOnDb/OutputOnDbProperty';

class PlatformDatabase {
    constructor() {
        this.host = APP_CONFIG.DB.HOST;
        this.port = APP_CONFIG.DB.PORT;
        this.user = APP_CONFIG.DB.USER;
        this.password = APP_CONFIG.DB.PASSWORD;
        this.dbName = APP_CONFIG.DB.NAME;
        this.pool = null;
    }

    async execute(sql) {
        const result = await this.mappingEventsMultiple(sql, 'execute');
        return result;
    }

    async queryList(sqlList) {
        const result = await this.mappingEventsList(sqlList, 'query');
        return result;
    }

    async queryMultiple(sql) {
        const result = await this.mappingEventsMultiple(sql, 'query');
        return result;
    }

    async querySingle(sql) {
        const result = await this.mappingEventsSingle(sql, 'query');
        return result;
    }

    async insert(sql) {
        const result = await this.mappingEventsMultiple(sql, 'insert');
        return result;
    }

    async update(sql) {
        const result = await this.mappingEventsMultiple(sql, 'update');
        return result;
    }

    async delete(sql) {
        const result = await this.mappingEventsMultiple(sql, 'delete');
        return result;
    }

    async mappingEventsMultiple(sql, msg) {
        const dbResult = await POSTGRE.query(sql, this);
        const outputOnDb = new OutputOnDbProperty();
        if (dbResult.status === true) {
            const message = msg + ' success';
            log.debug(message, dbResult);
            await outputOnDb.success({ data: dbResult.data, userMessage: message });
            return outputOnDb;
        } else {
            const message = msg + ' fail';
            log.debug(message, dbResult);
            await outputOnDb.fail({ data: [], userMessage: message, developerMessage: dbResult.message });
            return outputOnDb;
        }
    }

    async mappingEventsSingle(sql, msg) {
        const dbResult = await POSTGRE.query(sql, this);
        const outputOnDb = new OutputOnDbProperty();
        if (dbResult.status === true) {
            const message = msg + ' success';
            log.debug(message, dbResult);
            await outputOnDb.success({ data: dbResult.data[0], userMessage: message });
            return outputOnDb;
        } else {
            const message = msg + ' fail';
            log.debug(message, dbResult);
            await outputOnDb.fail({ data: {}, userMessage: message, developerMessage: dbResult.message });
            return outputOnDb;
        }
    }

    async mappingEventsList(sqlList, msg) {
        const outputOnDb = new OutputOnDbProperty();

        const result = {
            data: [],
            totalCount: 0,
        };

        let dbResult = await POSTGRE.query(sqlList[0], this);

        if (dbResult.status === true) {
            const message = msg + ' success';
            log.debug(message, dbResult);

            result.totalCount = Number(dbResult.data[0].totalCount);

            dbResult = await POSTGRE.query(sqlList[1], this);

            if (dbResult.status === true) {
                const message = msg + ' success';
                log.debug(message, dbResult);

                result.data = dbResult.data;

                await outputOnDb.success({ data: result, userMessage: message, developerMessage: dbResult.message });
            } else {
                const message = msg + ' fail';
                log.debug(message, dbResult);

                await outputOnDb.fail({
                    data: dbResult.data,
                    userMessage: message,
                    developerMessage: dbResult.message,
                });
            }
        } else {
            const message = msg + ' fail';
            log.debug(message, dbResult);

            await outputOnDb.fail({ data: dbResult.data, userMessage: message, developerMessage: dbResult.message });
        }

        return outputOnDb;
    }

    //= =============== Transaction ================//
    async openTransaction(log) {
        const dbResult = await POSTGRE.openTransaction(this);

        if (dbResult.status === true) {
            this.pool = dbResult.pool;
        }

        const result = { status: dbResult.status, message: dbResult.message, data: dbResult.data };

        if (result.status === true) {
            log.debug('open transaction success', result);
        } else {
            log.debug('open transaction fail', result);
        }

        return result;
    }

    async commit(log) {
        const result = await POSTGRE.commit(this.pool);
        if (result.status === true) {
            log.debug('commit success', result);
        } else {
            log.debug('commit fail', result);
            this.rollback(log);
        }
    }

    async rollback(log) {
        const result = await POSTGRE.rollback(this.pool);
        if (result.status === true) {
            log.debug('rollback success', result);
        } else {
            log.debug('rollback fail', result);
        }
    }

    async executeTransaction(sql) {
        const result = await this.mappingEventsMultipleTransaction(sql, 'execute', this.pool);
        return result;
    }

    async queryListTransaction(sqlList) {
        const result = await this.mappingEventsListTransaction(sqlList, 'query', this.pool);
        return result;
    }

    async queryMultipleTransaction(sql) {
        const result = await this.mappingEventsMultipleTransaction(sql, 'query', this.pool);
        return result;
    }

    async querySingleTransaction(sql) {
        const result = await this.mappingEventsSingleTransaction(sql, 'query', this.pool);
        return result;
    }

    async insertTransaction(sql) {
        const result = await this.mappingEventsMultipleTransaction(sql, 'insert', this.pool);
        return result;
    }

    async updateTransaction(sql) {
        const result = await this.mappingEventsMultipleTransaction(sql, 'update', this.pool);
        return result;
    }

    async deleteTransaction(sql) {
        const result = await this.mappingEventsMultipleTransaction(sql, 'delete', this.pool);
        return result;
    }

    async mappingEventsMultipleTransaction(sql, msg) {
        const dbResult = await POSTGRE.queryTransaction(sql, this.pool);
        const outputOnDb = new OutputOnDbProperty();
        if (dbResult.status === true) {
            const message = msg + ' success';
            log.debug(message, dbResult);
            await outputOnDb.success({ data: dbResult.data, userMessage: message });
            return outputOnDb;
        } else {
            const message = msg + ' fail';
            log.debug(message, dbResult);
            await outputOnDb.fail({ data: [], userMessage: message, developerMessage: dbResult.message });
            return outputOnDb;
        }
    }

    async mappingEventsSingleTransaction(sql, msg) {
        const dbResult = await POSTGRE.queryTransaction(sql, this.pool);
        const outputOnDb = new OutputOnDbProperty();
        if (dbResult.status === true) {
            const message = msg + ' success';
            log.debug(message, dbResult);
            await outputOnDb.success({ data: dbResult.data[0], userMessage: message });
            return outputOnDb;
        } else {
            const message = msg + ' fail';
            log.debug(message, dbResult);
            await outputOnDb.fail({ data: {}, userMessage: message, developerMessage: dbResult.message });
            return outputOnDb;
        }
    }

    async mappingEventsListTransaction(sqlList, msg) {
        const outputOnDb = new OutputOnDbProperty();

        const result = {
            data: [],
            totalCount: 0,
        };

        let dbResult = await POSTGRE.queryTransaction(sqlList[0], this.pool);

        if (dbResult.status === true) {
            const message = msg + ' success';
            log.debug(message, dbResult);

            result.totalCount = Number(dbResult.data[0].totalCount);

            dbResult = await POSTGRE.queryTransaction(sqlList[1], this.pool);

            if (dbResult.status === true) {
                const message = msg + ' success';
                log.debug(message, dbResult);

                result.data = dbResult.data;

                await outputOnDb.success({ data: result, userMessage: message, developerMessage: dbResult.message });
            } else {
                const message = msg + ' fail';
                log.debug(message, dbResult);

                await outputOnDb.fail({
                    data: dbResult.data,
                    userMessage: message,
                    developerMessage: dbResult.message,
                });
            }
        } else {
            const message = msg + ' fail';
            log.debug(message, dbResult);

            await outputOnDb.fail({ data: dbResult.data, userMessage: message, developerMessage: dbResult.message });
        }

        return outputOnDb;
    }
}

export default PlatformDatabase;
