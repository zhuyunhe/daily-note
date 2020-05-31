/* 
polyfill
*/
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (search, this_len) {
    if (this_len === undefined || this_len > this.length) {
      this_len = this.length;
    }
    return this.substring(this_len - search.length, this_len) === search;
  };
}
class ASTElement {
  /* 
    type: 'Element' | 'SelfCloseElement' | 'Text' | 'Comment'
    children: 子节点
    tag: 标签名，只有Element节点有
    text: 文本内容，只有Text、Comment节点有
    data: attrs属性数据
    parent: 父节点
  */
  constructor(type, children, tag, text, data, parent) {
    this.type = type;
    this.children = children;
    this.tag = tag;
    this.text = text;
    this.data = data;
    this.parent = parent;
  }
}
class HtmlParse {
  constructor() {
    this.startTagRe = /^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m;
    this.endTagRe = /^<\/([^>\s]+)[^>]*>/m;
    this.attrRe = /([^=|\/\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm;
    this.stack = []
    this.result = {
      children: []
    }
    this.parent = this.result
    this.stack.push(this.parent)
    this.handler = {
      startElement(sTagName, oAttrs, tag) {
        let astElement = null
        if (!tag.endsWith('/>')) {
          astElement = new ASTElement('Element', [], sTagName, '', oAttrs, this.parent)
          this.parent.children.push(astElement)
          // 如果不是自闭和标签，入栈
          this.stack.push(astElement)
          this.parent = astElement
        } else {
          astElement = new ASTElement('SelfCloseElement', [], sTagName, '', oAttrs, this.parent)
          this.parent.children.push(astElement)
        }
      },
      endElement(sTagName) {
        if (sTagName === this.parent.tag) {
          this.stack.pop()
          this.parent = this.stack[this.stack.length - 1]
        } else {
          throw new Error('闭合标签对不上，html 语法出错');
        }
      },
      // 处理文本内容
      characters(s) {
        if (this.parent.children[this.parent.children.length - 1] && this.parent.children[this.parent.children.length - 1].type === 'Text') {
          this.parent.children[this.parent.children.length - 1].text += s
        } else {
          let astElement = new ASTElement('Text', [], '', s, [], this.parent)
          this.parent.children.push(astElement)
        }
      },
      // 处理注释内容
      comment(s) {
        let astElement = new ASTElement('Comment', [], '', s, [], this.parent)
        this.parent.children.push(astElement)
      }
    }
    this.handler.startElement = this.handler.startElement.bind(this)
    this.handler.endElement = this.handler.endElement.bind(this)
    this.handler.characters = this.handler.characters.bind(this)
    this.handler.comment = this.handler.comment.bind(this)
  }
  reset() {
    this.stack = []
    this.result = {
      children: []
    }
    this.parent = this.result
    this.stack.push(this.parent)
  }
  parse(s = '') {
    if (typeof s === 'string') {
      this.reset();
      s = s.replace(/\r?\n/g, '')
      let oThis = this;
      let lm, rc, index;
      let treatAsChars = false;
      let start = null
      try {
        while (s.length > 0) {
          // Comment
          if (s.substring(0, 4) == "<!--") {
            index = s.indexOf("-->");
            if (index !== -1) {
              this.handler.comment(s.substring(4, index));
              s = s.substring(index + 3);
              treatAsChars = false;
            }
            else {
              console.log('处理文字~')
              treatAsChars = true;
            }
          }
          // end tag
          else if (s.substring(0, 2) == "</") {
            try {
              if (this.endTagRe.test(s)) {
                // lm = RegExp.lastMatch;
                // rc = RegExp.rightContext;
                start = s.match(this.endTagRe)
                lm = start[0]
                rc = s.slice(lm.length)
                lm.replace(this.endTagRe, function () {
                  return oThis.parseEndTag(...arguments);
                });
                s = rc;
                treatAsChars = false;
              }
              else {
                treatAsChars = true;
              }
            } catch (error) {
              console.log(error)
            }
          }
          // start tag
          else if (s.charAt(0) == "<") {

            if (this.startTagRe.test(s)) {

              start = s && s.match(this.startTagRe)
              lm = start[0]
              rc = s && s.slice(lm.length)
              try {
                // 提取attribute属性
                lm && lm.replace(this.startTagRe, function () {
                  return oThis.parseStartTag(...arguments);
                });
              } catch (error) {
                throw new Error(error)
              }
              s = rc;
              treatAsChars = false;
            }
            else {
              treatAsChars = true;
            }

          }
          if (treatAsChars) {
            // 文本区可能有小于、大于符号，例如<10kg，需要特殊处理，不然会死循环。index不能简单的用indexOf来求
            // index = s.indexOf("<");
            index = s.search(/<[^\s\d]/)
            // 后面已经没有任何标签了，因为不管什么标签，都要以<开头
            if (index == -1) {
              this.handler.characters(s, true);
              s = "";
            }
            // 文本区可能有小于、大于符号，例如<10kg，需要特殊处理，不然会死循环
            else {
              this.handler.characters(s.substring(0, index));
              s = s.substring(index);
            }
          }
          treatAsChars = true;
        }
      } catch (error) {
        // throw new Error(error)
        // document.querySelector('#app').innerHTML = error
      }
      // return this.toJSX(this.result.children)
      return this.result.children
    } else {
      // throw new Error('parseHtml参数类型错误~');
    }
  }
  // 测试用
  toJSX(array) {
    let jsx = array.reduce((cur, nextEle) => {
      if (nextEle.type === 'Text') {
        return cur + nextEle.text
      }
      if (nextEle.type === 'Element') {
        let attr = nextEle.data.map(item => {
          return `${item.name}="${item.value}" `
        })
        // console.log(attr.join(" "))
        return cur + `<${nextEle.tag} ${attr.join(" ").trim()}>${nextEle.text}${this.toJSX(nextEle.children)}</${nextEle.tag}>`
      }
      if (nextEle.type === 'Comment') {
        return cur + `<!-- ${nextEle.text} -->`
      }
    }, '')
    return jsx
  }
  // 处理开始标签
  parseStartTag(sTag, sTagName, sRest) {
    var attrs = this.parseAttributes(sTagName, sRest);
    this.handler.startElement(sTagName, attrs, sTag);
  }
  // 处理结束标签
  parseEndTag(sTag, sTagName) {
    this.handler.endElement(sTagName);
  }
  // 解析属性
  parseAttributes(sTagName, s) {
    let oThis = this;
    let attrs = [];
    try {
      s && s.replace(this.attrRe, function (a0, a1, a2, a3, a4, a5, a6) {
        attrs.push(oThis.parseAttribute(sTagName, a0, a1, a2, a3, a4, a5, a6));
      });
    } catch (error) {
      console.log(error)
    }
    return attrs;
  }
  // 解析单个属性
  parseAttribute(sTagName, sAttribute, sName) {
    var value = "";
    if (arguments[7])
      value = arguments[8];
    else if (arguments[5])
      value = arguments[6];
    else if (arguments[3])
      value = arguments[4];
    var empty = !value && !arguments[3];
    return { name: sName, value: empty ? null : value };
  }
}

const activityContent = `
        <div>
            <table width="100%" cellpadding="0" cellspacing="0" class="detail-table">
                <tbody>
                            <tr>
                                <td>狗狗精致洗护（<10kg）</td>
                                <td class="tc">1</td>
                                <td class="tc">70元</td>
                            </tr>
                            <tr>
                                <td>猫猫精致洗护（<5kg）</td>
                                <td class="tc">1</td>
                                <td class="tc">120元</td>
                            </tr>
                </tbody>
            </table>
                <div>适用宠物: 狗狗、猫咪</div>
        </div>
`
const htmlParse = new HtmlParse()
htmlParse.parse(activityContent)
module.exports = HtmlParse