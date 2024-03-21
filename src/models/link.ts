import { Schema, model } from "mongoose";

const linkSchema = new Schema(
  {
    label: { type: String, trim: true, required: true },

    paramId: { type: String, required: true, trim: true },

    destinationUrl: { type: Schema.Types.Mixed, required: true },

    shortenMode: { type: String, enum: ["single", "group"], required: true },

    password: { type: String, trim: true, required: true },

    passProtected: { type: Boolean, default: false },

    scheduled: { type: Boolean, default: false },

    scheduleType: { type: String, enum: ["clicks", "duration"] },

    expiryDate: Number,

    maxClicks: Number,

    status: { type: String, enum: ["active", "expired"], default: "active" },

    ownerId: { type: String, required: true },

    metaTitle: { type: String, trim: true },

    metaDescription: { type: String, trim: true },
  },
  { timestamps: true }
);

const Link = model("Link", linkSchema);

export default Link;

export const createLink = async (data: any) => new Link(data).save();

export const getAllLinks = async () => Link.find({});

export const getAllUsersLinks = async (userId: string) =>
  Link.find({ ownerId: userId });

export const getLinkById = async (id: string) => Link.findById(id);

export const getLinkByParamId = async (paramId: string) =>
  Link.findOne({ paramId });

export const deleteLinkById = async (id: string) => Link.findByIdAndDelete(id);
