// Copyright 2014 Simon Lydell
// Copyright 2026 CodeRevive contributors
// X11 (“MIT”) Licensed. (See LICENSE.)

"use strict"

var assert = require("node:assert/strict")
var describe = require("node:test").describe
var it = require("node:test").it

var sourceMappingURL = require("../")

var comments = {
  universal: "/*# sourceMappingURL=foo.js.map */",
  js: "//# sourceMappingURL=foo.js.map",
  block: "/*\n# sourceMappingURL=foo.js.map\n*/",
  mix: "/*\n//# sourceMappingURL=foo.js.map\n*/"
}

function eachComment(callback) {
  Object.keys(comments).forEach(function(name) {
    callback(comments[name], name + " syntax")
    callback(comments[name].replace(/\n/g, "\r\n"), name + " syntax with CRLF")
  })
}

describe("sourceMappingURL", function() {
  describe("getFrom", function() {
    eachComment(function(comment, description) {
      it("reads " + description, function() {
        assert.equal(sourceMappingURL.getFrom("code\n" + comment), "foo.js.map")
        assert.equal(sourceMappingURL.getFrom(comment), "foo.js.map")
      })
    })

    it("returns null when there is no comment", function() {
      assert.equal(sourceMappingURL.getFrom("code"), null)
    })

    it("returns an empty URL", function() {
      assert.equal(sourceMappingURL.getFrom("/*# sourceMappingURL= */"), "")
    })

    it("does not read comment-like text from quoted strings", function() {
      assert.equal(sourceMappingURL.getFrom(
        "var a = '\/\/# sourceMappingURL=single.map';\n" +
        "var b = \"//# sourceMappingURL=double.map\";\n" +
        "var c = `//# sourceMappingURL=template.map`;"
      ), null)
    })

    it("finds a real comment after comment-like string contents", function() {
      assert.equal(sourceMappingURL.getFrom(
        "var text = \"//# sourceMappingURL=not-a-comment.map\";\n" +
        "//# sourceMappingURL=real.map"
      ), "real.map")
    })

    it("is detachable", function() {
      var get = sourceMappingURL.getFrom
      assert.equal(get("/*# sourceMappingURL=foo */"), "foo")
    })
  })

  describe("existsIn", function() {
    eachComment(function(comment, description) {
      it("detects " + description, function() {
        assert.equal(sourceMappingURL.existsIn("code\n" + comment), true)
      })
    })

    it("returns false for comment-like text inside a string", function() {
      assert.equal(sourceMappingURL.existsIn(
        "console.log(\"//# sourceMappingURL=index.js.map\")"
      ), false)
    })

    it("is detachable", function() {
      var has = sourceMappingURL.existsIn
      assert.equal(has("/*# sourceMappingURL=foo */"), true)
    })
  })

  describe("removeFrom", function() {
    eachComment(function(comment, description) {
      it("removes " + description, function() {
        assert.equal(sourceMappingURL.removeFrom("code" + comment), "code")
        assert.equal(sourceMappingURL.removeFrom(comment), "")
      })
    })

    it("retains surrounding block-comment content", function() {
      assert.equal(sourceMappingURL.removeFrom(
        "/*! Library Name v1.0.0\n//# sourceMappingURL=foo.js.map\n*/\ncode"
      ), "/*! Library Name v1.0.0\n*/\ncode")
    })

    it("does not alter comment-like text inside a string", function() {
      var code = "console.log(\"//# sourceMappingURL=index.js.map\")"
      assert.equal(sourceMappingURL.removeFrom(code), code)
    })

    it("is detachable", function() {
      var remove = sourceMappingURL.removeFrom
      assert.equal(remove("/*# sourceMappingURL=foo */"), "")
    })
  })

  describe("insertBefore", function() {
    eachComment(function(comment, description) {
      it("inserts before " + description, function() {
        assert.equal(
          sourceMappingURL.insertBefore("code\n" + comment, "more code\n"),
          "code\nmore code\n" + comment
        )
      })
    })

    it("appends when only a string contains comment-like text", function() {
      var code = "var value = \"//# sourceMappingURL=not-a-comment.map\";"
      assert.equal(sourceMappingURL.insertBefore(code, "\nmore code"),
        code + "\nmore code")
    })

    it("is detachable", function() {
      var insertBefore = sourceMappingURL.insertBefore
      assert.equal(insertBefore("/*# sourceMappingURL=foo */", "bar"),
        "bar/*# sourceMappingURL=foo */")
    })
  })

  describe("regex", function() {
    it("includes _innerRegex", function() {
      assert.equal(sourceMappingURL.regex.source.includes(
        sourceMappingURL._innerRegex.source
      ), true)
    })

    it("matches both modern and legacy annotations", function() {
      assert.match("//# sourceMappingURL=foo", sourceMappingURL.regex)
      assert.match("/*@ sourceMappingURL=foo */", sourceMappingURL.regex)
    })

    it("requires the established comment spacing", function() {
      assert.doesNotMatch("// # sourceMappingURL=foo", sourceMappingURL.regex)
      assert.doesNotMatch("/* # sourceMappingURL=foo */", sourceMappingURL.regex)
    })
  })
})
