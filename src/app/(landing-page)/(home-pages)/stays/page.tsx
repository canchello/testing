'use client' // Make sure this component only runs client-side
import React, { useRef, useEffect } from 'react'
import SubscribeUs from '@/components/pages/home/subscribeUs'
import Testimonials from '@/components/pages/home/Testimonial'
import HeroSection from '@/components/pages/home/HeroSection'
import DiscoverSection from '@/components/pages/home/DiscoverSection'
import LibyaCultureComponent from '@/components/pages/home/Culture'
import TopHotelsAndLocation from '@/components/pages/home/TopHotelsandLocation'
import TravelBook from '@/components/pages/home/TravelBookSection'
import HotelFeature from '@/components/pages/home/FeaturedHotels'
import TopDestination from '@/components/pages/home/TopDestinations'
import AppPromotionCard from '@/components/pages/TopLocations/PromotionCard'

export default function Home() {
  const topLocationsRef = useRef<HTMLDivElement>(null)

  // Listen for changes in the hash (i.e., #locations) in the URL
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#top-locations') {
        topLocationsRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    // Attach the listener for hashchange
    window.addEventListener('hashchange', handleHashChange)

    // Check if we already need to scroll on initial load (if the hash is present)
    if (window.location.hash === '#top-locations') {
      topLocationsRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    // Clean up the event listener
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <div>
      <HeroSection />
      <TopDestination />
      <HotelFeature />
      <TravelBook />
      {/* Add a ref to the section you want to scroll to */}
      <div ref={topLocationsRef}>
        <TopHotelsAndLocation
          title='Top hotels and Key locations in Libya'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        />
      </div>
      <LibyaCultureComponent />
      <Testimonials />
      <DiscoverSection />
      <AppPromotionCard className='my-8' />
      <SubscribeUs />
    </div>
  )
}
