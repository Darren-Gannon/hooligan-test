# Hooligan Test

A Node.js API service that feeds users pseudo-videos and restricts the viewing limit to a pre configured limit (default is 3).

Underneath we use nestjs which supports swagger and a graphical playground.

Current road block is how do we track when a user has stopped watching a video.

## Installation

### Docker

Quick run: `docker run darren-gannon/hooligan-test`

1. Run `docker run darren-gannon/hooligan-test`
1. Wait for bootstrap log to provide you with the access url

### Native

1. From the root directory, run `npm ci`
1. Run `npm run build`
1. Run `npm run start:prod`
1. Wait for bootstrap log to provide you with the access url

Licence: Proprietary this project, or its derivatives, may not be used for commerical purposes.