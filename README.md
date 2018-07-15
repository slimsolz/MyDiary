[![Build Status](https://travis-ci.org/slimsolz/MyDiary.svg?branch=server)](https://travis-ci.org/slimsolz/MyDiary)
[![Coverage Status](https://coveralls.io/repos/github/slimsolz/MyDiary/badge.svg?branch=ch-setup-travis-ci-159013746)](https://coveralls.io/github/slimsolz/MyDiary?branch=ch-setup-travis-ci-159013746)
[![Maintainability](https://api.codeclimate.com/v1/badges/00da58edb08bc4c4546b/maintainability)](https://codeclimate.com/github/slimsolz/MyDiary/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/00da58edb08bc4c4546b/test_coverage)](https://codeclimate.com/github/slimsolz/MyDiary/test_coverage)

# MyDiary
MyDiary is an online journal where users can pen down their thoughts and feelings.

### Features
- Sign up: `POST api/v1/auth/signup`
- Sign in: `POST api/v1/auth/signin`
- List all entries: `GET api/v1/entries`
- show a single entry: `GET api/v1/entries/<entryId>`
- Add new entry: `POST api/v1/entries`
- Update an entry: `PUT api/v1/entries/<entryId>`
- Delete an entry: `DELETE api/v1/entries/<entryId>`

#### Dependencies
- Express JS: Web application framework for Node.js.
- Body-Parser: Parse incoming request bodies in a middleware before your handlers, available under the req.body property

#### Dev Dependencies
- Coveralls: Helps to show which part code is not covered by test suite
- Eslint: Linting utility for JavaScript and JSX
- Babel: The compiler for writing next generation JavaScript.
- Mocha & Chai: Testing the Web Application
- Chai: TDD assertion library for node
- Nodemon: Utility that will monitor for any changes in your source and automatically restart your server.

### How To Contribute
- Fork the project & clone locally.
- Branch for each separate piece of work `$ git checkout -b <branch-name>`
- Do the work, write good commit messages.
- Push to your origin repository.
- Create a new PR in GitHub.
- Wait for approval.

#### Author
[Odumah Solomon](https://twitter.com/slimsolz)
