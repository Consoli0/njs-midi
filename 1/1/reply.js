const midi = require("easymidi");
const ports = require('../../utils.js').getDevice('');
console.log(
  `Connected to \`${ports.input}\` as input, and \`${ports.output}\` as output`
);
const input = new midi.Input(ports.input);
const output = new midi.Output(ports.output);

console.log('Replying to MIDI messages now');

input.on('noteon', msg => {
  console.log(msg);
  output.send('noteon',msg);
});

input.on('noteoff', msg => {
  console.log(msg);
  output.send('noteoff',msg);
});

input.on('cc', msg => {
  console.log(msg);
  output.send('cc',msg);
});
