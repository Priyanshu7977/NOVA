import cv2
import os

video_path = r"C:\Users\krish\Downloads\Nova\original-47bb3baba5123d995ac2c11a84deede1.mp4"
output_dir = r"C:\Users\krish\.gemini\antigravity\brain\20f91429-3d8c-45cc-a2c9-54e428748660\extracted_frames"
os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
duration = total_frames / fps if fps > 0 else 0

print(f"Video Info: {width}x{height}, {fps} fps, {total_frames} frames, {duration:.2f}s duration")

# Extract 10 evenly spaced frames
indices = [int(i * total_frames / 10) for i in range(10)]
indices.append(total_frames - 1)

for idx in indices:
    cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
    ret, frame = cap.read()
    if ret:
        out_path = os.path.join(output_dir, f"frame_{idx:04d}_{idx/fps:.2f}s.jpg")
        cv2.imwrite(out_path, frame)
        print(f"Saved {out_path}")

cap.release()
