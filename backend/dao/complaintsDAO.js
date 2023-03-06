export default class ComplaintsDAO {
    static connection

    static setConnection(connection) {
        if (this.connection) return
        this.connection = connection
    }

    static getAllComplaints() {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM Complaints", (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })
    }

    static addComplaint(complaint) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "INSERT INTO Complaints (content, creation_date) VALUES(?, SYSDATE())", 
                [complaint.content], 
                (err, result) => {
                    if (err) return reject(err)
                    resolve(result)
                }
            )
        })
    }
}