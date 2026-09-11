// Copyright 2014 Simon Lydell
// Copyright 2026 CodeRevive contributors
// X11 (“MIT”) Licensed. (See LICENSE.)

void (function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory)
  } else if (typeof exports === "object") {
    module.exports = factory()
  } else {
    root.sourceMappingURL = factory()
  }
}(this, function() {

  var innerRegex = /[#@] sourceMappingURL=([^\s'"]*)/

  var regex = RegExp(
    "(?:" +
      "/\\*" +
      "(?:\\s*\r?\n(?://)?)?" +
      "(?:" + innerRegex.source + ")" +
      "\\s*" +
      "\\*/" +
      "|" +
      "//(?:" + innerRegex.source + ")" +
    ")" +
    "\\s*"
  )

  var anchoredRegex = RegExp("^(?:" + regex.source + ")")

  // Find comments without mistaking comment-like text inside quoted strings
  // or template literals for a real sourceMappingURL comment.
  function commentRanges(code) {
    var ranges = []
    var index = 0

    while (index < code.length) {
      var character = code.charAt(index)
      var next = code.charAt(index + 1)

      if (character === "'" || character === '"' || character === "`") {
        var quote = character
        index += 1

        while (index < code.length) {
          if (code.charAt(index) === "\\") {
            index += 2
          } else if (code.charAt(index) === quote) {
            index += 1
            break
          } else {
            index += 1
          }
        }
      } else if (character === "/" && next === "/") {
        var lineStart = index
        index += 2

        while (index < code.length && code.charAt(index) !== "\n" &&
            code.charAt(index) !== "\r") {
          index += 1
        }

        ranges.push([lineStart, index])
      } else if (character === "/" && next === "*") {
        var blockStart = index
        index += 2

        while (index < code.length && !(code.charAt(index) === "*" &&
            code.charAt(index + 1) === "/")) {
          index += 1
        }

        if (index < code.length) {
          index += 2
        }

        ranges.push([blockStart, index])
      } else {
        index += 1
      }
    }

    return ranges
  }

  function findMatch(code) {
    var ranges = commentRanges(code)

    for (var index = 0; index < ranges.length; index += 1) {
      var range = ranges[index]
      var localMatch = code.slice(range[0], range[1]).match(regex)

      if (localMatch) {
        var matchIndex = range[0] + localMatch.index
        var match = anchoredRegex.exec(code.slice(matchIndex))

        return {
          index: matchIndex,
          value: match[0],
          url: match[1] || match[2] || ""
        }
      }
    }

    return null
  }

  return {

    regex: regex,
    _innerRegex: innerRegex,

    getFrom: function(code) {
      var match = findMatch(code)
      return (match ? match.url : null)
    },

    existsIn: function(code) {
      return findMatch(code) !== null
    },

    removeFrom: function(code) {
      var match = findMatch(code)
      return (match ?
        code.slice(0, match.index) + code.slice(match.index + match.value.length) :
        code)
    },

    insertBefore: function(code, string) {
      var match = findMatch(code)
      if (match) {
        return code.slice(0, match.index) + string + code.slice(match.index)
      } else {
        return code + string
      }
    }
  }

}));
