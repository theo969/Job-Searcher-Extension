# Contributing to Job-Searcher-Extension

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
>
> - Star the project
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues

## Table of Contents

- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [How to create your first PR!](#suggesting-enhancements)
- [Styleguides](#styleguides)
  - [Commit Messages](#commit-messages)

## I Want To Contribute

### Reporting Bugs

If you found a bug or issues of this project feel free to create new issue and please follow this steps so we can fix it as fast as possible

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](https://github.com/SayyidMuhammadA/Job-Searcher-Extensionissues?q=label%3Abug).
- Collect information about the bug:
  - OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
  - Version of this project
  - Possibly your input and the output
  - Can you reliably reproduce the issue? And can you also reproduce it with older versions?

### How to create your first PR!

### Make sure to have

1. Node JS. version > 16
2. Typescript
3. Postgresql & Pgadmin4

#### First follow this steps to fix our apps 😃

1. Write this following command on your terminal: `https://github.com/SayyidMuhammadA/Job-Searcher-Extension.git`
2. After that go to packages folder inside of our app and go to the jse-backend folder and create new file called .env which is our DB will connect to that file and write this following code:

```
DB_PORT=YOUR_DB_PORT
DATABASE=YOUR_DB_NAME
DB_USER=YOUR_DB_USERNAME
DB_PASS=YOUR_DB_PASSWORD
```

And after doing that go to pgadmin4 and create new Database and then fill all required input and after doing that please don't click the save button go to Connection tab and copy the PORT and USERNAME and PASSWORD and then paste it into the .env file and then go back again and goto General Tab and copy the DB Name that you have filled it and paste it into the .env file

After doing all that you're ready to install the dependencies and you can follow this steps that I've provided:

_Make sure you're inside of the jse-backend folder_ Open it with your terminal and write this following commands: `npm install` or `yarn install` and after that run the backend by doing this command `npm run dev` or `yarn run dev`

3. After you have successfully run our jse-backend you can go to jse-frontend outside of jse-backend folder and open it with your terminal add write this following commands `npm install` or `yarn install` and after you have installed all the dependencies you can run our frontend by doing `npm run dev` or `yarn run dev`

4. Make some changes ⚒

5. Create new branch by doing this following command `git checkout -b fix-branch`

6. Commit your changes;

## Commit messages 

- If your changes was bug you can do it like this: ``` git commit -am "Fix: The navbar not responsive in mobile view"
- If your changes was adding new feature you can do it like this: `git commit -am "Feat: Dark mode button"`
- If your changes was improving the Doc you can do it like this: `git commit -am "Docs: Something was missing"`

### And done you have successfully contributing to this project will merge your pr very soon 🤩
