const midi = require("easymidi");

module.exports.getDevice = type => {
  let inputs = midi.getInputs();
  let outputs = midi.getOutputs();

  var input;
  var output;

  inputs.forEach(i => {
    if (i.search(type) !== -1 && !i.startsWith("MIDI")) {
      input = i;
      return;
    }
  });

  outputs.forEach(i => {
    if (i.search(type) !== -1 && !i.startsWith("MIDI")) {
      output = i;
      return;
    }
  });

  return { input, output };
};
