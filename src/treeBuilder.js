const pairsForSlicing = (list) => {
  if (!list) {
    // Log
    return [];
  }

  const length = list.length;

  return list.reduce((listOfPairs, current, i) => {
    const nextIndex = i+1;

    if (length > nextIndex) {
      listOfPairs.push([current, list[nextIndex]]);
    } else {
      listOfPairs.push([current]);
    }

    return listOfPairs;
  }, []);
};


// Document | Section -> [Section] -> Document

/*
fn findNodesAtLevel(level)
fn findIndicesForNodes(nodes, sections)
fn pairsForSlicing(indices)
fn recurse(nodes, level + 1)

  */

const findNodesAtLevel1 = (level, sections) => {
  return sections
    .map((section, i) => [i, section])
    .filter(([_, section]) => section.level == nextLevel)
    .map(([i, _]) => i);
};

const findNodesAtLevel = (level, sections) => sections.filter(section => section.level == level);
const findIndicesForNodes = (nodes, sections) => nodes.map(node => sections.indexOf(node));
const getSectionAndChildren = (pairs, sections) => (
  pairs
    .map(([start, end = undefined]) => sections.slice(start, end))
    .map(([newRoot, ...subsections]) => [newRoot, subsections])
);

const buildTreeForList = ([root, subsections = []]) => {
  // Do transformations
  root.children = buildTreeForList(subsections);
}

const createTreeFromSectionList = (document, sections) => {
  const createSubsectionTree = (root, sections, level = 0) => {
    const nextLevel = level + 1;
    const indices = sections
          .map((section, i) => [i, section])
          .filter(([_, section]) => section.level == nextLevel)
          .map(([i, _]) => i);

    if (indices.length == 0) return [];

    const indexPairs = pairsForSlicing(indices);

    return indexPairs
      .map(([start, end = undefined]) => sections.slice(start, end))
      .map(([newRoot, subsections = []]) => {
        newRoot.sections = createSubsectionTree(newRoot, subsections);

        return newRoot;
      });
  };
};

module.exports = {
  pairsForSlicing
};
