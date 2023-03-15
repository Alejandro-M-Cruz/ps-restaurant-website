export default class QueryPromiseFactory {
    constructor(connection) {
        this.connection = connection
    }

    create(sql, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }
}