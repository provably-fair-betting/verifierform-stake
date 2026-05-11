# Changelog

## [1.1.0](https://github.com/provably-fair-betting/verifierform-stake/compare/v1.0.2...v1.1.0) (2026-05-11)


### Features

* **sync:paylines:** warn when paylines output directory already exists ([3d5701e](https://github.com/provably-fair-betting/verifierform-stake/commit/3d5701ef8871067fc18964c923012436fed83869))
* **sync:testdata:** warn when testcases output directory already exists ([a8abb7f](https://github.com/provably-fair-betting/verifierform-stake/commit/a8abb7f45c8b7a22d6d5b60e9f990bae0a233836))


### Bug Fixes

* suppress sveltekit full-reload in vitest to prevent UI disconnect ([30b16c7](https://github.com/provably-fair-betting/verifierform-stake/commit/30b16c766f03336a5478dbff63122ff63a8ed0c4))
* **sync:paylines:** prompt for confirmation before overwriting existing paylines ([73b1e0a](https://github.com/provably-fair-betting/verifierform-stake/commit/73b1e0aea377724b178a49f268228b7fac99092c))


### Tests

* add full game result test coverage and tooling integration ([7e10253](https://github.com/provably-fair-betting/verifierform-stake/commit/7e10253d1e5d912606725a6c64c14dbaefd4237b))
* add result component tests for all remaining games, fix test placement ([d66efbb](https://github.com/provably-fair-betting/verifierform-stake/commit/d66efbb07b7da471f155c30fcfdaf406e7b9eee1))
* populate testcases and paylines, migrate and expand game result tests ([45c4bd4](https://github.com/provably-fair-betting/verifierform-stake/commit/45c4bd42bca3238e0d0da5e722b8530d4806150b))


### Miscellaneous Chores

* exclude composables from coverage ([c505078](https://github.com/provably-fair-betting/verifierform-stake/commit/c50507863c1f28dde4fbdc78ea0817c7eec777f9))
* fix coverage config to correctly include domain and result files ([f4a5f2f](https://github.com/provably-fair-betting/verifierform-stake/commit/f4a5f2fb7a0ef8d76d6cdc1d81bc01cf010faa0d))
* integrate verifierform-stake-paylines, centralise paylines JSONs ([b47fc1f](https://github.com/provably-fair-betting/verifierform-stake/commit/b47fc1f0dcf6249d9865b1363877c2c521c9b136))
* integrate verifierform-stake-testdata as dev dependency ([440d261](https://github.com/provably-fair-betting/verifierform-stake/commit/440d2617f7ceaedd372c5e585c5d133df0bbee33))
* remove @playwright/test dependency and e2e scripts ([c1ee2dc](https://github.com/provably-fair-betting/verifierform-stake/commit/c1ee2dc0cade7abc98d023328118a93e3ada3051))
* remove e2e test step and playwright install from CI ([0c6d592](https://github.com/provably-fair-betting/verifierform-stake/commit/0c6d592fae159ca5ceaf6ee05f87deecdb9f9ceb))
* remove scarabspins-tomeoflife folder, superseded by slots ([7a4ff35](https://github.com/provably-fair-betting/verifierform-stake/commit/7a4ff355ee063050889f662aa7407d29b5529ea6))
* remove unused color util and fetch-pack-assets script ([29fefb8](https://github.com/provably-fair-betting/verifierform-stake/commit/29fefb83f00b6134d909ead7ec55fcfe33147281))
* restrict game coverage to Result components only ([1b7ef4a](https://github.com/provably-fair-betting/verifierform-stake/commit/1b7ef4afc49bddd3662434a7a944eab9c064a5a8))
* simplify coverage to domain impl files and result components only ([18b2dc4](https://github.com/provably-fair-betting/verifierform-stake/commit/18b2dc4a2723bd174a48e7289da18b508fdb7a41))
* update badges [skip ci] ([f1ff556](https://github.com/provably-fair-betting/verifierform-stake/commit/f1ff55610f2f3ff757121246d2c16f2df138db23))

## [1.0.2](https://github.com/provably-fair-betting/verifierform-stake/compare/v1.0.1...v1.0.2) (2026-04-30)


### Miscellaneous Chores

* **release:** remove component prefix from release tags ([dea341e](https://github.com/provably-fair-betting/verifierform-stake/commit/dea341e96514fa5692782709c200666f644c3ac9))
* update badges [skip ci] ([5b95833](https://github.com/provably-fair-betting/verifierform-stake/commit/5b95833a853dbea212b41f43b7f8769b8c066457))

## [1.0.1](https://github.com/provably-fair-betting/verifierform-stake/compare/verifierform-stake-v1.0.0...verifierform-stake-v1.0.1) (2026-04-30)


### Bug Fixes

* **ci:** rewrite SSH git URLs to HTTPS for PAT auth ([2c85a76](https://github.com/provably-fair-betting/verifierform-stake/commit/2c85a7625744fe070ac8541b2216cbeab7ef6edd))
* **config:** resolve unit test warnings ([0268dcb](https://github.com/provably-fair-betting/verifierform-stake/commit/0268dcb3473401eda8599988574eae22fcf01e2e))
* **e2e:** use pnpm in webServer command to suppress npm env warnings ([5aa14da](https://github.com/provably-fair-betting/verifierform-stake/commit/5aa14daf7b5cacb0eadec36de8f017b9fab1eec2))
* **tests:** resolve 36 failing unit tests ([6cdd1e7](https://github.com/provably-fair-betting/verifierform-stake/commit/6cdd1e738f4d3da5ca1ba50b81f60f8c7ae3cf59))
* **warnings:** resolve Svelte 5 reactivity and Vite deprecation warnings ([cb61d08](https://github.com/provably-fair-betting/verifierform-stake/commit/cb61d085a2a2e0f2514679c6abbc59de8f409bdc))


### Tests

* **darts:** move correctness verification to unit tests, optimise e2e ([4e9a531](https://github.com/provably-fair-betting/verifierform-stake/commit/4e9a531ee253a596f347de019c01e791e1f2b034))


### Continuous Integration

* **badges:** replace gist-based badges with local svg approach ([f86555f](https://github.com/provably-fair-betting/verifierform-stake/commit/f86555f32b5f919a13e0ef71b2b1701324cfb141))


### Miscellaneous Chores

* **deps:** upgrade prettier-plugin-tailwindcss to 0.8.0 ([8e3660e](https://github.com/provably-fair-betting/verifierform-stake/commit/8e3660eb64bee7a20b931526f89e60b7aabc0766))
* initial 1.0.0 release ([189a643](https://github.com/provably-fair-betting/verifierform-stake/commit/189a643665bc7f0590623d4c934f622f2e77d0d3))
* **release:** add bootstrap-sha to anchor release-please at v1.0.0 ([5b643e2](https://github.com/provably-fair-betting/verifierform-stake/commit/5b643e279d0893b4f06c9d8f3abf9d86abcdd5a9))
* **release:** expand changelog sections to include all commit types ([4f66eb5](https://github.com/provably-fair-betting/verifierform-stake/commit/4f66eb51ebd39740a67cdd3a97ec908e4ef9056d))
* rename package to verifierform-stake ([616e3d7](https://github.com/provably-fair-betting/verifierform-stake/commit/616e3d7559b9fcc127e9dc4ff4ed79d86bbe9795))
* trigger release-please regeneration ([ff3d7a1](https://github.com/provably-fair-betting/verifierform-stake/commit/ff3d7a17c6c9953539063b8c3d61ad40eda1db80))
