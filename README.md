# Tia Portal Simple Example

Simple Tia Portal Example to write and Read a few variables. Tested with Tia Portal v16.

## Getting Started

Install a full nodeJS develop environment. And after that:

* Download this project repo.

```
git clone https://github.com/tcrurav/tiaportal-simple-example.git
```

* Install dependencies:

```
cd tiaportal-simple-example
npm install
```

* Install dependencies regarding ts-node:

```
npm install -g typescript
npm install -g ts-node
```

* (For Windows) Open a PowerShell console and enable Execution Police as Unrestricted:

```
Set-ExecutionPolicy Unrestricted
```

* launch the example:

```
ts-node readAndWrite.ts
```

Enjoy!

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - The Editor used in this project
* [Node.js](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [node-opcua](https://github.com/node-opcua) - An implementation of a OPC UA stack fully written in javascript and nodejs. OPC UA is used to connect to S7-1500 in this project.
* [ts-node](https://www.npmjs.com/package/ts-node) - TypeScript execution and REPL for node.js, with source map support.

## Acknowledgments

* https://gist.github.com/PurpleBooth/109311bb0361f32d87a2. A very complete template for README.md files.