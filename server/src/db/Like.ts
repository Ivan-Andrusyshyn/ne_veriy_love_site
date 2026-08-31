import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    enteredAt: {
      type: Date,
      required: true,
    },
    sectionId: {
      type: String,
      trim: true,
    },
    likedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Like = mongoose.model("Like", likeSchema);
