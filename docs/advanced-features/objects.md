# 객체 처리

## 표 만들기

### 기본 표 생성

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.object.Table;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.object.table.Tr;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.object.table.Tc;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class CreateTableExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(0);
            
            // 표 추가
            Table table = section.paragraphList().addNew().createTable();
            
            // 표 속성 설정
            table.tablePr()
                .width(5000)
                .height(3000)
                .cellSpacing(100);
            
            // 행 추가
            Tr row = table.trList().addNew();
            
            // 셀 추가
            Tc cell1 = row.tcList().addNew();
            cell1.text("첫 번째 셀");
            
            Tc cell2 = row.tcList().addNew();
            cell2.text("두 번째 셀");
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "table_document.hwpx");
            
        } catch (Exception e) {
            System.err.println("표 생성 오류: " + e.getMessage());
        }
    }
}
```

### 표 스타일 설정

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.object.Table;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.object.table.Tr;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.object.table.Tc;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class TableStyleExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(0);
            
            // 표 추가
            Table table = section.paragraphList().addNew().createTable();
            
            // 표 스타일 설정
            table.tablePr()
                .width(5000)
                .height(3000)
                .cellSpacing(100)
                .borderWidth(1)
                .borderColor(0x000000);
            
            // 행 추가
            Tr row = table.trList().addNew();
            row.trHeight(1000);
            
            // 셀 추가 및 스타일 설정
            Tc cell = row.tcList().addNew();
            cell.tcPr()
                .width(2500)
                .height(1000)
                .padding()
                .left(100)
                .right(100)
                .top(100)
                .bottom(100);
            
            cell.text("스타일이 적용된 셀");
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "styled_table.hwpx");
            
        } catch (Exception e) {
            System.err.println("표 스타일 설정 오류: " + e.getMessage());
        }
    }
}
```

## 이미지 추가

### 기본 이미지 삽입

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.object.Picture;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;
import java.io.FileInputStream;

public class AddImageExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(0);
            
            // 이미지 추가
            Picture picture = section.paragraphList().addNew().createPicture();
            
            // 이미지 속성 설정
            picture.picturePr()
                .width(3000)
                .height(2000)
                .objectNumber(1);
            
            // 이미지 데이터 설정
            picture.binData()
                .data(readImageFile("image.jpg"))
                .format("jpg");
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "image_document.hwpx");
            
        } catch (Exception e) {
            System.err.println("이미지 추가 오류: " + e.getMessage());
        }
    }
    
    private static byte[] readImageFile(String filepath) throws IOException {
        try (FileInputStream fis = new FileInputStream(filepath)) {
            return fis.readAllBytes();
        }
    }
}
```

### 이미지 크기 조정

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.object.Picture;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class ResizeImageExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(0);
            
            // 이미지 추가
            Picture picture = section.paragraphList().addNew().createPicture();
            
            // 이미지 크기 조정
            picture.picturePr()
                .width(5000)  // 원본 크기의 2배
                .height(3000) // 원본 크기의 2배
                .objectNumber(1)
                .scale(200);  // 200% 확대
            
            // 이미지 데이터 설정
            picture.binData()
                .data(readImageFile("image.jpg"))
                .format("jpg");
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "resized_image.hwpx");
            
        } catch (Exception e) {
            System.err.println("이미지 크기 조정 오류: " + e.getMessage());
        }
    }
}
```

## 차트 추가

### 기본 차트 생성

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.object.Chart;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class CreateChartExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(0);
            
            // 차트 추가
            Chart chart = section.paragraphList().addNew().createChart();
            
            // 차트 속성 설정
            chart.chartPr()
                .width(5000)
                .height(3000)
                .objectNumber(1);
            
            // 차트 데이터 설정
            chart.chartData()
                .addCategory("1월")
                .addCategory("2월")
                .addCategory("3월");
            
            chart.chartData()
                .addSeries("매출")
                .addValue(1000)
                .addValue(2000)
                .addValue(3000);
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "chart_document.hwpx");
            
        } catch (Exception e) {
            System.err.println("차트 생성 오류: " + e.getMessage());
        }
    }
}
```

## 도형 추가

### 기본 도형 그리기

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.object.Shape;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;

public class DrawShapeExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            SectionXMLFile section = hwpxFile.sectionXMLFileList().get(0);
            
            // 사각형 추가
            Shape rectangle = section.paragraphList().addNew().createShape();
            rectangle.shapePr()
                .width(3000)
                .height(2000)
                .objectNumber(1)
                .type(ShapeType.RECTANGLE);
            
            // 도형 스타일 설정
            rectangle.shapePr()
                .fillColor(0xFF0000)  // 빨간색
                .lineColor(0x000000)  // 검정색
                .lineWidth(100);      // 선 두께
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "shape_document.hwpx");
            
        } catch (Exception e) {
            System.err.println("도형 추가 오류: " + e.getMessage());
        }
    }
}
```

## 다음 단계

- [문서 메타데이터](metadata.md) 섹션으로 이동하여 문서의 속성과 버전 정보를 관리하는 방법을 배워보세요. 