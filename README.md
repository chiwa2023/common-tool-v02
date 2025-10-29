# 政治資金正常化／標準化　共通Tool

政治資金に関係する政治資金収支報告書、政党交付金使途報告書を取り扱う際に、報告書作成、報告書解析、関連者登録で共通に使うコンポーネント群。

- それぞれのプロジェクト(リポジトリ)にinstallして使用する。
- 含まれるコンポーネントは名前入力、住所入力、職業入力など。これらのコンポーネントは**基本的にバージョンの影響を受けにくい**ので報告書バージョン管理にかかわらず共通管理とする。※住所表示方法の切り替わりは予定されているので、報告書表示住所が、郵便番号まで表示と、郵便番号住所から建物住所まで表示する2パターンを準備する。
- 関連者登録機能を使用するソフトウェア(関連者登録におけるAPIユーザが作成するソフトウェア)では、住所取得、関連者取得等の実装が簡単になるので、installを推奨する
- 報告書と全く同じ表示を行うコンポーネントについては、便利そうではあるが、バージョン管理が必要なため実装未定。(次バージョンからとか？)

## 他プロジェクトへの導入

### front側への導入

- 導入先プロジェクト内に、任意のフォルダ(ex./lib)を作成し、このプロジェクトのルートに存在する`seijishikin-jp-normalize-x.y.z.tgz`をコピーする
- npm install `複写した.tgzの(相対)パス` とするとinstall完了。
- バージョンアップされ、tgzを更新するたびに行う必要がある

### back側への導入

- 導入先プロジェクト内に、任意のフォルダ(ex./lib)を作成し、このプロジェクトの/targetに存在する`published_document-x.x.x-SNAPSHOT.jar`をコピーする

- 導入先プロジェクトの`pom.xml`に下記を追加する

```
    <dependencies>
        ...
        <!--　このプロジェクト共通Tool  -->
        <dependency>
            <groupId>net.seijishikin.jp.normalize.manage.kanrensha.lib.common_tool</groupId>
            <version>x.y.z-SNAPSHOT</version>
            <artifactId>common_tool</artifactId>
        </dependency>
        ...
    </dependencies>
```

```
<plugins>
    ...
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-install-plugin</artifactId>
        <inherited>false</inherited>
        <executions>
            <execution>
                <id>common_tool</id>
                <phase>clean</phase>
                <goals>
                    <goal>install-file</goal>
                </goals>
                <configuration>
                    <file>
                    ${basedir}/lib/common_tool-0.0.1-SNAPSHOT.jar</file>
                    <groupId>
                    net.seijishikin.jp.normalize.manage.kanrensha.lib.common_tool</groupId>
                    <artifactId>common_tool</artifactId>
                    <version>x.y.z-SNAPSHOT</version>
                    <packaging>jar</packaging>
                </configuration>
            </execution>
        </executions>
    </plugin>
    ...
</plugins>
```

- 起動`mvnw spring-boot:run`すれば展開される

## 開発

### front側での開発

環境を一から作成する場合の覚え書きは[develop.md](doc/develop.md)に記載

#### コンパイル(front)

- (必要な実装を行う)
- `npm run build`としてbuildする
- `npm pack`としてパッケージ化する

### back側での開発

環境を一から作成する場合の覚え書きは[develop.md](doc/develop.md)に記載

#### コンパイル(back)

- (必要な実装を行う)
- ビルド処理`mvnw clean install`を行う。このプロジェクトでは**boot起動できない**
