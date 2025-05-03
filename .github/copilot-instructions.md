# AI Rules for  @thomascsd/stools

- Accessing Airtable to perform CRUD operations

## CODING_PRACTICES

### Guidelines for SUPPORT_LEVEL

#### SUPPORT_EXPERT

- Favor elegant, maintainable solutions over verbose code. Assume understanding of language idioms and design patterns.
- Highlight potential performance implications and optimization opportunities in suggested code.
- Frame solutions within broader architectural contexts and suggest design alternatives when appropriate.
- Focus comments on 'why' not 'what' - assume code readability through well-named functions and variables.
- Proactively address edge cases, race conditions, and security considerations without being prompted.
- When debugging, provide targeted diagnostic approaches rather than shotgun solutions.
- Suggest comprehensive testing strategies rather than just example tests, including considerations for mocking, test organization, and coverage.


### Guidelines for DOCUMENTATION

#### TYPEDOC

- Use JSDoc-style comments with TypeScript-specific annotations for all public APIs
- Configure custom themes to match {{project_branding}} for consistent documentation
- Group related functionality using @module and @category tags for better organization
- Document edge cases and error handling for {{critical_functions}}
- Generate and publish documentation as part of the CI/CD pipeline to keep it current
- Include usage examples for complex interfaces and abstract classes


### Guidelines for VERSION_CONTROL

#### GIT

- Use conventional commits to create meaningful commit messages
- Use feature branches with descriptive names following {{branch_naming_convention}}
- Write meaningful commit messages that explain why changes were made, not just what
- Keep commits focused on single logical changes to facilitate code review and bisection
- Use interactive rebase to clean up history before merging feature branches
- Leverage git hooks to enforce code quality checks before commits and pushes

#### GITHUB

- Use pull request templates to standardize information provided for code reviews
- Implement branch protection rules for {{protected_branches}} to enforce quality checks
- Configure required status checks to prevent merging code that fails tests or linting
- Use GitHub Actions for CI/CD workflows to automate testing and deployment
- Implement CODEOWNERS files to automatically assign reviewers based on code paths
- Use GitHub Projects for tracking work items and connecting them to code changes


### Guidelines for STATIC_ANALYSIS

#### PRETTIER

- Define a consistent .prettierrc configuration across all {{project_repositories}}
- Configure editor integration to format on save for immediate feedback
- Use .prettierignore to exclude generated files, build artifacts, and {{specific_excluded_patterns}}
- Set printWidth based on team preferences (80-120 characters) to improve code readability
- Configure consistent quote style and semicolon usage to match team conventions
- Implement CI checks to ensure all committed code adheres to the defined style


## DEVOPS

### Guidelines for CI_CD

#### GITHUB_ACTIONS

- Check if `package.json` exists in project root and summarize key scripts
- Check if `.nvmrc` exists in project root
- Check if `.env.example` exists in project root to identify key `env:` variables
- Always use terminal command: `git branch -a | cat` to verify whether we use `main` or `master` branch
- Always use `env:` variables and secrets attached to jobs instead of global workflows
- Always use `npm ci` for Node-based dependency setup
- Extract common steps into composite actions in separate files
- Once you're done, as a final step conduct the following: for each public action always use <tool>"Run Terminal"</tool> to see what is the most up-to-date version (use only major version) - extract tag_name from the response:
- ```bash curl -s https://api.github.com/repos/{owner}/{repo}/releases/latest ```


## TESTING

### Guidelines for UNIT

#### JEST

- Use Jest with TypeScript for type checking in tests
- Implement Testing Library for component testing instead of enzyme
- Use snapshot testing sparingly and only for stable UI components
- Leverage mock functions and spies for isolating units of code
- Implement test setup and teardown with beforeEach and afterEach
- Use describe blocks for organizing related tests
- Leverage expect assertions with specific matchers
- Implement code coverage reporting with meaningful targets
- Use mockResolvedValue and mockRejectedValue for async testing
- Leverage fake timers for testing time-dependent functionality