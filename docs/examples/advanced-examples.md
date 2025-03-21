# 고급 예제

HWPXLib를 사용하는 고급 예제들을 살펴봅니다.

## 복잡한 문서 구조

여러 섹션과 스타일이 적용된 복잡한 문서를 생성하는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;
import kr.dogfoot.hwpxlib.object.content.section_xml.enumtype.TextAlignment;

public class ComplexDocumentExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            
            // 문서 속성 설정
            hwpxFile.headerXMLFile()
                .title("복잡한 문서 구조")
                .author("작성자")
                .date("2024-03-20");
            
            // 여러 섹션 추가
            for (int i = 0; i < 3; i++) {
                hwpxFile.bodyText().addNewSection();
                
                // 섹션 제목
                hwpxFile.bodyText().sectionList().get(i)
                    .addNewParagraph()
                    .align(TextAlignment.CENTER)
                    .addNewText()
                    .text("섹션 " + (i + 1));
                
                // 본문 내용
                for (int j = 0; j < 3; j++) {
                    hwpxFile.bodyText().sectionList().get(i)
                        .addNewParagraph()
                        .indent(j * 500)
                        .addNewText()
                        .text("들여쓰기 레벨 " + j + "의 텍스트입니다.");
                }
            }
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "complex_document.hwpx");
            
            System.out.println("복잡한 구조의 문서가 생성되었습니다.");
            
        } catch (Exception e) {
            System.err.println("문서 생성 오류: " + e.getMessage());
        }
    }
}
```

## 이미지 및 차트 추가

이미지와 차트를 포함하는 문서를 생성하는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;
import kr.dogfoot.hwpxlib.object.content.section_xml.enumtype.TextAlignment;
import java.io.FileInputStream;

public class ImageAndChartExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            
            // 문서 속성 설정
            hwpxFile.headerXMLFile()
                .title("이미지와 차트")
                .author("작성자")
                .date("2024-03-20");
            
            // 섹션 추가
            hwpxFile.bodyText().addNewSection();
            
            // 이미지 추가
            hwpxFile.bodyText().sectionList().get(0)
                .addNewPicture()
                .width(5000)
                .height(3000)
                .imageData(new FileInputStream("example.jpg"));
            
            // 차트 추가
            hwpxFile.bodyText().sectionList().get(0)
                .addNewChart()
                .width(5000)
                .height(3000)
                .addNewData()
                .addNewCategory("1월")
                .addNewCategory("2월")
                .addNewCategory("3월")
                .addNewSeries("매출")
                .addNewValue(100)
                .addNewValue(150)
                .addNewValue(200);
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "image_and_chart_document.hwpx");
            
            System.out.println("이미지와 차트가 포함된 문서가 생성되었습니다.");
            
        } catch (Exception e) {
            System.err.println("문서 생성 오류: " + e.getMessage());
        }
    }
}
```

## 문서 변환 및 내보내기

HWPX 파일을 다른 형식으로 변환하고 내보내는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.Para;
import java.io.FileWriter;
import java.io.BufferedWriter;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.FileOutputStream;

public class DocumentConversionExample {
    public static void main(String[] args) {
        try {
            // HWPX 파일 읽기
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 텍스트 파일로 변환
            try (BufferedWriter writer = new BufferedWriter(new FileWriter("converted.txt"))) {
                writer.write("제목: " + hwpxFile.headerXMLFile().title() + "\n\n");
                
                for (int i = 0; i < hwpxFile.bodyText().sectionList().size(); i++) {
                    writer.write("=== 섹션 " + (i + 1) + " ===\n");
                    
                    for (Para para : hwpxFile.bodyText().sectionList().get(i).paragraphList()) {
                        writer.write(para.text() + "\n");
                    }
                    writer.write("\n");
                }
            }
            
            // PDF로 변환
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream("converted.pdf"));
            document.open();
            
            document.add(new Paragraph(hwpxFile.headerXMLFile().title()));
            document.add(new Paragraph("\n"));
            
            for (int i = 0; i < hwpxFile.bodyText().sectionList().size(); i++) {
                document.add(new Paragraph("=== 섹션 " + (i + 1) + " ==="));
                document.add(new Paragraph("\n"));
                
                for (Para para : hwpxFile.bodyText().sectionList().get(i).paragraphList()) {
                    document.add(new Paragraph(para.text()));
                }
                document.add(new Paragraph("\n"));
            }
            
            document.close();
            
            System.out.println("문서 변환이 완료되었습니다.");
            
        } catch (Exception e) {
            System.err.println("문서 변환 오류: " + e.getMessage());
        }
    }
}
```

## 다음 단계

- [실제 사용 사례](real-world-examples.md) 섹션으로 이동하여 실제 프로젝트에서의 활용 사례를 살펴보세요. 