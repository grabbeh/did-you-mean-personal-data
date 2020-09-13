const dev = process.env.NODE_ENV !== 'production'

export const server = dev
  ? 'http://localhost:7000'
  : 'https://didyoumeanpersonaldata.mbg.codes'
