import svgPaths from "./svg-2l2xj16z9s";
import imgHeroSection from "figma:asset/e5ae15a34b3ed6bfb93f98b7ffbdccbdfa45a73c.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[72px] not-italic relative shrink-0 text-[72px] text-white w-full">
        <p className="mb-0">Recruitment</p>
        <p>Consultancy</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[448px] opacity-90 relative shrink-0 w-[448px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[56px] justify-center leading-[28px] not-italic relative shrink-0 text-[18px] text-white w-[424.88px]">
        <p className="mb-0">{`Use our traditional search & selection recruitment`}</p>
        <p>service to source talent on a no-hire no-fee basis.</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0033">
        <g id="SVG">
          <path d={svgPaths.p12c2fd00} fill="var(--fill-0, white)" id="Vector" />
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
    <div className="bg-[#0055d5] relative rounded-[9999px] self-stretch shrink-0" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-full items-center px-[32px] py-[16px] relative">
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[93.28px]">
            <p className="leading-[24px]">Get in touch</p>
          </div>
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[12px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0047 16">
        <g id="SVG">
          <path d={svgPaths.p301f2580} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Svg1 />
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[9999px] self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] h-full items-center px-[33px] py-[17px] relative">
          <Container5 />
          <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[86.69px]">
            <p className="leading-[24px]">Back to top</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[16px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <Link />
      <Link1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[24.5px] items-start justify-self-stretch relative row-1 self-end shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic opacity-80 relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase w-[146.98px]">
        <p className="leading-[16px]">EMPLOYER SERVICES</p>
      </div>
      <Heading />
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container() {
  return (
    <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_346px] max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
    </div>
  );
}

export default function HeroSection() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end p-[80px] relative size-full" data-name="Hero Section">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgHeroSection} />
        <div className="absolute bg-gradient-to-r from-[#0055d5] from-[40%] inset-0 to-[40%] to-[rgba(0,85,213,0)]" />
      </div>
      <Container />
    </div>
  );
}