import React from "react";
import { render } from "react-dom";
import { App } from "./components/App";

// If we want to be able to easily replace a codesandbox template via Define API later...
// const BABEL_CONFIG = require("!raw-loader!../config.json");
// const BABEL_CONFIG2 = require("!raw-loader!../config2.json");
// const SOURCE = require("!raw-loader!../source.js");
// const PLUGIN = require("!raw-loader!../plugin.js");

const SOURCE = `
class A {
  constructor() {
    this.a = 1;
  }
  getA() {
    return this.a;
  }
}
A.foo = function() {
  console.log('foo');
}
class B extends A {
  constructor() {
    this.b = 1;
  }
  getB() {
    return this.b;
  }
}
B.bar = function() {
  console.log('bar');
}
`;
const CONFIG = [
  {
    presets: [
      [
        "@babel/preset-env",
        {
          loose: true
        }
      ]
    ]
  },
  {
    plugins: [
      [
        "babel-plugin-polyfill-corejs3",
        {
          method: "usage-global",
          targets: {
            edge: 16
          }
        }
      ]
    ]
  }
];
const PLUGIN = `export default function customPlugin(babel) {
  return {
    visitor: {
      Identifier(path) {
        // console.log(path.node.name);
      }
    }
  };
}
`;

render(
  <App
    defaultBabelConfig={CONFIG}
    defaultSource={SOURCE}
    defCustomPlugin={PLUGIN}
  />,
  document.getElementById("root")
);
