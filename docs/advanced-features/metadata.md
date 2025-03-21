# 문서 메타데이터

## 문서 속성

### 기본 속성 설정

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class SetDocumentPropertiesExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            
            // 문서 속성 설정
            hwpxFile.headerXMLFile()
                .title("문서 제목")
                .author("작성자")
                .date("2024-03-20")
                .description("문서 설명")
                .keywords("키워드1, 키워드2")
                .subject("주제")
                .category("카테고리");
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "document_with_properties.hwpx");
            
        } catch (Exception e) {
            System.err.println("문서 속성 설정 오류: " + e.getMessage());
        }
    }
}
```

### 속성 읽기

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;

public class ReadDocumentPropertiesExample {
    public static void main(String[] args) {
        try {
            // HWPX 파일 읽기
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 문서 속성 읽기
            System.out.println("제목: " + hwpxFile.headerXMLFile().title());
            System.out.println("작성자: " + hwpxFile.headerXMLFile().author());
            System.out.println("날짜: " + hwpxFile.headerXMLFile().date());
            System.out.println("설명: " + hwpxFile.headerXMLFile().description());
            System.out.println("키워드: " + hwpxFile.headerXMLFile().keywords());
            System.out.println("주제: " + hwpxFile.headerXMLFile().subject());
            System.out.println("카테고리: " + hwpxFile.headerXMLFile().category());
            
        } catch (Exception e) {
            System.err.println("문서 속성 읽기 오류: " + e.getMessage());
        }
    }
}
```

## 버전 정보

### 버전 정보 설정

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.header_xml.enumtype.TargetApplicationSort;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class SetVersionInfoExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            
            // 버전 정보 설정
            hwpxFile.versionXMLFile()
                .targetApplication(TargetApplicationSort.WordProcessor)
                .application("hwpxlib")
                .appVersion("1.0.0");
            
            // 버전 번호 설정
            hwpxFile.versionXMLFile().version()
                .major(5)
                .minor(0)
                .micro(5)
                .buildNumber(0);
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "document_with_version.hwpx");
            
        } catch (Exception e) {
            System.err.println("버전 정보 설정 오류: " + e.getMessage());
        }
    }
}
```

### 버전 정보 읽기

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;

public class ReadVersionInfoExample {
    public static void main(String[] args) {
        try {
            // HWPX 파일 읽기
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 버전 정보 읽기
            System.out.println("대상 애플리케이션: " + hwpxFile.versionXMLFile().targetApplication());
            System.out.println("애플리케이션: " + hwpxFile.versionXMLFile().application());
            System.out.println("애플리케이션 버전: " + hwpxFile.versionXMLFile().appVersion());
            
            // 버전 번호 읽기
            System.out.println("주 버전: " + hwpxFile.versionXMLFile().version().major());
            System.out.println("부 버전: " + hwpxFile.versionXMLFile().version().minor());
            System.out.println("마이크로 버전: " + hwpxFile.versionXMLFile().version().micro());
            System.out.println("빌드 번호: " + hwpxFile.versionXMLFile().version().buildNumber());
            
        } catch (Exception e) {
            System.err.println("버전 정보 읽기 오류: " + e.getMessage());
        }
    }
}
```

## 히스토리 관리

### 히스토리 항목 추가

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.dochistory.HistoryEntry;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class AddHistoryEntryExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            
            // 히스토리 항목 추가
            HistoryEntry entry = hwpxFile.historyXMLFile().addNewEntry();
            entry.revisionNumber(1)
                .revisionDate("2024-03-20T10:00:00")
                .revisionAuthor("작성자")
                .revisionDesc("초기 버전")
                .revisionLock(false)
                .autoSave(false);
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "document_with_history.hwpx");
            
        } catch (Exception e) {
            System.err.println("히스토리 항목 추가 오류: " + e.getMessage());
        }
    }
}
```

### 히스토리 읽기

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.dochistory.HistoryEntry;
import kr.dogfoot.hwpxlib.reader.HWPXReader;

public class ReadHistoryExample {
    public static void main(String[] args) {
        try {
            // HWPX 파일 읽기
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 히스토리 항목 읽기
            for (HistoryEntry entry : hwpxFile.historyXMLFile().entries()) {
                System.out.println("리비전 번호: " + entry.revisionNumber());
                System.out.println("리비전 날짜: " + entry.revisionDate());
                System.out.println("리비전 작성자: " + entry.revisionAuthor());
                System.out.println("리비전 설명: " + entry.revisionDesc());
                System.out.println("잠금 여부: " + entry.revisionLock());
                System.out.println("자동 저장 여부: " + entry.autoSave());
                System.out.println("---");
            }
            
        } catch (Exception e) {
            System.err.println("히스토리 읽기 오류: " + e.getMessage());
        }
    }
}
```

## 다음 단계

- [유틸리티](../utilities/README.md) 섹션으로 이동하여 텍스트 추출기와 빈 파일 생성기 사용법을 배워보세요. 