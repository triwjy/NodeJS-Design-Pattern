class Logger {
  constructor(name) {
    this.name = name;
    this.count = 0;
  }

  log(message) {
    this.count++;
    console.log(`[${this.name}] ${message}`);
  }
}
module.exports = new Logger('DEFAULT');
