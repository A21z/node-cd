node-cd
=======

**Featherweight Github/Bitbucket/Contentful Continuous Deployment**

Continuously deploy any code from Github/Bitbucket/Contentful to your server.

node-cd is a simple node.js app handling Github's, Bitbucket's and Contentful's post-receive hooks.
It can execute any script you want on your server: deployment, testing, etc.

## Installation

	git clone https://github.com/A21z/node-cd.git
	npm install

## Usage

* Edit the `bitbucket.sh`, `contentful.sh` or `github.sh` file to execute whatever you like after your commits (ex: stop server, git pull, start server)
* **For GitHub**: Set your post-receive hook as described [here](https://help.github.com/articles/post-receive-hooks) with the url `http://yourserver.com:61440/github`
* **For Bitbucket**:  Set your post-receive hook as described [here](https://confluence.atlassian.com/display/BITBUCKET/POST+hook+management) with the url `http://yourserver.com:61440/bitbucket`
* **For Contentful**: Set your webhook in your Settings > Webhooks with the url `http://yourserver.com:61440/contentful`
* Add execution permission on scripts
	`chmod +x bitbucket.sh contentful.sh github.sh`
* Run the app
	`WWW_PORT=61440 node src/index.js`

[![Build Status](https://travis-ci.org/A21z/node-cd.svg)](https://travis-ci.org/A21z/node-cd)
