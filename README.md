# isomorphic-git-walk-test

Case: 423 Files, 1 Modified, 1 Added
Run on Windows PowerShell

node

```sh
$ node main.js
{
  currentBranch: 'main',
  trackingBranch: 'origin',
  localCommit: 'b112c3139e9a913de08c2d92a3a9efdb7c76b885',
  remoteCommit: 'abf4a8fea9a122d81952520b9104d217aaa07576'
}
walkByBranch: 13.033s
walkByCommit: 11.099s
```

deno

```sh
$ deno run main.ts
✅ Granted all env access.
✅ Granted all read access.
{
  currentBranch: "main",
  trackingBranch: "origin",
  localCommit: "b112c3139e9a913de08c2d92a3a9efdb7c76b885",
  remoteCommit: "abf4a8fea9a122d81952520b9104d217aaa07576"
}
walkByBranch: 21535ms
walkByCommit: 21329ms
```
