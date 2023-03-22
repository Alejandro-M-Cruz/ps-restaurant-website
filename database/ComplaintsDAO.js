import QueryPromiseFactory from "./QueryPromiseFactory.js";

export default class ComplaintsDAO {
    static connection
    static queryPromiseFactory

    static setConnection(connection) {
        if (this.connection) return
        this.connection = connection
        this.queryPromiseFactory = new QueryPromiseFactory(connection)
    }

    static getAllComplaints = () =>
        this.queryPromiseFactory.create("SELECT * FROM complaints ORDER BY creation_datetime DESC")

    static addComplaint = complaint =>
        this.queryPromiseFactory.create(
            "INSERT INTO complaints (content, creation_datetime) VALUES(?, SYSDATE())",
            [complaint.content]
        )
}