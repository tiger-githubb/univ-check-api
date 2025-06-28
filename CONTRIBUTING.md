# Contributing to Attendance Management API System

Thank you for your interest in contributing!  
We welcome all improvements, bug fixes, documentation, and ideas.

---

## How to Contribute

1. **Fork the repository**  
   Click the "Fork" button at the top right of this page.

2. **Clone your fork**
   ```bash
   git clone https://github.com/tiger-githubb/univ-check-api.git
   cd univ-check-api
   ```

3. **Create a new branch**
   ```bash
   git checkout -b my-feature
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Make your changes**
   - Add features, fix bugs, or improve documentation.
   - Follow the project’s code style and structure.

6. **Test your changes**
   ```bash
   npm run dev
   ```

7. **Commit and push**
   ```bash
   git add .
   git commit -m "Describe your change"
   git push origin my-feature
   ```

8. **Open a Pull Request**
   - Go to your fork on GitHub.
   - Click "Compare & pull request".
   - Describe your changes and submit.

---

## Branch Naming & Pull Request Rules

- **Branch naming convention:**
  - For new features: `feat/short-description`
  - For bug fixes: `bugfix/short-description`
  - For maintenance or chores: `chore/short-description`
  - For documentation: `docs/short-description`
  - Example:  
    ```
    git checkout -b feat/user-authentication
    git checkout -b bugfix/fix-rating-validation
    ```

- **Pull Request Guidelines:**
  - Use a clear and descriptive title (e.g. `feat: add user authentication endpoint`)
  - In the PR description, explain **what** you changed and **why**
  - Reference related issues by number if applicable (e.g. `Closes #42`)
  - Make sure your branch is up to date with the target branch (usually `devmain` or `main`)
  - Ensure all tests pass before requesting a review
  - Assign reviewers if possible

---

## Code Style

- Use type hints and docstrings.
- Keep functions and classes small and focused.

---

## Documentation

- Update the `README.md` or docstrings if your change affects usage or API.
- Add comments to clarify complex code.

---

## Suggestions & Issues

- For feature requests or bug reports, please [open an issue](https://github.com/tiger-githubb/univ-check-api/issues).
- Be clear and provide as much context as possible.

---

Thank you for helping make this project better!