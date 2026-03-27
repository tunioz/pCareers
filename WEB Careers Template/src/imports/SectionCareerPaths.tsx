import svgPaths from "./svg-uojxkafknl";
import imgBackground from "figma:asset/42f7b92237d78e15045248fb634013765e90f1c3.png";
import imgBackground1 from "figma:asset/bd2a7a04b7d14b6379720a65130a43c6f24fd8f8.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] h-[40px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[36px] text-center w-[487.34px]">
        <p className="leading-[40px]">Graduate job career paths</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[16px] text-center w-[857.06px]">
        <p className="leading-[24px]">Browse our top industry profiles to explore what roles exist, what skills are needed, and how to start your journey.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container2 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white w-[166.28px]">
        <p className="leading-[32px]">Accountancy</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#0055d5] col-2 h-[320px] justify-self-stretch relative rounded-[16px] row-1 shrink-0" data-name="Background">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex items-end p-[32px] relative size-full">
          <Heading1 />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white w-[127.14px]">
        <p className="leading-[32px]">Analytical</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#d1d5db] col-3 h-[320px] justify-self-stretch relative rounded-[16px] row-1 shrink-0" data-name="Background">
      <div className="flex flex-row items-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-end p-[32px] relative size-full">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-full left-[-4.42%] max-w-none top-0 w-[108.84%]" src={imgBackground} />
          </div>
          <div className="absolute bg-[rgba(0,0,0,0.3)] inset-0" data-name="Overlay" />
          <Heading2 />
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white w-[158.31px]">
        <p className="leading-[32px]">Consultancy</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#9ca3af] col-4 h-[320px] justify-self-stretch relative rounded-[16px] row-1 shrink-0" data-name="Background">
      <div className="flex flex-row items-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-end p-[32px] relative size-full">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-full left-[-4.42%] max-w-none top-0 w-[108.84%]" src={imgBackground1} />
          </div>
          <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0" data-name="Overlay" />
          <Heading3 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[_320px] h-[320px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-[#f4f4f4] col-1 h-[320px] justify-self-stretch opacity-40 rounded-[16px] row-1 shrink-0" data-name="Background" />
      <Background />
      <Background1 />
      <Background2 />
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[16px] relative shrink-0 w-[10px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 16">
        <g id="SVG">
          <path d={svgPaths.p23f92880} fill="var(--fill-0, #9CA3AF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex items-center justify-center left-[-16px] rounded-[9999px] size-[40px] top-[140px]" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[40px] top-0" data-name="Button:shadow" />
      <Container5 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[10px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 16">
        <g id="SVG">
          <path d={svgPaths.p20766000} fill="var(--fill-0, #9CA3AF)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg1 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex items-center justify-center right-[-16px] rounded-[9999px] size-[40px] top-[140px]" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] right-0 rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[40px] top-0" data-name="Button:shadow" />
      <Container6 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Button />
      <Button1 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="h-[14px] relative shrink-0 w-[12.25px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.25 14">
        <g id="SVG">
          <path d={svgPaths.p2ffe300} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg2 />
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#0055d5] content-stretch flex gap-[8px] items-center px-[32px] py-[12px] relative rounded-[9999px] shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white w-[132.09px]">
        <p className="leading-[20px]">All industry profiles</p>
      </div>
      <Container8 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <Link />
    </div>
  );
}

function Container() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[48px] items-start max-w-[inherit] px-[16px] relative w-full">
        <Container1 />
        <Container3 />
        <Container7 />
      </div>
    </div>
  );
}

export default function SectionCareerPaths() {
  return (
    <div className="bg-[#f4f4f4] content-stretch flex flex-col items-start p-[80px] relative size-full" data-name="Section - Career Paths">
      <Container />
    </div>
  );
}