import svgPaths from "./svg-vrafpgntyr";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[60px] text-white w-full">
        <p className="leading-[60px]">Our core services</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60a5fa] text-[14px] w-full">
          <p className="leading-[20px]">01</p>
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-full">
          <p className="leading-[36px]">Graduate Placement</p>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[26px] not-italic relative shrink-0 text-[#9ca3af] text-[16px] w-full">
          <p className="mb-0">We specialise in matching top-tier graduate talent with</p>
          <p className="mb-0">high-growth businesses and corporate firms across the</p>
          <p>UK.</p>
        </div>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p3a917a20} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Link() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pt-[15.5px] relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[81.83px]">
          <p className="leading-[24px]">Learn more</p>
        </div>
        <Container4 />
      </div>
    </div>
  );
}

function Pillar() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch pt-[33px] relative row-1 self-start shrink-0" data-name="Pillar 1">
      <div aria-hidden="true" className="absolute border-[#4b5563] border-solid border-t inset-0 pointer-events-none" />
      <Container2 />
      <Heading1 />
      <Container3 />
      <Link />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60a5fa] text-[14px] w-full">
          <p className="leading-[20px]">02</p>
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-full">
          <p className="leading-[36px]">Student Recruitment</p>
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[26px] not-italic relative shrink-0 text-[#9ca3af] text-[16px] w-full">
          <p className="mb-0">Connecting students with internships, placement years</p>
          <p className="mb-0">and part-time roles that kickstart their professional</p>
          <p>journeys.</p>
        </div>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p3a917a20} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg1 />
    </div>
  );
}

function Link1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center pt-[15.5px] relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[81.83px]">
          <p className="leading-[24px]">Learn more</p>
        </div>
        <Container7 />
      </div>
    </div>
  );
}

function Pillar1() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch pt-[33px] relative row-1 self-start shrink-0" data-name="Pillar 2">
      <div aria-hidden="true" className="absolute border-[#4b5563] border-solid border-t inset-0 pointer-events-none" />
      <Container5 />
      <Heading2 />
      <Container6 />
      <Link1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#60a5fa] text-[14px] w-full">
          <p className="leading-[20px]">03</p>
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-full">
          <p className="leading-[36px]">Employer Branding</p>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[26px] not-italic relative shrink-0 text-[#9ca3af] text-[16px] w-full">
          <p className="mb-0">Helping organisations build compelling brands that</p>
          <p className="mb-0">attract the brightest young minds in a competitive</p>
          <p>market.</p>
        </div>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p3a917a20} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg2 />
    </div>
  );
}

function Link2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pt-[15.5px] relative w-full">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[81.83px]">
          <p className="leading-[24px]">Learn more</p>
        </div>
        <Container10 />
      </div>
    </div>
  );
}

function Pillar2() {
  return (
    <div className="col-3 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch pt-[33px] relative row-1 self-start shrink-0" data-name="Pillar 3">
      <div aria-hidden="true" className="absolute border-[#4b5563] border-solid border-t inset-0 pointer-events-none" />
      <Container8 />
      <Heading3 />
      <Container9 />
      <Link2 />
    </div>
  );
}

function Container1() {
  return (
    <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_263px] relative shrink-0 w-full" data-name="Container">
      <Pillar />
      <Pillar1 />
      <Pillar2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container1 />
    </div>
  );
}

export default function ServicesPillarsSection() {
  return (
    <div className="bg-[#201c25] content-stretch flex flex-col items-start px-[80px] py-[128px] relative size-full" data-name="Services / Pillars Section">
      <Container />
    </div>
  );
}