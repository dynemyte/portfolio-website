import PageContainer from '../components/PageContainer'
import ContentSection from '../components/ContentSection'
import HeroSection from '../components/HeroSection'
import MessageCardRows from '../components/MessageCardRows'

export default function LandingPage() {
  const topRowCards = ['Hello', 'We', 'Are']
  const bottomRowCards = ['Here', 'To', 'Help']

  return (
    <PageContainer>
      <ContentSection>
        <HeroSection subtitle="the only design system you should be thinking about" />
        <MessageCardRows labels={topRowCards} mt="14vh" start="top 85%" />
        <MessageCardRows labels={bottomRowCards} mt="2rem" start="top 80%" />
      </ContentSection>
    </PageContainer>
  )
}
