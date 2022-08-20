function makeSampleTask(name) {
  return (cb) => {
    console.log(`${name} started`);
    setTimeout(() => {
      console.log(`${name} completed`);
      cb();
    }, Math.random() * 5000) + 2000;
  };
}

const tasks = [
  makeSampleTask('Task 1'),
  makeSampleTask('Task 2'),
  makeSampleTask('Task 3'),
  makeSampleTask('Task 4'),
  makeSampleTask('Task 5'),
  makeSampleTask('Task 6'),
  makeSampleTask('Task 7'),
  makeSampleTask('Task 8'),
  makeSampleTask('Task 9'),
  makeSampleTask('Task 10'),
  makeSampleTask('Task 11'),
  makeSampleTask('Task 12'),
];

const concurrency = 4;
let running = 0,
  completed = 0,
  index = 0;

function finish() {
  console.log('All tasks executed!');
}

function next() {
  while (running < concurrency && index < tasks.length) {
    const task = tasks[index++];
    task(() => {
      if (++completed === tasks.length) {
        return finish();
      }
      running--;
      next();
    });
    running++;
  }
}

next();
