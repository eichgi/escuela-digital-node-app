'use strict';
const conn = require('./team-schema');

class TeamModel {

    getAll(cb) {
        conn.find({}, (err, docs) => {
            if (err) throw err;
            cb(docs);
        });
    }

    getOne(_id, cb) {
        conn.findOne({_id: _id}, (err, docs) => {
            if (err) throw err;
            cb(docs);
        });
        //conn.query('SELECT * FROM team WHERE id = ?', id, cb);
    }

    save(data, cb) {

        conn.count({_id: data._id}, (err, count) => {
            if (err) throw err;
            console.log('No  de docs: ' + count);

            if (count == 0) {
                conn.create(data, (err)=> {
                    if (err) throw err;
                    cb();
                });
            } else if (count == 1) {
                conn.findOneAndUpdate(
                    {
                        _id: data._id
                    },
                    {
                        name: data.name,
                        twitter: data.twitter,
                        country: data.country,
                        side: data.side
                    },
                    (err)=> {
                        if (err) throw err;
                        cb();
                    }
                );
            }
        });
        /*conn.query('SELECT * FROM team WHERE id = ?', data.id, (err, rows) => {
         console.log('Número de registros: ' + rows.length);

         if (!err) {
         return (rows.length == 1)
         ? conn.query('UPDATE team SET ? WHERE id = ?', [data, data.id], cb)
         : conn.query('INSERT INTO team SET ?', data, cb);
         }
         });*/
    }

    delete(_id, cb) {

        conn.remove({_id: _id}, (err)=> {
            if (err) throw err;
            cb();
        })
        //conn.query('DELETE FROM team WHERE id = ?', id, cb);
    }
}

module.exports = TeamModel;
