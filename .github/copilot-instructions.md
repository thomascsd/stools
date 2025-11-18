# AI Rules for @thomascsd/stools

This document provides guidance for AI coding agents working with the `@thomascsd/stools` codebase.

- Accessing Airtable to perform CRUD operations

## Architecture

The `@thomascsd/stools` library is a TypeScript project that provides a set of services for interacting with the Airtable API. The architecture is based on a service-oriented design, with a clear separation of concerns between the different layers of the application.

### Core Components

- **`HttpService`**: This is a low-level service that is responsible for making HTTP requests to the Airtable API. It uses the native Node.js `https` module to send requests and handle responses. It is not intended to be used directly by consumers of the library.

- **`BaseService`**: This is an abstract class that provides the core logic for interacting with the Airtable API. It uses the `HttpService` to make requests and provides protected methods for performing CRUD (Create, Read, Update, Delete) operations.

- **`DataService`**: This is a service that is designed to be used with dependency injection (using `typedi`). It extends the `BaseService` and exposes its CRUD methods publicly. It is the recommended way to interact with the Airtable API when using dependency injection.

- **`DataFunctionService`**: This is a service that is designed to be used in a more functional way. It also extends the `BaseService`, but it is not designed to be used with dependency injection. It receives the Airtable token and base ID in its constructor, making it easy to use in a standalone manner.

### Data Flow

The data flow in the application is as follows:

1. The consumer of the library (e.g., an application or another service) calls one of the methods on the `DataService` or `DataFunctionService`.
2. The `DataService` or `DataFunctionService` then calls the corresponding protected method on the `BaseService`.
3. The `BaseService` creates an instance of the `HttpService` and calls the appropriate method to make a request to the Airtable API.
4. The `HttpService` sends the request to the Airtable API and returns the response.
5. The response is then passed back up the call stack to the consumer of the library.

### Data Transfer Objects (DTOs)

The library uses DTOs to define the data structures that are used to communicate with the Airtable API. The DTOs are located in the `src/dtos` directory. The main DTO is `BaseModel`, which all other models should extend.

## Developer Workflows

### Build

To build the project, run the following command:

```bash
npm run build
```

### Test

To run the tests, run the following command:

```bash
npm run test
```

The tests are written using Jest and are located in the `test` directory.

### Lint

To lint the code, run the following command:

```bash
npm run lint
```

## Project-Specific Conventions

- **Dependency Injection**: The library uses `typedi` for dependency injection. When working with services, you should use the `@Service()` decorator to mark them as injectable.

- **DTOs**: All data models should extend the `BaseModel` DTO.

- **Error Handling**: The `HttpService` handles errors from the Airtable API and throws an error if the request fails. Consumers of the library should be prepared to handle these errors.

## Integration Points

The library is designed to be integrated with any application that needs to interact with the Airtable API. It can be used in both Node.js and browser environments.

## How to Use the Services

### `DataService` (with dependency injection)

```typescript
import { Service } from 'typedi';
import { DataService, BaseModel } from '@thomascsd/stools';

// Define your Airtable model
export class Contact extends BaseModel {
  name: string;
  email: string;
}

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const BASE_ID = 'appXXXXXXXXXXXXXX';
const TABLE_NAME = 'Contacts';

@Service()
export class ContactService {
  constructor(private db: DataService) {}

  async getContacts(): Promise<Contact[]> {
    return await this.db.getData<Contact>(AIRTABLE_TOKEN, BASE_ID, TABLE_NAME);
  }

  async saveContact(contact: Contact) {
    return await this.db.saveData<Contact>(AIRTABLE_TOKEN, BASE_ID, TABLE_NAME, contact);
  }

  async updateContact(contact: Contact) {
    return await this.db.updateData<Contact>(AIRTABLE_TOKEN, BASE_ID, TABLE_NAME, contact);
  }

  async deleteContact(contact: Contact) {
    return await this.db.deleteData<Contact>(AIRTABLE_TOKEN, BASE_ID, TABLE_NAME, contact);
  }
}
```

### `DataFunctionService` (functional)

```typescript
import { DataFunctionService, BaseModel } from '@thomascsd/stools';

// Define your Airtable model
export class Contact extends BaseModel {
  name: string;
  email: string;
}

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const BASE_ID = 'appXXXXXXXXXXXXXX';
const TABLE_NAME = 'Contacts';

const db = new DataFunctionService(AIRTABLE_TOKEN, BASE_ID);

async function getContacts(): Promise<Contact[]> {
  return await db.getData<Contact>(TABLE_NAME);
}

async function saveContact(contact: Contact) {
  return await db.saveData<Contact>(TABLE_NAME, contact);
}

async function updateContact(contact: Contact) {
  return await db.updateData<Contact>(TABLE_NAME, contact);
}

async function deleteContact(contact: Contact) {
  return await db.deleteData<Contact>(TABLE_NAME, contact);
}
```

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
- `bash curl -s https://api.github.com/repos/{owner}/{repo}/releases/latest `

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
