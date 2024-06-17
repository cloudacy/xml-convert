export interface XMLObject {
  tag: string
  attrs?: { [attr: string]: string | number }
  content?: string | XMLObject[]
}

function _obj2xml(
  obj: XMLObject,
  options: { eol: string; selfClosingTags?: boolean; padding?: string }
) {
  if (!obj.tag) {
    return ''
  }

  let xml = ''

  // render tag-start
  xml += (options?.padding || '') + '<' + obj.tag

  // render tag attributes
  if (obj.attrs) {
    for (const attr in obj.attrs) {
      const value = obj.attrs[attr].toString().replace(/"/g, '\\"')
      xml += ` ${attr}="${value}"`
    }
  }

  const endTag = `</${obj.tag}>`

  // render content
  if (obj.content) {
    if (typeof obj.content === 'string') {
      // render start-tag-close
      xml += '>'

      // render the text
      xml += obj.content

      // render tag-close
      xml += endTag + options.eol
    } else {
      // render start-tag-close
      xml += '>' + options.eol

      // render all children
      for (const child of obj.content) {
        xml += _obj2xml(child, {
          ...options,
          padding: (options.padding ?? '') + '  ',
        })
      }

      // render tag-close
      xml += (options?.padding || '') + endTag + options.eol
    }
  } else {
    if (options?.selfClosingTags !== false) {
      // render mono-tag-close
      xml += '/>' + options.eol
    } else {
      // close start tag
      xml += '>'

      // add end tag
      xml += endTag + options.eol
    }
  }

  return xml
}

export function obj2xml(
  obj: XMLObject,
  options?: { selfClosingTags?: boolean; crlf?: boolean }
) {
  const eol = options?.crlf !== false ? '\r\n' : '\n'
  const xmlHeader = '<?xml version="1.0" encoding="utf-8"?>' + eol

  return xmlHeader + _obj2xml(obj, { ...options, eol })
}
