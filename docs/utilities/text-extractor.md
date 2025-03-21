# 텍스트 추출기

HWPXLib는 HWPX 파일에서 텍스트를 추출하는 다양한 방법을 제공합니다.

## 기본 텍스트 추출

가장 간단한 방법으로 텍스트를 추출하는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.Para;

public class BasicTextExtractionExample {
    public static void main(String[] args) {
        try {
            // HWPX 파일 읽기
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 각 섹션의 텍스트 추출
            for (int i = 0; i < hwpxFile.bodyText().sectionList().size(); i++) {
                System.out.println("=== 섹션 " + (i + 1) + " ===");
                
                // 각 문단의 텍스트 추출
                for (Para para : hwpxFile.bodyText().sectionList().get(i).paragraphList()) {
                    System.out.println(para.text());
                }
                System.out.println();
            }
            
        } catch (Exception e) {
            System.err.println("텍스트 추출 오류: " + e.getMessage());
        }
    }
}
```

## 추출 옵션 설정

텍스트 추출 시 다양한 옵션을 설정할 수 있습니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.Para;
import kr.dogfoot.hwpxlib.object.content.section_xml.enumtype.TextAlignment;

public class TextExtractionWithOptionsExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            for (int i = 0; i < hwpxFile.bodyText().sectionList().size(); i++) {
                System.out.println("=== 섹션 " + (i + 1) + " ===");
                
                for (Para para : hwpxFile.bodyText().sectionList().get(i).paragraphList()) {
                    // 문단 스타일 정보 추출
                    System.out.println("정렬: " + para.align());
                    System.out.println("들여쓰기: " + para.indent());
                    System.out.println("줄 간격: " + para.lineSpacing());
                    System.out.println("텍스트: " + para.text());
                    System.out.println("---");
                }
            }
            
        } catch (Exception e) {
            System.err.println("텍스트 추출 오류: " + e.getMessage());
        }
    }
}
```

## 추출 결과 처리

추출된 텍스트를 다양한 방식으로 처리할 수 있습니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.Para;
import java.io.FileWriter;
import java.io.BufferedWriter;

public class ProcessExtractedTextExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 추출된 텍스트를 파일로 저장
            try (BufferedWriter writer = new BufferedWriter(new FileWriter("extracted_text.txt"))) {
                for (int i = 0; i < hwpxFile.bodyText().sectionList().size(); i++) {
                    writer.write("=== 섹션 " + (i + 1) + " ===\n");
                    
                    for (Para para : hwpxFile.bodyText().sectionList().get(i).paragraphList()) {
                        // 텍스트 정제 및 처리
                        String processedText = para.text()
                            .replaceAll("\\s+", " ")  // 연속된 공백 제거
                            .trim();                  // 앞뒤 공백 제거
                        
                        writer.write(processedText + "\n");
                    }
                    writer.write("\n");
                }
            }
            
            System.out.println("텍스트가 extracted_text.txt 파일로 저장되었습니다.");
            
        } catch (Exception e) {
            System.err.println("텍스트 처리 오류: " + e.getMessage());
        }
    }
}
```

## 다음 단계

- [빈 파일 생성기](empty-file-generator.md) 섹션으로 이동하여 새로운 HWPX 파일을 생성하는 방법을 배워보세요. 