# stonly-recruitment-task

## Table of Contents

- [Task description](#task-description)
- [Getting started](#getting-started)

## Task description

### Create a simple issue tracker

An issue should have a title, description and one of three states: open, pending and closed. Once an issue is pending it cannot be set back to open, similarly if an issue is closed it cannot be set back to pending or open.

The minimal requirement is to provide a list view where you can see the issues and change their state. Use JavaScript (can be transpiled, but don't go crazier than ECMA stage 3). Other than that, you're in charge. Choose whatever tools you're comfortable with and add whatever features you think would make sense. Do it as if it was your regular job assignment. Oh, and we really like tests.

It should take you about 6-8 hours.

## Getting started

1. Clone repository:

```sh
git clone git@github.com:perfringis/stonly-recruitment-task.git
```

2. Go to a project and install packages.

```sh
pnpm install
```

3. Configure `.env` file based on `.env.dev` template.

```sh
POSTGRESQL_DB_HOST=
POSTGRESQL_DB_PORT=
POSTGRESQL_DB_USERNAME=
POSTGRESQL_DB_PASSWORD=
POSTGRESQL_DB_NAME=
```

4. Run the project in `dev` mode. List of all commands you will find in the `package.json` file.

```sh
pnpm run start:dev
```