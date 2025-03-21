# 고급 기능

## 문서 구조 접근

HWPX 파일은 여러 XML 파일들로 구성된 ZIP 아카이브입니다. hwpxlib는 이러한 구조를 객체 지향적으로 접근할 수 있게 해줍니다.

### 핵심 컴포넌트

```java
HWPXFile hwpxFile = HWPXReader.fromFilepath("document.hwpx");

// 버전 정보 접근
VersionXMLFile version = hwpxFile.versionXMLFile();

// 문서 헤더 접근
HeaderXMLFile header = hwpxFile.headerXMLFile();

// 문서 섹션 접근
for (SectionXMLFile section : hwpxFile.sectionXMLFileList().items()) {
    // 섹션 처리
}

// 마스터 페이지 접근
for (MasterPageXMLFile masterPage : hwpxFile.masterPageXMLFileList().items()) {
    // 마스터 페이지 처리
}

// 문서 설정 접근
SettingsXMLFile settings = hwpxFile.settingsXMLFile();
```

## 문자 속성 관리

문자 속성(CharPr)을 통해 텍스트의 스타일을 세밀하게 제어할 수 있습니다.

```java
// 문자 속성 설정
CharPr charPr = new CharPr();
charPr.fontRef("맑은 고딕");
charPr.height(1000);  // 10pt
charPr.textColor("#000000");
charPr.bold(true);
charPr.italic(true);
charPr.underline(true);

// 문자 속성 적용
paragraph.addCharPr(charPr);
```

### 지원되는 문자 속성

- 폰트 (fontRef)
- 크기 (height)
- 색상 (textColor)
- 배경색 (shadeColor)
- 굵게 (bold)
- 기울임 (italic)
- 밑줄 (underline)
- 취소선 (strikeout)
- 외곽선 (outline)
- 그림자 (shadow)
- 양각/음각 (emboss/engrave)
- 위첨자/아래첨자 (superscript/subscript)

## 도형 객체 처리

hwpxlib는 다양한 도형 객체를 지원합니다.

### 선 그리기

```java
Line line = new Line();
line.startPt(new Point(0, 0));
line.endPt(new Point(100, 100));
line.isReverseHV(false);

// 선 스타일 설정
LineShape lineShape = new LineShape();
lineShape.width(1);
lineShape.color("#000000");
lineShape.style(LineStyle.SOLID);
line.lineShape(lineShape);
```

### 텍스트 상자

```java
DrawText drawText = new DrawText();
drawText.name("텍스트 상자");
drawText.editable(true);

// 텍스트 여백 설정
LeftRightTopBottom margin = new LeftRightTopBottom();
margin.left(10);
margin.right(10);
margin.top(10);
margin.bottom(10);
drawText.textMargin(margin);

// 텍스트 내용 추가
SubList subList = new SubList();
subList.addText("텍스트 상자 내용");
drawText.subList(subList);
```

## 문서 옵션 설정

DocOption을 통해 문서의 다양한 옵션을 설정할 수 있습니다.

```java
DocOption docOption = new DocOption();

// 링크 정보 설정
LinkInfo linkInfo = new LinkInfo();
linkInfo.path("linked_document.hwpx");
linkInfo.pageInherit(true);
linkInfo.footnoteInherit(true);
docOption.linkinfo(linkInfo);
```

## 텍스트 추출

문서에서 텍스트를 추출하는 기능을 제공합니다.

```java
HWPXFile hwpxFile = HWPXReader.fromFilepath("document.hwpx");
TextExtractor extractor = new TextExtractor();
String text = extractor.extract(hwpxFile);
```

이 기능은 문서의 구조를 유지하면서 텍스트만 추출하거나, 특정 섹션이나 단락의 텍스트만 추출하는 등의 세밀한 제어가 가능합니다. 