

<p align="middle">
<img  width="900px" height="500px" src="./public/base-stack.png" />
</p>

# Welcome to Forge 42 base-stack

This is a base-stack for Forge 42 projects. This stack is a starting point for all Forge 42 stacks with more 
advanced features. This is an ESM Vite stack with Remix.run.

It includes a basic setup for a project with Remix.run and:
- TypeScript
- TailwindCSS
- Vite
- Vitest (unit tests)
- Scripting
- ESLint
- i18n support
- Icon generator
- Husky hooks
- remix-development-tools + plugins

## How to use

1. Initialize the repository with our CLI:
```bash
npx f42 init -t base-stack -o ./your-project-name-here
```
2. Install the dependencies:
```bash
npm install
```
3. Read through the README.md files in the project to understand our decisions.

4. Run the cleanup script:
```bash
npm run cleanup
```

This will remove everything in the project related to the base-stack like README.md etc. 
This is the first thing you should run after initializing the project.
After it is run it will remove itself from the package.json.

5. Start the development server:
```bash
npm run dev
```
6. Happy coding!

