import { model, Schema } from "mongoose";

const companySchema = new Schema(
  {
    name: { type: String, trim: true, default: "N/A" },
    baseUrl: { type: String, trim: true, default: "N/A" },
    phone: { type: String, trim: true, default: "+1 949392844" },
    email: { type: String, trim: true, default: "example@gmail.com" },
    annualDiscountPlan: { type: Number, default: 20 },

    address: {
      type: String,
      trim: true,
      default: "408 Warren Rd - San Mateo, CA 94402",
    },

    head: {
      iconUrl: { type: String, default: "https://example.com/image.jpg" },
      title: { type: String, default: "N/A" },
      description: { type: String, default: "N/A" },
    },

    logoUrl: { type: String, default: "https://example.com/image.jpg" },

    welcomeEmail: {
      status: { type: String, default: "off", enum: ["on", "off"] },
      emailMessage: { type: String, default: "Welcome" },
    },

    currency: {
      name: { type: String, default: "United States Dollar" },
      code: { type: String, default: "USD" },
      symbol: { type: String, default: "$" },
    },

    emailSetup: {
      host: { type: String, trim: true, default: "N/A" },
      port: { type: Number, default: 0 },
      secure: { type: Boolean, default: true },
      from: { type: String, trim: true, default: "N/A" },
      auth: {
        user: { type: String, default: "N/A" },
        pass: { type: String, default: "N/A" },
      },
    },

    privacyPolicyPage: {
      privacyPolicy: {
        type: String,
        trim: true,
        default: "This is the privacy policy",
      },
    },

    helpPage: {
      commonQuestions: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
    },

    colors: {
      light: {
        background: { type: String, trim: true, default: "#ffffff" },
        backgroundSec: { type: String, trim: true, default: "#f0f0f0" },
        text: { type: String, trim: true, default: "#333333" },
        textSec: { type: String, trim: true, default: "#666666" },
        primary: { type: String, trim: true, default: "#ff4500" },
      },
      dark: {
        background: { type: String, trim: true, default: "#181818" },
        backgroundSec: { type: String, trim: true, default: "#1f1f1f" },
        text: { type: String, trim: true, default: "#ffffff" },
        textSec: { type: String, trim: true, default: "#cccccc" },
        primary: { type: String, trim: true, default: "#fa662f" },
      },
      primaryVeryLight: { type: String, trim: true, default: "#fcece6" },
    },
  },
  { timestamps: true }
);

const Company = model("Company", companySchema);

export default Company;
