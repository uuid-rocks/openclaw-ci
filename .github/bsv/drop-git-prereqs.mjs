// openclaw-ci has no upstream history, so historical-reader prerequisite commits cannot be fetched.
import fs from "node:fs";
const file = process.env.GITHUB_OUTPUT;
const lines = fs.readFileSync(file, "utf8").split("\n").map((line) => {
  if (!line.startsWith("checks_node_core_nondist_matrix=")) return line;
  const matrix = JSON.parse(line.slice(line.indexOf("=") + 1));
  for (const row of matrix.include) {
    if (Array.isArray(row.git_commits) && row.git_commits.length) {
      console.log(`dropping git_commits ${JSON.stringify(row.git_commits)} from ${row.check_name}`);
      row.git_commits = [];
    }
  }
  return `checks_node_core_nondist_matrix=${JSON.stringify(matrix)}`;
});
fs.writeFileSync(file, lines.join("\n"));
