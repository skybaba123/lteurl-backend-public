import { Schema, model } from "mongoose";

const clickSchema = new Schema(
  {
    linkId: { type: String, required: true },

    linkOwnerId: { type: String, required: true },

    ip: { type: String, required: true },

    location: { type: String, required: true },

    country: { type: String, required: true },

    countryCode: { type: String, required: true },

    countryFlag: { type: String, required: true },

    status: { type: String, enum: ["active", "expired"], default: "active" },
  },
  { timestamps: true }
);

const Click = model("Click", clickSchema);

export default Click;

export const createClick = async (data: any) => new Click(data).save();

export const getAllClicks = async () => Click.find({});

export const getClickByIpAdress = async (ipAddress: string) =>
  Click.findOne({ ip: ipAddress });

export const getUserClicks = async (linkOwnerId: string) =>
  Click.find({ linkOwnerId });

export const getLinkClicks = async (linkId: string) => Click.find({ linkId });

export const deleteClickById = async (id: string) =>
  Click.findByIdAndDelete(id);
