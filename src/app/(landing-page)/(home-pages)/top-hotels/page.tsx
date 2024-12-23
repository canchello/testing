import SubscribeUs from '@/components/pages/home/subscribeUs'
import HeroSection from '@/components/pages/TopLocations/HeroSection'
import SpecialUniqueStays from '@/components/pages/hotels/stays/SpecialUniqueStays'
import AppPromotionCard from '@/components/pages/TopLocations/PromotionCard'
import FeaturedHotels from '@/components/pages/TopLocations/FeaturedHotels'
import DestinationGrid from '@/components/pages/TopLocations/FeaturedHotels/DestinationGrid'

const TopHotels = () => {
  return (
    <div>
      <HeroSection />
      <DestinationGrid />
      <FeaturedHotels />
      <div className='p-4 py-16 justify-items-center bg-custom-dark-blue text-white'>
        <SpecialUniqueStays />
      </div>
      <AppPromotionCard />
      <SubscribeUs />
    </div>
  )
}

export default TopHotels
