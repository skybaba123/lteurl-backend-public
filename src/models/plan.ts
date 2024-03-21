import { model, Schema } from "mongoose";

const planSchema = new Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: true },

    pricePerMonth: { type: Number, required: true, default: 0 },

    clicksPerMonth: { type: Number, required: true, default: 0 },

    maxShortenLinks: { type: Number, require: true, default: 0 },

    maxGroupLinks: { type: Number, require: true, default: 0 },

    linkScheduling: { type: Boolean, require: true, default: false },

    customLinkId: { type: Boolean, require: true, default: false },

    linkProtecting: { type: Boolean, require: true, default: false },
  },
  { timestamps: true }
);

const Plan = model("Plan", planSchema);

export default Plan;

export const createPlan = async (data: any) => new Plan(data).save();

export const getFreePlan = async () => {
  const allPlans = await Plan.find({});
  let freePlan;

  if (allPlans.length <= 0) {
    freePlan = await new Plan({
      title: "Free",
      description:
        "For hobbyists, students, and testing the platform. upgrade to a higher plan to enjoy premium features.",
      clicksPerMonth: 500,
      maxShortenLinks: 100,
      maxGroupLinks: 20,
    }).save();
  } else {
    freePlan = await Plan.findOne({
      title: "Free",
    });
  }

  return freePlan;
};

export const getAllPlans = async () => Plan.find({});

export const getUserPlan = async (userPlanId: string) =>
  Plan.findById(userPlanId);

export const getPlanById = async (id: string) => Plan.findById(id);

export const deletePlanById = async (id: string) => Plan.findByIdAndDelete(id);
