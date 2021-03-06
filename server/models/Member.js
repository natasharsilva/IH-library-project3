const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    _library: {
      type: Schema.Types.ObjectId,
      ref: "Library"
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

memberSchema.index({ _user: 1, _library: 1 }, { unique: true });


const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
