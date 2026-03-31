#!/usr/bin/env python3
"""
Generate LRC (time-synced lyrics) files for all Joshify tracks.
Uses stable-ts (Whisper-based forced alignment) to align known lyrics to audio.

Usage:
    source .venv-lyrics/bin/activate
    python scripts/generate-lrc.py
"""

import json
import os
import re
import sys
import stable_whisper

MUSIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'assets', 'music')
PROJECTS_DIR = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'projects')
LRC_OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'lyrics')

# Map project IDs to their displayLyrics content
# We'll extract these from the .ts files directly
def extract_display_lyrics(ts_file_path):
    """Extract displayLyrics string from a TypeScript project file."""
    with open(ts_file_path, 'r') as f:
        content = f.read()

    # Find displayLyrics field - it uses backtick template literals or regular strings
    # Try backtick first
    match = re.search(r'displayLyrics:\s*`(.*?)`', content, re.DOTALL)
    if match:
        return match.group(1).strip()

    # Try single/double quotes
    match = re.search(r"displayLyrics:\s*['\"](.+?)['\"]", content, re.DOTALL)
    if match:
        return match.group(1).strip()

    # Try sunoLyrics as fallback
    match = re.search(r'sunoLyrics:\s*`(.*?)`', content, re.DOTALL)
    if match:
        lyrics = match.group(1).strip()
        # Strip section headers like [Verse 1], [Chorus], etc.
        lines = []
        for line in lyrics.split('\n'):
            stripped = line.strip()
            if stripped and not re.match(r'^\[.*\]$', stripped):
                lines.append(stripped)
        return '\n'.join(lines)

    return None


def extract_music_file(ts_file_path):
    """Extract musicFile value from a TypeScript project file."""
    with open(ts_file_path, 'r') as f:
        content = f.read()
    match = re.search(r"musicFile:\s*['\"](.+?)['\"]", content)
    if match:
        return match.group(1)
    return None


def remap_to_original_lines(result, original_lyrics):
    """
    Re-map word-level timestamps from alignment back to original lyric lines.
    This preserves the line structure from displayLyrics while adding timestamps.
    """
    # Collect all words with timestamps from the alignment result
    words = []
    for segment in result.segments:
        for word in segment.words:
            w = word.word.strip()
            if w:
                words.append({
                    'word': w,
                    'start': word.start,
                    'end': word.end
                })

    # Get original non-empty lines
    original_lines = [line.strip() for line in original_lyrics.split('\n') if line.strip()]

    # Match words to lines
    word_idx = 0
    timed_lines = []

    for line in original_lines:
        # Normalize the line for matching
        line_words = line.split()
        if not line_words:
            continue

        # Find where this line's words start in the aligned words
        line_start = None
        line_end = None
        matched = 0

        # Try to match from current position
        start_search = word_idx
        for i in range(start_search, min(start_search + len(line_words) + 5, len(words))):
            # Fuzzy match: check if aligned word contains/matches the expected word
            if matched < len(line_words):
                aligned = words[i]['word'].lower().strip('.,!?;:\'"')
                expected = line_words[matched].lower().strip('.,!?;:\'"')
                if aligned == expected or expected.startswith(aligned) or aligned.startswith(expected):
                    if line_start is None:
                        line_start = words[i]['start']
                    line_end = words[i]['end']
                    matched += 1
                    word_idx = i + 1

        if line_start is not None:
            timed_lines.append({
                'time': round(line_start, 2),
                'end': round(line_end, 2),
                'text': line
            })
        elif timed_lines:
            # Fallback: use end of previous line
            timed_lines.append({
                'time': timed_lines[-1]['end'],
                'end': timed_lines[-1]['end'] + 3.0,
                'text': line
            })

    return timed_lines


def timed_lines_to_lrc(timed_lines):
    """Convert timed lines to LRC format."""
    lines = []
    for tl in timed_lines:
        start = tl['time']
        minutes = int(start // 60)
        seconds = start % 60
        lines.append(f'[{minutes:02d}:{seconds:05.2f}]{tl["text"]}')
    return '\n'.join(lines)


def main():
    os.makedirs(LRC_OUTPUT_DIR, exist_ok=True)

    # Load Whisper model (base is fast and good enough for alignment)
    print("Loading Whisper model (base)...")
    model = stable_whisper.load_model('base')
    print("Model loaded.\n")

    # Find all project files
    project_files = sorted([
        f for f in os.listdir(PROJECTS_DIR)
        if f.endswith('.ts') and f != 'index.ts'
    ])

    results_summary = []

    for project_file in project_files:
        project_path = os.path.join(PROJECTS_DIR, project_file)
        project_id = project_file.replace('.ts', '')

        music_file = extract_music_file(project_path)
        if not music_file:
            print(f"SKIP {project_id}: no musicFile")
            continue

        mp3_path = os.path.join(MUSIC_DIR, music_file)
        if not os.path.exists(mp3_path):
            print(f"SKIP {project_id}: MP3 not found at {mp3_path}")
            continue

        lyrics = extract_display_lyrics(project_path)
        if not lyrics:
            print(f"SKIP {project_id}: no lyrics found")
            continue

        print(f"ALIGNING {project_id}...")
        print(f"  MP3: {music_file}")
        print(f"  Lyrics: {len(lyrics.splitlines())} lines")

        try:
            # Use forced alignment - give it the known text
            result = model.align(mp3_path, lyrics, language='en')

            # Re-map word timestamps to original line structure
            timed_lines = remap_to_original_lines(result, lyrics)

            # Save as LRC
            lrc_content = timed_lines_to_lrc(timed_lines)
            lrc_path = os.path.join(LRC_OUTPUT_DIR, f'{project_id}.lrc')
            with open(lrc_path, 'w') as f:
                f.write(lrc_content)

            # Save as JSON (for TypeScript import)
            json_path = os.path.join(LRC_OUTPUT_DIR, f'{project_id}.json')
            with open(json_path, 'w') as f:
                json.dump(timed_lines, f, indent=2)

            print(f"  OK: {len(timed_lines)} synced lines -> {lrc_path}")
            results_summary.append((project_id, 'OK', len(timed_lines)))

        except Exception as e:
            print(f"  ERROR: {e}")
            results_summary.append((project_id, 'ERROR', str(e)))

    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    for project_id, status, info in results_summary:
        print(f"  {project_id}: {status} ({info})")


if __name__ == '__main__':
    main()
