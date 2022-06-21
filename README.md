# My Tour Of Heroes Angular

- I flagged parts where I added and is not in the official doc by :capricorn: symbol which is my birthday zodiac symbol
- This tutorial meant to be:
  - From ground up
  - Introduction to basic app-design concepts/tools/terminology:
    - Setup your local development env
    - Use Angular CLI
    - Features which we will front in any data-driven app

## [First step](https://angular.io/tutorial/toh-pt0)

- Setup your local development env and workspace:
  - Angular supports only LTS version of Node.js
  - :capricorn: I install [this Angular extension](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) to make coding more robust and easier.
  - :capricorn: I installed prettier extension and configure VSCode to use it. Find more info in [this cheat sheet](https://cheatography.com/nodejsdeveloperskh/cheat-sheets/prettierrc/)
- Angular CLI:
  - Use it to create new component/service/etc
  - To install it do this: `pnpm add -g @angular/cli`
- Create new angular app:
  - `ng new my-tour-of-heroes-angular --package-manager pnpm`
  - :capricorn: [`create-angular-app my-tour-of-heroes-angular --package-manager pnpm`](https://github.com/kasir-barati/the-pragmatic-programmer/blob/main/customize-your-dev-env/create-angular-app.md)
- Run app in development env:
  - :capricorn: `pnpm start`
  - It seems to me like nodemon
- Develop your angular app in the context of Angular workspace.
  - Angular workspace:
    - Contains files of one/more project
    - `ng new` creates new workspace
    - Workspace files:
      - `angular.json` Configure how built, which package manager should be used to perform `ng add`, etc
      - `/app` contains our logic/data
      - `/assets` contains our assets and copy them as-is in the build/dist directory
      - `/environments` Sorta `.env` and its friends perform the same role as `.prod.env`.
        - :capricorn: We have multiple env, production, staging, development, ...
        - :capricorn: Everywhere we import `environment.ts`.
        - :capricorn: In `angular.json` we configure to replace the appropriate values in the `environment.ts` with `fileReplacements` config. We do that by `--configuration` flag in `ng`.
          ```cmd
          ng build --configuration production
          That production comes from angular.json.
          ```
        - Do not put sensitive data inside `environment.ts`.
        - **Better and more typed way** [here in this repo](https://github.com/kasir-barati/task-tracker-traversy-media/tree/dev/src/environments)
      - `favicon.ico` App icon in bookmark bar
      - `index.html` Main HTML which will be filled by Angular
      - `main.ts` is the entrypoint of our Angular app.
      - `polyfills.ts` Take care of browser compatibility
      - `styles.css` Global CSS which lessen the burden of striving towards creating consistent look across application
      - `test.ts` unit tests entrypoint
    - `ng add`/`ng generate` and their friends should be issued within an Angular workspace
- :capricorn: Change Angular compiler:
  - We have two compiler in Angular:
    1. JIT which stands for **J**ust **I**n **T**ime.
       - AFAIK this is good for dev
       - Compile whenever needed
    2. AOT where is the abbreviation of **A**head **O**f **T**ime.
       - NSFW but based on my gut it is good for prod env
       - Compile first and then loaded by browser
- _Interpolation binding_ syntax which we use in templates: `{{ title }}`. It takes the value from `app.component.ts`
