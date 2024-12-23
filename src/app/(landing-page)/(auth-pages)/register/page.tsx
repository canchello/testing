'use client'
import React from 'react'

// import login from '@assets/images/login.png'
// import login2 from '@assets/images/login2.png'
// import login3 from '@assets/images/login3.png'
import Image from 'next/image'
import RegisterForm from './register_form'
import AppLogo from '@/components/common/Logo'
import Link from 'next/link'
import registerImg from '@/assets/images/register.jpg'

const Register = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 px-2'>
      <RegisterForm />
      <div className='hidden md:flex justify-center flex-col md:flex-row min-h-screen w-full'>
        <div className='flex justify-center w-full md:h-screen md:max-h-screen relative p-2 rounded-xl'>
          {/* h-full w-full max-h-[60vh] */}
          <Link href={'/'} className='flex absolute justify-center top-2 right-8 ml-8 z-50 mt-4 cursor-pointer'>
            <AppLogo
            // mode={mdScreen ? "light" : "dark"}
            />
          </Link>
          <Image
            src={registerImg}
            alt='logo'
            className='object-cover w-full max-h-full max-w-none rounded-xl'
            style={{
              backgroundColor: '#15253B66'
            }}
          />
          <div className='absolute rounded-xl bg-custom-blue p-2 inset-2' />
        </div>
        {/* <CustomCarousel autoPlay={true} interval={10000} infiniteLoop={true}>
						{carouselItems.map((item, i) => (
							<CarouselItem key={i} item={item} />
						))}
					</CustomCarousel> */}
      </div>
    </div>
  )
}

// // CarouselItem Component
// const CarouselItem = ({ item }: any) => {
// 	return (
// 		<Box className="flex flex-col justify-center items-center relative h-full max-h-[60vh] md:h-screen md:max-h-screen">
// 			<Image
// 				src={item.img}
// 				alt="Fashion Quote"
// 				className="h-full object-fill"
// 			/>
// 			<Box className="absolute w-5/6 bottom-[40px] md:bottom-[100px]">
// 				<Typography className="text-base md:text-xl text-white mb-2 text-left font-semibold">
// 					"{item.quote}"
// 				</Typography>
// 				<Typography className="text-base md:text-xl text-white text-right font-semibold">
// 					- {item.author}
// 				</Typography>
// 			</Box>
// 		</Box>
// 	);
// };

export default Register
