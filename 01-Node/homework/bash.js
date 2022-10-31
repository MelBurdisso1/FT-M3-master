const commands = require('./commands');


const cmd = 'pwd';

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remueve la nueva línea
  if(cmd === 'date') {
    process.stdout.write(Date());  
  }
  if(cmd === 'pwd') {
    process.stdout.write(process.cwd())
    commands[cmd]()
  }
  process.stdout.write('\nprompt > ');
});