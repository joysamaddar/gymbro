export const SUBSCRIPTION_PLANS = [
  {
    id: "starter",
    name: "Starter",
    credits: 20,
    price: 500, // $5.00 in cents
    description: "Perfect for beginners",
  },
  {
    id: "trainer",
    name: "Trainer",
    credits: 100,
    price: 2000, // $20.00 in cents
    description: "Most popular choice",
  },
  {
    id: "elite",
    name: "Elite",
    credits: 250,
    price: 4000, // $40.00 in cents
    description: "Best value for serious users",
  },
];

export const SUBSCRIPTION_PLAN_IDS = SUBSCRIPTION_PLANS.map((plan) => plan.id);
