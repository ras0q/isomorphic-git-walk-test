import git, { Walker } from "npm:isomorphic-git";
import * as fs from "node:fs";

const opt = {
  fs,
  dir: Deno.env.get("TEST_DIR") || "..",
};

const currentBranch = (await git.currentBranch(opt)) as string;
const trackingBranch = (await git.getConfig({
  ...opt,
  path: `branch.${currentBranch}.remote`,
})) as string;
const localCommit = await git.resolveRef({ ...opt, ref: currentBranch });
const remoteCommit = await git.resolveRef({
  ...opt,
  ref: `${trackingBranch}/${currentBranch}`,
});
console.log({
  currentBranch,
  trackingBranch,
  localCommit,
  remoteCommit,
});

const diff = async (trees: Walker[]) => {
  await git.walk({
    ...opt,
    trees: trees,
    // deno-lint-ignore require-await
    map: async (filepath, _) => {
      return filepath;
    },
  });
};

const trees1 = [
  git.TREE({ ref: currentBranch }),
  git.TREE({ ref: trackingBranch }),
];
console.time("walkByBranch");
for (let i = 0; i < 1000; i++) {
  await diff(trees1);
}
console.timeEnd("walkByBranch");

const trees2 = [
  git.TREE({ ref: localCommit }),
  git.TREE({ ref: remoteCommit }),
];
console.time("walkByCommit");
for (let i = 0; i < 1000; i++) {
  await diff(trees2);
}
console.timeEnd("walkByCommit");
