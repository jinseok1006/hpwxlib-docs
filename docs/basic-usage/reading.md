# HWPX 파일 읽기

## 기본 예제

가장 간단한 방법으로 HWPX 파일을 읽는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;

public class ReadHWPXExample {
    public static void main(String[] args) {
        try {
            // HWPX 파일 읽기
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 문서 내용 출력
            System.out.println("문서 제목: " + hwpxFile.headerXMLFile().title());
            
            // 첫 번째 섹션의 내용 출력
            for (Paragraph paragraph : hwpxFile.sectionXMLFileList().get(0).paragraphList()) {
                System.out.println(paragraph.text());
            }
            
        } catch (Exception e) {
            System.err.println("파일 읽기 오류: " + e.getMessage());
        }
    }
}
```

## 텍스트 추출하기

문서에서 텍스트만 추출하는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import kr.dogfoot.hwpxlib.tool.textextractor.TextExtractor;
import kr.dogfoot.hwpxlib.tool.textextractor.TextExtractMethod;

public class ExtractTextExample {
    public static void main(String[] args) {
        try {
            // HWPX 파일 읽기
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 텍스트 추출
            String text = TextExtractor.extract(
                hwpxFile,
                TextExtractMethod.InsertControlText,
                true,  // 단락 구분자 추가
                null   // 텍스트 마커 없음
            );
            
            System.out.println("추출된 텍스트:");
            System.out.println(text);
            
        } catch (Exception e) {
            System.err.println("텍스트 추출 오류: " + e.getMessage());
        }
    }
}
```

## 메타데이터 읽기

문서의 메타데이터를 읽는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;

public class ReadMetadataExample {
    public static void main(String[] args) {
        try {
            // HWPX 파일 읽기
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 문서 속성 읽기
            System.out.println("문서 제목: " + hwpxFile.headerXMLFile().title());
            System.out.println("작성자: " + hwpxFile.headerXMLFile().author());
            System.out.println("생성일: " + hwpxFile.headerXMLFile().date());
            
            // 버전 정보 읽기
            System.out.println("버전: " + hwpxFile.versionXMLFile().version().toString());
            
            // 섹션 정보 읽기
            System.out.println("섹션 수: " + hwpxFile.sectionXMLFileList().size());
            
        } catch (Exception e) {
            System.err.println("메타데이터 읽기 오류: " + e.getMessage());
        }
    }
}
```

## 특정 섹션 읽기

특정 섹션의 내용을 읽는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;

public class ReadSectionExample {
    public static void main(String[] args) {
        try {
            // HWPX 파일 읽기
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 특정 섹션 읽기 (예: 두 번째 섹션)
            int sectionIndex = 1;
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(sectionIndex);
            
            System.out.println("섹션 " + (sectionIndex + 1) + " 내용:");
            for (Paragraph paragraph : section.paragraphList()) {
                System.out.println(paragraph.text());
            }
            
        } catch (Exception e) {
            System.err.println("섹션 읽기 오류: " + e.getMessage());
        }
    }
}
```

## 오류 처리

파일 읽기 시 발생할 수 있는 주요 오류와 처리 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;

public class ErrorHandlingExample {
    public static void main(String[] args) {
        try {
            // 파일이 존재하지 않는 경우
            HWPXFile hwpxFile = HWPXReader.fromFilepath("nonexistent.hwpx");
            
        } catch (FileNotFoundException e) {
            System.err.println("파일을 찾을 수 없습니다: " + e.getMessage());
            
        } catch (IOException e) {
            System.err.println("파일 읽기 오류: " + e.getMessage());
            
        } catch (Exception e) {
            System.err.println("예상치 못한 오류: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
```

## 다음 단계

- [HWPX 파일 쓰기](writing.md) 섹션으로 이동하여 새 문서를 만들고 내용을 추가하는 방법을 배워보세요. 