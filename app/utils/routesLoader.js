import glob from 'glob';

export default function(dirname) {
  return new Promise((resolve, reject) => {
    const routes = [];
    glob(
      `${dirname}/*`,
      {
        ignore: '**/index.js'
      },
      (err, files) => {
        if (err) {
          return reject(err);
        }
        console.log(files);
        files.forEach(file => {
          let route = require(file); // eslint-disable-line global-require, import/no-dynamic-require
          // import route from file;
          console.log(route.stack.map(i => i.path), 'bhhhhhabla');
          routes.push(route);
        });
        return resolve(routes);
      }
    );
  });
}
