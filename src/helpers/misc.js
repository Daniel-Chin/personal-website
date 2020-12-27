const SORT = {
  PRIDE: 'Pride', 
  YEAR_D: 'Year, from recent to old', 
  YEAR_A: 'Year, from old to recent', 
};

const sortProjects = (projects, method) => {
  const sortPride = () => {
    projects.sort((a, b) => (b.pride - a.pride));
  }
  const sortYear = (direction) => {
    projects.sort((a, b) => ((b.year - a.year) * direction));
  }
  switch (method) {
    case SORT.PRIDE:
      sortYear(1);
      sortPride();
      break;
    case SORT.YEAR_D:
      sortPride();
      sortYear(1);
      break;
    case SORT.YEAR_A:
      sortPride();
      sortYear(-1);
      break;
    default:
      console.error('ERROR 73429864301');
  }
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

const resolveInternalUri = (uri, context) => (
  `/heavy/${context}/${uri}`
);

const blogId2Url = (blog_id) => (
  '/blog/' + blog_id
);

export {
  SORT, sortProjects, summarizeTags, resolveInternalUri, 
  blogId2Url, 
};
