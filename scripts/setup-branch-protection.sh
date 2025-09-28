#!/bin/bash

# Script to set up GitHub branch protection rules for the main branch
# This ensures that pull requests must pass CI/CD checks before merging

set -e

echo "🔒 Setting up branch protection rules for main branch..."

# Create branch protection rule
gh api \
  --method PUT \
  --header "Accept: application/vnd.github+json" \
  --header "X-GitHub-Api-Version: 2022-11-28" \
  /repos/joshdutcher/joshify/branches/main/protection \
  --input - <<EOF
{
  "required_status_checks": {
    "strict": true,
    "contexts": [
      "Lint and Type Check",
      "Build and Test",
      "End-to-End Tests",
      "Quality Gate"
    ]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "require_last_push_approval": false
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "allow_fork_syncing": true
}
EOF

echo "✅ Branch protection rules configured successfully!"
echo ""
echo "📋 Protection rules summary:"
echo "   • Direct pushes to main branch: BLOCKED"
echo "   • Pull requests required: YES"
echo "   • Required CI/CD checks:"
echo "     - Lint and Type Check"
echo "     • Build and Test"
echo "     • End-to-End Tests"
echo "     • Quality Gate"
echo "   • Review required: YES (1 approving review)"
echo "   • Dismiss stale reviews: YES"
echo "   • Resolve conversations: REQUIRED"
echo ""
echo "🚀 Ready for production workflow!"