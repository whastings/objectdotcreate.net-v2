import './styles.scss';
import { AdminIndexPage, EditPostPage, NewPostPage, SignInPage } from './components';
import { signIn, signOut } from './actions';
import {
  createPost, deletePost, loadPost, loadPosts, updatePost
} from 'posts/actions';
import { getPost } from 'posts/selectors';

export default {
  index(req, res) {
    res.dispatch(loadPosts({includeUnpublished: true}))
      .then(() => res.render(AdminIndexPage, {
        onPostDelete: handlePostDelete.bind(null, res),
        onSignOut: handleSignOut.bind(null, res)
      }))
      .catch(console.log.bind(console));
  },

  newPost(req, res) {
    res.render(NewPostPage, {
      onFormSubmit: handlePostCreate.bind(null, res),
      onSignOut: handleSignOut.bind(null, res)
    });
  },

  editPost(req, res, getState) {
    let permalink = req.params.post;

    res.dispatch(loadPost(permalink, {editable: true}))
      .then(() => {
        let post = getPost(getState(), permalink);
        res.render(
          EditPostPage,
          {
            post,
            onFormSubmit: handlePostEdit.bind(null, res),
            onSignOut: handleSignOut.bind(null, res)
          }
        );
      })
      .catch(console.log.bind(console));
  },

  signIn(req, res) {
    res.render(SignInPage, {
      onSubmit(username, password) {
        res.dispatch(signIn(username, password))
          .then(() => res.redirect('/admin'))
          .catch(console.log.bind(console));
      }
    });
  }
};

function handlePostCreate(res, postData) {
  res.dispatch(createPost(postData))
    .then(({payload: post}) => res.redirect(`/blog/${post.permalink}`))
    .catch(console.log.bind(console));
}

function handlePostDelete(res, post) {
  res.dispatch(deletePost(post))
    .catch(console.log.bind(console));
}

function handlePostEdit(res, postData) {
  res.dispatch(updatePost(postData))
    .then(({payload: post}) => res.redirect(`/blog/${post.permalink}`))
    .catch(console.log.bind(console));
}

function handleSignOut(res) {
  res.dispatch(signOut())
    .then(() => res.redirect('/'))
    .catch(console.log.bind(console));
}
