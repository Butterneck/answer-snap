#!/usr/bin/env bash
set -euo pipefail


# Run this to setup iam role. Improve this using template
aws cloudformation deploy --template-file aws_setup/role.yml --stack-name answer-snap-setup --parameter-overrides AppId=answer-snap --capabilities CAPABILITY_NAMED_IAM
