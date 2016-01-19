# rpt - React Project Tools

Write and use generators that live in your project's repository.

## Installing RPT

You must clone the repo and link the npm package instead of installing directly from npm.

* git clone https://github.com/jrhicks/rpt.git

* cd rpt

* npm install

* npm link

## Using

rpt new MyCoolApp

cd MyCoolApp

npm install

npm run start

rpt g reactmdl

## Using Flux

rpt g flux

rpt g flux:action Foo

rpt g flux:store Foo

rpt g flux:component Foo

# Nested Routes

The primary nesting is

WorkSpaces -> Tabs -> Views -> SubRoutes

rpt g workspace Project

## Nested Routes To Be Developed Very Soon

rpt g Tab Project Milestones

rpt g View Project Milestones ShowMilestone

rpt g View Project Milestones CreateMilestone

rpt g View Project Milestones EditMilestone

rpt g View Project Milestones ListOpenMilestones

rpt g View Project Milestones ListClosedMilestones


## Develop

* git clone xyz

* cd xyz

* npm run build

* npm link

* cd [to your project]

* npm link rpt

## Built On

[Babel Node](https://babeljs.io/docs/usage/cli/)

[Commander](https://www.npmjs.com/package/commander)

[ejs](https://www.npmjs.com/package/ejs)

[inflect](https://www.npmjs.com/package/inflect)


# Credits

## Blog Posts

Great blog posts are like oxygen for the developer.  Thanks javascript playground for the nice write up on node command line tools.

[Javascript Playground Bog Post](http://javascriptplayground.com/blog/2015/03/node-command-line-tool/) - Writing a node command line tool.

## Yeoman Generator

in-app-gen uses the conflicter (and deps) from Yeoman generator to detect when generated files would overwrite (and change) existing app code.  It provides nice prompting and diff-ing to help out.

[Yeoman Generator](https://github.com/yeoman/generator/) - BSD license Copyright (c) Google

# MIT LICENSE

Copyright (c) 2016
'' @jrhicks

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
# rpt
