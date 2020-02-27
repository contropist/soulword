const readline = require('readline')
const crypto = require('crypto')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


rl.question('Input the private memory (or the file hash):', (source_input) => {
    rl.question('Input the password：', (password_input) => {

        let source = source_input // Private memory, or the file hash
        let password = password_input  // For private memory or file hash encryption
        console.log("source: " + source + " password: " + password)

        const sourceSHA512 = crypto.createHash('sha512')
        sourceSHA512.update(source)
        
        let sourceSHA512ToHex = sourceSHA512.digest('hex')
        console.log("sourceSHA512ToHex: " + sourceSHA512ToHex)

        let salt = 'password' + password
        let iterations = 2048 // Iteration times
        let keylen = 32 // Expected length of key
        // By selecting HMAC digest algorithm, digest to export the requested byte length.
        let digest = 'sha512'

        crypto.pbkdf2(sourceSHA512ToHex, salt, iterations, keylen, digest, (err, derivedKey) => {
        if (err) throw err
        console.log("Private Key: 0x" + derivedKey.toString('hex'))
        })

        rl.close();
    })
    
  });