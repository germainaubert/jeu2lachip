const open = require('open')
const axios = require('axios')

async function openUrl (url, tabs) {
    for (let i = 0; i < tabs; i++) {
        open(url, {app: ['firefox', '--incognito']})
    }
    
}

// async function connect () {
//     await axios({
//         method: "post",
//         url: "http://localhost:3000/api/auth/login",
//         data: {
//           pseudo: 'azert',
//           password: 'azert',
//         },
//     })
// }
let tabs = 3
openUrl('http://localhost:8080/#/Connexion', tabs)
// setTimeout(() => {  console.log("Attendre Cool"); }, 4000)
// connect()