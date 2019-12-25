const midi = require("easymidi");
const ports = require('../../utils.js').getDevice('');
console.log(
  `Connected to \`${ports.input}\` as input, and \`${ports.output}\` as output`
);
const input = new midi.Input(ports.input);
const output = new midi.Output(ports.output);

console.log('Logging MIDI messages now');

input.on('noteon', msg => {
  console.log(msg);
});

input.on('noteoff', msg => {
  console.log(msg);
});

input.on('cc', msg => {
  console.log(msg);
});
