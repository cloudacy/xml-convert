export interface XMLObject {
  tag: string
  attrs?: { [attr: string]: string | number }
  children?: Array<XMLObject>
  text?: string
}

export function obj2xml(obj: XMLObject, pad?: string, crlf: boolean = true) {
  const eol = crlf ? '\r\n' : '\n'
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

    // render children
    if (obj.children) {
      // render start-tag-close
      xml += '>' + eol

      // render all children
      for (const child of obj.children) {
        xml += obj2xml(child, (pad || '') + '  ')
      }

      // render tag-close
      xml += (pad || '') + '</' + obj.tag + '>' + eol
    } else if (obj.text) {
      // render start-tag-close
      xml += '>'

      // render the text
      xml += obj.text

      // render tag-close
      xml += '</' + obj.tag + '>' + eol
    } else {
      // render mono-tag-close
      xml += '/>' + eol
    }
  }

  return xml
}
