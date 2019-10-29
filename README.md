# Development

## Prerequisites
This project is designed to be developed using VSCode's remote container support. It is not required that go or node be installed on the development machine. More information can be found here:
https://code.visualstudio.com/docs/remote/containers

This requires the following VSCode extension to be installed:
https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers

## Starting the dev environment
To begin development, execute the following command from the command pallet (`ctrl+shift+p`):
`Remote-Container: Open Folder in Container...`

And then navigate to the `packages/game` directory on your filesystem and hit `open`. This will cause docker-compose to spool up both the `game` and `web` containers, and then cause VSCode to attach to the `game` container. At this point, neither the actual game server or the webpack dev server are started. To start the actual `game` server, run the debug task from within VSCode (default shortcut is `F5`). The game service will be now available on your development host machine at `http://localhost:3001`.

Next, launch a separate VSCode window, and attach to the `web` container using the same `Remote-Container: Open Folder in Container...` command. However, instead of launching the debug task, open a terminal in the container (using VSCode's built in terminal feature), navigate to the project root (`cd /packages/web`) and execute `yarn install && yarn start`. This will begin the webpack development server, listening on the host machine at `http://localhost:3000`.

At this point you can see the entire project by visiting `http://localhost:3000`. You will be able to use VSCode's go debugger for the server, and use Chrome's debug tools for debugging the client code.

# Production
To build and run this application in a "production" environment, simply execute
`docker-compose up`

In the repository's root directory. This will result in the `web` container begin built as an nginx server serving out the production bundle, and the `game` container running the go instance.