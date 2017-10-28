const ESCAPE = '% '
const COMMENT = '// '

const separate = perLine(onlyJapanese)
module.exports = separate

function perLine (func) {
  return (text) => {
    return text.split('\n')
               .map(func)
               .filter(s => s !== null)
               .join('') // 改行は明示的に空行で指定するため
               .replace(/\n\n\n/g, '\n\n')
               .trim()
  }
}

function isEnglishLine (line) {
  const shouldIgnore = line.startsWith(ESCAPE)
  if (shouldIgnore) {
    return false
  }
  const isAlphabet = (char) => /[a-zA-Z]/.test(char)
  const isASCII = (char) => /[\u0020-\u007e]/.test(char)
  // 最初に見つけた記号以外の文字がアルファベットである
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (isAlphabet(char)) {
      return true
    }
    if (!isASCII(char)) {
      return false
    }
  }
  return false
}

function onlyJapanese (line) {
  line = line.trim()
  if (isEnglishLine(line) || line.startsWith(COMMENT)) {
    return null
  }
  if (line === '') {
    return '\n\n'
  }
  if (line.startsWith(ESCAPE)) {
    line = line.slice(2)
  }
  // マークダウンの有効な行は改行を無視しない
  if (/^[1-9+*->#]/.test(line)) {
    return line + '\n'
  }
  return line
}
