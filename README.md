# xml-convert

Another very simple xml converter from js objects.

## Usage

This package only exports one function `obj2xml` where you can pass a structured javascript object and it outputs some xml.

The input object must be structured as follows:

```ts
export interface XMLObject {
  tag: string
  attrs?: { [attr: string]: string | number }
  content?: string | XMLObject[]
}
```

Content can either be a string (for just a text inside xml tags) or multiple other XMLObjects in an array.

## Example

```ts
import { obj2xml } from 'xml-convert'

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
})

/*
<?xml version="1.0" encoding="utf-8"?>
<test a="b" b="c" d="1">
  <test2 e="f">
    <test2_1 g="h"/>
  </test2>
  <test3 f="g">nested</test3>
</test>
*/
```
