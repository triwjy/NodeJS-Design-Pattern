import { TaskQueue } from './TaskQueue.js';

function makeSampleTask(name) {
  return (cb) => {
    console.log(`${name} started`);
    setTimeout(() => {
      console.log(`${name} completed`);
      cb();
    }, Math.random() * 2000 + 2000);
  };
}

const queue = new TaskQueue(2);

// function that spawns 2 sub tasks
function task1(cb) {
  console.log(`Task 1 started`);
  queue
    .pushTasks(makeSampleTask('task1 -> subtask 1'))
    .pushTasks(makeSampleTask('task1 -> subtask 2'));
  setTimeout(() => {
    console.log('Task 1 completed');
    cb();
  }, Math.random() * 2000);
}

// function that spawns 3 sub tasks
function task2(cb) {
  console.log('Task 2 started');
  queue
    .pushTasks(makeSampleTask('task2 -> subtask 1'))
    .pushTasks(makeSampleTask('task2 -> subtask 2'))
    .pushTasks(makeSampleTask('task2 -> subtask 3'));
  setTimeout(() => {
    console.log('Task 2 completed');
    cb();
  }, Math.random() * 2000);
}

queue.pushTasks(task1).pushTasks(task2);
