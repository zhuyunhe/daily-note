"use strict";
exports.__esModule = true;
var START_TAG_REG = /^<([^<>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m;
var END_TAG_REG = /^<\/([^>\s]+)[^>]*>/m;
var ATTRIBUTE_REG = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm;
var ASTElement = /** @class */ (function () {
    function ASTElement(type, children, tag, text, data, parent) {
        this.type = type;
        this.children = children;
        this.tag = tag;
        this.text = text;
        this.data = data;
        this.parent = parent;
    }
    return ASTElement;
}());
exports.ASTElement = ASTElement;
function parse(source) {
    var result = {
        children: []
    };
    var stack = [];
    var parent = null;
    stack.push(result);
    parent = result;
    var _loop_1 = function () {
        if (source.startsWith('<!--')) {
            var endIndex = source.indexOf('-->');
            if (endIndex !== -1) {
                parent.children.push(new ASTElement('Comment', [], '', source.substring(4, endIndex), {}, parent));
                source = source.substring(endIndex + 3);
                return "continue";
            }
        }
        // 判断是否是结束标签
        else if (source.startsWith('</') && END_TAG_REG.test(source)) {
            var left = RegExp.leftContext;
            var tag = RegExp.lastMatch;
            var right = RegExp.rightContext;
            //console.log(`发现闭合标签 ${tag}`)
            var result_1 = tag.match(END_TAG_REG);
            var name_1 = result_1[1];
            if (name_1 === parent.tag) {
                stack.pop();
                parent = stack[stack.length - 1];
                // console.log('闭合，出栈')
            }
            else {
                throw new Error('闭合标签对不上，html 语法出错');
            }
            source = right;
            return "continue";
        }
        // 判断是否是开始标签
        else if (source.charAt(0) === '<' && START_TAG_REG.test(source)) {
            var left = RegExp.leftContext;
            var tag = RegExp.lastMatch;
            var right = RegExp.rightContext;
            var result_2 = tag.match(START_TAG_REG);
            var tagName = result_2[1];
            var attrs = result_2[2];
            var attrMap_1 = {};
            var nodeData = {
                attrs: {},
                events: {},
                directives: {},
                rawAttrs: {}
            };
            // 抽取 attributes
            if (attrs) {
                attrs.replace(ATTRIBUTE_REG, function (a0, a1, a2, a3, a4, a5, a6) {
                    var attrName = a1;
                    var attrValue = a3 || null;
                    if (attrValue && attrValue.startsWith('"') && attrValue.endsWith('"')) {
                        attrMap_1[attrName] = attrValue.slice(1, attrValue.length - 1);
                    }
                    else if (attrValue && attrValue.startsWith("'") && attrValue.endsWith("'")) {
                        attrMap_1[attrName] = attrValue.slice(1, attrValue.length - 1);
                    }
                    else {
                        attrMap_1[attrName] = attrValue;
                    }
                    return '';
                });
            }
            processAttrs(nodeData, attrMap_1);
            // console.log(`发现元素节点${tag}`)
            var element = new ASTElement('Element', [], tagName, '', nodeData, parent);
            parent.children.push(element);
            // 如果不是自闭合 tag，入栈
            if (!tag.endsWith('/>')) {
                stack.push(element);
                parent = element;
            }
            source = right;
            return "continue";
        }
        // 处理文字
        var index = source.indexOf('<', 1);
        if (index == -1) {
            if (parent.children[parent.children.length - 1] && parent.children[parent.children.length - 1].type === 'Text') {
                parent.children[parent.children.length - 1].text += source;
            }
            else {
                parent.children.push(new ASTElement('Text', [], '', source, {}, parent));
            }
            source = '';
        }
        else {
            if (parent.children[parent.children.length - 1] && parent.children[parent.children.length - 1].type === 'Text') {
                parent.children[parent.children.length - 1].text += source.substring(0, index);
            }
            else {
                parent.children.push(new ASTElement('Text', [], '', source.substring(0, index), {}, parent));
            }
            source = source.substring(index);
        }
    };
    while (source.length > 0) {
        _loop_1();
    }
    return result.children;
}
exports["default"] = parse;
// 处理 attr，解析出 key ref 指令 事件等
function processAttrs(nodeData, attrMap) {
    Object.keys(attrMap).forEach(function (k) {
        if (k === ':key') {
            nodeData.key = attrMap[k];
        }
        else if (k === 'key') {
            nodeData.key = '`' + attrMap[k] + '`';
        }
        else if (k === 'ref') {
            nodeData.ref = attrMap[k];
        }
        else if (k.startsWith('v-')) {
            if (k.slice(2, 5) === 'on:') {
                nodeData.events[k.slice(5)] = attrMap[k];
            }
            else {
                nodeData.directives[k.slice(2)] = attrMap[k];
            }
        }
        else {
            nodeData.attrs[k] = attrMap[k];
        }
    });
    nodeData.rawAttrs = attrMap;
}
