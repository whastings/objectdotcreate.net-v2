import initDB from 'server/db/initDB';
import repl from 'repl';
import Session from 'server/models/Session';
import User from 'server/models/User';

initDB()
  .then((connection) => {
    let replServer = repl.start({
      prompt: 'app > '
    });

    replServer.context.connection = connection;
    replServer.context.User = User.model;
    replServer.context.Session = Session.model;
  });
