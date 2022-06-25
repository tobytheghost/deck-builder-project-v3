export default function safeParseJson (jsonString: string, isList = false) {
  try {
    return JSON.parse(jsonString)
  } catch (e) {
    return isList ? [] : {}
  }
}
