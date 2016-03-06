import co from 'co';
import faker from 'faker';
import initDB from 'server/db/initDB';
import Post from 'server/modules/posts/model';
import User from 'server/modules/users/model';
import { rand } from '@whastings/js_utils/lib/misc';

const NUM_POSTS = 25;

initDB()
  .then((connection) => connection.transaction())
  .then(co.wrap(function* seedDB(transaction) {
    let PostModel = Post.model,
        UserModel = User.model;

    let user = yield UserModel.createWithPassword('will', 'foobar', {transaction});

    let posts = yield* createPosts(user, transaction, NUM_POSTS);

    return transaction;
  }))
  .then((transaction) => transaction.commit())
  .catch(console.log.bind(console));

function* createPosts(user, transaction, numPosts) {
  let posts = new Array(numPosts),
      PostModel = Post.model;

  for (let i = 0; i < numPosts; i++) {
    let title = faker.hacker.phrase(),
        body = faker.lorem.paragraphs(rand(3, 10));

    posts.push(
      yield PostModel.create({title, body, userId: user.id}, {transaction})
    );
  }

  return posts;
}
