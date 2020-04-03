[![Codeship Status for unchainedshop/currybag-website](https://app.codeship.com/projects/2f18b4a0-57dc-0138-8b6d-4230a644a556/status?branch=master)](https://app.codeship.com/projects/391300)

## Working with Git Subtree

**Setup Engine integration through git subtree**

cd into root

```
  git remote add subtree_unchained git@github.com:unchainedshop/unchained.git
  git subtree add --prefix=engine/common --squash subtree_unchained currybag
```

**Pull most recent version of unchained engine into this project**

```
  git subtree pull --prefix=engine/common --squash subtree_unchained currybag
```

**Push back the changes to unchained engine from this project**

```
  git subtree push --prefix=engine/common subtree_unchained currybag
```
