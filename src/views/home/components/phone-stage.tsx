import { IPhoneMockup } from "@/components/shared/iphone-mockup"

type PhoneStageProps = {
  primaryScreen: string
  secondaryScreen: string
  primaryAlt: string
  secondaryAlt: string
}

function PhoneStage({ primaryScreen, secondaryScreen, primaryAlt, secondaryAlt }: PhoneStageProps) {
  return (
    <div className="jl-hero-right">
      <div className="jl-glow-orb jl-glow-orb-main" />
      <div className="jl-glow-orb jl-glow-orb-side" />

      <IPhoneMockup className="jl-phone-primary" imageSrc={primaryScreen} imageAlt={primaryAlt} priority />
      <IPhoneMockup className="jl-phone-secondary" imageSrc={secondaryScreen} imageAlt={secondaryAlt} />
    </div>
  )
}

export { PhoneStage }
