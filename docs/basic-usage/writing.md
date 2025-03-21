# HWPX 파일 쓰기

## 새 문서 만들기

가장 기본적인 방법으로 새 HWPX 문서를 만드는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class CreateNewDocumentExample {
    public static void main(String[] args) {
        try {
            // 새로운 HWPX 파일 객체 생성
            HWPXFile hwpxFile = new HWPXFile();
            
            // 문서 제목 설정
            hwpxFile.headerXMLFile().title("새 문서");
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "new_document.hwpx");
            
            System.out.println("새 문서가 성공적으로 생성되었습니다.");
            
        } catch (Exception e) {
            System.err.println("문서 생성 오류: " + e.getMessage());
        }
    }
}
```

## 텍스트 추가하기

문서에 텍스트를 추가하는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.Paragraph;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class AddTextExample {
    public static void main(String[] args) {
        try {
            // 새로운 HWPX 파일 객체 생성
            HWPXFile hwpxFile = new HWPXFile();
            
            // 첫 번째 섹션 가져오기
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(0);
            
            // 단락 추가
            Paragraph paragraph = section.paragraphList().addNew();
            paragraph.text("이것은 첫 번째 단락입니다.");
            
            // 다른 단락 추가
            paragraph = section.paragraphList().addNew();
            paragraph.text("이것은 두 번째 단락입니다.");
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "text_document.hwpx");
            
        } catch (Exception e) {
            System.err.println("텍스트 추가 오류: " + e.getMessage());
        }
    }
}
```

## 스타일 적용하기

텍스트에 스타일을 적용하는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.Paragraph;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.control.CharShape;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class ApplyStyleExample {
    public static void main(String[] args) {
        try {
            // 새로운 HWPX 파일 객체 생성
            HWPXFile hwpxFile = new HWPXFile();
            
            // 첫 번째 섹션 가져오기
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(0);
            
            // 단락 추가
            Paragraph paragraph = section.paragraphList().addNew();
            
            // 글자 모양 설정
            CharShape charShape = paragraph.createCharShape();
            charShape.fontName("맑은 고딕");
            charShape.fontSize(12);
            charShape.bold(true);
            charShape.italic(true);
            
            // 텍스트 추가
            paragraph.text("이것은 스타일이 적용된 텍스트입니다.");
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "styled_document.hwpx");
            
        } catch (Exception e) {
            System.err.println("스타일 적용 오류: " + e.getMessage());
        }
    }
}
```

## 섹션 추가하기

새로운 섹션을 추가하는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.SectionXMLFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.Paragraph;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class AddSectionExample {
    public static void main(String[] args) {
        try {
            // 새로운 HWPX 파일 객체 생성
            HWPXFile hwpxFile = new HWPXFile();
            
            // 첫 번째 섹션에 내용 추가
            SectionXMLFile section1 = hwpxFile.sectionXMLFileList().get(0);
            Paragraph paragraph1 = section1.paragraphList().addNew();
            paragraph1.text("첫 번째 섹션의 내용입니다.");
            
            // 두 번째 섹션 추가
            SectionXMLFile section2 = hwpxFile.sectionXMLFileList().addNew();
            Paragraph paragraph2 = section2.paragraphList().addNew();
            paragraph2.text("두 번째 섹션의 내용입니다.");
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "multi_section_document.hwpx");
            
        } catch (Exception e) {
            System.err.println("섹션 추가 오류: " + e.getMessage());
        }
    }
}
```

## 문서 속성 설정하기

문서의 속성을 설정하는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class SetDocumentPropertiesExample {
    public static void main(String[] args) {
        try {
            // 새로운 HWPX 파일 객체 생성
            HWPXFile hwpxFile = new HWPXFile();
            
            // 문서 속성 설정
            hwpxFile.headerXMLFile()
                .title("문서 제목")
                .author("작성자")
                .date("2024-03-20")
                .description("문서 설명");
            
            // 페이지 설정
            hwpxFile.sectionXMLFileList().get(0).secPr()
                .pagePr()
                .margin()
                .left(1000)
                .right(1000)
                .top(1000)
                .bottom(1000);
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "document_with_properties.hwpx");
            
        } catch (Exception e) {
            System.err.println("문서 속성 설정 오류: " + e.getMessage());
        }
    }
}
```

## 다음 단계

- [고급 기능](../advanced-features/README.md) 섹션으로 이동하여 표, 이미지, 차트 등의 복잡한 객체를 다루는 방법을 배워보세요. 