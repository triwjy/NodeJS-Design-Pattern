import { EventEmitter } from 'events';

function ticker(n, cb) {
  const emitter = new EventEmitter();
  let totalTick = 0;
  process.nextTick(() => {
    if (Date.now() % 5 === 0) {
      const err = new Error('time divisible by 5');
      cb(err);
      emitter.emit('error');
    } else {
      emitter.emit('tick');
      totalTick++;
    }
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
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Total tick: ${totalTick}`);
  }
})
  .on('tick', () => console.log('tick...'))
  .on('error', () => console.error('got error message'));
