#!/usr/bin/env python3
import sys, json, glob, os

def latest(pattern):
    files = glob.glob(pattern)
    if not files: return None
    return max(files, key=lambda p: os.path.getmtime(p))

def load_report(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def summarize(data):
    sev_order = ["CRITICAL","HIGH","MEDIUM","LOW","UNKNOWN"]
    sev = {k:0 for k in sev_order}
    total = 0
    for dep in data.get("dependencies", []):
        for v in dep.get("vulns", []):
            s = (v.get("severity") or "UNKNOWN").upper()
            if s not in sev: s = "UNKNOWN"
            sev[s] += 1
            total += 1
    return total, sev

def main():
    path = None
    if len(sys.argv) > 1:
        path = sys.argv[1]
    else:
        path = latest("/var/reports/pip_audit_*.json")
    if not path:
        print("[ERR] pip_audit raporu bulunamadı"); sys.exit(2)
    data = load_report(path)
    total, sev = summarize(data)
    print("== pip-audit gate ==")
    print("Rapor:", path)
    print("Toplam:", total)
    for k in ["CRITICAL","HIGH","MEDIUM","LOW","UNKNOWN"]:
        if sev.get(k,0):
            print(f"{k}: {sev[k]}")
    # Gate: HIGH veya CRITICAL varsa fail
    if sev.get("CRITICAL",0) > 0 or sev.get("HIGH",0) > 0:
        sys.exit(1)

if __name__ == "__main__":
    main()
