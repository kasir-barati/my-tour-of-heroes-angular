# My Tour Of Heroes Angular

- I flagged parts where I added and is not in the official doc by :capricorn: symbol which is my birthday zodiac symbol
- This tutorial meant to be:
  - From ground up
  - Introduction to basic app-design concepts/tools/terminology:
    - Setup your local development env
    - Use Angular CLI
    - Features which we will front in any data-driven app

# :capricorn: General info which is correct in all steps

- use `--skip-tests` to tell Angular CLI that you do not wanna write unit test for that schematic. BTW I do not advocate this idea, but sometimes we need it.
- I'd like to keep related things in a directory. I mean I do not do something like this: `ng generate service services/user` and `ng generate component components/user` instead I'll prefer to keep to this method: `ng generate component user && ng generate service user/user`

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

## [Second step](https://angular.io/tutorial/toh-pt1)

- To create a new component we rely on the power of Angular CLI:
  - `ng generate component heroes`
  - This command will generates a new component in `/app` with `heroes` name.
- Now its time to create a new interface for the `hero`es type. In tut they create it in the `/app/hero.ts`.
  - Later I'll refactor this like this: `mv src/app/hero.ts app/heroes/hero.model.ts`
  - :capricorn: In Angular from the beginning we are typed. Although you can ignore it but I do not suggest it.
- Another cool feature which is very close to handlebars is that we can define custom functions and call them in our templates. In Angular we call them `Pipe`.
  - {{ hero.name | uppercase }}
  - Pipes usually is used to format data before showing them
  - We have built-in pipes and the functionality to create new custom pipes
- To edit hero's name:
  - We wanna do it in a live manner.
  - I wanna see the data from component to the view flows and vice versa.
  - We call this type of data binding **2 way data binding**.
  - `[(ngModel)]` is the directive that we need.
  - Angular with metadata which we pass to it knows how our app works. We have seen the `@Component` decorator and its metadata. `@NgModule` is another decorator which is very important.
    - For example now we need to add `FormsModule` in the `imports`'s in `AppModule`.
    - Or each component to be known by Angular have to be declared in one `@NgModule`. Good Angular CLI done it up until now. Remember we never did declare any component to Angular.

## [Third step](https://angular.io/tutorial/toh-pt2)

- `*ngFor` used to:
  - Show them in view
  - A repeater directive
- Follow semantic HTML and use appropriate tags. Because of [accessibility](https://angular.io/guide/accessibility)
  - For example instead of giving `(click)` event to the li we used `button` tag.
  - People with visual or motor impairment uses special technologies to help them surfing web and those technologies leverage the semantic HTML
- Each css file in each component is scoped to that component. No pollution.
- To bind events we use `(specifiedEventName)`.
  - :capricorn: A list of available events:
    - [Stackoverflow Q&A](https://stackoverflow.com/questions/34928461/)
    - [Angular awful terrible documentation](https://angular.io/guide/event-binding)

## [Forth step](https://angular.io/tutorial/toh-pt3)

- Keeping all functionalities in one component is not maintainable.
- So we do this: largeComponent / asMuchAsIsRational = many small components;
- Each sub-component focus on a specific **task**/**workflow**
- Now we wanna break our own heroes component:
  - `ng generate component hero-details`
  - We need now to pass the selected hero to the generated component.
    - Sharing data between child and parent component is a common pattern
    - `@Input` and `@Output` decorator are specialist in this topic.
      - `@Input`:
        - Pass data from parent to child
        - Bind data from parent to child
        - Parent use [property binding](https://angular.io/guide/property-binding) to pass data.
        - To watch changes we can use [onChanges lifecycle hook](https://angular.io/guide/lifecycle-hooks#onchanges)
      - `@Output`:
        - Pass data from child to parent
        - Bind triggered event from child to parent
        - Parent uses [event binding](https://angular.io/guide/event-binding) to catch triggered events from child component
        - A doorway to pass data from child to parent
        - Child component raise an event
        - Parent can catch passed values with `$event`
    - Parent component is the context for child component
