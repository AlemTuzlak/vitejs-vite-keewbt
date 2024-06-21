---
title: Getting Started
order: 1
---

# 001 - Trunk based development

### Status

Accepted

### Context

To ensure we all work in the same flow of work (creating branches, merge requests, etc)
we should pick a standardised way of working.

The current solution is loosely trunk-based development.

This ADR aims to make this the standard behaviour.
We do this for the following reasons:
- We prefer short lived branches that are merged into production often.
- Master should always reflect what is currently in production.

You can read more about this system on [trunkbaseddevelopment.com](https://trunkbaseddevelopment.com/).

### Decision

We will implement trunk based development