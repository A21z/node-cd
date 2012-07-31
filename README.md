node-cd
=======

Featherweight node.js Continuous Deployment

Continuously deploy any node app on Github.

# Installation: 

```git clone https://github.com/A21z/node-cd.git
cd src
npm install```

# Usage:

* Edit node-cd.sh to execute whatever you like after your commits (ex: stop server, git pull, start server)
* Set your post-receive hook as described [here](https://help.github.com/articles/post-receive-hooks) with the url `yourserver.com:61440/github`
* Run the app
```WWW_PORT=61440 node app.js```
