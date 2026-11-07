const fs = require('fs');
const path = require('path');

const MAX_FILE_LINES = 300;
const MAX_FUNCTION_LINES = 50;
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'public', '.aistudio', '.cache', 'artifacts'];

function getAllFiles(dir, exts = ['.ts', '.tsx', '.js', '.cjs', '.php']) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (IGNORE_DIRS.includes(file)) continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else if (exts.includes(path.extname(file))) {
      results.push(fullPath);
    }
  }
  return results;
}

function buildLineIndex(content) {
  const lines = content.split('\n');
  const offsets = [];
  let running = 0;
  for (let i = 0; i < lines.length; i++) {
    offsets.push(running);
    running += lines[i].length + 1;
  }
  return { lines, offsets };
}

function findLineNumber(offsets, idx) {
  let low = 0, high = offsets.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (offsets[mid] <= idx) {
      if (mid === offsets.length - 1 || offsets[mid + 1] > idx) {
        return mid + 1;
      }
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return 1;
}

function handleCommentOrString(state, content, i, len) {
  const c = content[i];
  const next = i + 1 < len ? content[i + 1] : '';

  if (state.inSingleComment) {
    if (c === '\n') state.inSingleComment = false;
    return i + 1;
  }
  if (state.inMultiComment) {
    if (c === '*' && next === '/') {
      state.inMultiComment = false;
      return i + 2;
    }
    return i + 1;
  }
  if (state.inString) {
    if (c === '\\') return i + 2;
    if (c === state.stringChar) state.inString = false;
    return i + 1;
  }
  if (state.inTemplate) {
    if (c === '\\') return i + 2;
    if (c === '`') state.inTemplate = false;
    return i + 1;
  }
  if (c === '/' && next === '/') {
    state.inSingleComment = true;
    return i + 2;
  }
  if (c === '/' && next === '*') {
    state.inMultiComment = true;
    return i + 2;
  }
  if (c === "'" || c === '"') {
    state.inString = true;
    state.stringChar = c;
    return i + 1;
  }
  if (c === '`') {
    state.inTemplate = true;
    return i + 1;
  }
  return null;
}

function detectFunctionName(lookback, isArrow) {
  const regex = /(?:(?:function\s*\*?\s*|const\s+|let\s+|var\s+)|(?:\b(?:public|private|protected|static|async)\s+)+)([a-zA-Z0-9_$]+)\s*(?:=|:|\()/g;
  let match;
  let lastValid = null;
  while ((match = regex.exec(lookback)) !== null) {
    const candidate = match[1];
    if (!['if', 'for', 'while', 'switch', 'catch', 'void', 'string', 'number', 'boolean', 'any', 'array', 'true', 'false', 'null'].includes(candidate.toLowerCase())) {
      lastValid = { name: candidate, decl: match[0], index: match.index };
    }
  }
  if (lastValid) {
    return { name: lastValid.name, decl: lastValid.decl, index: lastValid.index };
  }
  return { name: isArrow ? '<arrow>' : '<anonymous>', decl: null, index: -1 };
}

function checkFunctionOpen(content, i, offsets) {
  const lookback = content.substring(Math.max(0, i - 250), i);
  const isArrow = /(=>|\)\s*:\s*[^{=>]+=>)\s*$/.test(lookback);
  const isFunc = /(function\s*\*?\s*([a-zA-Z0-9_$]*)\s*\([^)]*\))\s*(:\s*[^{]+)?\s*$/.test(lookback);
  const isMethod = /((?:async\s+)?(?:public\s+|private\s+|protected\s+|static\s+)*([a-zA-Z0-9_$]+)\s*\([^)]*\))\s*(:\s*[^{]+)?\s*$/.test(lookback);

  if (!isArrow && !isFunc && !isMethod) return null;
  const { name, decl, index } = detectFunctionName(lookback, isArrow);
  let declStart = i;
  if (index !== -1) {
    declStart = Math.max(0, i - 250) + index;
  }
  return { name, startLine: findLineNumber(offsets, declStart) };
}

function findFunctionSpans(content) {
  const { offsets } = buildLineIndex(content);
  const spans = [];
  const funcStack = [];
  let depth = 0;
  const state = { inSingleComment: false, inMultiComment: false, inString: false, inTemplate: false, stringChar: '' };
  const len = content.length;
  let i = 0;

  while (i < len) {
    const nextI = handleCommentOrString(state, content, i, len);
    if (nextI !== null) { i = nextI; continue; }

    const c = content[i];
    if (c === '{') {
      depth++;
      const candidate = checkFunctionOpen(content, i, offsets);
      if (candidate) funcStack.push({ ...candidate, depth });
    } else if (c === '}') {
      if (funcStack.length > 0 && funcStack[funcStack.length - 1].depth === depth) {
        const top = funcStack.pop();
        const endLine = findLineNumber(offsets, i);
        spans.push({ name: top.name, startLine: top.startLine, endLine, lines: endLine - top.startLine + 1 });
      }
      depth--;
    }
    i++;
  }
  return spans;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const spans = findFunctionSpans(content);
  const functionViolations = spans.filter(s => s.lines > MAX_FUNCTION_LINES);
  return {
    filePath,
    lineCount: lines.length,
    fileExceeded: lines.length > MAX_FILE_LINES,
    functionViolations
  };
}

function collectViolations(files) {
  const fileOver300 = [];
  const funcsOver50 = [];
  for (const file of files) {
    const rel = path.relative(process.cwd(), file);
    const result = analyzeFile(file);
    if (result.fileExceeded) fileOver300.push({ file: rel, lines: result.lineCount });
    for (const fv of result.functionViolations) {
      funcsOver50.push({ file: rel, ...fv });
    }
  }
  return { fileOver300, funcsOver50 };
}

function printAuditSummary(totalFiles, fileOver300, funcsOver50) {
  console.log('=====================================================');
  console.log('AUDIT MODULARISASI KODE (MAKS 300 BARIS / 50 BARIS FUNC)');
  console.log('=====================================================');
  console.log(`Total Berkas Diperiksa: ${totalFiles}`);
  console.log(`Berkas Melebihi 300 Baris: ${fileOver300.length}`);
  console.log(`Fungsi Melebihi 50 Baris: ${funcsOver50.length}`);
  console.log('-----------------------------------------------------');
  if (fileOver300.length > 0) {
    console.log('\n[!] DAFTAR BERKAS > 300 BARIS:');
    fileOver300.sort((a, b) => b.lines - a.lines).forEach((f, i) => console.log(`  ${i + 1}. ${f.file} (${f.lines} baris)`));
  }
  if (funcsOver50.length > 0) {
    console.log(`\n[!] DAFTAR FUNGSI > 50 BARIS (${funcsOver50.length} total):`);
    funcsOver50.forEach((fn, i) => console.log(`  ${i + 1}. [${fn.file}:${fn.startLine}-${fn.endLine}] ${fn.name} (${fn.lines} baris)`));
  }
}

function runAudit(targetDirs = ['src', 'server', 'scripts', 'laravel-app', 'migration']) {
  let files = [];
  for (const dir of targetDirs) files = files.concat(getAllFiles(path.resolve(dir)));
  const { fileOver300, funcsOver50 } = collectViolations(files);
  printAuditSummary(files.length, fileOver300, funcsOver50);
  const ok = fileOver300.length === 0 && funcsOver50.length === 0;
  console.log(ok ? '\n✅ AUDIT BERHASIL: Seluruh berkas <= 300 baris dan fungsi <= 50 baris.' : '\n❌ AUDIT GAGAL: Ditemukan pelanggaran modularisasi.');
  return ok;
}

if (require.main === module) {
  const success = runAudit();
  process.exit(success ? 0 : 1);
}

module.exports = { runAudit, analyzeFile };
