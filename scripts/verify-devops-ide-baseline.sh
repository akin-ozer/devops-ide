#!/usr/bin/env bash
set -euo pipefail

grep -q '"nameShort": "DevOps IDE"' product.json
grep -q '"applicationName": "devops-ide"' product.json
grep -q '"displayName": "DevOps IDE"' package.json
grep -q 'Code-OSS fork for DevOps engineers' README.md
