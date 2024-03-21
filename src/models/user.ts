import { model, Schema, Document } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },

    username: { type: String, trim: true, lowercase: true },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    hashedPassword: {
      type: String,
      required: true,
    },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    manager: { type: String, enum: ["yes", "no"], default: "no" },

    stripePaymentIntent: {
      planId: String,
      planDuration: String,
      clientSecret: String,
      paymentIntent: String,
    },

    paymentHistory: {
      type: [
        {
          amount: Number,
          planId: String,
          paymentType: String,
          paymentId: String,
          paymentDuration: String,
          createdAt: Date,
        },
      ],
    },

    subscriptionExpiry: Number,
    apiKey: String,
    planId: String,
    verificationCode: String,
    verificationCodeExpiry: Number,
    sessionToken: String,
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;

export const createUser = async (data: {
  name: string;
  email: string;
  hashedPassword: string;
}) => new User(data).save();

export const getAllUsers = async () => User.find({});

export const getUserById = async (id: string) => User.findById(id);

export const getUserByEmail = async (email: string) => User.findOne({ email });

export const getUserByUsername = async (username: string) =>
  User.findOne({ username });

export const deleteUserById = async (id: string) => User.findByIdAndDelete(id);
