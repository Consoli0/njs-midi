const midi = require("easymidi");
const input = new midi.Input("3- Launchpad Pro 0");
const output = new midi.Output("3- Launchpad Pro 1");

const fs = require("fs");
const prompt = require('prompt');
const glob = require('glob');

prompt.start();

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

const reprompt = ()=>{new Promise((res,rej)=>{
    prompt.get(`Launchpaint file name (found in ${__dirname}/paints)`,(err,res)=>{
      console.log(err,res);
      exit=true;
    });
  })
};

output.send("sysex", [240, 0, 32, 41, 2, 16, 14, 0, 247]);

console.log("---- Launchpaint ----");

var canvas = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

const paintcolors = {
  89: 5,
  79: 96,
  69: 13,
  59: 17,
  49: 41,
  39: 53,
  29: 95
};

Object.keys(paintcolors).forEach(item => {
  output.send("cc", { controller: item, value: paintcolors[item] });
});

var color = 0;

input.on("noteon", msg => {
  if (msg.velocity > 0) {
    output.send("noteon", { note: msg.note, velocity: color });
    let split = msg.note.toString().split("");
    let x = parseInt(split[0]);
    let y = parseInt(split[1]);
    canvas[x - 1][y - 1] = color;
  }
});

input.on("cc", msg => {
  if(msg.value === 0) return;

  if (
    msg.controller === 89 ||
    msg.controller === 79 ||
    msg.controller === 69 ||
    msg.controller === 59 ||
    msg.controller === 49 ||
    msg.controller === 39 ||
    msg.controller === 29 ||
    msg.controller === 19
  ) {
    color = paintcolors[msg.controller];
    output.send("cc", { controller: 98, value: color });
  }

  if (msg.controller === 97) {
    output.send("sysex", [240, 0, 32, 41, 2, 16, 14, 0, 247]);

    canvas.fill([].fill(0));

    Object.keys(paintcolors).forEach(item => {
      output.send("cc", { controller: item, value: paintcolors[item] });
    });

    output.send("cc", { controller: 98, value: color });
  }

  if (msg.controller === 95) {
    const now = Date.now();

    storeData(canvas, `./paints/${now}.json`);
    console.log(`Saved at \`${__dirname}/paints/${now}.json\``);
  }
});
