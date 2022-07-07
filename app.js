const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// requerir el arreglo de players en data.json
const { players } = require('./data.json')
app.use(express.json());

//Ruta que devuelva el array de players
app.get('/players', (req, res) => {
    console.log('Ej1')
    res.json(players)

});

//Devolver un sub arreglo de players filtrado por rol pasado por parametro
app.get('/players/:role', (req, res) => {

    //const result = players.filter(e => e.role === req.params.role)
    const result = players.filter(({ role }) => role === req.params.role)
    console.log(result)

    res.json(result)

});

//Operacion que agregaría un nuevo player.
//Verificar que el body de la request contiene las claves: name, lastname, role, team.
//Si todos los datos están presentes, devolver status 200 y {"operation": "add player", "status": "OK"}
//Si faltase alguna de las claves, devolver status 400 y {"operation": "add player", "status": "Bad request, check your parameters"}
app.post('/players', (req, res) => {
    const { name, lastname, role, team } = req.body.hasOwnProperty();

    for (param in req.body) {
        if (!req.body.hasOwnProperty(param)) {
            error = true
            break
        }
    }

    const error = name && lastname && role && team
    const { operation, status } = {
        operation: error ? 200 : 400,
        status: error ? 'Ok' : 'Bad request, check you parameters'
    }

    res.status(operation).json({ operation: 'add player', statuts: status })
});

app.listen(port, () => {
    console.log(players);
    console.log('Express server started at port ' + port)
});