# 성능 최적화

HWPXLib의 성능을 최적화하는 방법을 설명합니다.

## 대용량 파일 처리

### 스트리밍 방식 처리

대용량 파일을 메모리 효율적으로 처리하는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;
import java.io.BufferedInputStream;
import java.io.FileInputStream;

public class StreamingExample {
    public static void main(String[] args) {
        try {
            // 버퍼 크기 설정
            int bufferSize = 8192;
            
            // 스트리밍 방식으로 파일 읽기
            try (BufferedInputStream bis = new BufferedInputStream(
                    new FileInputStream("large_file.hwpx"), bufferSize)) {
                
                HWPXFile hwpxFile = HWPXReader.fromStream(bis);
                
                // 섹션별로 처리
                for (int i = 0; i < hwpxFile.bodyText().sectionList().size(); i++) {
                    processSection(hwpxFile.bodyText().sectionList().get(i));
                    
                    // 주기적으로 가비지 컬렉션 실행
                    if (i % 10 == 0) {
                        System.gc();
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("파일 처리 오류: " + e.getMessage());
        }
    }
    
    private static void processSection(Section section) {
        // 섹션 처리 로직
        // ...
    }
}
```

### 청크 단위 처리

파일을 청크 단위로 나누어 처리하는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;
import java.util.List;

public class ChunkProcessingExample {
    private static final int CHUNK_SIZE = 1000;
    
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = HWPXReader.fromFilepath("large_file.hwpx");
            
            // 섹션을 청크 단위로 처리
            List<Section> sections = hwpxFile.bodyText().sectionList();
            for (int i = 0; i < sections.size(); i += CHUNK_SIZE) {
                int endIndex = Math.min(i + CHUNK_SIZE, sections.size());
                processChunk(sections.subList(i, endIndex));
                
                // 메모리 정리
                System.gc();
            }
        } catch (Exception e) {
            System.err.println("청크 처리 오류: " + e.getMessage());
        }
    }
    
    private static void processChunk(List<Section> chunk) {
        // 청크 처리 로직
        for (Section section : chunk) {
            processSection(section);
        }
    }
    
    private static void processSection(Section section) {
        // 섹션 처리 로직
        // ...
    }
}
```

## 메모리 사용량 최적화

### 객체 재사용

객체를 재사용하여 메모리 사용량을 줄이는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.object.content.section_xml.paragraph.Para;
import kr.dogfoot.hwpxlib.object.content.section_xml.enumtype.TextAlignment;

public class ObjectReuseExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            
            // 재사용할 객체 생성
            Para paragraph = new Para();
            paragraph.align(TextAlignment.LEFT);
            
            // 섹션 추가
            hwpxFile.bodyText().addNewSection();
            
            // 객체 재사용
            for (int i = 0; i < 1000; i++) {
                // 텍스트만 변경
                paragraph.text("문단 " + i);
                
                // 섹션에 추가
                hwpxFile.bodyText().sectionList().get(0)
                    .paragraphList()
                    .add(paragraph);
            }
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "optimized_document.hwpx");
            
        } catch (Exception e) {
            System.err.println("객체 재사용 오류: " + e.getMessage());
        }
    }
}
```

### 메모리 캐시 관리

메모리 캐시를 효율적으로 관리하는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import java.util.LinkedHashMap;
import java.util.Map;

public class CacheManagementExample {
    private static final int MAX_CACHE_SIZE = 1000;
    private static Map<String, Object> cache = new LinkedHashMap<String, Object>(MAX_CACHE_SIZE, 0.75f, true) {
        @Override
        protected boolean removeEldestEntry(Map.Entry eldest) {
            return size() > MAX_CACHE_SIZE;
        }
    };
    
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = HWPXReader.fromFilepath("example.hwpx");
            
            // 캐시 사용
            for (Section section : hwpxFile.bodyText().sectionList()) {
                String sectionId = section.id();
                
                // 캐시에서 데이터 확인
                Object cachedData = cache.get(sectionId);
                if (cachedData != null) {
                    processCachedData(cachedData);
                } else {
                    // 새로운 데이터 처리 및 캐시 저장
                    Object processedData = processSection(section);
                    cache.put(sectionId, processedData);
                }
            }
            
        } catch (Exception e) {
            System.err.println("캐시 관리 오류: " + e.getMessage());
        }
    }
    
    private static Object processSection(Section section) {
        // 섹션 처리 로직
        return new Object();
    }
    
    private static void processCachedData(Object data) {
        // 캐시된 데이터 처리 로직
    }
}
```

## 처리 속도 향상

### 병렬 처리

여러 섹션을 병렬로 처리하여 속도를 향상시키는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.List;
import java.util.ArrayList;

public class ParallelProcessingExample {
    private static final int THREAD_POOL_SIZE = 4;
    
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = HWPXReader.fromFilepath("large_file.hwpx");
            
            // 스레드 풀 생성
            ExecutorService executor = Executors.newFixedThreadPool(THREAD_POOL_SIZE);
            
            // 섹션 목록
            List<Section> sections = hwpxFile.bodyText().sectionList();
            List<Future<?>> futures = new ArrayList<>();
            
            // 병렬 처리
            for (Section section : sections) {
                futures.add(executor.submit(() -> processSection(section)));
            }
            
            // 결과 대기
            for (Future<?> future : futures) {
                future.get();
            }
            
            // 스레드 풀 종료
            executor.shutdown();
            
        } catch (Exception e) {
            System.err.println("병렬 처리 오류: " + e.getMessage());
        }
    }
    
    private static void processSection(Section section) {
        // 섹션 처리 로직
        // ...
    }
}
```

### 배치 처리

여러 작업을 배치로 처리하여 속도를 향상시키는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import java.util.List;
import java.util.ArrayList;

public class BatchProcessingExample {
    private static final int BATCH_SIZE = 100;
    
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = HWPXReader.fromFilepath("large_file.hwpx");
            
            // 처리할 작업 목록
            List<Section> sections = hwpxFile.bodyText().sectionList();
            
            // 배치 처리
            for (int i = 0; i < sections.size(); i += BATCH_SIZE) {
                int endIndex = Math.min(i + BATCH_SIZE, sections.size());
                List<Section> batch = sections.subList(i, endIndex);
                
                // 배치 처리
                processBatch(batch);
                
                // 진행 상황 출력
                System.out.println("처리 완료: " + endIndex + "/" + sections.size());
            }
            
        } catch (Exception e) {
            System.err.println("배치 처리 오류: " + e.getMessage());
        }
    }
    
    private static void processBatch(List<Section> batch) {
        // 배치 처리 로직
        for (Section section : batch) {
            processSection(section);
        }
    }
    
    private static void processSection(Section section) {
        // 섹션 처리 로직
        // ...
    }
}
```

## 다음 단계

- [보안 관련](security.md) 섹션으로 이동하여 파일 접근 권한과 데이터 보안에 대해 알아보세요. 