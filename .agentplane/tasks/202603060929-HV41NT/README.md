---
id: "202603060929-HV41NT"
title: "Update SKILL.md homepage and generation --out guidance"
result_summary: "SKILL.md homepage and generate --out documentation updated."
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T09:30:09.804Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: homepage + --out docs update in SKILL.md only."
verification:
  state: "ok"
  updated_at: "2026-03-06T09:30:42.831Z"
  updated_by: "CODER"
  note: "Confirmed SKILL.md homepage is set to repository URL and generation --out behavior is documented explicitly, including tmp default and numeric suffix handling for extra files."
commit:
  hash: "58afb90a88688e6af4bc8889695e2a34064c5df3"
  message: "📝 HV41NT skill: update homepage and document generate --out"
comments:
  -
    author: "CODER"
    body: "Start: Applying requested SKILL.md doc edits by switching homepage to repository URL and expanding generate --out behavior details without changing CLI code."
  -
    author: "CODER"
    body: "Verified: SKILL.md now points homepage to the repository URL and clearly documents generate --out behavior (tmp default, explicit target path, and numeric suffixes for additional files)."
events:
  -
    type: "status"
    at: "2026-03-06T09:30:12.770Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Applying requested SKILL.md doc edits by switching homepage to repository URL and expanding generate --out behavior details without changing CLI code."
  -
    type: "verify"
    at: "2026-03-06T09:30:42.831Z"
    author: "CODER"
    state: "ok"
    note: "Confirmed SKILL.md homepage is set to repository URL and generation --out behavior is documented explicitly, including tmp default and numeric suffix handling for extra files."
  -
    type: "status"
    at: "2026-03-06T09:30:52.678Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: SKILL.md now points homepage to the repository URL and clearly documents generate --out behavior (tmp default, explicit target path, and numeric suffixes for additional files)."
doc_version: 2
doc_updated_at: "2026-03-06T09:30:52.678Z"
doc_updated_by: "CODER"
description: "Set SKILL.md homepage to repository URL and expand generation --out behavior guidance for output path handling."
id_source: "generated"
---
## Summary

Update SKILL.md to use the project GitHub homepage and document generate --out path behavior more explicitly.

## Scope

In scope: SKILL.md frontmatter homepage and generation output-path documentation. Out of scope: code/runtime behavior changes.

## Plan

1. Edit SKILL.md homepage to repository URL.\n2. Add explicit generate --out behavior details (output file path and additional-file suffix handling).\n3. Validate wording via git diff and task verify steps.

## Risks

Risk: docs may claim unsupported output behavior. Mitigation: keep wording aligned with current CLI help and implementation.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T09:30:42.831Z — VERIFY — ok

By: CODER

Note: Confirmed SKILL.md homepage is set to repository URL and generation --out behavior is documented explicitly, including tmp default and numeric suffix handling for extra files.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T09:30:42.726Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert SKILL.md with git restore -- SKILL.md if wording is inaccurate.

## Notes

### Approvals / Overrides\nUser explicitly requested commit including current SKILL.md edits. No additional overrides.\n\n### Decisions\nSet homepage to repository URL requested by user. Added dedicated --out behavior section and retained concise references in generation capability/output sections.\n\n### Implementation Notes\nUpdated SKILL.md homepage and expanded generation output path semantics: tmp default, explicit --out path, and numeric suffix behavior for additional files.\n\n### Evidence / Links\nVerified with git diff -- SKILL.md and string checks for homepage + --out wording.
