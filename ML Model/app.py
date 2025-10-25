import pandas as pd
import numpy as np
import sqlite3
from flask import Flask, request, jsonify

# --- 1. Initialize Your Application ---
app = Flask(__name__)

# --- 2. Load Your Model and Data ---
# These are loaded *once* when the app starts
try:
    # Load the processed data
    df_scaled = pd.read_csv('api_data.csv', encoding='latin-1')
    
    # Load the similarity matrix
    similarity_matrix = np.load('similarity_matrix.npy')
    
    # Re-create the title-to-index mapping
    indices = pd.Series(df_scaled.index, index=df_scaled['title']).drop_duplicates()
    
    print("Model and data loaded successfully.")
    
except FileNotFoundError:
    print("ERROR: Model files not found. Please run the notebook to create them.")
    exit()

# --- 3. Copy Your Recommendation Function ---
# This is the same function from your notebook
def get_recommendations(song_title, top_n=5):
    """
    Finds the top_n most similar songs for a given song title.
    """
    try:
        # 1. Get the index of the song
        idx = indices[song_title]
    except KeyError:
        # Return an error string if song is not found
        return f"Error: Song '{song_title}' not found in the dataset."

    # 2. Get the pairwise similarity scores
    sim_scores = list(enumerate(similarity_matrix[idx]))

    # 3. Sort the songs based on similarity
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # 4. Get the scores of the top_n most similar songs
    sim_scores = sim_scores[1:top_n+1]

    # 5. Get the song indices
    song_indices = [i[0] for i in sim_scores]

    # 6. Return the titles
    # We use .iloc to get songs by their position index
    return df_scaled['title'].iloc[song_indices]

# --- 4. Define Your API Endpoint ---
@app.route('/recommend', methods=['GET'])
def recommend_songs():
    # 1. Get the 'song' query parameter from the URL
    # Example: /recommend?song=Manchild by Sabrina Carpenter
    song_title = request.args.get('song')

    # 2. Check if the 'song' parameter is provided
    if not song_title:
        return jsonify({'error': 'A "song" query parameter is required.'}), 400

    # 3. Get recommendations
    recs = get_recommendations(song_title, top_n=5)

    # 4. Handle results
    if isinstance(recs, str):
        # This means the function returned an error (song not found)
        return jsonify({'error': recs}), 404
    else:
        # Convert the pandas Series to a simple list
        rec_list = list(recs)
        # Return the list as a JSON response
        return jsonify({'recommendations': rec_list})
    
    # --- 5. Define Your "Trending" Endpoint ---
@app.route('/trending', methods=['GET'])
def get_trending():
    try:
        # --- 1. Get Most Popular Song ---
        # Find the index (row) of the song with the maximum 'popularity' value
        popular_song_idx = df_scaled['popularity'].idxmax()
        
        # Get the full row of data for that song
        popular_song = df_scaled.loc[popular_song_idx]
        
        # Create a clean dictionary to return
        most_popular_song_details = {
            'name': popular_song['name'],
            'artists': popular_song['artists'],
            'popularity': int(popular_song['popularity']) # Convert to standard int
        }

        # --- 2. Get Most Frequent Artist ---
        # .mode()[0] finds the most common value (the "mode") in the 'artists' column
        most_frequent_artist_name = df_scaled['artists'].mode()[0]
        
        # Count how many times that artist appears
        artist_song_count = int(df_scaled['artists'].value_counts().loc[most_frequent_artist_name])

        most_frequent_artist_details = {
            'artists': most_frequent_artist_name,
            'song_count_in_dataset': artist_song_count
        }

        # --- 3. Return both as a JSON response ---
        return jsonify({
            'most_popular_song': most_popular_song_details,
            'most_frequent_artist_in_dataset': most_frequent_artist_details
        })

    except Exception as e:
        # Send a generic error if anything goes wrong
        return jsonify({'error': str(e)}), 500
    
    # --- 7. UPDATED: Endpoint for Mood Recommendations ---
@app.route('/recommend_mood', methods=['GET'])
def recommend_mood():
    # Get the mood from the query parameter (e.g., /recommend_mood?mood=happy)
    mood = request.args.get('mood')
    
    if not mood:
        return jsonify({'error': 'A "mood" query parameter is required.'}), 400

    # Define our mood profiles using the unscaled 0.0-1.0 features
    # These are SQL 'WHERE' clauses. You can tweak these values!
    query_filter = ""
    if mood == 'happy':
        query_filter = "WHERE valence > 0.7 AND energy > 0.6 AND danceability > 0.5"
    elif mood == 'sad':
        query_filter = "WHERE valence < 0.3 AND energy < 0.4 AND tempo < 100"
    elif mood == 'energetic':
        query_filter = "WHERE energy > 0.8 AND tempo > 120"
    elif mood == 'calm':
        query_filter = "WHERE energy < 0.3 AND tempo < 100 AND valence > 0.4"
    elif mood == 'romantic':
        query_filter = "WHERE valence > 0.6 AND energy < 0.6 AND speechiness < 0.08"
    elif mood == 'angry':
        query_filter = "WHERE energy > 0.8 AND valence < 0.3 AND tempo > 110"
    elif mood == 'nostalgic':
        query_filter = "WHERE valence > 0.5 AND energy < 0.5 AND tempo < 110"
    elif mood == 'focused':
        query_filter = "WHERE speechiness < 0.05 AND energy < 0.3 AND liveness < 0.1"
    elif mood == 'chill':
        query_filter = "WHERE energy < 0.4 AND tempo < 110 AND liveness < 0.2"
    elif mood == 'workout':
        query_filter = "WHERE energy > 0.75 AND tempo > 120 AND danceability > 0.6"
    elif mood == 'party':
        query_filter = "WHERE energy > 0.7 AND danceability > 0.7 AND valence > 0.6"
    else:
        return jsonify({'error': 'Invalid mood provided.'}), 400

    try:
        conn = sqlite3.connect('music.db')
        conn.row_factory = sqlite3.Row # To get dict-like results
        cursor = conn.cursor()
        
        # Find 5 songs matching the mood, ordered by popularity
        query = f"""
            SELECT name, artists, title
            FROM songs
            {query_filter}
            ORDER BY popularity DESC
            LIMIT 5
        """
        
        cursor.execute(query)
        songs_rows = cursor.fetchall()
        conn.close()
        
        # Convert row objects to standard dicts
        recommendations = [dict(row) for row in songs_rows]
        
        return jsonify({'recommendations': recommendations})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- 5. Run the Application ---
if __name__ == '__main__':
    # debug=True will auto-reload the server when you save the file
    app.run(debug=True, port=5001)