import co from 'co';
import loadHtml from 'server/utils/loadHtml';
import loadJson from 'server/utils/loadJson';
import { flatten } from '@whastings/js_utils';

export default {
  getProjectsPage: co.wrap(function* loadProjectsPage() {
    let projectData = yield loadJson('projects.json');

    yield Promise.all(flatten(
      projectData.map((category) => category.projects.map((project) => {
        return loadHtml(`projects/${category.key}/${project.key}.html`)
          .then((content) => project.description = content.toString());
      }))
    ));

    return {categories: projectData, id: 'projects'};
  })
};
