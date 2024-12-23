// "use client";
import React from "react";
import Image from "next/image";
import careersHero from "@/assets/images/careers.png"
import whywork1 from "@/assets/images/whywork1.png"
import whywork2 from "@/assets/images/whywork2.png"
import whywork3 from "@/assets/images/whywork3.png"
import whywork4 from "@/assets/images/whywork4.png"
const WhyWorkWithUsSection: React.FC = () => {
	const features = [
		{
		  icon: whywork1,
		  title: 'Innovative Environment',
		  description:
			'We thrive on creativity and forward-thinking. Every team member is encouraged to bring fresh ideas to the table.',
		},
		{
		  icon: whywork2,
		  title: 'Career Growth',
		  description:
			'We provide opportunities for continuous learning, development, and advancement. Your growth is as important to us as the success of our business.',
		},
		{
		  icon: whywork3,
		  title: 'Collaborative Culture',
		  description:
			'Work alongside passionate, talented individuals who are as excited about creating change as you are.',
		},
		{
		  icon: whywork4,
		  title: 'Make an Impact',
		  description:
			'Every project and role here contributes directly to improving travel experiences for our users, making your work meaningful and rewarding.',
		},
	  ];
	return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-16 lg:px-32">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-6">
            <div className=" w-[100px]">
             <Image src={feature.icon} alt={feature.title} className="h-full w-full"/>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-300 mt-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

	);
};

export default WhyWorkWithUsSection;