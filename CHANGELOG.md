# Changelog

## [1.3.1](https://github.com/provably-fair-betting/verifierform-stake/compare/v1.3.0...v1.3.1) (2026-05-29)


### Miscellaneous Chores

* bump verifierform-stake-payline-extractor to v2.0.0 ([d2bb64f](https://github.com/provably-fair-betting/verifierform-stake/commit/d2bb64f54a6bc7ed9a429f54a0812c3c4c0e9ee2))
* update dependencies to renamed packages ([8b2bd74](https://github.com/provably-fair-betting/verifierform-stake/commit/8b2bd7493ee142d244ff89545cad62a62adb02d1))
* update dependencies to renamed packages ([e0166b0](https://github.com/provably-fair-betting/verifierform-stake/commit/e0166b00767f95b7af8d313428dcc99cee9e3806))
* update pnpm lockfile for renamed dependencies ([c77d21d](https://github.com/provably-fair-betting/verifierform-stake/commit/c77d21d0f8a8b617db8d81fbb3f9183b5c311597))

## [1.3.0](https://github.com/provably-fair-betting/verifierform-stake/compare/v1.2.2...v1.3.0) (2026-05-29)


### Features

* add Docker image build and ghcr.io publish workflow ([813a403](https://github.com/provably-fair-betting/verifierform-stake/commit/813a4037f2c6c7a6021f2fd0e7f304b698224f01))
* add Docker image publish pipeline and runtime bet-lookup config ([64b1b08](https://github.com/provably-fair-betting/verifierform-stake/commit/64b1b08545923fe34c97776259b639ce16d84016))

## [1.2.2](https://github.com/provably-fair-betting/verifierform-stake/compare/v1.2.1...v1.2.2) (2026-05-19)


### Bug Fixes

* **bet-lookup:** add overloads so no-signal call returns non-nullable BetLookupResult ([3d8ee83](https://github.com/provably-fair-betting/verifierform-stake/commit/3d8ee83e62ea36971948383110611d250315d5f6))
* **bet-lookup:** add overloads so no-signal call returns non-nullable BetLookupResult ([6b68527](https://github.com/provably-fair-betting/verifierform-stake/commit/6b68527264fa6069c4523948590064b9fcdbe8ae))

## [1.2.1](https://github.com/provably-fair-betting/verifierform-stake/compare/v1.2.0...v1.2.1) (2026-05-19)


### Bug Fixes

* **lint:** exclude CHANGELOG.md from prettier ([af8ae8b](https://github.com/provably-fair-betting/verifierform-stake/commit/af8ae8b803c6a9bde1ed8622e1d49febf3c4718b))
* **lint:** exclude CHANGELOG.md from prettier ([7054eed](https://github.com/provably-fair-betting/verifierform-stake/commit/7054eed3ad17d94372325f12639b89d4aec32591))

## [1.2.0](https://github.com/provably-fair-betting/verifierform-stake/compare/v1.1.0...v1.2.0) (2026-05-19)


### Features

* add bet lookup feature ([4ee7ace](https://github.com/provably-fair-betting/verifierform-stake/commit/4ee7ace3260fa4d3158583e2d47d5322a8c6ef84))
* add bet lookup feature ([245b91e](https://github.com/provably-fair-betting/verifierform-stake/commit/245b91e7247e8c8c68cb87d9383b1d2afe4264c2))
* **bet-lookup:** animate panel open and lighten background ([409b78f](https://github.com/provably-fair-betting/verifierform-stake/commit/409b78ffdca01c2affa988063a7b8007938db9d9))
* **bet-lookup:** improve light mode affordance and success notification UX ([008a6fd](https://github.com/provably-fair-betting/verifierform-stake/commit/008a6fd294a7506a454016ccf5c03fcab06fac13))
* **mock-api:** add fixtures for all supported lookup games ([339de5e](https://github.com/provably-fair-betting/verifierform-stake/commit/339de5e794142f08f4456f8ddb83348dd3fa8c42))


### Bug Fixes

* **a11y:** add role=alert to bet lookup error message ([85c2012](https://github.com/provably-fair-betting/verifierform-stake/commit/85c201288c8352ad611e27b09291b5200124d5ca))
* **bet-lookup:** abort stalled requests, lock keyboard, fix dev:lookup lifecycle ([abbaea8](https://github.com/provably-fair-betting/verifierform-stake/commit/abbaea8485dd81e89bcbcc2547633024e806e590))
* **bet-lookup:** gate UI on non-empty URL and restore fetch stub after tests ([6b71afb](https://github.com/provably-fair-betting/verifierform-stake/commit/6b71afbbd67cdd0e1a244f690f7523b3c2443c60))
* **bet-lookup:** lock all interaction while lookup is in flight ([7a62c76](https://github.com/provably-fair-betting/verifierform-stake/commit/7a62c76cdfdb40f1cef46cb0b42cb1b361493139))
* **bet-lookup:** normalise base URL to handle trailing slash ([4058215](https://github.com/provably-fair-betting/verifierform-stake/commit/4058215600b1886454846c8291311b0ef532ffe3))
* **bet-lookup:** prettier formatting and narrow dismiss-mid-flight URL assertion ([7e9d3f0](https://github.com/provably-fair-betting/verifierform-stake/commit/7e9d3f081ce1d9a6bbe54c716aed5d273efa4113))
* **bet-lookup:** restore inert state, clear timeout on dismiss, URL guard, noopener ([669eca3](https://github.com/provably-fair-betting/verifierform-stake/commit/669eca380d2cd5afa16a30602d2cce17cd4f4a46))
* **bet-lookup:** update unsupported_game error message to be game-agnostic ([61c6340](https://github.com/provably-fair-betting/verifierform-stake/commit/61c634042ebed7ae8c4d8f28ccdc3c662329b780))
* clear stale successGame when a new bet lookup is submitted ([2c92bcf](https://github.com/provably-fair-betting/verifierform-stake/commit/2c92bcf0a20968e888bdad9e03aa3fa8a0de2935))
* **coverage:** add bet-lookup to coverage include and plug two missin… ([53dac30](https://github.com/provably-fair-betting/verifierform-stake/commit/53dac30c7485e3432fc83857058a193668527ec6))
* **coverage:** add bet-lookup to coverage include and plug two missing branches ([0bc01ca](https://github.com/provably-fair-betting/verifierform-stake/commit/0bc01ca01dcbb87fc27b22452eec60afca02d1fb))
* **env:** commit default public env so static imports resolve without setup ([9473279](https://github.com/provably-fair-betting/verifierform-stake/commit/9473279fffc2c70fab637f30a8fc540a069b66c9))
* **eslint:** add keys to each blocks (svelte/require-each-key) ([5e50983](https://github.com/provably-fair-betting/verifierform-stake/commit/5e509837493efdbb6ab8594d07aa2f8feb737cb8))
* **eslint:** replace Set with SvelteSet in reactive contexts (svelte/prefer-svelte-reactivity) ([6f23c0a](https://github.com/provably-fair-betting/verifierform-stake/commit/6f23c0aa648c87b38a0d122cce6758bbd6c2d17c))
* **eslint:** resolve remaining rule violations ([4d6e82a](https://github.com/provably-fair-betting/verifierform-stake/commit/4d6e82a79c77e1156d03bab98f928a0ebaa32c47))
* **eslint:** resolve unused variable errors (@typescript-eslint/no-unused-vars) ([25bd841](https://github.com/provably-fair-betting/verifierform-stake/commit/25bd84105d854ec26f4837628cd42cee8b9cdfa6))
* **eslint:** suppress false-positive no-navigation-without-resolve warnings ([9695dda](https://github.com/provably-fair-betting/verifierform-stake/commit/9695dda2192e52348097284f5b3b9616b88980e9))
* update stale payline imports to canonical src/lib/paylines path ([ed388e8](https://github.com/provably-fair-betting/verifierform-stake/commit/ed388e889713065717448b08295836c13588dd4e))


### Code Refactoring

* **bet-lookup:** align error contract with backend response body ([7979353](https://github.com/provably-fair-betting/verifierform-stake/commit/797935308efa08018eb7f36b4406f3b0206d3c8b))
* **bet-lookup:** improve cleanliness and UI polish ([3da0996](https://github.com/provably-fair-betting/verifierform-stake/commit/3da0996df90af17dda2e64f819faa3cc65db4df5))


### Tests

* **bet-lookup:** add unit tests for slug mapping, params, and error cases ([c83ed1b](https://github.com/provably-fair-betting/verifierform-stake/commit/c83ed1b9881024d62694ec3d5eeaef499b799d8b))
* **e2e:** add playwright tests for abort controller, inert, and clean reopen ([00e8f47](https://github.com/provably-fair-betting/verifierform-stake/commit/00e8f47cfcee2216560ac260a047ce3b34d8e949))
* **e2e:** complete a full lookup after mid-flight dismiss to verify state recovery ([94b89bf](https://github.com/provably-fair-betting/verifierform-stake/commit/94b89bf51dc52596b35e0a99ded7aa52b1bf3f40))


### Miscellaneous Chores

* **dev:lookup:** use concurrently to tie mock API lifecycle to Vite ([59c5980](https://github.com/provably-fair-betting/verifierform-stake/commit/59c598061d71c183d84488e8774b7310afedaa30))
* **env:** fix misleading comment in .env defaults ([6f42a9f](https://github.com/provably-fair-betting/verifierform-stake/commit/6f42a9febee75f41e833033367c145818408bad5))
* remove ci from release-please changelog sections ([a9c7acc](https://github.com/provably-fair-betting/verifierform-stake/commit/a9c7acc2288e679cd595d13eb7b64eb968f2f444))
* update badges [skip ci] ([c99fb2d](https://github.com/provably-fair-betting/verifierform-stake/commit/c99fb2dcc6955726d5b1c0d347adc922124ffccf))

## [1.1.0](https://github.com/provably-fair-betting/verifierform-stake/compare/v1.0.2...v1.1.0) (2026-05-11)

### Features

- **sync:paylines:** warn when paylines output directory already exists ([3d5701e](https://github.com/provably-fair-betting/verifierform-stake/commit/3d5701ef8871067fc18964c923012436fed83869))
- **sync:testdata:** warn when testcases output directory already exists ([a8abb7f](https://github.com/provably-fair-betting/verifierform-stake/commit/a8abb7f45c8b7a22d6d5b60e9f990bae0a233836))

### Bug Fixes

- suppress sveltekit full-reload in vitest to prevent UI disconnect ([30b16c7](https://github.com/provably-fair-betting/verifierform-stake/commit/30b16c766f03336a5478dbff63122ff63a8ed0c4))
- **sync:paylines:** prompt for confirmation before overwriting existing paylines ([73b1e0a](https://github.com/provably-fair-betting/verifierform-stake/commit/73b1e0aea377724b178a49f268228b7fac99092c))

### Tests

- add full game result test coverage and tooling integration ([7e10253](https://github.com/provably-fair-betting/verifierform-stake/commit/7e10253d1e5d912606725a6c64c14dbaefd4237b))
- add result component tests for all remaining games, fix test placement ([d66efbb](https://github.com/provably-fair-betting/verifierform-stake/commit/d66efbb07b7da471f155c30fcfdaf406e7b9eee1))
- populate testcases and paylines, migrate and expand game result tests ([45c4bd4](https://github.com/provably-fair-betting/verifierform-stake/commit/45c4bd42bca3238e0d0da5e722b8530d4806150b))

### Miscellaneous Chores

- exclude composables from coverage ([c505078](https://github.com/provably-fair-betting/verifierform-stake/commit/c50507863c1f28dde4fbdc78ea0817c7eec777f9))
- fix coverage config to correctly include domain and result files ([f4a5f2f](https://github.com/provably-fair-betting/verifierform-stake/commit/f4a5f2fb7a0ef8d76d6cdc1d81bc01cf010faa0d))
- integrate verifierform-stake-paylines, centralise paylines JSONs ([b47fc1f](https://github.com/provably-fair-betting/verifierform-stake/commit/b47fc1f0dcf6249d9865b1363877c2c521c9b136))
- integrate verifierform-stake-testdata as dev dependency ([440d261](https://github.com/provably-fair-betting/verifierform-stake/commit/440d2617f7ceaedd372c5e585c5d133df0bbee33))
- remove @playwright/test dependency and e2e scripts ([c1ee2dc](https://github.com/provably-fair-betting/verifierform-stake/commit/c1ee2dc0cade7abc98d023328118a93e3ada3051))
- remove e2e test step and playwright install from CI ([0c6d592](https://github.com/provably-fair-betting/verifierform-stake/commit/0c6d592fae159ca5ceaf6ee05f87deecdb9f9ceb))
- remove scarabspins-tomeoflife folder, superseded by slots ([7a4ff35](https://github.com/provably-fair-betting/verifierform-stake/commit/7a4ff355ee063050889f662aa7407d29b5529ea6))
- remove unused color util and fetch-pack-assets script ([29fefb8](https://github.com/provably-fair-betting/verifierform-stake/commit/29fefb83f00b6134d909ead7ec55fcfe33147281))
- restrict game coverage to Result components only ([1b7ef4a](https://github.com/provably-fair-betting/verifierform-stake/commit/1b7ef4afc49bddd3662434a7a944eab9c064a5a8))
- simplify coverage to domain impl files and result components only ([18b2dc4](https://github.com/provably-fair-betting/verifierform-stake/commit/18b2dc4a2723bd174a48e7289da18b508fdb7a41))
- update badges [skip ci] ([f1ff556](https://github.com/provably-fair-betting/verifierform-stake/commit/f1ff55610f2f3ff757121246d2c16f2df138db23))

## [1.0.2](https://github.com/provably-fair-betting/verifierform-stake/compare/v1.0.1...v1.0.2) (2026-04-30)

### Miscellaneous Chores

- **release:** remove component prefix from release tags ([dea341e](https://github.com/provably-fair-betting/verifierform-stake/commit/dea341e96514fa5692782709c200666f644c3ac9))
- update badges [skip ci] ([5b95833](https://github.com/provably-fair-betting/verifierform-stake/commit/5b95833a853dbea212b41f43b7f8769b8c066457))

## [1.0.1](https://github.com/provably-fair-betting/verifierform-stake/compare/verifierform-stake-v1.0.0...verifierform-stake-v1.0.1) (2026-04-30)

### Bug Fixes

- **ci:** rewrite SSH git URLs to HTTPS for PAT auth ([2c85a76](https://github.com/provably-fair-betting/verifierform-stake/commit/2c85a7625744fe070ac8541b2216cbeab7ef6edd))
- **config:** resolve unit test warnings ([0268dcb](https://github.com/provably-fair-betting/verifierform-stake/commit/0268dcb3473401eda8599988574eae22fcf01e2e))
- **e2e:** use pnpm in webServer command to suppress npm env warnings ([5aa14da](https://github.com/provably-fair-betting/verifierform-stake/commit/5aa14daf7b5cacb0eadec36de8f017b9fab1eec2))
- **tests:** resolve 36 failing unit tests ([6cdd1e7](https://github.com/provably-fair-betting/verifierform-stake/commit/6cdd1e738f4d3da5ca1ba50b81f60f8c7ae3cf59))
- **warnings:** resolve Svelte 5 reactivity and Vite deprecation warnings ([cb61d08](https://github.com/provably-fair-betting/verifierform-stake/commit/cb61d085a2a2e0f2514679c6abbc59de8f409bdc))

### Tests

- **darts:** move correctness verification to unit tests, optimise e2e ([4e9a531](https://github.com/provably-fair-betting/verifierform-stake/commit/4e9a531ee253a596f347de019c01e791e1f2b034))

### Continuous Integration

- **badges:** replace gist-based badges with local svg approach ([f86555f](https://github.com/provably-fair-betting/verifierform-stake/commit/f86555f32b5f919a13e0ef71b2b1701324cfb141))

### Miscellaneous Chores

- **deps:** upgrade prettier-plugin-tailwindcss to 0.8.0 ([8e3660e](https://github.com/provably-fair-betting/verifierform-stake/commit/8e3660eb64bee7a20b931526f89e60b7aabc0766))
- initial 1.0.0 release ([189a643](https://github.com/provably-fair-betting/verifierform-stake/commit/189a643665bc7f0590623d4c934f622f2e77d0d3))
- **release:** add bootstrap-sha to anchor release-please at v1.0.0 ([5b643e2](https://github.com/provably-fair-betting/verifierform-stake/commit/5b643e279d0893b4f06c9d8f3abf9d86abcdd5a9))
- **release:** expand changelog sections to include all commit types ([4f66eb5](https://github.com/provably-fair-betting/verifierform-stake/commit/4f66eb51ebd39740a67cdd3a97ec908e4ef9056d))
- rename package to verifierform-stake ([616e3d7](https://github.com/provably-fair-betting/verifierform-stake/commit/616e3d7559b9fcc127e9dc4ff4ed79d86bbe9795))
- trigger release-please regeneration ([ff3d7a1](https://github.com/provably-fair-betting/verifierform-stake/commit/ff3d7a17c6c9953539063b8c3d61ad40eda1db80))
