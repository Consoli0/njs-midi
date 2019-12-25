const midi = require("easymidi");
const ports = require("../../utils.js").getDevice("");
console.log(
  `Connected to \`${ports.input}\` as input, and \`${ports.output}\` as output`
);
const input = new midi.Input(ports.input);
const output = new midi.Output(ports.output);
const fs = require("fs");

const start = Date.now();

var doVelocity = process.argv[3] === "-dv" ? true : false;

console.log(`Recording now
Press ENTER to save`);

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

var dat = { njsmidirecorded: true };

process.stdin.resume();
process.stdin.on("data", () => {
  const now = Date.now();

  storeData(dat, `./recordings/${now}.json`);
  console.log(`Saved at \`${__dirname}/recordings/${now}.json\``);
  process.exit();
});

input.on("noteon", inputData => {
  if (inputData.velocity < 1) return;
  dat[Date.now() - start] = {
    note: inputData.note,
    velocity: doVelocity ? inputData.velocity : 127,
    type: "noteon",
    channel: inputData.channel
  };
  output.send("noteon", { note: inputData.note, velocity: 5, channel: inputData.channel });
});

input.on("noteoff", inputData => {
  dat[Date.now() - start] = {
    note: inputData.note,
    velocity: doVelocity ? inputData.velocity : 127,
    type: "noteoff",
    channel: inputData.channel
  };
  output.send("noteoff", { note: inputData.note, velocity: 0, channel: inputData.channel });
});
