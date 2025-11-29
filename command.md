# 프로젝트 초기화 및 원격 저장소 동기화 명령어

```bash
# 1. .gitignore 생성 (수동 또는 에디터에서 작성)

# 2. node_modules를 Git 인덱스에서 제거
git rm -r --cached node_modules

# 3. .gitignore 파일을 스테이징
git add .gitignore

# 4. 변경사항 커밋
git commit -m "Add .gitignore to exclude node_modules"

# 5. Git 히스토리에서 node_modules 완전 제거
# (대용량 파일이 이미 커밋된 경우)
git filter-branch --force --index-filter "git rm -r --cached --ignore-unmatch node_modules" --prune-empty --tag-name-filter cat -- --all

# 6. 변경사항을 원격 저장소에 강제 푸시
git push -f origin main
```

---

> 위 명령어들은 node_modules 등 불필요한 파일을 Git에서 완전히 제거하고, 원격 저장소와 동기화하는 데 사용되었습니다. 