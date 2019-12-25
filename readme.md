# Hey!
## Welcome to njs-midi!

You can start out by plugging a MIDI device in, and opening your TerminalOfChoice™

- Navigate to the folder `1/1`, and do `node log.js`, hit some pads, play some notes, just interact, and it will log all your actions to console! You can also try `node reply.js`, which will light pads on a Launchpad when you hit them!

- Navigate to the folder `1/1`, and do `node record.js`, play some notes on your MIDI device, and it will record them, press enter to save! (Note: this works with most MIDI devices, you can use a Launchpad, MIDI Piano, or really any MIDI device which sends note messages)
- Next, do `node playback.js [path to recording]`, and it will play back your recording!
