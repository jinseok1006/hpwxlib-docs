# 파일 변환기

HWPXLib를 사용하여 HWPX 파일을 다른 형식으로 변환하는 방법을 알아봅니다.

## 텍스트 파일로 변환

HWPX 파일을 일반 텍스트 파일로 변환하는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.Para;
import java.io.FileWriter;
import java.io.BufferedWriter;

public class ConvertToTextExample {
    public static void main(String[] args) {
        try {
            // HWPX 파일 읽기
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 텍스트 파일로 저장
            try (BufferedWriter writer = new BufferedWriter(new FileWriter("converted.txt"))) {
                // 문서 제목
                writer.write("제목: " + hwpxFile.headerXMLFile().title() + "\n\n");
                
                // 각 섹션의 내용
                for (int i = 0; i < hwpxFile.bodyText().sectionList().size(); i++) {
                    writer.write("=== 섹션 " + (i + 1) + " ===\n");
                    
                    for (Para para : hwpxFile.bodyText().sectionList().get(i).paragraphList()) {
                        writer.write(para.text() + "\n");
                    }
                    writer.write("\n");
                }
            }
            
            System.out.println("텍스트 파일로 변환이 완료되었습니다.");
            
        } catch (Exception e) {
            System.err.println("파일 변환 오류: " + e.getMessage());
        }
    }
}
```

## HTML로 변환

HWPX 파일을 HTML 형식으로 변환하는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.Para;
import java.io.FileWriter;
import java.io.BufferedWriter;

public class ConvertToHtmlExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // HTML 파일로 저장
            try (BufferedWriter writer = new BufferedWriter(new FileWriter("converted.html"))) {
                // HTML 헤더
                writer.write("<!DOCTYPE html>\n");
                writer.write("<html>\n<head>\n");
                writer.write("<meta charset=\"UTF-8\">\n");
                writer.write("<title>" + hwpxFile.headerXMLFile().title() + "</title>\n");
                writer.write("</head>\n<body>\n");
                
                // 문서 내용
                for (int i = 0; i < hwpxFile.bodyText().sectionList().size(); i++) {
                    writer.write("<section>\n");
                    writer.write("<h2>섹션 " + (i + 1) + "</h2>\n");
                    
                    for (Para para : hwpxFile.bodyText().sectionList().get(i).paragraphList()) {
                        // 문단 스타일에 따른 HTML 태그 적용
                        String tag = "p";
                        if (para.align() != null) {
                            switch (para.align()) {
                                case CENTER:
                                    writer.write("<p style=\"text-align: center;\">");
                                    break;
                                case RIGHT:
                                    writer.write("<p style=\"text-align: right;\">");
                                    break;
                                default:
                                    writer.write("<p>");
                            }
                        } else {
                            writer.write("<p>");
                        }
                        
                        writer.write(para.text());
                        writer.write("</p>\n");
                    }
                    writer.write("</section>\n");
                }
                
                // HTML 푸터
                writer.write("</body>\n</html>");
            }
            
            System.out.println("HTML 파일로 변환이 완료되었습니다.");
            
        } catch (Exception e) {
            System.err.println("파일 변환 오류: " + e.getMessage());
        }
    }
}
```

## PDF로 변환

HWPX 파일을 PDF 형식으로 변환하는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.Para;
import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.FileOutputStream;

public class ConvertToPdfExample {
    public static void main(String[] args) {
        try {
            // HWPX 파일 읽기
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // PDF 문서 생성
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream("converted.pdf"));
            document.open();
            
            // 문서 제목
            document.add(new Paragraph(hwpxFile.headerXMLFile().title()));
            document.add(new Paragraph("\n"));
            
            // 각 섹션의 내용
            for (int i = 0; i < hwpxFile.bodyText().sectionList().size(); i++) {
                document.add(new Paragraph("=== 섹션 " + (i + 1) + " ==="));
                document.add(new Paragraph("\n"));
                
                for (Para para : hwpxFile.bodyText().sectionList().get(i).paragraphList()) {
                    document.add(new Paragraph(para.text()));
                }
                document.add(new Paragraph("\n"));
            }
            
            document.close();
            System.out.println("PDF 파일로 변환이 완료되었습니다.");
            
        } catch (Exception e) {
            System.err.println("파일 변환 오류: " + e.getMessage());
        }
    }
}
```

## 다음 단계

- [예제](../examples/README.md) 섹션으로 이동하여 실제 사용 사례와 더 자세한 예제를 확인해보세요. 