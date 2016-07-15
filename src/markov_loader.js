'use strict';

// http://www.soliantconsulting.com/blog/2013/02/title-generator-using-markov-chains

function getSentences(str) {
  return str.split(/(\n\n)|\.|\?/g)
    .filter(function (s) { return s && s.match(/\w+/); });
}

module.exports = function (source) {
  this.cacheable();

  var wordStats = new Map();

  for (sentence of getSentences(source)) {
    var words = sentence.split(/\s+/)
      .map(function (w) {
        return w.replace(/^\W+/, '').replace(/\W+$/, '').toLowerCase();
      })
      .filter(function (w) { return w && w.length; });
    for (var i = 0; i < words.length - 2; i++) {
      var key = [words[i], words[i + 1]];
      var nxt = words[i + 2];

      if (wordStats.has(key)) {
        wordStats.get(key).push(nxt);
      } else {
        wordStats.set(key, [nxt]);
      }
    }
  }

  var output = "module.exports = ${" + JSON.stringify(Array.from(wordStats.entries())) + "}";

  console.write(output);

  return output;
}
