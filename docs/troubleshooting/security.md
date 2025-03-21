# 보안 관련

HWPXLib 사용 시 보안 관련 고려사항과 해결 방법을 설명합니다.

## 파일 접근 권한

### 파일 권한 확인

파일 접근 권한을 확인하고 관리하는 방법입니다:

```java
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.PosixFilePermission;
import java.util.Set;

public class FilePermissionExample {
    public static void main(String[] args) {
        try {
            String filepath = "example.hwpx";
            File file = new File(filepath);
            
            // 파일 존재 여부 확인
            if (!file.exists()) {
                System.err.println("파일이 존재하지 않습니다: " + filepath);
                return;
            }
            
            // 파일 권한 확인
            if (!file.canRead()) {
                System.err.println("파일을 읽을 수 없습니다: " + filepath);
                return;
            }
            
            if (!file.canWrite()) {
                System.err.println("파일을 쓸 수 없습니다: " + filepath);
                return;
            }
            
            // POSIX 시스템에서의 상세 권한 확인
            if (System.getProperty("os.name").toLowerCase().contains("nix")) {
                Path path = file.toPath();
                Set<PosixFilePermission> permissions = Files.getPosixFilePermissions(path);
                
                System.out.println("파일 권한:");
                System.out.println("읽기 권한: " + permissions.contains(PosixFilePermission.OWNER_READ));
                System.out.println("쓰기 권한: " + permissions.contains(PosixFilePermission.OWNER_WRITE));
                System.out.println("실행 권한: " + permissions.contains(PosixFilePermission.OWNER_EXECUTE));
            }
            
        } catch (Exception e) {
            System.err.println("권한 확인 오류: " + e.getMessage());
        }
    }
}
```

### 권한 설정

파일 권한을 안전하게 설정하는 방법입니다:

```java
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.PosixFilePermission;
import java.util.HashSet;
import java.util.Set;

public class SetFilePermissionExample {
    public static void main(String[] args) {
        try {
            String filepath = "example.hwpx";
            File file = new File(filepath);
            
            // POSIX 시스템에서의 권한 설정
            if (System.getProperty("os.name").toLowerCase().contains("nix")) {
                Path path = file.toPath();
                Set<PosixFilePermission> permissions = new HashSet<>();
                
                // 소유자 권한 설정
                permissions.add(PosixFilePermission.OWNER_READ);
                permissions.add(PosixFilePermission.OWNER_WRITE);
                
                // 그룹 권한 설정
                permissions.add(PosixFilePermission.GROUP_READ);
                
                // 기타 사용자 권한 설정
                permissions.add(PosixFilePermission.OTHERS_READ);
                
                // 권한 적용
                Files.setPosixFilePermissions(path, permissions);
            }
            
        } catch (Exception e) {
            System.err.println("권한 설정 오류: " + e.getMessage());
        }
    }
}
```

## 데이터 보안

### 민감한 데이터 처리

민감한 데이터를 안전하게 처리하는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;
import java.security.MessageDigest;
import java.util.Base64;

public class SensitiveDataExample {
    public static void main(String[] args) {
        try {
            HWPXFile hwpxFile = new HWPXFile();
            
            // 민감한 데이터 처리
            String sensitiveData = "비밀번호123";
            
            // 데이터 암호화
            String encryptedData = encryptData(sensitiveData);
            
            // 문서에 저장
            hwpxFile.bodyText().addNewSection()
                .addNewParagraph()
                .addNewText()
                .text("암호화된 데이터: " + encryptedData);
            
            // 파일 저장
            HWPXWriter.toFilepath(hwpxFile, "secure_document.hwpx");
            
        } catch (Exception e) {
            System.err.println("데이터 처리 오류: " + e.getMessage());
        }
    }
    
    private static String encryptData(String data) throws Exception {
        // SHA-256 해시 생성
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(data.getBytes());
        
        // Base64 인코딩
        return Base64.getEncoder().encodeToString(hash);
    }
}
```

### 임시 파일 관리

임시 파일을 안전하게 관리하는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.writer.HWPXWriter;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class TempFileManagementExample {
    public static void main(String[] args) {
        File tempFile = null;
        try {
            // 임시 파일 생성
            tempFile = File.createTempFile("temp_", ".hwpx");
            tempFile.deleteOnExit(); // JVM 종료 시 자동 삭제
            
            // 임시 파일에 데이터 쓰기
            HWPXFile hwpxFile = new HWPXFile();
            hwpxFile.bodyText().addNewSection()
                .addNewParagraph()
                .addNewText()
                .text("임시 데이터");
            
            HWPXWriter.toFilepath(hwpxFile, tempFile.getAbsolutePath());
            
            // 임시 파일을 최종 위치로 이동
            Path source = tempFile.toPath();
            Path target = new File("final_document.hwpx").toPath();
            Files.move(source, target, StandardCopyOption.REPLACE_EXISTING);
            
        } catch (Exception e) {
            System.err.println("임시 파일 처리 오류: " + e.getMessage());
        } finally {
            // 임시 파일 정리
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete();
            }
        }
    }
}
```

## 안전한 파일 처리

### 파일 검증

파일의 무결성을 검증하는 방법입니다:

```java
import kr.dogfoot.hwpxlib.object.HWPXFile;
import kr.dogfoot.hwpxlib.reader.HWPXReader;
import java.security.MessageDigest;
import java.io.FileInputStream;

public class FileValidationExample {
    public static void main(String[] args) {
        try {
            String filepath = "example.hwpx";
            
            // 파일 해시 계산
            String fileHash = calculateFileHash(filepath);
            System.out.println("파일 해시: " + fileHash);
            
            // 파일 구조 검증
            HWPXFile hwpxFile = HWPXReader.fromFilepath(filepath);
            validateFileStructure(hwpxFile);
            
        } catch (Exception e) {
            System.err.println("파일 검증 오류: " + e.getMessage());
        }
    }
    
    private static String calculateFileHash(String filepath) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        try (FileInputStream fis = new FileInputStream(filepath)) {
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                digest.update(buffer, 0, bytesRead);
            }
        }
        return bytesToHex(digest.digest());
    }
    
    private static String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
    
    private static void validateFileStructure(HWPXFile hwpxFile) {
        // 필수 구조 확인
        if (hwpxFile.headerXMLFile() == null) {
            throw new IllegalStateException("헤더 XML 파일이 없습니다.");
        }
        
        if (hwpxFile.bodyText() == null) {
            throw new IllegalStateException("본문이 없습니다.");
        }
        
        // 추가적인 구조 검증
        // ...
    }
}
```

### 안전한 파일 삭제

파일을 안전하게 삭제하는 방법입니다:

```java
import java.io.File;
import java.io.RandomAccessFile;
import java.security.SecureRandom;

public class SecureFileDeletionExample {
    public static void main(String[] args) {
        try {
            String filepath = "sensitive_file.hwpx";
            File file = new File(filepath);
            
            if (file.exists()) {
                // 파일 크기 확인
                long length = file.length();
                
                // 파일을 랜덤 데이터로 덮어쓰기
                try (RandomAccessFile raf = new RandomAccessFile(file, "rw")) {
                    SecureRandom random = new SecureRandom();
                    byte[] buffer = new byte[8192];
                    
                    // 여러 번 덮어쓰기
                    for (int i = 0; i < 3; i++) {
                        raf.seek(0);
                        while (raf.getFilePointer() < length) {
                            random.nextBytes(buffer);
                            raf.write(buffer);
                        }
                    }
                }
                
                // 파일 삭제
                if (!file.delete()) {
                    throw new RuntimeException("파일 삭제 실패");
                }
                
                System.out.println("파일이 안전하게 삭제되었습니다.");
            }
            
        } catch (Exception e) {
            System.err.println("파일 삭제 오류: " + e.getMessage());
        }
    }
}
```

## 다음 단계

- [참조](../references/README.md) 섹션으로 이동하여 API 참조와 추가 리소스를 확인해보세요. 