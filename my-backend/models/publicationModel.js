const db = require('../config/dbConfig')
const userModel = require('./userModel')

const getPublicationById= (publicationId, callback) => {
    db.query(`SELECT pub.id, pub.status, pub.date, pub.description,
	                User.name, User.ubication, User.phone, User.email, User.status as status_user, User.imgUrl as imgUrl_user,
	                Pet.name as name_pet, Pet.raze, pet.age, Pet.color, Pet.size, Pet.imgUrl as imgUrl_pet, 
	                com.id as id_com, com.status as status_com, com.comment,  com.date as date_com, com.user_id as user_id_com
                FROM Publications pub
                JOIN User ON pub.user_id = user.id 
                JOIN Pet ON pub.pet_id = pet.id
                LEFT JOIN Comments com on pub.id = com.publication_id
                WHERE pub.id = ?`, [publicationId], (err, results) => {
        if (err) {
            return callback(err);
        }
        userModel.getAllUsers((err, users) =>{
            if (err) {
                return callback(err);
            }
            for (let i = 0; i < results.length; i++) {
                for (let u = 0; u < users.length; u++) {
                    if(results[i].user_id_com == users[u].id)
                        results[i].user_com = users[u]
                }
            }
            callback(null, results);
        })        
    });
};

module.exports = {
    getPublicationById
}