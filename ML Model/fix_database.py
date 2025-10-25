import pandas as pd
import sqlite3
import os

DB_FILE = 'music.db'
ORIGINAL_CSV = 'datasetmusic.csv' # <-- This is your original dataset

# 1. Delete the old database file if it exists
if os.path.exists(DB_FILE):
    os.remove(DB_FILE)
print(f"Removed old {DB_FILE} if it existed. Rebuilding...")

# 2. Load your ORIGINAL song data
try:
    df = pd.read_csv(ORIGINAL_CSV, encoding='latin-1') 
except FileNotFoundError:
    print(f"ERROR: '{ORIGINAL_CSV}' not found.")
    print("Please make sure your 'datasetmusic.csv' file is in the same folder.")
    exit()

print(f"Loaded original data: {df.shape}")

# 3. Preprocess the data (same as your notebook)
df_processed = df.drop_duplicates(subset=['name', 'artists'], keep='first')
print(f"After dropping duplicates: {df_processed.shape}")

popularity_threshold = 30
df_processed = df_processed[df_processed['popularity'] > popularity_threshold]
print(f"After filtering popularity: {df_processed.shape}")

# 4. Add the columns your API needs
df_processed['play_count'] = 0
df_processed['title'] = df_processed['name'] + " by " + df_processed['artists']
print("Added 'play_count' and 'title' columns.")

# 5. Connect to the SQLite database
conn = sqlite3.connect(DB_FILE)
print(f"Creating new database: {DB_FILE}...")

# 6. Save the preprocessed, UN-SCALED data to the 'songs' table
try:
    df_processed.to_sql('songs', conn, if_exists='replace', index=False, 
                        dtype={'title': 'TEXT PRIMARY KEY'})
    print(f"Success! Added {len(df_processed)} songs to the 'songs' table.")
except Exception as e:
    print(f"Error: {e}")

conn.close()