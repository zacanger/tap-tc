const Logger = require('./logger')
const tapOut = require('tap-out')
const through = require('through2')
const duplexer = require('duplexer')

/**
 * Formats TAP output for TeamCity.
 * @module tap-teamcity
 * @return {stream.Duplex} The formatted TAP output.
 */
const tapTeamCity = () => {
  const output = through()
  const logger = Logger(output)
  const parser = tapOut()
  const stream = duplexer(parser, output)

  // Display previous test (if exists) finished
  // Display current test started
  parser.on('test', (test) => {
    logger.finishTest()
    logger.startTest(test)
  })

  // Display successful assertions started
  parser.on('pass', (assertion) => logger.startAssertion(assertion))

  // Display successful assertions finished
  // Display failed assertions started
  parser.on('assert', (assertion) => {
    if (
      logger.assertion &&
      logger.assertion.test === assertion.test &&
      logger.assertion.number === assertion.number
    ) {
      logger.finishAssertion()
    } else {
      logger.startAssertion(assertion)
    }
  })

  // Display failed assertions failed and finished
  // eslint-disable-next-line no-unused-vars
  parser.on('fail', (assertion) => {
    logger.failAssertion()
    logger.finishAssertion()
    stream.failed = true
  })

  // Display everything finished
  // eslint-disable-next-line no-unused-vars
  parser.on('output', (results) => {
    logger.finishTest()
    output.push('\n')
    output.push(null)
  })

  return stream
}

module.exports = tapTeamCity
