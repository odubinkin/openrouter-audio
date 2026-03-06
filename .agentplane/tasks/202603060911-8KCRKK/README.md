---
id: "202603060911-8KCRKK"
title: "Sync docs wording for generate --out behavior"
result_summary: "Docs fully aligned with generate --out behavior."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-06T09:13:03.514Z"
  updated_by: "CODER"
  note: "Verify: stale tmp-only wording removed from README/SKILL for generate output behavior; documentation now reflects tmp default plus --out override."
commit:
  hash: "7f20c902d3c5555ec989ac080f06af0db110304a"
  message: "✅ 8KCRKK docs: sync wording for --out output behavior"
comments:
  -
    author: "CODER"
    body: "Start: Finalizing docs wording consistency for generate --out behavior in README and SKILL."
  -
    author: "CODER"
    body: "Verified: README and SKILL wording now consistently state tmp default with optional --out path and output JSON paths semantics."
events:
  -
    type: "status"
    at: "2026-03-06T09:12:55.740Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Finalizing docs wording consistency for generate --out behavior in README and SKILL."
  -
    type: "verify"
    at: "2026-03-06T09:13:03.514Z"
    author: "CODER"
    state: "ok"
    note: "Verify: stale tmp-only wording removed from README/SKILL for generate output behavior; documentation now reflects tmp default plus --out override."
  -
    type: "status"
    at: "2026-03-06T09:13:13.372Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: README and SKILL wording now consistently state tmp default with optional --out path and output JSON paths semantics."
doc_version: 2
doc_updated_at: "2026-03-06T09:13:13.372Z"
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
#### 2026-03-06T09:13:03.514Z — VERIFY — ok

By: CODER

Note: Verify: stale tmp-only wording removed from README/SKILL for generate output behavior; documentation now reflects tmp default plus --out override.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T09:12:55.740Z, excerpt_hash=sha256:c3f4b83128652f123420119a485d89b3b062f6a2d6f858a0c69fa05bdd4b1fd6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert README.md and SKILL.md wording to previous committed versions if review finds regressions.
