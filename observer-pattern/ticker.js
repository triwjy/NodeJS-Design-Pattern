import { EventEmitter } from 'events';

function ticker(n, cb) {
  const emitter = new EventEmitter();
  let totalTick = 0;

  const tickerInterval = setInterval(() => {
    emitter.emit('tick');
    totalTick++;
  }, 50);

  setTimeout(() => {
    clearInterval(tickerInterval);
    cb(null, totalTick);
  }, n);

  return emitter;
}

ticker(1510, (err, totalTick) => {
  console.log(`Total tick: ${totalTick}`);
}).on('tick', () => console.log('tick...'));
