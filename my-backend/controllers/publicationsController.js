const db = require('../confi/dbConfi');

const getAllPublications = (req, res) => {
    const sql = 'SELECT id, user_id, pet_id, status, date FROM publications WHERE status != 0';
    db.query(sql, (err, results) => {
        if(results == '') return res.status(204).send({ message: 'No existe datos para la solicitud.'});
        res.json(results);
    })
}
const getPublicationById = (req, res) => {
    const { id } = req.params;
    const sql = 'select pub.id, pub.user_id, pub.pet_id, pub.status, pub.date, pub.description, com.id as id_com, com.status as status_com, com.comment,  com.date as date_com, com.user_id as user_id_com from publications pub left join comments com on pub.id = com.publication_id where pub.id = ?';
    db.query(sql, [id], (err, results) => {
        if(results == '') return res.status(404).send({ message: 'No existe recursos para la solicitud.'});
        const result = {
            id : results[0].id,
            user_id : results[0].user_id,
            pet_id : results[0].pet_id,
            status : results[0].status,
            date : results[0].date,
            description : results[0].description,
            comments : []
        }
        if(!results[0].comment) return res.json(result);
        for (let index = 0; index < results.length; index++) {
            result.comments.push({id : results[index].id_com, comment : results[index].comment, date : results[index].date_com, user_id : results[index].user_id_com, status : results[index].status_com});            
        }
        res.json(result);
    });
}

module.exports = {
    getAllPublications,
    getPublicationById
}