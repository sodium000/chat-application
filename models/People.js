

const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const People = mongoose.model("People", peopleSchema);

// Create indexes for better query performance
People.createIndexes()
  .then(() => {
    console.log("✅ Database indexes created successfully");
  })
  .catch((err) => {
    console.log("⚠️ Index creation warning:", err.message);
  });

module.exports = People;