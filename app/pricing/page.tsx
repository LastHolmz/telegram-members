const features = [
  {
    name: "Basic",
    price: "$40/month",
    fees: "3.7% + 30¢ per transaction",
    description:
      "Start selling online with a simple and easy to use platform. Create your first store in minutes..",
  },
  {
    name: "Standard",
    price: "$80/month",
    fees: "2.9% + 30¢ per transaction",
    description:
      "Level up your business with a powerful eCommerce platform. Get access to all the features you need to grow.",
  },
  {
    name: "Premium",
    price: "$200/month",
    fees: "2.4% + 30¢ per transaction",
    description:
      "For businesses that need more. Get access to all the features you need to grow.",
  },
];

const Pricing = () => {
  return (
    <section className=" py-10">
      <h3 className=" text-2xl md:text-3xl text-center  font-bold bg-gradient-to-r from-primary   to-gradaint/80 bg-clip-text text-transparent ">
        Pricing
      </h3>
      <p className="text-center">
        Simple and transparent pricing plans for all businesses.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 my-4">
        {features.map((feature, index) => (
          <div key={index} className="p-4">
            <div className=" grid justify-center items-start gap-4 bg-accent rounded-xl shadow-md shadow-background p-4 min-h-96 max-w-full">
              <div className="text-2xl pb-4">{feature.name}</div>
              <div className="text-xl ">{feature.price}</div>
              <div className="text-xl ">{feature.fees}</div>
              <div className="text-xl">{feature.description}</div>

              <div className="bg-primary text-white p-4 border rounded-xl items-center justify-center">
                Get Started
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
