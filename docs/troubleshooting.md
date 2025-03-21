# 문제 해결 가이드

## 일반적인 문제

### 1. 파일을 찾을 수 없음

**증상**: `FileNotFoundException` 발생

**해결 방법**:
```java
try {
    HWPXFile hwpxFile = HWPXReader.fromFilepath("document.hwpx");
} catch (FileNotFoundException e) {
    // 파일 경로 확인
    File file = new File("document.hwpx");
    if (!file.exists()) {
        System.err.println("파일이 존재하지 않습니다: " + file.getAbsolutePath());
    }
}
```

### 2. 메모리 부족 오류

**증상**: `OutOfMemoryError` 발생

**해결 방법**:
```java
// 스트림 기반 처리 사용
try (InputStream is = new FileInputStream("large_document.hwpx")) {
    HWPXFile hwpxFile = HWPXReader.fromStream(is);
    // 필요한 부분만 처리
    for (SectionXMLFile section : hwpxFile.sectionXMLFileList().items()) {
        processSection(section);
    }
}
```

### 3. 인코딩 문제

**증상**: 한글이 깨져서 표시됨

**해결 방법**:
```java
// 파일 읽기 시 인코딩 지정
try (InputStream is = new FileInputStream("document.hwpx")) {
    HWPXFile hwpxFile = HWPXReader.fromStream(is);
    // 텍스트 처리 시 인코딩 확인
    for (SectionXMLFile section : hwpxFile.sectionXMLFileList().items()) {
        for (Paragraph paragraph : section.paragraphs()) {
            String text = new String(paragraph.text().getBytes("UTF-8"), "UTF-8");
            System.out.println(text);
        }
    }
}
```

## 성능 최적화

### 1. 대용량 파일 처리

```java
// 섹션별 처리
for (SectionXMLFile section : hwpxFile.sectionXMLFileList().items()) {
    // 필요한 섹션만 처리
    if (shouldProcessSection(section)) {
        processSection(section);
    }
}

// 메모리 해제
System.gc();
```

### 2. 스트림 처리 최적화

```java
// 버퍼 크기 조정
try (BufferedInputStream bis = new BufferedInputStream(
        new FileInputStream("document.hwpx"), 8192)) {
    HWPXFile hwpxFile = HWPXReader.fromStream(bis);
}
```

## 동시성 문제

### 1. 스레드 안전성

```java
// 동기화 블록 사용
synchronized(hwpxFile) {
    // 문서 수정 작업
    modifyDocument(hwpxFile);
}

// 또는 락 사용
private final Lock lock = new ReentrantLock();

public void modifyDocument(HWPXFile hwpxFile) {
    lock.lock();
    try {
        // 문서 수정 작업
    } finally {
        lock.unlock();
    }
}
```

### 2. 병렬 처리

```java
// 병렬 스트림 사용 시 주의
hwpxFile.sectionXMLFileList().items().parallelStream()
    .forEach(section -> {
        // 각 섹션을 독립적으로 처리
        processSection(section);
    });
```

## 리소스 관리

### 1. 스트림 닫기

```java
// try-with-resources 사용
try (InputStream is = new FileInputStream("document.hwpx");
     OutputStream os = new FileOutputStream("output.hwpx")) {
    HWPXFile hwpxFile = HWPXReader.fromStream(is);
    HWPXWriter.toStream(hwpxFile, os);
}
```

### 2. 임시 파일 관리

```java
// 임시 파일 생성 및 삭제
File tempFile = File.createTempFile("hwpx_", ".tmp");
try {
    HWPXWriter.toFile(hwpxFile, tempFile);
    // 임시 파일 처리
} finally {
    tempFile.delete();
}
```

## 디버깅

### 1. 로깅 추가

```java
import java.util.logging.Logger;
import java.util.logging.Level;

private static final Logger logger = Logger.getLogger(HWPXProcessor.class.getName());

public void processDocument(String filepath) {
    logger.log(Level.INFO, "문서 처리 시작: " + filepath);
    try {
        HWPXFile hwpxFile = HWPXReader.fromFilepath(filepath);
        logger.log(Level.INFO, "문서 로드 완료");
        // 처리 작업
    } catch (Exception e) {
        logger.log(Level.SEVERE, "문서 처리 중 오류 발생", e);
        throw e;
    }
}
```

### 2. 문서 구조 검증

```java
public void validateDocument(HWPXFile hwpxFile) {
    // 필수 컴포넌트 확인
    if (hwpxFile.versionXMLFile() == null) {
        throw new IllegalStateException("버전 정보가 없습니다");
    }
    if (hwpxFile.sectionXMLFileList().count() == 0) {
        throw new IllegalStateException("문서 섹션이 없습니다");
    }
    
    // 각 섹션 검증
    for (SectionXMLFile section : hwpxFile.sectionXMLFileList().items()) {
        validateSection(section);
    }
}
``` 