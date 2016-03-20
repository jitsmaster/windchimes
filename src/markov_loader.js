'use strict';

// http://www.soliantconsulting.com/blog/2013/02/title-generator-using-markov-chains

function getSentences(str) {
  return str.split(/(\n\n)|\.|\?/g)
    .filter(s => s && s.match(/\w+/))
}

module.exports = function(source) {
  this.cacheable();

  const stats = {
    terminals: {},
    startWords: [],
    wordStats: {}
  };

  for (const sentence of getSentences(source)) {
    var words = sentence.split(/\s+/)
      .map(w => w.replace(/^\W+/, '').replace(/\W+$/, '').toLowerCase())
      .filter(w => w && w.length);
    stats.terminals[words[words.length-1]] = true;
    stats.startWords.push(words[0]);
    for (let i = 0; i < words.length - 1; i++) {
      if (stats.wordStats.hasOwnProperty(words[i])) {
        stats.wordStats[words[i]].push(words[i+1]);
      } else {
        stats.wordStats[words[i]] = [words[i+1]];
      }
    }
  }

  return `module.exports = ${JSON.stringify(stats)};`
}
