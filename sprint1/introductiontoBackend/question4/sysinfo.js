const os = require("os");

function getSystemInfo() {
    const cpus = os.cpus();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const memUsage = process.memoryUsage();

    console.log("System Information:");
    console.log("-------------------------");
    console.log(`Architecture: ${os.arch()}`);
    console.log(`CPU Cores: ${cpus.length}`);
    console.log(`CPU Model: ${cpus[0].model}`);
    console.log(`CPU Speed: ${(cpus[0].speed / 1000).toFixed(2)} GHz`);
    console.log(`Total Memory: ${(totalMem / (1024 ** 3)).toFixed(2)} GB`);
    console.log(`Free Memory: ${(freeMem / (1024 ** 3)).toFixed(2)} GB`);
    console.log(`Heap Memory Used: ${(memUsage.heapUsed / (1024 ** 2)).toFixed(2)} MB`);
    console.log(`Heap Memory Total: ${(memUsage.heapTotal / (1024 ** 2)).toFixed(2)} MB`);
    console.log(`Hostname: ${os.hostname()}`);
    console.log(`OS Type: ${os.type()}`);
}

module.exports = { getSystemInfo };
