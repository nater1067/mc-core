'use strict'

let pm2 = require('pm2');

module.exports = (args) => {

    let devMode = (args.length > 1 && args[1] === '--dev');
    let processes = (devMode) ? require('./processes/processes-dev') : require('./processes/processes')

    // Connect or launch PM2
    pm2.connect(function(err) {

        // Start our processes
        pm2.start(processes, function(err, proc) {
            if (err) throw new Error('err');

            // Disconnect to PM2 (and exit this script after)
            pm2.disconnect(function() {
                console.log('Mission Control Processes running.')
                process.exit(0)
            });

        });

    })

}
