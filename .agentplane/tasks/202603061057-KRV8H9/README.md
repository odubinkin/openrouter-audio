---
id: "202603061057-KRV8H9"
title: "Compact and restructure SKILL.md"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T10:57:28.601Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: scope is SKILL.md-only, no network/outside-repo needed."
verification:
  state: "ok"
  updated_at: "2026-03-06T10:58:14.211Z"
  updated_by: "TESTER"
  note: "SKILL.md is now compact and structured, includes main key purpose mapping, points model/format discovery to --help, explicitly recommends defaults, and keeps only basic command-path examples without custom prompt/model overrides."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: compactly restructure SKILL.md, keep only core guidance and basic command examples as requested."
events:
  -
    type: "status"
    at: "2026-03-06T10:57:31.309Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: compactly restructure SKILL.md, keep only core guidance and basic command examples as requested."
  -
    type: "verify"
    at: "2026-03-06T10:58:14.211Z"
    author: "TESTER"
    state: "ok"
    note: "SKILL.md is now compact and structured, includes main key purpose mapping, points model/format discovery to --help, explicitly recommends defaults, and keeps only basic command-path examples without custom prompt/model overrides."
doc_version: 2
doc_updated_at: "2026-03-06T10:58:14.215Z"
doc_updated_by: "TESTER"
description: "Make SKILL.md shorter and more structured: highlight main keys and their purpose, direct model/format lists to --help, recommend defaults, keep only basic path examples without custom prompts/models."
id_source: "generated"
---
## Summary

Refactor SKILL.md into a compact, structured guide with only core usage patterns and minimal examples.

## Scope


## Plan

1) Review existing SKILL.md and mark redundant/verbose blocks. 2) Rewrite into compact sections with key metadata keys and purpose. 3) Replace static model/format lists with a help-first note pointing to CLI --help. 4) Keep only basic examples for main command paths. 5) Verify against user requirements and finalize.

## Risks


## Verify Steps

1) Read SKILL.md and confirm it includes a compact section explaining main metadata keys and their purpose. 2) Confirm model/format inventories are no longer listed in detail and users are directed to --help. 3) Confirm recommendation to use defaults is explicit. 4) Confirm examples include only core paths/commands without custom --prompt or custom --model.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T10:58:14.211Z — VERIFY — ok

By: TESTER

Note: SKILL.md is now compact and structured, includes main key purpose mapping, points model/format discovery to --help, explicitly recommends defaults, and keeps only basic command-path examples without custom prompt/model overrides.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T10:57:31.309Z, excerpt_hash=sha256:9f99323ecfecddd2a68ce2ab9bf12baafd3010c51e0141b245817283f3a8b01f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert SKILL.md and task artifacts from this task commit if verification fails or requested structure is incorrect.
