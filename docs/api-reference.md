# API 참조

## 핵심 클래스

### HWPXFile

HWPX 파일의 루트 객체입니다.

#### 주요 메서드

```java
// 버전 정보 접근
VersionXMLFile versionXMLFile()

// 문서 헤더 접근
HeaderXMLFile headerXMLFile()

// 문서 섹션 목록 접근
ObjectList<SectionXMLFile> sectionXMLFileList()

// 마스터 페이지 목록 접근
ObjectList<MasterPageXMLFile> masterPageXMLFileList()

// 문서 설정 접근
SettingsXMLFile settingsXMLFile()

// 차트 파일 목록 접근
ObjectList<ChartXMLFile> chartXMLFileList()

// 파싱되지 않은 XML 파일 추가
void addUnparsedXMLFile(String href, String xml)

// 파싱되지 않은 XML 파일 목록 접근
UnparsedXMLFile[] unparsedXMLFiles()

// 파싱되지 않은 XML 파일 제거
void removeUnparsedXMLFile(UnparsedXMLFile unparsedXMLFile)

// 모든 파싱되지 않은 XML 파일 제거
void removeAllUnparsedXMLFiles()

// 객체 복제
HWPXFile clone()
```

### HWPXReader

HWPX 파일을 읽어서 HWPXFile 객체로 변환합니다.

#### 정적 메서드

```java
// 파일 경로로 읽기
static HWPXFile fromFilepath(String filepath)

// File 객체로 읽기
static HWPXFile fromFile(File file)

// 스트림으로 읽기
static HWPXFile fromStream(InputStream is)
```

### HWPXWriter

HWPXFile 객체를 HWPX 파일로 저장합니다.

#### 정적 메서드

```java
// 파일 경로로 저장
static void toFilepath(HWPXFile hwpxFile, String filepath)

// File 객체로 저장
static void toFile(HWPXFile hwpxFile, File file)

// 스트림으로 저장
static void toStream(HWPXFile hwpxFile, OutputStream os)

// 바이트 배열로 변환
static byte[] toBytes(HWPXFile hwpxFile)
```

## 문서 요소

### SectionXMLFile

문서의 섹션을 나타냅니다.

#### 주요 메서드

```java
// 단락 목록 접근
ObjectList<Paragraph> paragraphs()

// 새 단락 추가
Paragraph addParagraph()

// 단락 제거
void removeParagraph(Paragraph paragraph)

// 모든 단락 제거
void removeAllParagraphs()
```

### Paragraph

문단을 나타냅니다.

#### 주요 메서드

```java
// 텍스트 추가
void addText(String text)

// 문자 속성 추가
void addCharPr(CharPr charPr)

// 정렬 설정
void align(ParagraphAlign align)

// 줄 간격 설정
void lineSpacing(int spacing)

// 문단 앞 간격 설정
void spaceBefore(int space)

// 문단 뒤 간격 설정
void spaceAfter(int space)
```

### CharPr

문자 속성을 나타냅니다.

#### 주요 메서드

```java
// 폰트 설정
void fontRef(String fontRef)

// 크기 설정
void height(int height)

// 색상 설정
void textColor(String color)

// 배경색 설정
void shadeColor(String color)

// 굵게 설정
void bold(boolean bold)

// 기울임 설정
void italic(boolean italic)

// 밑줄 설정
void underline(boolean underline)

// 취소선 설정
void strikeout(boolean strikeout)

// 외곽선 설정
void outline(boolean outline)

// 그림자 설정
void shadow(boolean shadow)

// 양각 설정
void emboss(boolean emboss)

// 음각 설정
void engrave(boolean engrave)

// 위첨자 설정
void supscript(boolean supscript)

// 아래첨자 설정
void subscript(boolean subscript)
```

## 유틸리티 클래스

### TextExtractor

문서에서 텍스트를 추출합니다.

#### 주요 메서드

```java
// 전체 문서에서 텍스트 추출
String extract(HWPXFile hwpxFile)

// 특정 섹션에서 텍스트 추출
String extractSection(SectionXMLFile section)

// 특정 단락에서 텍스트 추출
String extractParagraph(Paragraph paragraph)
```

### DocumentValidator

문서 구조를 검증합니다.

#### 주요 메서드

```java
// 문서 검증
void validate(HWPXFile hwpxFile)

// 섹션 검증
void validateSection(SectionXMLFile section)

// 단락 검증
void validateParagraph(Paragraph paragraph)
```

## 열거형

### ParagraphAlign

단락 정렬 방식을 정의합니다.

```java
LEFT    // 왼쪽 정렬
CENTER  // 가운데 정렬
RIGHT   // 오른쪽 정렬
JUSTIFY // 양쪽 정렬
```

### LineStyle

선 스타일을 정의합니다.

```java
SOLID       // 실선
DASH        // 파선
DOT         // 점선
DASH_DOT    // 파점선
DASH_DOT_DOT // 파점점선
```

### ObjectType

HWPX 객체의 타입을 정의합니다.

```java
HWPXFile
SectionXMLFile
Paragraph
CharPr
Line
DrawText
// ... 기타 객체 타입
``` 