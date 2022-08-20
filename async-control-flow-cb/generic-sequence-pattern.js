function task1(cb) {
  setTimeout(() => task2(cb), 1000);
}

function task2(cb) {
  setTimeout(() => task3(cb), 1000);
}

function task3(cb) {
  cb(); // finally executed the callback
}

task1(() => console.log('task 1, task 2, and task3 executed'));
