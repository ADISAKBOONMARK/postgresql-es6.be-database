//= ================= [START Import Modules] =================//
import PostgresqlProvider from './Providers/Database/Postgresql/PostgresqlProvider';
//= ================= [END Import Modules] =================//

//= ================= [ START Provider ] =====================//
const POSTGRE = new PostgresqlProvider();
//= ================= [ END Provider ] =======================//

export {
    POSTGRE,
};
