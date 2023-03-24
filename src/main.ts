export interface XMLObject {
  tag: string
  attrs?: { [attr: string]: string | number }
  children?: Array<XMLObject>
  text?: string
}

export function obj2xml(
  obj: XMLObject,
  pad?: string,
  options?: { selfClosingTags?: boolean; crlf?: boolean }
) {
  const eol = options?.crlf !== false ? '\r\n' : '\n'
  let xml = pad ? '' : '<?xml version="1.0" encoding="utf-8"?>' + eol
  if (obj.tag) {
    // render tag-start
    xml += (pad || '') + '<' + obj.tag

    // render tag attributes
    if (obj.attrs) {
      for (const attr in obj.attrs) {
        xml +=
          ' ' +
          attr +
          '="' +
          obj.attrs[attr].toString().replace(/"/g, '\\"') +
          '"'
      }
    }

    const endTag = `</${obj.tag}>`

    // render children
    if (obj.children) {
      // render start-tag-close
      xml += '>' + eol

      // render all children
      for (const child of obj.children) {
        xml += obj2xml(child, (pad || '') + '  ')
      }

      // render tag-close
      xml += (pad || '') + endTag + eol
    } else if (obj.text) {
      // render start-tag-close
      xml += '>'

      // render the text
      xml += obj.text

      // render tag-close
      xml += endTag + eol
    } else {
      if (options?.selfClosingTags !== false) {
        // render mono-tag-close
        xml += '/>' + eol
      } else {
        // close start tag
        xml += '>'

        // add end tag
        xml += endTag + eol
      }
    }
  }

  return xml
}
