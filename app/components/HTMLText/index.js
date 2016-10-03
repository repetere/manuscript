import parse5 from 'parse5';

import React, { Component } from 'react';
import { StyleSheet, Text, View,  Image, Platform, Dimensions } from 'react-native';
var BLOCK_ELEMENTS = ["blockquote", "div", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "ol", "p", "pre", "ul", "li"]

var INLINE_ELEMENTS = ["b", "code", "i", "em", "strong", "a", "br", "q", "span", "sub", "sup","img"]

var DEFAULT_STYLES = StyleSheet.create({
  a: {

  },
  b: {
    fontWeight: 'bold'
  },
  blockquote: {
    paddingLeft: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#cccccc',
    marginBottom: 12
  },
  br: {

  },
  code: {
    fontFamily: "Courier"
  },
  div: {

  },
  em: {
    fontStyle: 'italic'
  },
  h1: {
    fontWeight: 'bold',
  },
  h2: {
    fontWeight: 'bold',
  },
  h3: {
    fontWeight: 'bold',
  },
  h4: {
    fontWeight: 'bold',
  },
  h5: {
    fontWeight: 'bold',
  },
  h6: {
    fontWeight: 'bold',
  },
  i: {
    fontStyle: 'italic'
  },
  img: {
    marginBottom: 6,
    flex:1,
  },
  p: {
    marginBottom: 12,
  },
  pre: {

  },
  strong: {
    fontWeight: 'bold'
  },
  q: {

  },
  span: {

  },
  sub: {

  },
  sup: {

  },
  ol:{
    marginLeft: 24,
  },
  ul: {
    marginLeft: 24,
  },
  default: {

  }
});

function isText(tagName) : Boolean {
  return tagName === "#text"
}

function isBlockElement(tagName) : Boolean {
  return BLOCK_ELEMENTS.indexOf(tagName) != -1
}

function isInlineElement(tagName) : Boolean {
  return INLINE_ELEMENTS.indexOf(tagName) != -1
}

function isEmpty(node) : Boolean {
  return node.value.trim() == ""
}

function styleForTag(tagName) {
  var style = DEFAULT_STYLES[tagName] ? DEFAULT_STYLES[tagName] : DEFAULT_STYLES["default"]
  return style
}

function processNode(node, parentKey, htmlProps,width,height) {
  let nodeName = node.nodeName
  let src = (node.attrs) ? node.attrs.filter((attr) => attr.name === 'src')[ 0 ] : false;

  if (isText(nodeName)) {
    if (isEmpty(node)) {
      return null
    }

    var key = `${parentKey}_text`
    return (<Text key={key}>{node.value}</Text>)
  }

  if (isInlineElement(nodeName) && src && src.value) {
    let key = `${parentKey}_${nodeName}`;
    let imageUri = src.value;
    let imageStyle = htmlProps.imageStyle || {width, height:height/2.5 }; 
    // console.log({imageUri})
    let defaultImageStyle = styleForTag(nodeName);
    let styleForImage =  {
      style: Object.assign(defaultImageStyle,imageStyle)
    };
    // console.log({ styleForImage });
    return (<Image key={key} source={{ uri: imageUri }} {...styleForImage} resizeMode="cover"  >{children}</Image>)
  }  
  if (isInlineElement(nodeName)) {
    var key = `${parentKey}_${nodeName}`
    var children = []
    node.childNodes.forEach((childNode, index) => {
      if (isInlineElement(childNode.nodeName) || isText(childNode.nodeName)) {
        children.push(processNode(childNode, `${key}_${index}`))
      } else {
        console.error(`Inline element ${nodeName} can only have inline children, ${child} is invalid!`)
      }
    })
 
    return (<Text key={key} style={styleForTag(nodeName)}>{children}</Text>)
  }

  if (isBlockElement(nodeName)) {
    var key = `${parentKey}_${nodeName}`
    var children = []
    var lastInlineNodes = []

    node.childNodes.forEach((childNode, index) => {
      var child = processNode(childNode, `${key}_${index}`)
      if (isInlineElement(childNode.nodeName) || isText(childNode.nodeName)) {
        lastInlineNodes.push(child)

      } else if (isBlockElement(childNode.nodeName)) {
        if (lastInlineNodes.length > 0) {
          children.push(<Text key={`${key}_${index}_inline`}>{lastInlineNodes}</Text>)  
          lastInlineNodes = []
        }
        children.push(child)
      }
    })

    if (lastInlineNodes.length > 0) {
      children.push((<Text key={`${key}_last_inline`}>{lastInlineNodes}</Text>))  
    }
    return (
      <View key={key} style={styleForTag(nodeName)}>
        {children}
      </View>
    )
  }

  console.warn(`unsupported node: ${nodeName}`)
  return null;
}

class HtmlText extends Component {
  parse(html) {
    var parser = new parse5.Parser()
    var fragment = parser.parseFragment(html)
    // console.log({ fragment });
    return fragment;
    /*
    //parse5 >2
    var fragment = parse5.parse(html)
    return fragment.childNodes[ 0 ].childNodes[ 1 ];//fragment(html)[head,body][1]{body}
    */
  }


  render() {
    let {width, height} = Dimensions.get('window');
    var html = this.props.html
    var fragment = this.parse(html)
    var rootKey = "ht_"

    var children = []
    fragment.childNodes.forEach((node, index) => {
      children.push(processNode(node, `${rootKey}_${index}`,this.props,width,height))
    })

    // console.log(children)
    return (
      <View style={this.props.style}>
        {children}
      </View>
    )
  }
}

export default HtmlText;