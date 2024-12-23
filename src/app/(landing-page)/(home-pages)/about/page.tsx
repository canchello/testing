import React from 'react'
import HeroSection from '@/components/pages/about/HeroSection'
import OurVision from '@/components/pages/about/OurVision'
import OurMission from '@/components/pages/about/OurMission'
import HaveAQuery from '@/components/pages/components/HaveAQuery'
import ReliablePartner from '@/components/pages/about/ReliablePartner'
import OurTeam from '@/components/pages/about/OurTeam'

export default function About() {
  return (
    <div>
      <HeroSection />
      <OurVision />
      <OurMission />
      <OurTeam />
      <ReliablePartner />
      <HaveAQuery />
    </div>
  )
}
