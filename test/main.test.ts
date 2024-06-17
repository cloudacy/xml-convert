import { expect, test } from 'vitest'
import { obj2xml } from '../src/main.js'

test('creates an empty xml string', () => {
  expect(obj2xml({ tag: '' }).trim()).toBe(
    '<?xml version="1.0" encoding="utf-8"?>'
  )
})

test('creates an xml string with a tag', () => {
  expect(obj2xml({ tag: 'test' }).trim()).toBe(
    '<?xml version="1.0" encoding="utf-8"?>\r\n<test/>'
  )
})

test('creates an xml string with a tag and text', () => {
  expect(obj2xml({ tag: 'test', content: 'hooray' }).trim()).toBe(
    '<?xml version="1.0" encoding="utf-8"?>\r\n<test>hooray</test>'
  )
})

test('creates an xml string with a tag and 1 attribute', () => {
  expect(obj2xml({ tag: 'test', attrs: { a: 'b' } }).trim()).toBe(
    '<?xml version="1.0" encoding="utf-8"?>\r\n<test a="b"/>'
  )
})

test('creates an xml string with a tag and multiple attributes', () => {
  expect(obj2xml({ tag: 'test', attrs: { a: 'b', b: 'c', d: 1 } }).trim()).toBe(
    '<?xml version="1.0" encoding="utf-8"?>\r\n<test a="b" b="c" d="1"/>'
  )
})

test('creates an xml string with a tag and multiple attributes and multiple children', () => {
  expect(
    obj2xml({
      tag: 'test',
      attrs: { a: 'b', b: 'c', d: 1 },
      content: [
        {
          tag: 'test2',
          attrs: { e: 'f' },
          content: [{ tag: 'test2_1', attrs: { g: 'h' } }],
        },
        { tag: 'test3', attrs: { f: 'g' }, content: 'nested' },
      ],
    }).trim()
  ).toBe(
    '<?xml version="1.0" encoding="utf-8"?>\r\n<test a="b" b="c" d="1">\r\n  <test2 e="f">\r\n    <test2_1 g="h"/>\r\n  </test2>\r\n  <test3 f="g">nested</test3>\r\n</test>'
  )
})

test('creates an xml string with a child', () => {
  expect(obj2xml({ tag: 'test', content: [{ tag: 'child1' }] }).trim()).toBe(
    '<?xml version="1.0" encoding="utf-8"?>\r\n<test>\r\n  <child1/>\r\n</test>'
  )
})

test('creates an xml string without self closing tags object', () => {
  expect(obj2xml({ tag: 'test' }, { selfClosingTags: false }).trim()).toBe(
    '<?xml version="1.0" encoding="utf-8"?>\r\n<test></test>'
  )
})

test('creates an xml string with lf instead of crlf', () => {
  expect(obj2xml({ tag: 'test' }, { crlf: false }).trim()).toBe(
    '<?xml version="1.0" encoding="utf-8"?>\n<test/>'
  )
})
