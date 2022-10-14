const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    // game_image: { type: String, default: 'no-image.png' },
    game_title: { type: String, required: true },
    visuals: { type: Number, required: true },
    performance: { type: Number, required: true },
    accessibility: { type: Number, required: true },
    engagement: { type: Number, required: true },
    fun: { type: Number, required: true },
    status: { type: String, required: true },
    published: { type: Boolean, default: false },
    steam_id: { type: Number, required: true },
    // how_long_to_beat: { type: Number, required: true },
    // steam_price: { type: Number, required: true },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model('review', ReviewSchema);
