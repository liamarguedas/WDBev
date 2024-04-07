const sqlite3 = require("sqlite3").verbose();

class Database {
  constructor(_db = "./data/tweets.db") {
    this.db = new sqlite3.Database(_db);
  }

  createTable() {
    this.db.serialize(() => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS tweets (id INTEGER PRIMARY KEY, public_id TEXT, tweet TEXT)",
      );
    });
  }

  insertData(row) {
    this.db.serialize(() => {
      const stmt = this.db.prepare("INSERT INTO tweets VALUES (?), (?), (?)");
      stmt.run(row);
      stmt.finalize();
    });
  }

  selectData() {
    this.db.serialize(() => {
      this.db.each("SELECT public_id, tweet FROM tweets", (err, row) => {
        console.log(row.public_id + ": " + row.tweet);
      });
    });
  }

  selectDataFilter(column = public_id, value) {
    this.db.serialize(() => {
      this.db.each(
        `SELECT public_id, tweet FROM tweets WHERE ${column} = ?`,
        value,
        (err, row) => {
          console.log(row.public_id + ": " + row.tweet);
        },
      );
    });
  }

  deleteDataFilter(column = public_id, value) {
    this.db.serialize(() => {
      this.db.run(`DELETE FROM tweet WHERE ${column} = ?`, value);
    });
  }

  close() {
    this.db.close();
  }
}
