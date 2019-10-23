const START_TAG_REG = /^<([^<>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m
const END_TAG_REG = /^<\/([^>\s]+)[^>]*>/m
const ATTRIBUTE_REG = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm
type ASTRoot = ASTElement[]

declare var RegExp

export interface ASTElement {
  // 将元素分为 Element、Text、Comment 三种节点
  type: 'Element' | 'Text' | 'Comment',
  children: ASTElement[],
  // 标签名
  tag: string,
  // 文本内容，Text、Comment 节点有，Element 节点为空
  text: string,
  // 解析后的 attrs 数据
  data: ASTElementData | null,
  parent: ASTElement | ASTRoot
}
interface ASTElementData {
  key?: string,
  ref?: string,
  // 存放 v-on:click 这种事件
  events?: {
    [key: string]: any
  },
  // 存放原生 attrs
  attrs?: {
    [key: string]: any
  },
  // 存放全部 attrs
  rawAttrs?: {
    [key: string]: any
  },
  // 存放 v-if 这种指令
  directives?: {
    [key: string]: any
  }
}
type parse = (html: string) => ASTRoot

export class ASTElement {
  type: 'Element' | 'Text' | 'Comment'
  children: ASTElement[]
  // 标签名
  tag: string
  // 文本内容，Text、Comment 节点有，Element 节点为空
  text: string
  // 解析后的 attrs 数据
  data: ASTElementData | null
  parent: ASTElement | ASTRoot
  constructor(
    type: 'Element' | 'Text' | 'Comment',
    children: ASTElement[],
    tag: string,
    text: string,
    data: ASTElementData | null,
    parent: ASTElement | ASTRoot
  ) {
    this.type = type
    this.children = children
    this.tag = tag
    this.text = text
    this.data = data
    this.parent = parent
  }
}

export default function parse(source: string): ASTElement[] {
  let result = {
    children: []
  }
  let stack = []
  let parent: any = null
  stack.push(result)
  parent = result

  while(source.length > 0){
    if(source.startsWith('<!--')){
      let endIndex = source.indexOf('-->')
      if(endIndex !== -1){
        parent.children.push(new ASTElement('Comment', [], '', source.substring(4,endIndex), {}, parent))
        source = source.substring(endIndex + 3)
        continue
      }
    }
    // 判断是否是结束标签
    else if(source.startsWith('</') && END_TAG_REG.test(source)) {
      let left = RegExp.leftContext
      let tag = RegExp.lastMatch
      let right = RegExp.rightContext
      //console.log(`发现闭合标签 ${tag}`)
      let result = tag.match(END_TAG_REG)
      let name = result[1]
      if (name === parent.tag) {
        stack.pop()
        parent = stack[stack.length - 1]
        // console.log('闭合，出栈')
      } else {
        throw new Error('闭合标签对不上，html 语法出错')
      }
      source = right
      continue
    }
    // 判断是否是开始标签
    else if(source.charAt(0) === '<' && START_TAG_REG.test(source)){
      let left = RegExp.leftContext
      let tag = RegExp.lastMatch
      let right = RegExp.rightContext
      let result = tag.match(START_TAG_REG)
      let tagName = result[1]
      let attrs = result[2]
      let attrMap = {}
      let nodeData: ASTElementData = {
        attrs: {},
        events: {},
        directives: {},
        rawAttrs: {}
      }
      // 抽取 attributes
      if (attrs) {
        attrs.replace(ATTRIBUTE_REG, (a0, a1, a2, a3, a4, a5, a6) => {
          let attrName = a1
          let attrValue = a3 || null
          if (attrValue && attrValue.startsWith('"') && attrValue.endsWith('"')) {
            attrMap[attrName] = attrValue.slice(1, attrValue.length - 1)
          } else if (attrValue && attrValue.startsWith("'") && attrValue.endsWith("'")) {
            attrMap[attrName] = attrValue.slice(1, attrValue.length - 1)
          } else {
            attrMap[attrName] = attrValue
          }
          return ''
        })
      }
      processAttrs(nodeData, attrMap)
      // console.log(`发现元素节点${tag}`)
      let element = new ASTElement('Element', [], tagName, '', nodeData, parent)
      parent.children.push(element)
      // 如果不是自闭合 tag，入栈
      if (!tag.endsWith('/>')) {
        stack.push(element)
        parent = element
      }
      source = right
      continue
    }
    // 处理文字
    let index = source.indexOf('<', 1)
    if (index == -1) {
      if (parent.children[parent.children.length - 1] && parent.children[parent.children.length - 1].type === 'Text') {
        parent.children[parent.children.length - 1].text += source
      } else {
        parent.children.push(new ASTElement('Text', [], '', source, {}, parent))
      }
      source = ''
    } else {
      if (parent.children[parent.children.length - 1] && parent.children[parent.children.length - 1].type === 'Text') {
        parent.children[parent.children.length - 1].text += source.substring(0, index)
      } else {
        parent.children.push(new ASTElement('Text', [], '', source.substring(0, index), {}, parent))
      }
      source = source.substring(index)
    }
  }

  return result.children
}

// 处理 attr，解析出 key ref 指令 事件等
function processAttrs(nodeData, attrMap) {
  Object.keys(attrMap).forEach(k => {
    if (k === ':key') {
      nodeData.key = attrMap[k]
    } else if (k === 'key') {
      nodeData.key = '`' + attrMap[k] + '`'
    } else if (k === 'ref') {
      nodeData.ref = attrMap[k]
    } else if (k.startsWith('v-')) {
      if (k.slice(2, 5) === 'on:') {
        nodeData.events[k.slice(5)] = attrMap[k]
      } else {
        nodeData.directives[k.slice(2)] = attrMap[k]
      }
    } else {
      nodeData.attrs[k] = attrMap[k]
    }
  })
  nodeData.rawAttrs = attrMap
}