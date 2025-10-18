#!/usr/bin/env python3
import sys, json, glob, os

FIXABLE_ONLY = os.environ.get("FIXABLE_ONLY","1").lower() in ("1","true","yes")

def latest_app_report():
    files = glob.glob("/var/reports/trivy_app_*.json")
    return max(files, key=lambda p: os.path.getmtime(p)) if files else None

def summarize(path):
    data = json.load(open(path, "r"))
    sev_keys = ["CRITICAL","HIGH","MEDIUM","LOW","UNKNOWN"]
    totals = {k:0 for k in sev_keys}
    fixable = {k:0 for k in sev_keys}
    for res in (data.get("Results") or []):
        for v in (res.get("Vulnerabilities") or []):
            s = (v.get("Severity") or "UNKNOWN").upper()
            if s not in totals: s = "UNKNOWN"
            totals[s] += 1
            fv = (v.get("FixedVersion") or "").strip()
            st = (v.get("Status") or "").strip().lower()
            if fv not in ("","-") or st == "fixed":
                fixable[s] += 1
    return totals, fixable

def main():
    path = latest_app_report()
    if not path:
        print("[ERR] trivy_app raporu bulunamadı"); sys.exit(2)
    totals, fixable = summarize(path)
    print("== trivy gate (app-only) ==")
    print("Rapor:", path)
    print("Toplam:", sum(totals.values()))
    print("Toplam(fixable):", sum(fixable.values()))
    for k in ["CRITICAL","HIGH","MEDIUM","LOW","UNKNOWN"]:
        t,f = totals.get(k,0), fixable.get(k,0)
        if t:
            print(f"{k}: total={t} fixable={f}")
    if FIXABLE_ONLY:
        fail = (fixable["CRITICAL"] > 0) or (fixable["HIGH"] > 0)
    else:
        fail = (totals["CRITICAL"] > 0) or (totals["HIGH"] > 0)
    sys.exit(1 if fail else 0)

if __name__ == "__main__":
    main()
