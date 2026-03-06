---
id: "202603060922-EA2WR6"
title: "Align SKILL.md with OpenClaw skill requirements"
result_summary: "SKILL.md aligned with OpenClaw skill spec and examples."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T09:23:23.901Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved for SKILL.md compliance update only."
verification:
  state: "ok"
  updated_at: "2026-03-06T09:24:16.571Z"
  updated_by: "CODER"
  note: "Validated SKILL.md against OpenClaw skill docs and bundled examples; confirmed name/description frontmatter, metadata.openclaw gating syntax, {baseDir} usage, and command/default alignment with src/openrouter-audio.ts."
commit:
  hash: "857c862b6da733a07db226f829fa98117e5f3cdd"
  message: "📝 EA2WR6 skill: align SKILL.md with OpenClaw requirements"
comments:
  -
    author: "CODER"
    body: "Start: Reviewing OpenClaw skill docs and bundled SKILL.md examples to align this repository SKILL.md structure, metadata, and command conventions without changing runtime behavior."
  -
    author: "CODER"
    body: "Verified: SKILL.md now matches OpenClaw guidance by using valid AgentSkills frontmatter, metadata.openclaw env gating for OPENROUTER_API_KEY, and {baseDir}-based command examples consistent with bundled skill patterns and current CLI defaults/options."
events:
  -
    type: "status"
    at: "2026-03-06T09:23:29.222Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Reviewing OpenClaw skill docs and bundled SKILL.md examples to align this repository SKILL.md structure, metadata, and command conventions without changing runtime behavior."
  -
    type: "verify"
    at: "2026-03-06T09:24:16.571Z"
    author: "CODER"
    state: "ok"
    note: "Validated SKILL.md against OpenClaw skill docs and bundled examples; confirmed name/description frontmatter, metadata.openclaw gating syntax, {baseDir} usage, and command/default alignment with src/openrouter-audio.ts."
  -
    type: "status"
    at: "2026-03-06T09:24:51.079Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: SKILL.md now matches OpenClaw guidance by using valid AgentSkills frontmatter, metadata.openclaw env gating for OPENROUTER_API_KEY, and {baseDir}-based command examples consistent with bundled skill patterns and current CLI defaults/options."
doc_version: 2
doc_updated_at: "2026-03-06T09:24:51.079Z"
doc_updated_by: "CODER"
description: "Review OpenClaw skill documentation and bundled skill examples, then update this repository SKILL.md to match required structure, metadata, and usage guidance."
id_source: "generated"
---
## Summary

Align repository SKILL.md with OpenClaw skill-format expectations by reconciling frontmatter, command path conventions, and usage guidance against current OpenClaw docs and bundled skill examples.

## Scope

In scope: SKILL.md content alignment (frontmatter + instructions), consistency with current CLI behavior and supported flags. Out of scope: TypeScript source changes, build pipeline changes, binary packaging changes, and OpenClaw core documentation edits.

## Plan

1. Inspect OpenClaw skill requirements in openclaw/docs/tools/skills.md and creating-skills.md plus representative bundled SKILL.md examples.\n2. Identify gaps in repository SKILL.md (frontmatter keys, metadata style, command path conventions, and wording).\n3. Edit SKILL.md to satisfy requirements while preserving accurate behavior for this project CLI.\n4. Validate final document against current implementation and record evidence in task notes.

## Risks

Risk: documenting unsupported command flags or wrong defaults. Mitigation: validate against current src/openrouter-audio.ts help text and existing README. Risk: adding gating metadata that accidentally disables skill loading. Mitigation: keep metadata minimal and only include requirements that are certainly true for this skill.

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
#### 2026-03-06T09:24:16.571Z — VERIFY — ok

By: CODER

Note: Validated SKILL.md against OpenClaw skill docs and bundled examples; confirmed name/description frontmatter, metadata.openclaw gating syntax, {baseDir} usage, and command/default alignment with src/openrouter-audio.ts.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T09:24:16.476Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Context

Need to ensure this skill remains compatible with OpenClaw AgentSkills parser and conventions documented under openclaw/docs/tools/skills.md and creating-skills.md. Existing SKILL.md already works functionally but may diverge in metadata structure and path conventions used by bundled skills.

## Notes

### Approvals / Overrides\nNo overrides requested.\n\n### Decisions\nAdded explicit OpenClaw metadata gate for OPENROUTER_API_KEY and primaryEnv mapping; this matches documented gating semantics while keeping binary gating out to avoid false negatives for {baseDir}-local executable usage.\n\n### Implementation Notes\nUpdated SKILL.md frontmatter with homepage + metadata.openclaw fields. Replaced relative executable examples (./openrouter-audio) with {baseDir}/openrouter-audio to match OpenClaw skill path convention.\n\n### Evidence / Links\nReviewed: openclaw/docs/tools/creating-skills.md, openclaw/docs/tools/skills.md, openclaw/skills/openai-whisper-api/SKILL.md, openclaw/skills/summarize/SKILL.md, openclaw/skills/nano-banana-pro/SKILL.md. Validated against: src/openrouter-audio.ts help/default constants and git diff for SKILL.md.
