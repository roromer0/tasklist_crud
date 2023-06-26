// importar objecId de mongoose
const { ObjectId } = require('mongoose').Types;

// get dates and file extension from command line
const args = process.argv.slice(3);

const events = [];
const ids = [];
// get all ids from db
// db.logins.find({},{_id:1}).forEach((login)=>ids.push(login._id.toString()));
ids = ["63d0dee3bed5ce7c993b5ecc", "63d0dee3bed5ce7c993b5ecd", "63d0dee3bed5ce7c993b5ecf", "63d0f229fbb4226d8465f86a", "63d0dee3bed5ce7c993b5ece", "63d0dee3bed5ce7c993b5ed0"];
console.log(ids);
const start = new Date("2021-01-01T00:00:00.000Z");
const end = new Date("2025-12-31T23:59:59.000Z");
// year of date based on first parameter
// const start = new Date(`${args[0]}-01-01T00:00:00.000Z`);
// const end = new Date(`${args[1]}-12-31T23:59:59.000Z`);

for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
    for (let id of ids) {
        events.push({
            title: `Reunión de evaluación de daños y reparaciones ${year}`,
            // En formato ISO
            // start: new Date(`${year}-01-15T09:00:00.000Z`).toISOString(),
            // end: new Date(`${year}-01-15T12:00:00.000Z`).toISOString(),
            // En formato Date
            start: new Date(`${year}-01-15T09:00:00.000Z`),
            end: new Date(`${year}-01-15T12:00:00.000Z`),
            allDay: false,
            // En formato string
            // user: id
            // En formato ObjectId
            user: new ObjectId(id)
        });
        events.push({
            title: `Reunión de seguimiento de daños y reparaciones ${year}`,
            // En formato ISO
            // start: new Date(`${year}-07-15T09:00:00.000Z`).toISOString(),
            // end: new Date(`${year}-07-15T12:00:00.000Z`).toISOString(),
            // En formato Date
            start: new Date(`${year}-07-15T09:00:00.000Z`),
            end: new Date(`${year}-07-15T12:00:00.000Z`),
            allDay: false,
            // En formato string
            // user: id
            // En formato ObjectId
            user: new ObjectId(id)
        });
    }
}
// Insertar en la base de datos
db.events.insertMany(events);

// En formato JSON
// console.log(JSON.stringify(events));
// En formato BSON
// console.log(events);

// Exportarlos a archivo
// const fs = require('fs');
// fs.writeFileSync('events.mongodb', JSON.stringify(events));
// file extension based on third parameter
// fs.writeFileSync(`events.${args[2]}`, JSON.stringify(events));