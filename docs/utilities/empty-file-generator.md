# 빈 파일 생성기

HWPXLib를 사용하여 새로운 빈 HWPX 파일을 생성하는 방법을 알아봅니다.

## 기본 빈 파일 생성

가장 간단한 방법으로 빈 HWPX 파일을 생성하는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class CreateEmptyFileExample {
    public static void main(String[] args) {
        try {
            // 새로운 HWPX 파일 객체 생성
            HWPXFile hwpxFile = new HWPXFile();
            
            // 기본 섹션 추가
            hwpxFile.bodyText().addNewSection();
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "empty_document.hwpx");
            
            System.out.println("빈 HWPX 파일이 생성되었습니다.");
            
        } catch (Exception e) {
            System.err.println("파일 생성 오류: " + e.getMessage());
        }
    }
}
```

## 기본 구조 설정

새로운 HWPX 파일을 생성할 때 기본 구조를 설정하는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;
import kr.dogfoot.hwpxlib.object.content.header_xml.enumtype.TargetApplicationSort;

public class CreateEmptyFileWithStructureExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            
            // 문서 속성 설정
            hwpxFile.headerXMLFile()
                .title("새 문서")
                .author("작성자")
                .date("2024-03-20");
            
            // 버전 정보 설정
            hwpxFile.versionXMLFile()
                .targetApplication(TargetApplicationSort.WordProcessor)
                .application("hwpxlib")
                .appVersion("1.0.0");
            
            // 기본 섹션 추가 및 설정
            hwpxFile.bodyText().addNewSection()
                .pageDef()
                    .paperWidth(21000)  // A4 가로
                    .paperHeight(29700) // A4 세로
                    .marginLeft(1000)
                    .marginRight(1000)
                    .marginTop(1000)
                    .marginBottom(1000)
                    .headerHeight(500)
                    .footerHeight(500);
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "structured_document.hwpx");
            
            System.out.println("구조화된 빈 HWPX 파일이 생성되었습니다.");
            
        } catch (Exception e) {
            System.err.println("파일 생성 오류: " + e.getMessage());
        }
    }
}
```

## 템플릿 활용

기존 템플릿을 기반으로 새로운 파일을 생성하는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class CreateFileFromTemplateExample {
    public static void main(String[] args) {
        try {
            // 템플릿 파일 읽기
            HWPXFile templateFile = HWPXReader.fromFilepath("template.hwpx");
            
            // 새로운 파일 생성 (템플릿 복사)
            HWPXFile newFile = new HWPXFile();
            
            // 문서 속성 복사
            newFile.headerXMLFile()
                .title("새 문서")
                .author("작성자")
                .date("2024-03-20");
            
            // 버전 정보 복사
            newFile.versionXMLFile()
                .targetApplication(templateFile.versionXMLFile().targetApplication())
                .application(templateFile.versionXMLFile().application())
                .appVersion(templateFile.versionXMLFile().appVersion());
            
            // 섹션 구조 복사
            for (int i = 0; i < templateFile.bodyText().sectionList().size(); i++) {
                newFile.bodyText().addNewSection();
            }
            
            // 파일 저장
            HWPXWriter.toFilepath(newFile, "document_from_template.hwpx");
            
            System.out.println("템플릿 기반 HWPX 파일이 생성되었습니다.");
            
        } catch (Exception e) {
            System.err.println("파일 생성 오류: " + e.getMessage());
        }
    }
}
```

## 다음 단계

- [파일 변환기](file-converter.md) 섹션으로 이동하여 HWPX 파일을 다른 형식으로 변환하는 방법을 배워보세요. 