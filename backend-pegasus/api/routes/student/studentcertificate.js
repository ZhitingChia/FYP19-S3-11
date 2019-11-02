const {env, sha1, mysql, mypool} = require('../../util')

const studentawards = (req, res) => {
    const studentid = parseInt(req.params.StudentID);
    const certname = req.body.Name;
    const issuedby = req.body.IssuedBy;
    const issueddate = req.body.IssueDate;
    const validuntil = req.body.ValidUntil;

    mypool.getConnection( (error, connection) => {
        if(error) {
            connection.release()
            console.log(`Error getting mysql_pool connection: ${error}`)
            throw error
        }
        else {
            if(studentid && certname && issuedby && year && month) {               
                let queryString = `INSERT INTO pegasus.studentcertificate (studentid, certificatename, issuedby, issueddate, validuntil) values ("${studentid}", "${certname}", "${issuedby}", "${issueddate}", "${validuntil}")`
                connection.query(queryString, (err, rows, fields) => {
                    if(err) {
                        res.status(500).json({ message: err })
                    }
                    else {
                        res.json({
                            message: "success"
                        })
                    }
                }) 
            } else {
                res.status(400).json({
                    message: "Bad Request! Invalid POST request!"
                });
            }
    
        }
        connection.release()
    } )
}

module.exports = studentawards