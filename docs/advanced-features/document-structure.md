# 문서 구조

## 섹션 관리

### 새 섹션 추가하기

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.SectionXMLFile;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class AddSectionExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            
            // 새 섹션 추가
            SectionXMLFile section = hwpxFile.sectionXMLFileList().addNew();
            
            // 섹션 속성 설정
            section.secPr()
                .pagePr()
                .margin()
                .left(1000)
                .right(1000)
                .top(1000)
                .bottom(1000);
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "section_document.hwpx");
            
        } catch (Exception e) {
            System.err.println("섹션 추가 오류: " + e.getMessage());
        }
    }
}
```

### 섹션 속성 설정

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.SectionXMLFile;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class SetSectionPropertiesExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(0);
            
            // 페이지 속성 설정
            section.secPr().pagePr()
                .margin()
                .left(1000)
                .right(1000)
                .top(1000)
                .bottom(1000);
            
            // 페이지 크기 설정
            section.secPr().pagePr()
                .pageSize()
                .width(21000)  // A4 가로
                .height(29700); // A4 세로
            
            // 페이지 방향 설정
            section.secPr().pagePr()
                .pageOrientation(PageOrientation.PORTRAIT);
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "section_properties.hwpx");
            
        } catch (Exception e) {
            System.err.println("섹션 속성 설정 오류: " + e.getMessage());
        }
    }
}
```

## 단락 관리

### 단락 스타일 설정

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.Paragraph;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.control.CharShape;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class ParagraphStyleExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(0);
            
            // 단락 추가
            Paragraph paragraph = section.paragraphList().addNew();
            
            // 단락 스타일 설정
            paragraph.paraPr()
                .alignment(Alignment.CENTER)
                .lineSpacing(160)  // 160%
                .indent()
                .left(1000)
                .right(1000)
                .firstLine(1000);
            
            // 글자 모양 설정
            CharShape charShape = paragraph.createCharShape();
            charShape.fontName("맑은 고딕");
            charShape.fontSize(12);
            charShape.bold(true);
            
            // 텍스트 추가
            paragraph.text("스타일이 적용된 단락입니다.");
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "paragraph_style.hwpx");
            
        } catch (Exception e) {
            System.err.println("단락 스타일 설정 오류: " + e.getMessage());
        }
    }
}
```

### 단락 간격 조정

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.Paragraph;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class ParagraphSpacingExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(0);
            
            // 첫 번째 단락
            Paragraph p1 = section.paragraphList().addNew();
            p1.paraPr()
                .spacing()
                .before(200)  // 위쪽 간격
                .after(200);   // 아래쪽 간격
            p1.text("첫 번째 단락");
            
            // 두 번째 단락
            Paragraph p2 = section.paragraphList().addNew();
            p2.paraPr()
                .spacing()
                .before(400)  // 위쪽 간격
                .after(400);   // 아래쪽 간격
            p2.text("두 번째 단락");
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "paragraph_spacing.hwpx");
            
        } catch (Exception e) {
            System.err.println("단락 간격 설정 오류: " + e.getMessage());
        }
    }
}
```

## 스타일 관리

### 스타일 시트 생성

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.header_xml.Style;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class StyleSheetExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            
            // 스타일 시트 생성
            Style style = hwpxFile.headerXMLFile().styleList().addNew();
            style.id("Heading1");
            style.type(StyleType.PARAGRAPH);
            style.name("제목 1");
            
            // 스타일 속성 설정
            style.paraPr()
                .alignment(Alignment.LEFT)
                .lineSpacing(120);
            
            style.charPr()
                .fontName("맑은 고딕")
                .fontSize(16)
                .bold(true);
            
            // 스타일 적용
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(0);
            Paragraph paragraph = section.paragraphList().addNew();
            paragraph.paraPr().styleIDRef("Heading1");
            paragraph.text("스타일이 적용된 제목입니다.");
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "style_sheet.hwpx");
            
        } catch (Exception e) {
            System.err.println("스타일 시트 생성 오류: " + e.getMessage());
        }
    }
}
```

### 스타일 상속

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.header_xml.Style;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class StyleInheritanceExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            
            // 기본 스타일 생성
            Style baseStyle = hwpxFile.headerXMLFile().styleList().addNew();
            baseStyle.id("BaseStyle");
            baseStyle.type(StyleType.PARAGRAPH);
            baseStyle.name("기본 스타일");
            baseStyle.charPr()
                .fontName("맑은 고딕")
                .fontSize(10);
            
            // 상속 스타일 생성
            Style derivedStyle = hwpxFile.headerXMLFile().styleList().addNew();
            derivedStyle.id("DerivedStyle");
            derivedStyle.type(StyleType.PARAGRAPH);
            derivedStyle.name("상속 스타일");
            derivedStyle.parentIDRef("BaseStyle");
            derivedStyle.charPr()
                .fontSize(12)
                .bold(true);
            
            // 스타일 적용
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(0);
            Paragraph paragraph = section.paragraphList().addNew();
            paragraph.paraPr().styleIDRef("DerivedStyle");
            paragraph.text("상속된 스타일이 적용된 텍스트입니다.");
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "style_inheritance.hwpx");
            
        } catch (Exception e) {
            System.err.println("스타일 상속 설정 오류: " + e.getMessage());
        }
    }
}
```

## 다음 단계

- [객체 처리](objects.md) 섹션으로 이동하여 표, 이미지, 차트 등의 객체를 다루는 방법을 배워보세요. 