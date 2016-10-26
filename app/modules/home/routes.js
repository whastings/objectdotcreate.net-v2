import { HomePage } from './components';
import { loadHomePage } from './actions';
import { getPage } from 'pages/selectors';
import { loadPosts } from 'posts/actions';
import { getPosts } from 'posts/selectors';
import { withLoader } from 'app/utils/routeUtils';

export default {
  index: withLoader(function index(req, res, getState) {
    return Promise.all([res.dispatch(loadHomePage()), res.dispatch(loadPosts())])
      .then(() => {
        let state = getState();
        res.render(HomePage, {
          content: getPage(state, 'home').content,
          posts: getPosts(state)
        });
      })
      .catch(res.handleError);
  })
};
