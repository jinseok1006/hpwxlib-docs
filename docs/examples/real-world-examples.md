# 실제 사용 사례

HWPXLib를 실제 프로젝트에서 활용하는 사례들을 살펴봅니다.

## 보고서 생성

매월 매출 보고서를 자동으로 생성하는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;
import kr.dogfoot.hwpxlib.object.content.section_xml.enumtype.TextAlignment;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.ArrayList;

public class SalesReportGenerator {
    private static class SalesData {
        String product;
        int quantity;
        double price;
        
        SalesData(String product, int quantity, double price) {
            this.product = product;
            this.quantity = quantity;
            this.price = price;
        }
    }
    
    public static void main(String[] args) {
        try {
            // 샘플 데이터 생성
            List<SalesData> salesData = new ArrayList<>();
            salesData.add(new SalesData("제품 A", 100, 10000));
            salesData.add(new SalesData("제품 B", 150, 15000));
            salesData.add(new SalesData("제품 C", 200, 20000));
            
            // 보고서 생성
            generateReport(salesData);
            
        } catch (Exception e) {
            System.err.println("보고서 생성 오류: " + e.getMessage());
        }
    }
    
    private static void generateReport(List<SalesData> salesData) throws Exception {
        HWPXFile hwpxFile = new HWPXFile();
        
        // 문서 속성 설정
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
        hwpxFile.headerXMLFile()
            .title(currentDate + " 매출 보고서")
            .author("시스템")
            .date(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        
        // 섹션 추가
        hwpxFile.bodyText().addNewSection();
        
        // 제목
        hwpxFile.bodyText().sectionList().get(0)
            .addNewParagraph()
            .align(TextAlignment.CENTER)
            .addNewText()
            .text(currentDate + " 매출 보고서");
        
        // 요약 정보
        double totalSales = 0;
        for (SalesData data : salesData) {
            totalSales += data.quantity * data.price;
        }
        
        hwpxFile.bodyText().sectionList().get(0)
            .addNewParagraph()
            .addNewText()
            .text("총 매출액: " + String.format("%,.0f", totalSales) + "원");
        
        // 상세 데이터 테이블
        hwpxFile.bodyText().sectionList().get(0)
            .addNewTable()
            .rows(salesData.size() + 1)
            .cols(4)
            .cellPadding(100)
            .borderWidth(1);
        
        // 테이블 헤더
        String[] headers = {"제품", "수량", "단가", "금액"};
        for (int i = 0; i < headers.length; i++) {
            hwpxFile.bodyText().sectionList().get(0)
                .tableList().get(0)
                .cell(0, i)
                .addNewParagraph()
                .align(TextAlignment.CENTER)
                .addNewText()
                .text(headers[i]);
        }
        
        // 테이블 데이터
        for (int i = 0; i < salesData.size(); i++) {
            SalesData data = salesData.get(i);
            double amount = data.quantity * data.price;
            
            hwpxFile.bodyText().sectionList().get(0)
                .tableList().get(0)
                .cell(i + 1, 0)
                .addNewParagraph()
                .addNewText()
                .text(data.product);
            
            hwpxFile.bodyText().sectionList().get(0)
                .tableList().get(0)
                .cell(i + 1, 1)
                .addNewParagraph()
                .addNewText()
                .text(String.valueOf(data.quantity));
            
            hwpxFile.bodyText().sectionList().get(0)
                .tableList().get(0)
                .cell(i + 1, 2)
                .addNewParagraph()
                .addNewText()
                .text(String.format("%,.0f", data.price));
            
            hwpxFile.bodyText().sectionList().get(0)
                .tableList().get(0)
                .cell(i + 1, 3)
                .addNewParagraph()
                .addNewText()
                .text(String.format("%,.0f", amount));
        }
        
        // 파일 저장
        String filename = "sales_report_" + currentDate + ".hwpx";
        HWPXWriter.toFilepath(hwpxFile, filename);
        
        System.out.println("매출 보고서가 생성되었습니다: " + filename);
    }
}
```

## 템플릿 활용

기존 템플릿을 기반으로 문서를 생성하는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class TemplateBasedDocumentGenerator {
    public static void main(String[] args) {
        try {
            // 템플릿 파일 읽기
            HWPXFile templateFile = HWPXReader.fromFilepath("template.hwpx");
            
            // 새로운 문서 생성
            HWPXFile newFile = new HWPXFile();
            
            // 문서 속성 설정
            String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            newFile.headerXMLFile()
                .title("템플릿 기반 문서")
                .author("시스템")
                .date(currentDate);
            
            // 템플릿의 섹션 구조 복사
            for (int i = 0; i < templateFile.bodyText().sectionList().size(); i++) {
                newFile.bodyText().addNewSection();
            }
            
            // 템플릿의 스타일 정보 복사
            newFile.styleXMLFile()
                .styleList()
                .addAll(templateFile.styleXMLFile().styleList());
            
            // 파일 저장
            String filename = "template_based_" + currentDate + ".hwpx";
            HWPXWriter.toFilepath(newFile, filename);
            
            System.out.println("템플릿 기반 문서가 생성되었습니다: " + filename);
            
        } catch (Exception e) {
            System.err.println("문서 생성 오류: " + e.getMessage());
        }
    }
}
```

## 대량 문서 처리

여러 HWPX 파일을 일괄 처리하는 예제입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

public class BatchDocumentProcessor {
    public static void main(String[] args) {
        try {
            // 처리할 디렉토리 설정
            String inputDir = "input";
            String outputDir = "output";
            
            // 출력 디렉토리 생성
            Files.createDirectories(Paths.get(outputDir));
            
            // HWPX 파일 목록 가져오기
            List<Path> hwpxFiles = Files.walk(Paths.get(inputDir))
                .filter(path -> path.toString().endsWith(".hwpx"))
                .collect(Collectors.toList());
            
            // 각 파일 처리
            for (Path file : hwpxFiles) {
                processFile(file, outputDir);
            }
            
            System.out.println("모든 파일 처리가 완료되었습니다.");
            
        } catch (Exception e) {
            System.err.println("파일 처리 오류: " + e.getMessage());
        }
    }
    
    private static void processFile(Path inputFile, String outputDir) throws Exception {
        // 파일 읽기
        HWPXFile hwpxFile = HWPXReader.fromFilepath(inputFile.toString());
        
        // 문서 처리 (예: 제목에 날짜 추가)
        String originalTitle = hwpxFile.headerXMLFile().title();
        String newTitle = originalTitle + " (처리됨)";
        hwpxFile.headerXMLFile().title(newTitle);
        
        // 새 파일명 생성
        String newFilename = outputDir + File.separator + 
            inputFile.getFileName().toString().replace(".hwpx", "_processed.hwpx");
        
        // 파일 저장
        HWPXWriter.toFilepath(hwpxFile, newFilename);
        
        System.out.println("파일 처리 완료: " + newFilename);
    }
}
```

## 다음 단계

- [문제 해결](../troubleshooting/README.md) 섹션으로 이동하여 자주 발생하는 문제와 해결 방법을 확인해보세요. 