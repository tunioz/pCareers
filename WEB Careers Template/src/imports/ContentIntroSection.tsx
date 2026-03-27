import imgGrbTeam from "figma:asset/7af934c0d473ca3bc58e173030c63767ba644967.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[48px] w-full">
        <p className="mb-0">
          <span className="leading-[48px]">{`Established `}</span>
          <span className="font-['Liberation_Sans:Bold',sans-serif] leading-[48px] not-italic text-[#9ca3af]">in 1997</span>
          <span className="leading-[48px]">, we</span>
        </p>
        <p className="mb-0">
          <span className="leading-[48px]">{`are `}</span>
          <span className="font-['Liberation_Sans:Bold',sans-serif] leading-[48px] not-italic text-[#9ca3af]">recognised</span>
          <span className="leading-[48px]">{` as the`}</span>
        </p>
        <p className="mb-0">
          <span className="leading-[48px]">{`UK's leading, `}</span>
          <span className="font-['Liberation_Sans:Regular',sans-serif] leading-[48px] not-italic text-[#9ca3af]">independent,</span>
        </p>
        <p className="font-['Liberation_Sans:Regular',sans-serif] leading-[48px] mb-0 text-[#2563eb]">early talent recruitment</p>
        <p className="leading-[48px]">consultancy</p>
      </div>
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-l-4 border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pl-[20px] relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[64px] justify-center leading-[32px] not-italic relative shrink-0 text-[#374151] text-[24px] w-[543.83px]">
          <p className="mb-0">We are the go-to source for employers who want to</p>
          <p>hire student and graduate talent.</p>
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <VerticalBorder />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Liberation_Sans:Bold_Italic',sans-serif] h-[120px] justify-center leading-[0] left-[-32px] not-italic text-[#f3f4f6] text-[120px] top-[12px] w-[56.91px]">
        <p className="leading-[120px]">{`"`}</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[48px] items-start min-h-px min-w-px relative" data-name="Container">
      <Heading />
      <Container2 />
    </div>
  );
}

function GrbTeam() {
  return (
    <div className="h-[588.52px] max-w-[608px] relative rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-[607.98px]" data-name="GRB Team">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgGrbTeam} />
      </div>
    </div>
  );
}

function FloatingVerticalTextAsInDesign() {
  return (
    <div className="absolute bottom-[28.03%] content-stretch flex flex-col items-start pl-px right-[-17px] top-[28.03%]" data-name="Floating vertical text as in design">
      <div className="flex h-[258.54px] items-center justify-center relative shrink-0 w-[36px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[36px] justify-center leading-[0] not-italic relative text-[#d1d5db] text-[30px] tracking-[3px] uppercase w-[258.54px]">
            <p className="leading-[36px]">Consultancy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <GrbTeam />
      <FloatingVerticalTextAsInDesign />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[64px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container3 />
    </div>
  );
}

export default function ContentIntroSection() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[80px] py-[128px] relative size-full" data-name="Content Intro Section">
      <Container />
    </div>
  );
}