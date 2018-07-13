# tap-tc

[![npm](https://img.shields.io/npm/v/tap-tc.svg)](https://www.npmjs.com/package/tap-tc)

Formats [TAP](https://testanything.org/tap-specification.html) output for TeamCity.

Maintained fork of [tap-teamcity](https://github.com/smockle/tap-teamcity#readme).

## Installation

`npm i -D tap-tc`

## Usage

### Streaming

```JavaScript
const test = require('tape')
const tapTeamCity = require('tap-tc')

test.createStream()
  .pipe(tapTeamCity())
  .pipe(process.stdout)
```

### CLI

**package.json**

```JSON
{
  "name": "module-name",
  "scripts": {
    "test": "tape test/**/*.js | tap-tc"
  }
}
```

Then run with `npm test`

**Terminal**

```
tape test/**/*.js | npx tap-tc
```

## Testing

Clone this project, run `npm ci`, then `npm t`.

## Credits

Originally written by [@smockle](https://github.com/smockle), but their project
is now archived and unmaintained.

Many thanks to [@scottcorgan](https://github.com/scottcorgan) for creating the
[tap-spec](https://github.com/scottcorgan/tap-spec) formatter, which inspired
this one.
