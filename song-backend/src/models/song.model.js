import mongoose, {Schema} from "mongoose";

const songSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        track: {
            type: String,
            required: true
        },
        artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }

    },
    {
        timestamps: true
    }
)

export const Song = mongoose.model("Song", songSchema)