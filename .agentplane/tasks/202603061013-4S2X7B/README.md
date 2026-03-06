---
id: "202603061013-4S2X7B"
title: "Refresh README and add CLI test coverage"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T10:13:54.404Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: scope and verification are sufficient for README refresh and CLI test coverage."
verification:
  state: "ok"
  updated_at: "2026-03-06T10:16:06.689Z"
  updated_by: "TESTER"
  note: "CLI tests and build pass locally: npm run build, npm run test:cli, npm test (9/9 passing)."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing README refresh and deterministic CLI test suite with local-only verification commands."
events:
  -
    type: "status"
    at: "2026-03-06T10:13:54.574Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing README refresh and deterministic CLI test suite with local-only verification commands."
  -
    type: "verify"
    at: "2026-03-06T10:16:06.689Z"
    author: "TESTER"
    state: "ok"
    note: "CLI tests and build pass locally: npm run build, npm run test:cli, npm test (9/9 passing)."
doc_version: 2
doc_updated_at: "2026-03-06T10:16:06.690Z"
doc_updated_by: "TESTER"
description: "Update README.md to reflect current CLI behavior and add best-practice automated tests for openrouter-audio CLI."
id_source: "generated"
---
## Summary

Refresh repository documentation and add automated CLI tests for the openrouter-audio command-line interface. Success means README reflects actual behavior and test commands, and CLI tests run deterministically without external network calls.

## Scope

In scope: README.md updates; package.json test scripts; adding CLI tests under test/; minimal supporting changes required for deterministic local test execution. Out of scope: changing business logic/API semantics, touching openclaw/ subtree, adding network-dependent tests.

## Plan

1) Inspect CLI behavior and identify stable scenarios for coverage. 2) Add deterministic CLI tests (help, parse/validation, dry-run output, command errors) using local process execution without network. 3) Add or adjust npm scripts for repeatable test execution. 4) Update README with current testing workflow and any clarified CLI behavior details. 5) Run build and test verification commands and record results.

## Risks

Risk: tests can become flaky if they depend on wall-clock tmp paths or external environment. Mitigation: assert structural output and normalize path checks. Risk: docs may diverge from implementation. Mitigation: validate examples against current CLI usage and defaults.

## Verify Steps

1) npm run build (expect exit 0 and updated build/openrouter-audio artifacts). 2) npm run test:cli (expect all CLI tests pass). 3) npm test (expect same suite passes through default test command).

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T10:16:06.689Z — VERIFY — ok

By: TESTER

Note: CLI tests and build pass locally: npm run build, npm run test:cli, npm test (9/9 passing).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T10:16:03.239Z, excerpt_hash=sha256:49c0ed208e343cebd814c79e86975e31cbdb67a39725f2456793f661f2f47aa0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

If verification fails or regression is introduced, revert the task commit via git revert on the produced commit hash, then rerun npm run build and npm run test:cli to confirm repository returns to prior stable state.

## Context

The CLI has evolved with format conversion, dry-run behavior, and command options. Existing docs can drift, and there is currently no focused automated CLI test suite in this package to prevent regressions in argument handling, error paths, and JSON output contract.

## Notes

### Approvals / Overrides\nNone.\n\n### Decisions\nUse the Node built-in test runner for deterministic CLI coverage without adding new dependencies. Cover behavior via process-level execution of the built CLI artifact.\n\n### Implementation Notes\nUpdated README with a dedicated Testing section and explicit coverage list. Added npm scripts pretest:cli, test:cli, and test in package.json. Added test/cli.test.mjs with nine CLI-focused tests: help, unknown command, argument validation, dry-run JSON contract, output path resolution, unsupported voice, API key error, and missing file error path.\n\n### Evidence / Links\nVerification commands executed successfully:\n- npm run build\n- npm run test:cli (9 passed, 0 failed)\n- npm test (9 passed, 0 failed)
