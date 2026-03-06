---
id: "202603060911-8KCRKK"
title: "Sync docs wording for generate --out behavior"
status: "DOING"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T09:12:55.677Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: docs-only wording sync."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Finalizing docs wording consistency for generate --out behavior in README and SKILL."
events:
  -
    type: "status"
    at: "2026-03-06T09:12:55.740Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Finalizing docs wording consistency for generate --out behavior in README and SKILL."
doc_version: 2
doc_updated_at: "2026-03-06T09:12:55.740Z"
doc_updated_by: "CODER"
description: "Fix remaining README/SKILL wording that still mentions tmp-only output after adding generate --out."
id_source: "generated"
---
## Summary


## Scope

In scope: README.md and SKILL.md wording only. Out of scope: code behavior changes.

## Plan

Update docs wording for --out and verify no tmp-only phrasing remains.

## Risks

Low risk docs-only wording edit. Mitigation: keep diff minimal and verify terms match current CLI behavior.

## Verify Steps

1) rg -n "tmp output path|in system tmp" README.md SKILL.md returns no stale wording for generate output behavior. 2) git diff shows only docs wording adjustments.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert README.md and SKILL.md wording to previous committed versions if review finds regressions.
