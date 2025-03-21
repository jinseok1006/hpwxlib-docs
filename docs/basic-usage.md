# 기본 사용법

## 시작하기

hwpxlib를 사용하여 HWPX 파일을 읽고 쓰는 기본적인 방법을 알아보겠습니다.

### 의존성 추가

Maven을 사용하는 경우:

```xml
<dependency>
    <groupId>kr.dogfoot</groupId>
    <artifactId>hwpxlib</artifactId>
    <version>1.0.0</version>
</dependency>
```

Gradle을 사용하는 경우:

```groovy
implementation 'kr.dogfoot:hwpxlib:1.0.0'
```

## HWPX 파일 읽기

### 파일에서 읽기

```java
// 파일 경로로 읽기
HWPXFile hwpxFile = HWPXReader.fromFilepath("document.hwpx");

// File 객체로 읽기
File file = new File("document.hwpx");
HWPXFile hwpxFile = HWPXReader.fromFile(file);
```

### 스트림에서 읽기

```java
try (InputStream is = new FileInputStream("document.hwpx")) {
    HWPXFile hwpxFile = HWPXReader.fromStream(is);
}
```

## HWPX 파일 쓰기

### 파일로 저장하기

```java
// 파일 경로로 저장
HWPXWriter.toFilepath(hwpxFile, "output.hwpx");

// File 객체로 저장
File file = new File("output.hwpx");
HWPXWriter.toFile(hwpxFile, file);
```

### 스트림으로 저장하기

```java
try (OutputStream os = new FileOutputStream("output.hwpx")) {
    HWPXWriter.toStream(hwpxFile, os);
}
```

### 바이트 배열로 변환하기

```java
byte[] bytes = HWPXWriter.toBytes(hwpxFile);
```

## 문서 내용 접근

### 텍스트 읽기

```java
// 모든 섹션의 텍스트 읽기
for (SectionXMLFile section : hwpxFile.sectionXMLFileList().items()) {
    for (Paragraph paragraph : section.paragraphs()) {
        String text = paragraph.text();
        System.out.println(text);
    }
}
```

### 텍스트 쓰기

```java
// 새 문서 생성
HWPXFile newDoc = new HWPXFile();

// 섹션 추가
SectionXMLFile section = newDoc.sectionXMLFileList().addNew();

// 단락 추가
Paragraph paragraph = section.addParagraph();
paragraph.addText("안녕하세요!");

// 문서 저장
HWPXWriter.toFilepath(newDoc, "new_document.hwpx");
```

## 문서 스타일 설정

### 단락 스타일

```java
Paragraph paragraph = section.addParagraph();
paragraph.align(ParagraphAlign.CENTER);  // 가운데 정렬
paragraph.lineSpacing(160);  // 줄 간격 160%
paragraph.spaceBefore(100);  // 문단 앞 간격
paragraph.spaceAfter(100);   // 문단 뒤 간격
```

### 문자 스타일

```java
CharPr charPr = new CharPr();
charPr.fontRef("맑은 고딕");
charPr.height(1000);  // 10pt
charPr.textColor("#000000");
charPr.bold(true);

paragraph.addCharPr(charPr);
```

## 예외 처리

hwpxlib는 다음과 같은 예외 상황을 처리합니다:

```java
try {
    HWPXFile hwpxFile = HWPXReader.fromFilepath("document.hwpx");
} catch (FileNotFoundException e) {
    System.err.println("파일을 찾을 수 없습니다: " + e.getMessage());
} catch (IOException e) {
    System.err.println("파일 읽기 오류: " + e.getMessage());
} catch (Exception e) {
    System.err.println("예상치 못한 오류: " + e.getMessage());
}
```

## 성능 고려사항

1. 대용량 파일 처리
   - 스트림 기반 읽기/쓰기를 사용하여 메모리 사용량 최적화
   - 필요한 부분만 선택적으로 읽기 가능

2. 동시성
   - HWPXFile 객체는 스레드 안전하지 않음
   - 여러 스레드에서 동시에 접근할 경우 적절한 동기화 필요

3. 리소스 관리
   - try-with-resources 구문을 사용하여 스트림 자원 관리
   - 명시적으로 close() 호출 필요 