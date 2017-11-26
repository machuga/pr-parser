const treeBuilder = require('./treeBuilder');
const headerRegex = /^(#+)\s+(.*)/;

/*
  Start at highest level section specified
  Split sections out
  Recurse
  Split sections out
  Recurse

  Line: { content: '', original: 42 }
  Document
  Section
  {
 title: 'Something',
 description: 'Block of text inside of heading without nested headers',
 lines: [Line|Section],
 subsections:
 headingLevel: 2
  }

  D -> S[1,2,2,1,2,3,2,3,3] =>
   S
  [1,      1]
[ 2, 2 ] [2,     2]
       [ 3 ]    [3, 3]
*/

const Line = (line, originalLineNumber) => {
  const content = line.trim() || '';

  return {
    content,
    original: originalLineNumber,
    toString: () => content
  };
};

const Header = (title, level, original) => ({ title, level, original, toString: () => `${"#".repeat(level)} ${title}` });

const Section = ([headerLine, ...lines]) => {
  const header = headerFromLine(headerLine);
  const body = lines.join('\n').trim();

  return {
    lines,
    header,
    body,
    title: header.title,
    subsections: [],
    toString: _ => [header.toString(), body]
  };
};

const headerFromLine = (line) => {
  const [_, typeSection, title] = line.content.match(headerRegex);

  return Header(title, typeSection.length, line.original);
};

const sliceSectionFromLines = (lines) => ([start, end]) => lines.slice(start, end);

const parseBody = (content, highest = 2, selections = null) => {
  const lines = content.split('\n').map(Line);
  const headerLines = lines.filter(isHeader);
  const headerLineNumbers = headerLines.map(line => line.original);
  const sections = headerLineNumbers.map((startLineNumber, index, arr) => {
    if (index === arr.length - 1) {
      // Last index case (no sections below)
      return [startLineNumber];
    }

    return [startLineNumber, arr[index + 1]];
  }).map(sliceSectionFromLines(lines)).map(Section);

  return sections;
};


// Function needs to find a block, look for next block of same level, stop at line before

const isHeader = (line) => headerRegex.test(line.content);
const header = (line) => {
  const [_, typeLine, title] = line.content.match(headerRegex);

  return { title, level: typeLine.length };
};

const parseSection = () => {
  return {
    title: 'Something',
    body: 'Very important\n\nStuff',
    headingLevel: 2
  };
};

module.exports = { parseBody };
