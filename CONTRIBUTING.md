## Contributing

To contribute content or code please create a pull request, so that we can have a look
at it and discuss your changes. We integrate with Travis CI so that we can easily see
if your pull request breaks our build and thus cannot be merged.

Please allow for someone else to review and merge your pull request. This is 
considered best practice and helps avoiding common mistakes.

* Please provide a descriptive, short commit message. If more information is required,
put it into the body of the commit message. We speak English in our commit messages.
* Please use HTML on content pages sparingly. Blog posts should always be written in
Markdown if no special HTML content is required.
* Please set your editor to break after 85 characters and use spaces instead of tabs.

We will provide templates for creating blog posts. You will be able to add blog posts
consisting of text only on Github.

In case of questions, please talk to Else.

### Previewing Pull Requests

It is possible to preview pull requests on http://pr-PRNUMBER.rzl-homepage.raumzeitlabor.org.
This only works if you have created the pull request from a local branch on the
main repository (due to security requirements). Pull request previews are
deleted after 14 days. Please make sure you delete the branch in the repository
if it becomes obsolete, so that our repository does not mess up.

### Merging Changes

Here's how we usually proceed to merge changes. To simplify interaction with
Github you should add the following underneath the `remote "origin"` section to
your git configuration of the cloned repository (`.git/config`):

    fetch = +refs/pull/*/head:refs/pull/upstream/*

This then allows you to fetch pull requests using `git fetch --all` without
being required to add the forked repository itself as a remote. You can also
check out a single pull request using e.g. `git checkout refs/pull/upstream/78`
(for pullrequest #78) to test the change.

We usually cherry-pick or rebase changes on top of master to keep a linear
history if possible. If a change has several well-made commits and it makes
sense to keep them, you can do a non-fast-forward merge (e.g. using the Github
UI). If someone needs to edit their pull request, please ask them to squash
their changes into a single commit if feasible. 
