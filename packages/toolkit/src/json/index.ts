import stripJsonComments from 'strip-json-comments'
import fs from 'fs-extra'

// replace JSON.parse
export function jsoncParse(data: string) {
  try {
    // eslint-disable-next-line
    return new Function('return ' + stripJsonComments(data).trim())()
  } catch {
    return {}
  }
}

export function JSONReader(
  filename: string,
  silent = true,
): Record<string, any> {
  try {
    return fs.readJSONSync(filename, { encoding: 'utf-8' })
  } catch (error: any) {
    if (silent) {
      return {}
    } else {
      throw new Error(error)
    }
  }
}
