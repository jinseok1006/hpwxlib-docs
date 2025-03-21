# 설치 및 설정

## Maven 프로젝트에 추가하기

`pom.xml` 파일에 다음 의존성을 추가하세요:

```xml
<dependency>
    <groupId>kr.dogfoot</groupId>
    <artifactId>hwpxlib</artifactId>
    <version>1.0.0</version> <!-- 최신 버전을 사용하세요 -->
</dependency>
```

## Gradle 프로젝트에 추가하기

`build.gradle` 파일에 다음 의존성을 추가하세요:

```groovy
dependencies {
    implementation 'kr.dogfoot:hwpxlib:1.0.0' // 최신 버전을 사용하세요
}
```

## 기본 설정

### 1. 프로젝트 구조 확인

프로젝트가 다음과 같은 구조를 가지고 있는지 확인하세요:

```
src/
  main/
    java/
      com/example/
        Main.java
  resources/
```

### 2. Java 버전 확인

프로젝트의 Java 버전이 8 이상인지 확인하세요. `pom.xml` 또는 `build.gradle`에서 Java 버전을 설정할 수 있습니다:

Maven (`pom.xml`):
```xml
<properties>
    <java.version>1.8</java.version>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```

Gradle (`build.gradle`):
```groovy
sourceCompatibility = '1.8'
targetCompatibility = '1.8'
```

### 3. 간단한 테스트 코드

설치가 제대로 되었는지 확인하기 위해 다음 테스트 코드를 실행해보세요:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class TestHWPXLib {
    public static void main(String[] args) {
        try {
            // 새로운 HWPX 파일 생성
            HWPXFile hwpxFile = new HWPXFile();
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "test.hwpx");
            
            System.out.println("HWPX 파일이 성공적으로 생성되었습니다.");
        } catch (Exception e) {
            System.err.println("오류 발생: " + e.getMessage());
        }
    }
}
```

## 문제 해결

### 1. 의존성 다운로드 실패

- 인터넷 연결 확인
- Maven/Gradle 캐시 삭제
- 프록시 설정 확인

### 2. 컴파일 오류

- Java 버전 확인
- IDE 설정 확인
- 프로젝트 리프레시

### 3. 런타임 오류

- 클래스패스 확인
- 의존성 충돌 확인
- 로그 확인

## 다음 단계

- [기본 사용법](../basic-usage/README.md) 섹션으로 이동하여 HWPX 파일 읽기와 쓰기 방법을 배워보세요. 