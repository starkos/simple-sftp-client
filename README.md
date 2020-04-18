# simple-sftp-client

A simple SFTP pass-through service and React-based client proof-of-concept.

Some folks we work with aren't comfortable using old-school SFTP applications like [FileZilla](https://filezilla-project.org); some can't easily install applications in their work environments.
This weekend proof-of-concept demonstrates using a minimal web application to navigate large filesets, sidestepping both issues.

The project is setup as a monorepo with two projects: a web front-end to navigate and interact with the fileset, and a backend service which handles communication with the SFTP server, passing the results through to the web client.

I use...

- [Lerna](https://lerna.js.org) to manage the monorepo
- [TypeScript](https://www.typescriptlang.org) for both components
- [React](https://reactjs.org) for the web client
- [Jest](https://jestjs.io) for testing (but since I blasted this out in a weekend there aren't many)

## Building

```sh
# Initialize the project
$ npm install
$ npx lerna bootstrap

# Test
$ npx lerna run test

# Run for development
$ npx lerna run start

# Build for deployment
$ npx lerna run build

# Deploying

```
