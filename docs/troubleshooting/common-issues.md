# 일반적인 문제

HWPXLib 사용 시 자주 발생하는 일반적인 문제들과 해결 방법을 설명합니다.

## 파일 읽기/쓰기 오류

### 파일을 찾을 수 없는 경우

**문제**: 파일 경로가 잘못되었거나 파일이 존재하지 않는 경우 발생합니다.

**해결 방법**:
```java
import java.io.File;

public class FileCheckExample {
    public static void main(String[] args) {
        String filepath = "example.hwpx";
        
        // 파일 존재 여부 확인
        File file = new File(filepath);
        if (!file.exists()) {
            System.err.println("파일을 찾을 수 없습니다: " + filepath);
            return;
        }
        
        // 파일 읽기 권한 확인
        if (!file.canRead()) {
            System.err.println("파일을 읽을 수 없습니다: " + filepath);
            return;
        }
        
        try {
            // 파일 읽기 시도
            HWPXFile hwpxFile = HWPXReader.fromFilepath(filepath);
            // ... 파일 처리 ...
        } catch (Exception e) {
            System.err.println("파일 읽기 오류: " + e.getMessage());
        }
    }
}
```

### 파일 쓰기 권한 문제

**문제**: 파일 쓰기 권한이 없거나 파일이 잠겨있는 경우 발생합니다.

**해결 방법**:
```java
import java.io.File;

public class FileWriteCheckExample {
    public static void main(String[] args) {
        String filepath = "output.hwpx";
        
        // 파일 쓰기 권한 확인
        File file = new File(filepath);
        if (file.exists() && !file.canWrite()) {
            System.err.println("파일을 쓸 수 없습니다: " + filepath);
            return;
        }
        
        try {
            // 파일 쓰기 시도
            HWPXFile hwpxFile = new HWPXFile();
            // ... 파일 내용 설정 ...
            HWPXWriter.toFilepath(hwpxFile, filepath);
        } catch (Exception e) {
            System.err.println("파일 쓰기 오류: " + e.getMessage());
        }
    }
}
```

## 메모리 문제

### OutOfMemoryError 발생

**문제**: 대용량 파일을 처리할 때 메모리 부족으로 오류가 발생합니다.

**해결 방법**:
```java
public class MemoryOptimizationExample {
    public static void main(String[] args) {
        try {
            // JVM 메모리 설정
            System.setProperty("java.awt.headless", "true");
            
            // 파일 읽기 시 메모리 최적화
            HWPXFile hwpxFile = HWPXReader.fromFilepath("large_file.hwpx");
            
            // 섹션별로 처리
            for (int i = 0; i < hwpxFile.bodyText().sectionList().size(); i++) {
                processSection(hwpxFile.bodyText().sectionList().get(i));
                
                // 가비지 컬렉션 유도
                if (i % 5 == 0) {
                    System.gc();
                }
            }
        } catch (Exception e) {
            System.err.println("메모리 오류: " + e.getMessage());
        }
    }
    
    private static void processSection(Section section) {
        // 섹션 처리 로직
        // ... 
    }
}
```

### 메모리 누수 방지

**문제**: 리소스가 제대로 해제되지 않아 메모리 누수가 발생합니다.

**해결 방법**:
```java
public class ResourceManagementExample {
    public static void main(String[] args) {
        HWPXFile hwpxFile = null;
        try {
            hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            // ... 파일 처리 ...
        } catch (Exception e) {
            System.err.println("처리 오류: " + e.getMessage());
        } finally {
            // 리소스 해제
            if (hwpxFile != null) {
                hwpxFile = null;
            }
            System.gc();
        }
    }
}
```

## 호환성 문제

### 버전 호환성

**문제**: 다른 버전의 HWPX 파일을 처리할 때 호환성 문제가 발생합니다.

**해결 방법**:
```java
public class VersionCompatibilityExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 버전 정보 확인
            String version = hwpxFile.versionXMLFile().appVersion();
            System.out.println("문서 버전: " + version);
            
            // 버전에 따른 처리
            if (version.startsWith("5.0")) {
                processVersion5(hwpxFile);
            } else if (version.startsWith("4.0")) {
                processVersion4(hwpxFile);
            } else {
                System.err.println("지원하지 않는 버전입니다: " + version);
            }
        } catch (Exception e) {
            System.err.println("버전 호환성 오류: " + e.getMessage());
        }
    }
    
    private static void processVersion5(HWPXFile hwpxFile) {
        // 버전 5.0 처리 로직
    }
    
    private static void processVersion4(HWPXFile hwpxFile) {
        // 버전 4.0 처리 로직
    }
}
```

### 인코딩 문제

**문제**: 텍스트 인코딩이 맞지 않아 한글이 깨지는 경우가 발생합니다.

**해결 방법**:
```java
public class EncodingExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 인코딩 설정
            hwpxFile.headerXMLFile()
                .charset("UTF-8");
            
            // 텍스트 처리 시 인코딩 확인
            for (Section section : hwpxFile.bodyText().sectionList()) {
                for (Para para : section.paragraphList()) {
                    String text = para.text();
                    // 인코딩 변환이 필요한 경우
                    text = new String(text.getBytes("ISO-8859-1"), "UTF-8");
                    para.text(text);
                }
            }
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "output.hwpx");
            
        } catch (Exception e) {
            System.err.println("인코딩 오류: " + e.getMessage());
        }
    }
}
```

## 다음 단계

- [성능 최적화](performance-optimization.md) 섹션으로 이동하여 대용량 파일 처리와 성능 향상 방법을 확인해보세요. 