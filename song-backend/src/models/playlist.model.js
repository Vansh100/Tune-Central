import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        songs: [
            {
                type: mongoose.Types.ObjectId,
                ref: "song"
            }
        ],
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "User ",
            required: true
        },
        collaborators: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User"
            }
        ]

    }
)

export const Playlist = mongoose.model("Playlist", playlistSchema)