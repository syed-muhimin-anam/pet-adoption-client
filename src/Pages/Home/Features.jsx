import img1 from '../../assets/about-us/0002426_icon-1.png';
import img2 from '../../assets/about-us/0002425_icon-2.png';
import img3 from '../../assets/about-us/0002424_icon-3.png';
import img4 from '../../assets/about-us/0002420_icon-4.png';

const featuresData = [
  {
    img: img1,
    title: 'Support 24/7',
    desc: 'Get help anytime from our expert support team.',
  },
  {
    img: img2,
    title: 'Fast Delivery',
    desc: 'We ensure quick and safe delivery to your doorstep.',
  },
  {
    img: img3,
    title: 'Secure Payment',
    desc: 'Your transactions are encrypted and secure.',
  },
  {
    img: img4,
    title: 'Quality Products',
    desc: 'We offer only top-quality, verified medicines.',
  },
];

const Features = () => {
  return (
    <div className="my-12 px-6 md:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="border border-gray-200 shadow-md rounded-md p-4 hover:shadow-lg transition duration-300 bg-[#FFF7EC]"
          >
            <div className="flex items-center space-x-4">
              <div className="border-2 border-[#7359bb] rounded-full w-14 h-14 flex items-center justify-center ">
                <img src={feature.img} alt={feature.title} className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
