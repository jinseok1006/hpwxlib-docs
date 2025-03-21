# API 참조

HWPXLib의 주요 클래스와 메서드에 대한 상세 설명을 제공합니다.

## 핵심 클래스

### HWPXFile

HWPX 문서의 최상위 클래스입니다.

#### 주요 메서드

```java
// 문서 생성
public HWPXFile()

// 헤더 XML 파일 접근
public HeaderXMLFile headerXMLFile()

// 본문 텍스트 접근
public BodyText bodyText()

// 바인딩 데이터 접근
public BindingData bindingData()

// 메타 데이터 접근
public MetaData metaData()

// 설정 데이터 접근
public SettingsData settingsData()
```

### HeaderXMLFile

문서의 헤더 정보를 관리하는 클래스입니다.

#### 주요 메서드

```java
// 새로운 헤더 XML 파일 생성
public HeaderXMLFile()

// 문서 정보 접근
public DocInfo docInfo()

// 스타일 시트 접근
public StyleSheet styleSheet()

// 문서 속성 접근
public DocOption docOption()
```

### BodyText

문서의 본문을 관리하는 클래스입니다.

#### 주요 메서드

```java
// 새로운 본문 텍스트 생성
public BodyText()

// 섹션 추가
public Section addNewSection()

// 모든 섹션 접근
public List<Section> sections()
```

### Section

문서의 섹션을 관리하는 클래스입니다.

#### 주요 메서드

```java
// 새로운 섹션 생성
public Section()

// 단락 추가
public Paragraph addNewParagraph()

// 모든 단락 접근
public List<Paragraph> paragraphs()

// 섹션 속성 설정
public void setPageDef(PageDef pageDef)
public void setHeader(Header header)
public void setFooter(Footer footer)
```

### Paragraph

단락을 관리하는 클래스입니다.

#### 주요 메서드

```java
// 새로운 단락 생성
public Paragraph()

// 텍스트 추가
public Text addNewText()

// 모든 텍스트 접근
public List<Text> texts()

// 단락 스타일 설정
public void setStyleID(String styleID)
public void setAlignment(Alignment alignment)
public void setBreakSetting(BreakSetting breakSetting)
```

### Text

텍스트를 관리하는 클래스입니다.

#### 주요 메서드

```java
// 새로운 텍스트 생성
public Text()

// 텍스트 내용 설정
public void text(String text)

// 텍스트 스타일 설정
public void setStyleID(String styleID)
public void setBold(boolean bold)
public void setItalic(boolean italic)
public void setUnderline(UnderlineType underline)
```

## 유틸리티 클래스

### HWPXReader

HWPX 파일을 읽는 유틸리티 클래스입니다.

#### 주요 메서드

```java
// 파일 경로로부터 HWPX 파일 읽기
public static HWPXFile fromFilepath(String filepath)

// 입력 스트림으로부터 HWPX 파일 읽기
public static HWPXFile fromInputStream(InputStream inputStream)
```

### HWPXWriter

HWPX 파일을 쓰는 유틸리티 클래스입니다.

#### 주요 메서드

```java
// HWPX 파일을 파일 경로에 저장
public static void toFilepath(HWPXFile hwpxFile, String filepath)

// HWPX 파일을 출력 스트림에 저장
public static void toOutputStream(HWPXFile hwpxFile, OutputStream outputStream)
```

## 상수

### Alignment

단락 정렬 방식을 정의하는 열거형입니다.

```java
public enum Alignment {
    LEFT,           // 왼쪽 정렬
    CENTER,         // 가운데 정렬
    RIGHT,          // 오른쪽 정렬
    JUSTIFY         // 양쪽 정렬
}
```

### UnderlineType

밑줄 스타일을 정의하는 열거형입니다.

```java
public enum UnderlineType {
    NONE,           // 밑줄 없음
    SOLID,          // 실선
    DASH,           // 점선
    WAVE,           // 물결선
    DOUBLE          // 이중선
}
```

## 예외 클래스

### HWPXException

HWPXLib에서 발생하는 예외를 처리하는 클래스입니다.

```java
public class HWPXException extends Exception {
    public HWPXException(String message)
    public HWPXException(String message, Throwable cause)
}
```

## 다음 단계

- [추가 리소스](additional-resources.md) 섹션으로 이동하여 관련 문서와 도구를 확인해보세요. 