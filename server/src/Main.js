//= ================= [START Import Modules] =================//
import PostgeSqlDatabase from './Database/PostgeSql/PostgeSqlDatabase';
//= ================= [END Import Modules] =================//

async function start() {
    const db = new PostgeSqlDatabase();

    const sql = 'SELECT current_database()';
    console.log(sql);

    const result = db.querySingle(sql);
    console.log(result);
}

start();
