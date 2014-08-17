node-cd
=======

**Featherweight Github Continuous Deployment**

Continuously deploy any code from Github to your server.  

node-cd is a simple node.js app handling Github's post-receive hooks.  
It can execute any script you want on your server: deployment, testing, etc.  

## Installation

	git clone https://github.com/A21z/node-cd.git
	cd node-cd/src
	npm install

## Usage

* `cp node-cd.template.sh node-cd.sh`
* Edit the `node-cd.sh` file to execute whatever you like after your commits (ex: stop server, git pull, start server)
* Set your post-receive hook as described [here](https://help.github.com/articles/post-receive-hooks) with the url `http://yourserver.com:61440/github`
* Run the app
	`WWW_PORT=61440 node node-cd.js`
