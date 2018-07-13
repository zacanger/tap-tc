#!/usr/bin/env node

const tapTeamCity = require('../lib/tap-teamcity')
const tapSpec = tapTeamCity()

process.stdin.pipe(tapSpec).pipe(process.stdout)

process.on('exit', (status) => {
  if (status === 1 || tapSpec.failed) process.exit(1)
})
