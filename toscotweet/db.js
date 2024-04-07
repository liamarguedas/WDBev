import sqlite3 from "sqlite3";

export default class Database {
  constructor(_db = "./data/tweets.db") {
    this.db = new sqlite3.Database(_db);
  }

  createTable() {
    this.db.serialize(() => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS tweets (public_id TEXT, title TEXT, tweet TEXT)",
      );
    });
  }

  insertData(id, title, tweet) {
    this.db.run(
      "INSERT INTO tweets(public_id, title, tweet) VALUES (?, ?, ?)",
      [id, title, tweet],
      (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log("Row was added to the table");
      },
    );
  }

  selectData() {
    let sql = "SELECT public_id, title, tweet FROM tweets";
    this.db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row);
      });
    });
  }

  selectDataColumn(column = "public_id") {
    return new Promise((resolve, reject) => {
      let sql = `SELECT ${column} FROM tweets`;
      this.db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  filterSingleRow(column = "public_id", value) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM tweets WHERE ${column} = ?`;
      this.db.all(sql, [value], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  deleteDataFilter(column = "public_id", value) {
    this.db.serialize(() => {
      this.db.run(`DELETE FROM tweets WHERE ${column} = ?`, value);
    });
  }

  cleanDataBase() {
    this.db.serialize(() => {
      this.db.run("DELETE FROM tweets");
    });
  }

  editDataRow(filterColumn = "public_id", filterValue, newTweet, newTitle) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE tweets SET tweet = ?, title = ? WHERE ${filterColumn} = ?`;
      this.db.run(sql, [newTweet, newTitle, filterValue], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  close() {
    this.db.close();
  }
}
