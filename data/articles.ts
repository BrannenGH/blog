import { RawArticle } from "@/models";

/**
 * Article test data
 */
export const articles: RawArticle[] = [
  {
    title: "TEST DATA NOT FOR PROD: How to use CSS Grid for Responsive Web Design",
    author: "Jane Smith",
    date: "2023-04-27",
    content: `
CSS Grid is a powerful tool for creating responsive web designs that can adapt to different screen sizes and resolutions. With CSS Grid, you can easily create complex layouts that can scale up or down depending on the device or browser being used.

Here are some tips and best practices for using CSS Grid for responsive web design:

- Use media queries to define different grid layouts for different screen sizes
- Use grid template areas to define complex layouts and positioning
- Use grid auto-placement to automatically position items within the grid
- Use the repeat() function to define grid columns and rows in a more concise way
- Use the minmax() function to define flexible grid sizes that can adapt to different content sizes
- Use grid-gap to add spacing between grid items

By following these tips and best practices, you can create responsive web designs that work well on a variety of devices and screen sizes.`,
    contentPreview:
      "CSS Grid is a powerful tool for creating responsive web designs that can adapt to different screen sizes and resolutions.",
    tags: ["CSS", "Responsive Design"],
  },
  {
    title: "TEST DATA NOT FOR PROD: How to Set Up a Vue.js Development Environment",
    author: "John Doe",
    date: "2023-04-26",
    content: `
Vue.js is a popular JavaScript framework for building dynamic user interfaces and single-page applications. If you're new to Vue.js, setting up a development environment can seem overwhelming. But with the right tools and configurations, you can get up and running quickly.

Here are the steps to set up a Vue.js development environment:

1. Install Node.js and npm (Node Package Manager)
2. Install the Vue CLI (Command Line Interface) globally using npm
3. Create a new Vue project using the Vue CLI
4. Install any additional dependencies or plugins you may need for your project
5. Run the development server and start coding!

By following these steps, you can quickly set up a Vue.js development environment and start building amazing applications.`,
    contentPreview:
      "Vue.js is a popular JavaScript framework for building dynamic user interfaces and single-page applications.",
    tags: ["Vue.js", "JavaScript", "Development"],
  },
  {
    title: "TEST DATA NOT FOR PROD: Introduction to Test-Driven Development (TDD)",
    author: "Alice Brown",
    date: "2023-04-25",
    content: `
Test-Driven Development (TDD) is a software development methodology where developers write automated tests before writing the code. This approach has many benefits, such as improved code quality, faster feedback loops, and better documentation.

Here are the basic steps of Test-Driven Development:

1. Write a test case for a new feature or behavior
2. Run the test and verify that it fails
3. Write the minimum amount of code needed to make the test pass
4. Refactor the code to improve its design and maintainability
5. Repeat the process for each new feature or behavior

By following this process, you can ensure that your code is thoroughly tested and that new features are added in a controlled and systematic way.`,
    contentPreview:
      "Test-Driven Development (TDD) is a software development methodology where developers write automated tests before writing the code.",
    tags: ["TDD", "Software Development", "Testing"],
  },
  {
    title: "TEST DATA NOT FOR PROD: GitHub Flavored Markdown: A Comprehensive Guide",
    author: "Jack Smith",
    date: "2023-04-30",
    content: `
GitHub Flavored Markdown (GFM) is an extension of the standard Markdown syntax that adds several features specific to the GitHub platform. These features include syntax highlighting, task lists, tables, and more.

Here's a comprehensive guide to using all the features of GitHub Flavored Markdown:

# Headings

You can create headings by prefixing a line with one or more "#" characters. For example:

# Heading 1
## Heading 2
### Heading 3

# Emphasis

You can add emphasis to text by wrapping it in asterisks or underscores. For example:

*Italic*
_Italic_

**Bold**
__Bold__

# Lists

You can create unordered lists by prefixing each item with an asterisk or a hyphen. For example:

- Item 1
- Item 2
- Item 3

You can create ordered lists by prefixing each item with a number followed by a period. For example:

1. Item 1
2. Item 2
3. Item 3

You can create task lists by prefixing each item with a hyphen and square brackets. For example:

- [x] Task 1
- [ ] Task 2
- [ ] Task 3

# Links

You can create links by wrapping the link text in square brackets and the link URL in parentheses. For example:

[Google](https://www.google.com/)

You can create reference-style links by defining the link URL at the bottom of the page and referencing it in the link text. For example:

[Google][1]

[1]: https://www.google.com/

# Images

You can add images by wrapping the image text in square brackets and the image URL in parentheses. For example:

![Alt text](https://www.example.com/image.jpg)

You can create reference-style images by defining the image URL at the bottom of the page and referencing it in the image text. For example:

![Alt text][2]

[2]: https://www.example.com/image.jpg

# Code Blocks

You can create code blocks by wrapping the code in triple backticks. For example:

\`\`\`javascript
function helloWorld() {
  console.log("Hello, world!");
}
\`\`\`

You can create inline code by wrapping the code in single backticks. For example:

\`console.log("Hello, world!");\`

# Tables

You can create tables by using hyphens to define the table headers and pipes to separate the columns. For example:

| Column 1 | Column 2 |
|----------|----------|
| Row 1, Column 1 | Row 1, Column 2 |
| Row 2, Column 1 | Row 2, Column 2 |

# Blockquotes

You can create blockquotes by prefixing a line with a ">" character. For example:

> This is a blockquote.

# Horizontal Rules

You can create horizontal rules by using three or more hyphens, asterisks, or underscores on a line by themselves. For example:

---

That's a comprehensive guide to using all the features of GitHub Flavored Markdown.`,
    contentPreview:
      "GitHub Flavored Markdown (GFM) is an extension of the standard Markdown syntax that adds several features specific to the GitHub platform.",
    tags: ["Markdown", "GitHub", "Syntax"],
  },
];
