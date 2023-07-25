const pool = require('../../config/database');

module.exports = {
  //data comes form the user controller
  register: (data, callback) => {
    pool.query(
      'INSERT INTO registration(user_name,user_email,user_password)VALUES(?,?,?)',
      [
        data.userName,
        data.email,
        data.password
      ],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },


  profile: (data, callback) => {
    pool.query(
      'INSERT INTO profile(user_id,first_name,last_name)VALUES(?,?,?)',

      // 'CREATE TABLE if not exists profile(user_profile_id int auto_increment, user_id int not null, first_name varchar(255) not null,last_name varchar(255) not null, PRIMARY KEY (user_profile_id), FOREIGN KEY (user_id) REFERENCES registration(user_id))';
      [
        data.userId,
        data.firstName,
        data.lastName
      ],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },


  userById: (data, callback) => {
    pool.query(
      'SELECT registration.user_id,user_name,user_email,first_name,last_name FROM registration LEFT JOIN profile ON registration.user_id=profile.user_id WHERE registration.user_id=?',
      // if [data.id] causes an issue just use [id]
      [data.id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      })
  },


  getUserByEmail: (email, callback) => {
    pool.query(
      'SELECT * FROM registration WHERE user_email = ?',
      [email],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      });
  },

  getAllUsers: (callback) => {
    pool.query(`SELECT user_id,user_name,user_email FROM registration`, [],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    })
  },
};
