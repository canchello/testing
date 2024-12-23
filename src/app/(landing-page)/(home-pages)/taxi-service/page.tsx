import SubscribeUs from '@/components/pages/home/subscribeUs'
import Testimonials from '@/components/pages/home/Testimonial'
import ChoosePerfectRide from '@/components/pages/TaxiService/ChoosePerfectRide'
import EffortlessJourney from '@/components/pages/TaxiService/EffortlessJourney'
import HeroSection from '@/components/pages/TaxiService/HeroSection'
import RideStyle from '@/components/pages/TaxiService/RideStyle'
import WhyWeStandOut from '@/components/pages/TaxiService/StandOut'

const TaxiService = () => {
  return (
    <div>
      <HeroSection />
      <EffortlessJourney />
      <WhyWeStandOut />
      <ChoosePerfectRide />
      <Testimonials />
      <RideStyle />
      <SubscribeUs />
    </div>
  )
}

export default TaxiService
