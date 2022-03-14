const fs = require('fs')

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if(err) {
            console.log(err)
        }
    })
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(err)
        }
    })
}

function getDecimalTime(t, roundUp = true) {
    const arr = t.split(':');
    const dec = parseInt((arr[1]/6)*10, 10);
    const decimalTime = parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec);

    return roundUp ? Math.ceil(decimalTime) : decimalTime;
}

module.exports = {
    writeDataToFile,
    getPostData,
    getDecimalTime
}