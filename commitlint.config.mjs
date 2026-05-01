import { RuleConfigSeverity } from "@commitlint/types";

import { ProjectPrefix } from "./project.config.mjs";

const SCOPE_ENUM = [...new Set(Object.values(ProjectPrefix.SCOPE).flat())];

const ISSUE_PREFIXES_WITH_DASH = ProjectPrefix.ISSUE_PREFIXES.map(
  (prefix) => `${prefix}-`
);

const commitlintConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      issuePrefixes: ISSUE_PREFIXES_WITH_DASH
    }
  },
  rules: {
    "type-enum": [RuleConfigSeverity.Error, "always", ProjectPrefix.CHANGE_TYPES],
    "references-empty": [RuleConfigSeverity.Error, "never"],
    "scope-empty": [RuleConfigSeverity.Error, "never"],
    "scope-enum": [RuleConfigSeverity.Error, "always", SCOPE_ENUM],
    "subject-empty": [RuleConfigSeverity.Error, "never"],
    "subject-case": [RuleConfigSeverity.Disabled]
  }
};

export default commitlintConfig;
