# Soulword
🔐 A scheme for creating private keys based on private memories.


> ⚠️ For research only, don't use for formal value savings.

`Soulword` means "Words of the soul". A scheme for creating private keys based on private memories and encryption algorithms. This scheme is designed to solve the problem of irrecoverable loss of private keys. Soulword creates the private key through the user's own encrypted private memories. 

In this way, the private key can be recovered according to the form of encrypted private memories when the private key is lost. 

Private memories can be the encoding associated with user's subjective consciousness. Examples of private memory:

- In the "Three Body" novels often read by the creator of the private key, Fitzroy said a famous saying: "Within the light cone is destiny".
- Hexadecimal coding of glucose formula.
- Company number.
- Hexadecimal protein DNA authoritative public sequence fragment.
- Title of the first article in a well-known magazine history journal.
- The Encoding of a historical block data of bitcoin.
- Hash value of a file.
- ...

## Principle of soulword scheme:

> The process of generating private key through soulword:


`Input private memory` -> `Input password to encrypt private memory` -> `Hash private memory using sha512` -> `Encrypt hash value with password through pbkdf2` -> `Output private key`.

*Backup private key, backup private memory or private memory short prompt.

Example of the private memory short prompt: "Threebody Fitzroy", "Glucose Hex", "#195636", "~/file_path/tiger.svg".

*The steps of private key recovery through soulword are the same as the generation process, and the same input gets the same output.


> Sample code (node.JS), which can be run, just a demo:

```javascript
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

```

**Trying:**  
```
$ git clone https://github.com/jiangfuyao/soulword.git
$ cd soulword/
$ npm install
$ node index.js

```

Running example(`C0806592` is the company number of APPLE INC.): 

```
0xthreebody$ node index.js 
Input the private memory (or the file hash):C0806592
Input the password：safePassWord89Au%175#

source: C0806592 password: safePassWord89Au%175#
sourceSHA512ToHex: b91390405915b91325fa2065fd85f30ee7c33427b294936cd423885c60de5b6c6fe6a11e6cc8ab05b668b9872e62a40bef027f6eadf484911894f13849a19fa9
Private Key: 0xf80a6e196b76274cd672fac3f2ee6c2999ac1762e3bf66103807a239a110c261
```

----

> HD Derivation
> 



`Soulword` supports hard and soft hierarchical deterministic (HD) key derivation compliant. 

`private memory//hard/soft`


----

By Fuyao Jiang | 0xThreeBody from [Acala Network](https://github.com/AcalaNetwork/Acala)
