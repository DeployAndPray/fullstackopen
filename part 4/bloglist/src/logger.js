const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.info(...params)
}

module.exports = {
  info,
  error
}