#!/usr/bin/env node

const tapTeamCity = require('../lib/tap-teamcity')
const tapSpec = tapTeamCity()

process.stdin.pipe(tapSpec).pipe(process.stdout)

process.on('exit', (status) => {
  if (status === 1 || tapSpec.failed) {
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  }
})
