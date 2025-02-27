const {router, env, sha1, mysql, mypool} = require('../../util')

const getstudentawards = (req, res) => {
    const studentid = parseInt(req.params.studentid);
    mypool.getConnection( (error, connection) => {
        if(error) {
            connection.release()
            console.log(`Error getting mysql_pool connection: ${error}`)
            throw error
        }
        else {
            if(studentid) {               
                let queryString = `select ID as 'AwardID',awardname as 'Award', DATE_FORMAT(awarddate, '%b %Y') as 'Date', awarddescription as 'Description' from pegasus.studentawards where studentid = "${studentid}"`
                connection.query(queryString, (err, rows, fields) => {
                    if(err) {
                        res.status(500).json({ message: err })
                    }
                    else {
                        res.json({
                            Awards: rows
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

module.exports = getstudentawards