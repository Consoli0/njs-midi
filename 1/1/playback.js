const midi = require("easymidi");
const ports = require("../../utils.js").getDevice("");
console.log(
  `Connected to \`${ports.input}\` as input, and \`${ports.output}\` as output`
);
const input = new midi.Input(ports.input);
const output = new midi.Output(ports.output);
const fs = require("fs");

const wait = ms => {
  return new Promise((res, rej) => {
    setTimeout(res, ms);
  });
};

//const play = JSON.parse(fs.readFileSync(process.argv[2]).toString());
const play = require(process.argv[2]);

if (!play | !play.njsmidirecorded) {
  console.log(`Please run this script with an argument with a path to a njs-midi recording
This script only works with files created by 'record.js'`);
  process.exit(5);
}

console.log("Playing back...");

output.send("noteon", { note: 45, velocity: 127 });

const start = Date.now();
var over = false;
var index = 0;

while (!over) {
  var ev = play[Date.now() - start];
  if (ev) {
    output.send(ev.type, ev);
    console.log(ev.type, ev);
  }
}
