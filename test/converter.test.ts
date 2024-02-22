import { expect, test, describe } from "bun:test";

import { convertMdToHtml } from '../src/converter';

const removeTabsInString = (multilineString: string): string => {
  return multilineString.replace(/^\s+/gm, '')
}

describe("Convert Markdown to HTML", () => {
  test("heading 1", () => {
    expect(convertMdToHtml('# hello')).toBe('<h1>hello</h1>')
  })

  test("heading 2", () => {
    expect(convertMdToHtml('## hello')).toBe('<h2>hello</h2>')
  })

  test("heading 3", () => {
    expect(convertMdToHtml('### hello')).toBe('<h3>hello</h3>')
  })

  test("heading 4", () => {
    expect(convertMdToHtml('#### hello')).toBe('<h4>hello</h4>')
  })

  test("heading 5", () => {
    expect(convertMdToHtml('##### hello')).toBe('<h5>hello</h5>')
  })

  test("heading 6", () => {
    expect(convertMdToHtml('###### hello')).toBe('<h6>hello</h6>')
  })

  test("block text", () => {
    expect(convertMdToHtml('**hello**')).toBe('<strong>hello</strong>')
  })

  test("italic text", () => {
    expect(convertMdToHtml('*hello*')).toBe('<em>hello</em>')
  })

  test("strike through", () => {
    expect(convertMdToHtml('~~hello~~')).toBe('<del>hello</del>')
  })

  test("unordered list", () => {
    expect(convertMdToHtml('- hello')).toBe('<li> hello</li>')
  })
  test("ordered list", () => {
    const text: string = removeTabsInString(String.raw`
      1. hello
      2. llo
      3. velo
    `)

    expect(convertMdToHtml(text)).toBe(
      '<ol><li>hello</li><li>llo</li><li>velo</li></ol>\n'
    )
  })
});