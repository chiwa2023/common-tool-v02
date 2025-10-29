# 開発環境構築

リポジトリを新しくする時の手順一覧

## front側

1. vite-vue導入 `npm create vite@latest --save-dev  . -- --template vue-ts`

2. vue-router導入 `npm install vue-router --save-dev`

3. eslint導入 `npm install eslint --save-dev`

4. vitest導入 `npm i -D vitest`

5. ライブラリ化プラグインvite-plugin-dts導入 `npm install -D vite-plugin-dts`

6. ライブラリ化をするために設定ファイルを追加・編集する

- a. packaage.jsonを編集する

```
-  "type": "module",
+  "type": "commonjs",
+  "main": "./dist/index.umd.cjs",
+  "module": "./dist/index.mjs",
+  "types": "./dist/index.d.ts",
+  "files": [
+    "dist"
+  ],

...

-  "dependencies": {
-    "vue": "^x.y.z"
-  },
+  "dependencies": {},
+  "peerDependencies": {
+    "vue": "^x.y.z"
+  },

```

- b. tsconfig.jsonを編集する

```
-  ]
+  ],
+  "declaration": true,
+   "compilerOptions": {
+    "emitDeclarationOnly": true,
+    "declaration": true,
+    "declarationDir": "./types",
+    "noEmit": true,
+ },



```

- c. vite.config.tsを編集する

```
...
+ import { resolve } from 'path'
+ import dts from 'vite-plugin-dts'

-  plugins: [vue()],
+  build: {
+    lib: {
+      entry: resolve(__dirname, 'src/index.ts'),
+      name: 'index',
+      fileName: 'index',
+      formats: ['es', 'umd']
+    },
+  },
+  plugins: [vue(), dts({tsconfigPath: resolve(__dirname, "tsconfig.app.json")})],

```

- d. /src/index.tsを追加する

  ```
  export * from './components'

  ```

- e. /src/components/index.tsを追加する

```
# 記載例
import HelloMessage123 from './HelloWorld.vue'

export { HelloMessage123 }
```

### 2. back側

1. Simple Maven Projectを作成する

2. `pom.xml`に必要項目を記載する

- dependencies
  - spring-boot-starter-batchを追加する
  - spring-boot-starter-data-jpaを追加する
  - spring-boot-starter-testを追加する
  - spring-batch-testを追加する
  - jackson-dataformat-xmlを追加する
- plugins
  - maven-compiler-pluginを追加する

### 3. Database

なし

### 4. Upgrade

a.back側

pom.xml内のspring-boot-starter-parentのVersion番号を、Eclipseに通知があり次第修正

b.front側

`npm audit fix` またはvite全体更新の時は `npm i vite`

## 4.起動

### 1. front

viteを起動 `npm run dev`

### 2. back

mvnからspring起動 `mvnw spring-boot:run`

## 5.テスト

### a. front

vitestを起動`npm run test`
VsCodeを使用している場合はJUnit感覚でテスト駆動できる[Vitestプラグイン](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)の利用をお勧めする

### b. back

EclipseからJUnit起動
