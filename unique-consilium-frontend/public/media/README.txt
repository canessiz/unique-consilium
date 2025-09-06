Media encoding guidance

Files:
- hero.webm — WebM (VP9/AV1), 16:9, progressive
- hero.mp4 — H.264, 16:9, "faststart" (moov atom at front)
- hero-poster.jpg — 16:9 poster, optimized < 200 KB

Recommendations:
- Keep both WebM and MP4 for widest compatibility.
- Enable byte-range requests on the host (206 partial content).
- MP4: move moov atom to the head for streaming: ffmpeg -i in.mp4 -movflags +faststart -c copy out.mp4
- Re-encode examples:
  - WebM (VP9): ffmpeg -i in.mp4 -c:v libvpx-vp9 -b:v 0 -crf 33 -pix_fmt yuv420p -an hero.webm
  - MP4 (H.264): ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -movflags +faststart -an hero.mp4

Note:
If you still see HTTP 416 for hero.mp4 in dev, that’s usually a dev server range request quirk; production should serve 200/206.

Detected issues (automated scan):
- hero.webm appears empty (0 bytes)
- hero.mp4 appears empty (0 bytes)
- hero-poster.jpg appears empty (0 bytes)

Please re-encode/upload proper media assets following the recommendations above.
