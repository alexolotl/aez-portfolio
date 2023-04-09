/* eslint-env node */

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const React = require("react")

// Wraps every page in a component
exports.wrapPageElement = ({ element }) => {
  return <>{element}</>
}