import { EventEmitter } from 'events';

function ticker(n, cb) {
  const emitter = new EventEmitter();
  let totalTick = 0;
  process.nextTick(() => {
    emitter.emit('tick');
    totalTick++;
  });

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

ticker(150, (err, totalTick) => {
  console.log(`Total tick: ${totalTick}`);
}).on('tick', () => console.log('tick...'));
