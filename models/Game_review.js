const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    game_title: { type: Number, required: true },
    game_image: { type: String, default: 'no-image.png' },
    ratings: {
      visuals: { type: Number, required: true },
      performance: { type: Number, required: true },
      accessibility: { type: Number, required: true },
      engagement: { type: Number, required: true },
      fun: { type: Number, required: true },
    },
    how_long_to_beat: { type: Number, required: true },
    steam_price: { type: Number, required: true },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model('review', ReviewSchema);
