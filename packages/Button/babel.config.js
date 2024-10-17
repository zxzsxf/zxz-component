module.exports = {
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": 2,
          "targets": {
            "browsers": ["Android 4.4", "iOS 9"]
          }
        }
      ],
      "@babel/preset-react",
      [
        "@babel/preset-typescript",
        {
          "isTSX": true,
          "allExtensions": true
        }
      ]
    ],
    "plugins": [
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-optional-chaining"
    ],
    "env": {
      "development": {
        "plugins": [
          [
            "@babel/plugin-transform-runtime",
            {
              "helpers": false,
              "corejs": 2,
              "regenerator": true,
              "useESModules": true
            }
          ],
          "@babel/plugin-proposal-class-properties"
        ]
      }
    }
  }