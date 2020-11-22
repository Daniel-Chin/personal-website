const SORT = {
  PRIDE: 'PRIDE', 
  YEAR_A: 'YEAR_A', 
  YEAR_D: 'YEAR_D', 
};

const sortProjects = (projects, method) => {
  return projects;
};

const summarizeTags = (projects) => {
  const tag_summary = [];
  const lookup = {};
  for (const p of projects) {
    for (const tag of p.tags) {
      const id = lookup[tag];
      if (id === undefined) {
        lookup[tag] = tag_summary.length;
        tag_summary.push({
          tag, 
          occurance: 1, 
        });
      } else {
        tag_summary[id].occurance ++;
        // if (tag_summary[id].tag !== tag) {
        //   console.error('666');
        // }
      }
    }
  }
  tag_summary.sort((a, b) => (b.occurance - a.occurance));
  return tag_summary;
};

export {
  SORT, sortProjects, summarizeTags, 
};
